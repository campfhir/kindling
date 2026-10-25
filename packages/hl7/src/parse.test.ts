import { describe, test, expect, vi } from "vitest";
import { parse, selectParser, identifyMessage, SUPPORTED_VERSIONS } from "./parse.ts";
import { MESSAGES } from "./parsers/v2.3/messages.ts";
import { parseADT_A01, parseACK, parseADT_A04 } from "./parsers/v2.3/index.ts";
import type { ParsedADT_A01 } from "./parsers/v2.3/ADT_A01_Parser.ts";
import type { ParsedORU_R01 } from "./parsers/v2.3/ORU_R01_Parser.ts";

const MSH = (type: string, version = "2.3") => `MSH|^~\\&|APP|FAC|EMR|HOSP|20231015120000||${type}|MSG001|P|${version}`;

const A01 = [MSH("ADT^A01"), "EVN|A01|20231015120000", "PID|1||12345^^^HOSP^MR||Doe^John", "PV1|1|I|ICU^1^A"].join("\r");
const ACK = [MSH("ACK^A01"), "MSA|AA|MSG001"].join("\r");
const ORU = [MSH("ORU^R01"), "PID|1||12345", "OBR|1|||CBC^Complete Blood Count", "OBX|1|NM|718-7^Hemoglobin^LN||15.5|g/dL"].join("\r");

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

  test("rejects an empty message, a message not starting with MSH, and a truncated MSH", () => {
    expect(identifyMessage("").err?.message).toBe("Empty message");
    expect(identifyMessage("PID|1").err?.message).toBe("Message must start with MSH segment");
    expect(identifyMessage("MSH|^~").ok).toBe(false);
  });
});

describe("selectParser", () => {
  test("picks the generated parser of the message type in the message's version", () => {
    const selected = selectParser(A01);
    expect(selected.ok).toBe(true);
    expect(selected.val).toMatchObject({ version: "2.3", structure: "ADT_A01", messageType: { messageCode: "ADT", triggerEvent: "A01" } });
    expect(selected.val!.parse).toBe(parseADT_A01);
    expect(selectParser(MSH("ADT^A04")).val!.parse).toBe(parseADT_A04);
  });

  test("ACK resolves on its message type alone, whatever event it acknowledges", () => {
    for (const type of ["ACK^A01", "ACK", "ACK^R01^ACK"]) {
      const selected = selectParser(MSH(type));
      expect(selected.val?.structure).toBe("ACK");
      expect(selected.val?.parse).toBe(parseACK);
    }
  });

  test("falls back to MSH-9.3 when the event is missing or does not name a message", () => {
    expect(selectParser(MSH("ADT^^ADT_A01")).val?.structure).toBe("ADT_A01");
    expect(selectParser(MSH("ADT^A99^ADT_A01")).val?.structure).toBe("ADT_A01");
    // The event wins over MSH-9.3 when both name a message.
    expect(selectParser(MSH("ADT^A04^ADT_A01")).val?.structure).toBe("ADT_A04");
  });

  test("names an unknown message type", () => {
    expect(selectParser(MSH("ZZZ^Z01")).err?.message).toBe("Unknown HL7 v2.3 message type 'ZZZ^Z01' (MSH-9)");
    expect(selectParser(MSH("ADT^A99^ADT_A99")).err?.message).toBe("Unknown HL7 v2.3 message type 'ADT^A99^ADT_A99' (MSH-9)");
    expect(selectParser(MSH("")).err?.message).toBe("Unknown HL7 v2.3 message type '' (MSH-9)");
  });

  test("rejects a version this release does not dispatch, unless the caller picks one", () => {
    expect(SUPPORTED_VERSIONS).toEqual(["2.3"]);
    const other = selectParser(MSH("ADT^A01", "2.5.1"));
    expect(other.ok).toBe(false);
    expect(other.err?.message).toBe(
      "HL7 version '2.5.1' (MSH-12) is not supported by this release, which parses 2.3; pass { version: \"2.3\" } to parse the message as that version",
    );
    const forced = selectParser(MSH("ADT^A01", "2.5.1"), { version: "2.3" });
    expect(forced.val).toMatchObject({ version: "2.3", structure: "ADT_A01", messageType: { version: "2.5.1" } });
  });

  test("rejects an empty MSH-12, unless the caller picks a version", () => {
    expect(selectParser(MSH("ADT^A01", "")).err?.message).toBe('MSH-12 Version ID is empty; pass { version: "2.3" } to choose the version to parse as');
    expect(selectParser(MSH("ADT^A01", ""), { version: "2.3" }).val?.structure).toBe("ADT_A01");
  });

  test("every v2.3 message structure is reached from its own MSH-9", () => {
    const names = Object.keys(MESSAGES);
    expect(names).toHaveLength(276);
    for (const name of names) {
      const [code, event] = name.split("_");
      const type = event ? `${code}^${event}` : `${code}^A01`;
      const selected = selectParser(MSH(type));
      expect(selected.val?.structure, type).toBe(name);
      expect(selected.val?.parse, type).toBe(MESSAGES[name as keyof typeof MESSAGES]);
    }
  });
});

describe("parse", () => {
  test("returns the structured message with its version and structure", () => {
    const result = parse(A01);
    expect(result.ok).toBe(true);
    const value = result.val!;
    expect(value.version).toBe("2.3");
    expect(value.structure).toBe("ADT_A01");
    expect(value.messageType).toEqual({ messageCode: "ADT", triggerEvent: "A01", version: "2.3" });
    if (value.structure === "ADT_A01") {
      const parsed: ParsedADT_A01 = value.parsed; // narrowed by the discriminant
      expect(parsed.patient.fields[4].components[0].subComponents[0]).toBe("Doe");
      expect(parsed.visit.fields[1].components[0].subComponents[0]).toBe("I");
      expect(parsed.message.encode()).toBe(A01);
    } else {
      throw new Error("expected ADT_A01");
    }
    // The same object the message's own parser returns.
    expect(value.parsed).toEqual(parseADT_A01(A01).val);
  });

  test("ACK and ORU^R01 narrow to their own shapes", () => {
    const ack = parse(ACK).val!;
    expect(ack.structure).toBe("ACK");
    if (ack.structure === "ACK") expect(ack.parsed.acknowledgment.fields[0].components[0].subComponents[0]).toBe("AA");

    const oru = parse(ORU).val!;
    if (oru.structure !== "ORU_R01") throw new Error("expected ORU_R01");
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
    expect(parse(MSH("ADT^A01", "2.4")).err?.message).toMatch(/not supported by this release/);
  });

  test("parses a 2.3.1-labelled feed as 2.3 on request", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const message = [MSH("ADT^A01^ADT_A01", "2.3.1"), "EVN|A01", "PID|1||1", "PV1|1|O", "ZPD|custom"].join("\r");
    const result = parse(message, { version: "2.3" });
    expect(result.val).toMatchObject({ version: "2.3", structure: "ADT_A01", messageType: { version: "2.3.1", messageStructure: "ADT_A01" } });
    warn.mockRestore();
  });

  test("accepts LF and CRLF segment terminators", () => {
    expect(parse(A01.split("\r").join("\n")).val?.structure).toBe("ADT_A01");
    expect(parse(A01.split("\r").join("\r\n")).val?.structure).toBe("ADT_A01");
  });

});
