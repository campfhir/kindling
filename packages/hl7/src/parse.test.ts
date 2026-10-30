import { describe, test, expect, vi } from "vitest";
import { parse, selectParser, type ParsedHL7, type SelectedParser } from "./parse.ts";
import { identifyMessage, isBatchInput, parseMessage, selectMessageParser, SUPPORTED_VERSIONS } from "./dispatch.ts";
import { parseBatch } from "./batch.ts";
import { MESSAGES } from "./v2.3/registry.ts";
import { MESSAGES as MESSAGES_231 } from "./v2.3.1/registry.ts";
import { MESSAGES as MESSAGES_24 } from "./v2.4/registry.ts";
import { parseADT_A01, parseACK, parseADT_A04 } from "./v2.3/index.ts";
import * as par231 from "./v2.3.1/index.ts";
import * as par24 from "./v2.4/index.ts";
import type { ParsedADT_A01 } from "./v2.3/ADT_A01.ts";
import type { ParsedORU_R01 } from "./v2.3/ORU_R01.ts";

const MSH = (type: string, version = "2.3") => `MSH|^~\\&|APP|FAC|EMR|HOSP|20231015120000||${type}|MSG001|P|${version}`;

const A01 = [MSH("ADT^A01"), "EVN|A01|20231015120000", "PID|1||12345^^^HOSP^MR||Doe^John", "PV1|1|I|ICU^1^A"].join("\r");
const ACK = [MSH("ACK^A01"), "MSA|AA|MSG001"].join("\r");
const ORU = [MSH("ORU^R01"), "PID|1||12345", "OBR|1|||CBC^Complete Blood Count", "OBX|1|NM|718-7^Hemoglobin^LN||15.5|g/dL"].join("\r");

/** The message variant of a root result, or a throw: every test here feeds one message unless it says otherwise. */
function message<T extends { kind: string }>(result: { ok: boolean; val?: T; err?: Error }): Extract<T, { kind: "message" }> {
  if (!result.ok || !result.val) throw new Error(result.err?.message);
  if (result.val.kind !== "message") throw new Error(`expected a message, got ${result.val.kind}`);
  return result.val as Extract<T, { kind: "message" }>;
}
const select = (s: string, options?: { version: "2.3" }) => message<SelectedParser>(selectParser(s, options));
const parsedMessage = (s: string, options?: { version: "2.3" }) => message<ParsedHL7>(parse(s, options));

describe("identifyMessage", () => {
  test("reads MSH-9 and MSH-12 as sent", () => {
    expect(identifyMessage(A01)).toEqual({ ok: true, val: { messageCode: "ADT", triggerEvent: "A01", version: "2.3" } });
    expect(identifyMessage(MSH("ORU^R01^ORU_R01", "2.5.1")).val).toEqual({
      messageCode: "ORU",
      triggerEvent: "R01",
      messageStructure: "ORU_R01",
      version: "2.5.1",
    });
    // The first component of a VID.
    expect(identifyMessage(MSH("ACK", "2.4^USA")).val).toEqual({ messageCode: "ACK", triggerEvent: "", version: "2.4" });
  });

  test("rejects an empty message, a message not starting with MSH, a truncated MSH, and a batch", () => {
    expect(identifyMessage("").err?.message).toBe("Empty message");
    expect(identifyMessage("PID|1").err?.message).toBe("Message must start with MSH segment");
    expect(identifyMessage("MSH|^~").ok).toBe(false);
    expect(identifyMessage(`BHS|^~\\&|APP\r${A01}`).err?.message).toBe("Input is a batch file, not one message: use parse() or parseBatch()");
  });

  test("isBatchInput: FHS or BHS first, or more than one MSH", () => {
    expect(isBatchInput(A01)).toBe(false);
    expect(isBatchInput(`FHS|^~\\&|APP\r${A01}`)).toBe(true);
    expect(isBatchInput(`BHS|^~\\&|APP`)).toBe(true);
    expect(isBatchInput(`${A01}\r${ACK}`)).toBe(true);
    expect(isBatchInput("")).toBe(false);
  });
});

describe("selectParser", () => {
  test("picks the generated parser of the message type in the message's version", () => {
    const selected = select(A01);
    expect(selected).toMatchObject({ kind: "message", version: "2.3", structure: "ADT_A01", messageType: { messageCode: "ADT", triggerEvent: "A01" } });
    expect(selected.parse).toBe(parseADT_A01);
    expect(select(MSH("ADT^A04")).parse).toBe(parseADT_A04);
    expect(selectMessageParser(A01).val).toEqual(selected);
  });

  test("ACK resolves on its message type alone, whatever event it acknowledges", () => {
    for (const type of ["ACK^A01", "ACK", "ACK^R01^ACK"]) {
      const selected = select(MSH(type));
      expect(selected.structure).toBe("ACK");
      expect(selected.parse).toBe(parseACK);
    }
  });

  test("falls back to MSH-9.3 when the event is missing or does not name a message", () => {
    expect(select(MSH("ADT^^ADT_A01")).structure).toBe("ADT_A01");
    expect(select(MSH("ADT^A99^ADT_A01")).structure).toBe("ADT_A01");
    // The event wins over MSH-9.3 when both name a message.
    expect(select(MSH("ADT^A04^ADT_A01")).structure).toBe("ADT_A04");
  });

  test("names an unknown message type", () => {
    expect(selectParser(MSH("ZZZ^Z01")).err?.message).toBe("Unknown HL7 v2.3 message type 'ZZZ^Z01' (MSH-9)");
    expect(selectParser(MSH("ADT^A99^ADT_A99")).err?.message).toBe("Unknown HL7 v2.3 message type 'ADT^A99^ADT_A99' (MSH-9)");
    expect(selectParser(MSH("")).err?.message).toBe("Unknown HL7 v2.3 message type '' (MSH-9)");
  });

  test("rejects a version this release does not dispatch, unless the caller picks one", () => {
    expect(SUPPORTED_VERSIONS).toEqual(["2.3", "2.3.1", "2.4", "2.5", "2.5.1", "2.6", "2.7", "2.7.1", "2.8", "2.8.1", "2.8.2", "2.9", "2.9.1"]);
    const other = selectParser(MSH("ADT^A01", "2.2"));
    expect(other.ok).toBe(false);
    expect(other.err?.message).toBe(
      "HL7 version '2.2' (MSH-12) is not supported by this release, which parses 2.3, 2.3.1, 2.4, 2.5, 2.5.1, 2.6, 2.7, 2.7.1, 2.8, 2.8.1, 2.8.2, 2.9, 2.9.1; pass { version: \"2.9.1\" } to parse the message as that version",
    );
    const forced = select(MSH("ADT^A01", "2.2"), { version: "2.3" });
    expect(forced).toMatchObject({ version: "2.3", structure: "ADT_A01", messageType: { version: "2.2" } });
  });

  test("rejects an empty MSH-12, unless the caller picks a version", () => {
    expect(selectParser(MSH("ADT^A01", "")).err?.message).toBe('MSH-12 Version ID is empty; pass { version: "2.9.1" } to choose the version to parse as');
    expect(select(MSH("ADT^A01", ""), { version: "2.3" }).structure).toBe("ADT_A01");
  });

  test("a 2.3.1 message goes to the v2.3.1 parsers: renumbered and withdrawn events follow the version", () => {
    const selected = select(MSH("ADT^A01", "2.3.1"));
    expect(selected).toMatchObject({ kind: "message", version: "2.3.1", structure: "ADT_A01", messageType: { version: "2.3.1" } });
    expect(selected.parse).toBe(par231.parseADT_A01);
    expect(selected.parse).not.toBe(parseADT_A01);
    // EQQ^Q04 exists only from 2.3.1 (it replaces EQQ^Q01); RAS^O02 only in 2.3 (RAS^O01 from 2.3.1).
    expect(select(MSH("EQQ^Q04", "2.3.1")).parse).toBe(par231.parseEQQ_Q04);
    expect(selectParser(MSH("EQQ^Q04")).err?.message).toBe("Unknown HL7 v2.3 message type 'EQQ^Q04' (MSH-9)");
    expect(selectParser(MSH("EQQ^Q01", "2.3.1")).err?.message).toBe("Unknown HL7 v2.3.1 message type 'EQQ^Q01' (MSH-9)");
    expect(select(MSH("RAS^O02")).structure).toBe("RAS_O02");
    expect(select(MSH("RAS^O01", "2.3.1")).structure).toBe("RAS_O01");
    expect(selectParser(MSH("RAS^O02", "2.3.1")).ok).toBe(false);
    // MSH-9.3 (defined from 2.3.1) is honoured when the event is missing.
    expect(select(MSH("ORU^^ORU_R01", "2.3.1")).parse).toBe(par231.parseORU_R01);
  });

  test("a 2.4 message goes to the v2.4 parsers: new, renumbered and withdrawn events follow the version", () => {
    expect(select(MSH("ADT^A01", "2.4")).parse).toBe(par24.parseADT_A01);
    expect(select(MSH("ADT^A01", "2.4^USA")).version).toBe("2.4"); // VID form of MSH-12
    // OML^O21 and QBP^Q11 exist from 2.4; A05 has its own structure in 2.4 (ADT_A05, not a wrapper of A01); RDO^O01 is withdrawn.
    expect(select(MSH("OML^O21", "2.4")).parse).toBe(par24.parseOML_O21);
    expect(select(MSH("QBP^Q11^QBP_Q11", "2.4")).structure).toBe("QBP_Q11");
    expect(select(MSH("ADT^A05", "2.4")).parse).toBe(par24.parseADT_A05);
    expect(selectParser(MSH("OML^O21", "2.3.1")).err?.message).toBe("Unknown HL7 v2.3.1 message type 'OML^O21' (MSH-9)");
    expect(selectParser(MSH("RDO^O01", "2.4")).err?.message).toBe("Unknown HL7 v2.4 message type 'RDO^O01' (MSH-9)");
    expect(select(MSH("RDE^O11", "2.4")).structure).toBe("RDE_O11");
  });

  test("every v2.4 message structure is reached from its own MSH-9", () => {
    const names = Object.keys(MESSAGES_24);
    expect(names).toHaveLength(334);
    for (const name of names) {
      const [code, event] = name.split("_");
      const type = event ? `${code}^${event}` : `${code}^A01`;
      const selected = select(MSH(type, "2.4"));
      expect(selected.structure, type).toBe(name);
      expect(selected.parse, type).toBe(MESSAGES_24[name as keyof typeof MESSAGES_24]);
    }
  });

  test("every v2.3.1 message structure is reached from its own MSH-9", () => {
    const names = Object.keys(MESSAGES_231);
    expect(names).toHaveLength(276);
    for (const name of names) {
      const [code, event] = name.split("_");
      const type = event ? `${code}^${event}` : `${code}^A01`;
      const selected = select(MSH(type, "2.3.1"));
      expect(selected.structure, type).toBe(name);
      expect(selected.parse, type).toBe(MESSAGES_231[name as keyof typeof MESSAGES_231]);
    }
  });

  test("every v2.3 message structure is reached from its own MSH-9", () => {
    const names = Object.keys(MESSAGES);
    expect(names).toHaveLength(276);
    for (const name of names) {
      const [code, event] = name.split("_");
      const type = event ? `${code}^${event}` : `${code}^A01`;
      const selected = select(MSH(type));
      expect(selected.structure, type).toBe(name);
      expect(selected.parse, type).toBe(MESSAGES[name as keyof typeof MESSAGES]);
    }
  });
});

describe("parse", () => {
  test.each(SUPPORTED_VERSIONS.map((v) => [v]))("dispatches HL7 v%s and round-trips its ADT^A01, ACK and ORU^R01", (version) => {
    const messages = {
      ADT_A01: [MSH("ADT^A01^ADT_A01", version), "EVN|A01|20231015120000", "PID|1||12345^^^HOSP^MR||Doe^John", "PV1|1|I|ICU^1^A"],
      ACK: [MSH("ACK^A01^ACK", version), "MSA|AA|MSG001"],
      ORU_R01: [MSH("ORU^R01^ORU_R01", version), "PID|1||12345", "OBR|1|||CBC^Complete Blood Count", "OBX|1|NM|718-7^Hemoglobin^LN||15.5|g/dL"],
    };
    for (const [structure, lines] of Object.entries(messages)) {
      const wire = lines.join("\r");
      const result = parse(wire);
      expect(result.err?.message).toBeUndefined();
      expect(result.val).toMatchObject({ kind: "message", version, structure });
      if (result.val?.kind === "message") expect(result.val.parsed.message.encode()).toBe(wire);
    }
  });

  test("returns the structured message with its version and structure", () => {
    const value = parsedMessage(A01);
    expect(value.kind).toBe("message");
    expect(value.version).toBe("2.3");
    expect(value.structure).toBe("ADT_A01");
    expect(value.messageType).toEqual({ messageCode: "ADT", triggerEvent: "A01", version: "2.3" });
    if (value.version === "2.3" && value.structure === "ADT_A01") {
      const parsed: ParsedADT_A01 = value.parsed; // narrowed by the discriminants
      expect(parsed.patient.fields[4].components[0].subComponents[0]).toBe("Doe");
      expect(parsed.visit.fields[1].components[0].subComponents[0]).toBe("I");
      expect(parsed.message.encode()).toBe(A01);
    } else {
      throw new Error("expected ADT_A01");
    }
    // The same object the message's own parser returns.
    expect(value.parsed).toEqual(parseADT_A01(A01).val);
    expect(parseMessage(A01).val).toEqual(value);
  });

  test("ACK and ORU^R01 narrow to their own shapes", () => {
    const ack = parsedMessage(ACK);
    expect(ack.structure).toBe("ACK");
    if (ack.structure === "ACK") expect(ack.parsed.acknowledgment.fields[0].components[0].subComponents[0]).toBe("AA");

    const oru = parsedMessage(ORU);
    if (oru.version !== "2.3" || oru.structure !== "ORU_R01") throw new Error("expected a v2.3 ORU_R01");
    const parsed: ParsedORU_R01 = oru.parsed;
    expect(parsed.patientResults[0].orderObservations[0].observations![0].observation.fields[4].components[0].subComponents[0]).toBe("15.5");
  });

  test("passes the chosen parser's structural errors through", () => {
    const result = parse([MSH("ADT^A01"), "EVN|A01", "PV1|1"].join("\r"));
    expect(result.ok).toBe(false);
    expect(result.err?.message).toBe("ADT_A01 message must contain a PID segment");
  });

  test("passes selection errors through", () => {
    expect(parse("").err?.message).toBe("Empty message");
    expect(parse(MSH("ZZZ^Z01")).err?.message).toBe("Unknown HL7 v2.3 message type 'ZZZ^Z01' (MSH-9)");
    expect(parse(MSH("ADT^A01", "2.2")).err?.message).toMatch(/not supported by this release/);
  });

  test("parses a 2.2-labelled feed as 2.4 on request, and 2.3.1 to 2.5.1 feeds natively", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const message = [MSH("ADT^A01^ADT_A01", "2.2"), "EVN|A01", "PID|1||1", "PV1|1|O", "ZPD|custom"].join("\r");
    const result = parse(message, { version: "2.4" });
    expect(result.val).toMatchObject({ kind: "message", version: "2.4", structure: "ADT_A01", messageType: { version: "2.2", messageStructure: "ADT_A01" } });
    // A 2.4 A01 ends with PDA and carries ROLs after PD1 and PV2.
    const v24 = parse([MSH("ADT^A01^ADT_A01", "2.4"), "EVN|A01", "PID|1||1", "ROL|1|AD|AT", "PV1|1|O", "PV2|", "ROL|2|AD|CP", "PDA|"].join("\r"));
    expect(v24.val).toMatchObject({ kind: "message", version: "2.4", structure: "ADT_A01" });
    if (v24.val?.kind === "message" && v24.val.version === "2.4" && v24.val.structure === "ADT_A01") {
      expect(v24.val.parsed.roles).toHaveLength(1);
      expect(v24.val.parsed.visitRoles).toHaveLength(1);
      expect(v24.val.parsed.deathAndAutopsy).toBeTruthy();
    } else {
      throw new Error("expected a 2.4 ADT_A01");
    }
    const native = parse([MSH("ADT^A01^ADT_A01", "2.3.1"), "EVN|A01", "PID|1||1", "PV1|1|O", "IN1|1|PLAN", "IN3|1", "IN3|2"].join("\r"));
    expect(native.val).toMatchObject({ kind: "message", version: "2.3.1", structure: "ADT_A01" });
    if (native.val?.kind === "message" && native.val.version === "2.3.1" && native.val.structure === "ADT_A01") {
      expect(native.val.parsed.insuranceGroups![0].insuranceCertifications).toHaveLength(2); // IN3 repeats from 2.3.1
    } else {
      throw new Error("expected a 2.3.1 ADT_A01");
    }
    warn.mockRestore();
  });

  test("accepts LF and CRLF segment terminators", () => {
    expect(parsedMessage(A01.split("\r").join("\n")).structure).toBe("ADT_A01");
    expect(parsedMessage(A01.split("\r").join("\r\n")).structure).toBe("ADT_A01");
  });

  test("a batch file comes back from the batch parser, not as an error", () => {
    const file = `FHS|^~\\&|APP\rBHS|^~\\&|APP\r${A01}\r${ACK}\rBTS|2\rFTS|1`;
    const selected = selectParser(file);
    expect(selected.val).toEqual({ kind: "batch", parse: parseBatch });

    const result = parse(file);
    expect(result.ok).toBe(true);
    if (!result.val || result.val.kind !== "batch") throw new Error("expected a batch");
    expect(result.val.fileHeader?.encode()).toBe("FHS|^~\\&|APP");
    expect(result.val.batches).toHaveLength(1);
    expect(result.val.batches[0].messages.map((m) => m.val?.structure)).toEqual(["ADT_A01", "ACK"]);
    expect(result.val.warnings).toEqual([]);
    expect(result.val).toEqual({ kind: "batch", ...parseBatch(file).val });

    // A bare run of messages is a batch too; one message is not.
    const bare = parse(`${A01}\r${ORU}\r${ACK}`);
    if (!bare.val || bare.val.kind !== "batch") throw new Error("expected a batch");
    expect(bare.val.batches[0].header).toBeUndefined();
    expect(bare.val.batches[0].messages.map((m) => m.val?.structure)).toEqual(["ADT_A01", "ORU_R01", "ACK"]);
    expect(parse(A01).val?.kind).toBe("message");

    // Options reach every message of the batch; a batch-level error comes back as the error.
    const forced = parse(`${MSH("ADT^A01", "2.4")}\rEVN|A01\rPID|1||1\rPV1|1\r${ACK}`, { version: "2.3" });
    if (!forced.val || forced.val.kind !== "batch") throw new Error("expected a batch");
    expect(forced.val.batches[0].messages.every((m) => m.ok)).toBe(true);
    expect(parse(`BHS|^~\\&|APP\rPID|1`).err?.message).toBe("PID segment at line 2 is outside of any message (expected MSH, BHS, BTS or FTS)");
    expect(parseMessage(file).err?.message).toBe("Input is a batch file, not one message: use parse() or parseBatch()");
  });

});
