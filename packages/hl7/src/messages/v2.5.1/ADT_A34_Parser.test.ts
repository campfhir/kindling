import { describe, test, expect } from "vitest";
import { parseADT_A34 } from "./ADT_A34.ts";
import { ParserUtils } from "../../types/parser.ts";

const minimalMessage = [
  "MSH|^~\\&|SEND|SFAC|RECV|RFAC|20231015120000||ADT^A34^ADT_A34|MSG001|P|2.5.1",
  "EVN|A34|20231015120000",
  "PID|1||12345^^^MRN^MR||Doe^John^Q||19800115|M",
  "MRG|OLD-12345^^^MRN^MR",
].join("\r");

const fullMessage = [
  "MSH|^~\\&|SEND|SFAC|RECV|RFAC|20231015120000||ADT^A34^ADT_A34|MSG001|P|2.5.1",
  "EVN|A34|20231015120000",
  "PID|1||12345^^^MRN^MR||Doe^John^Q||19800115|M",
  "PD1|||CLINIC^MAIN",
  "MRG|OLD-12345^^^MRN^MR",
].join("\r");

describe("parseADT_A34 — minimal message", () => {
  test("parses valid minimal message", () => {
    const result = parseADT_A34(minimalMessage);
    expect(result.ok).toBe(true);
    expect(result.val).toBeTruthy();
  });

  test("extracts MSH", () => {
    const result = parseADT_A34(minimalMessage);
    expect(result.val!.header.name).toBe("MSH");
    expect(ParserUtils.getComponent(result.val!.header.fields[1], 0)).toBe("SEND");
  });

  test("extracts PID", () => {
    const result = parseADT_A34(minimalMessage);
    expect(result.val!.patient).toBeTruthy();
    const familyName = ParserUtils.getComponent(result.val!.patient.fields[4], 0);
    expect(familyName).toBe("Doe");
  });

  test("extracts MRG", () => {
    const result = parseADT_A34(minimalMessage);
    expect(result.val!.merge).toBeTruthy();
    expect(result.val!.merge.name).toBe("MRG");
  });

  test("EVN is required", () => {
    const result = parseADT_A34(minimalMessage.replace("EVN|A34|20231015120000\r", ""));
    expect(result.ok).toBe(false);
    expect(result.err!.message).toMatch(/ADT_A34 message must contain an EVN segment/);
  });
});

describe("parseADT_A34 — optional segments", () => {
  test("extracts EVN", () => {
    const result = parseADT_A34(fullMessage);
    expect(result.val!.event).toBeTruthy();
    expect(result.val!.event!.name).toBe("EVN");
  });

  test("extracts PD1", () => {
    const result = parseADT_A34(fullMessage);
    expect(result.val!.patientDemographics).toBeTruthy();
    expect(result.val!.patientDemographics!.name).toBe("PD1");
  });

  test("has no PV1 (A34 is MSH [{SFT}] EVN PID [PD1] MRG)", () => {
    const result = parseADT_A34(fullMessage);
    expect("visit" in result.val!).toBe(false);
  });
});

describe("parseADT_A34 — error cases", () => {
  test("returns error for empty message", () => {
    const result = parseADT_A34("");
    expect(result.ok).toBe(false);
  });

  test("returns error when message does not start with MSH", () => {
    const result = parseADT_A34("PID|1||12345\rMRG|OLD-12345");
    expect(result.ok).toBe(false);
    expect(result.err?.message).toContain("MSH");
  });

  test("returns error when PID is missing", () => {
    const msg = [
      "MSH|^~\\&|SEND|SFAC|RECV|RFAC|20231015||ADT^A34^ADT_A34|MSG002|P|2.5.1",
      "EVN|A34",
      "MRG|OLD-12345^^^MRN^MR",
    ].join("\r");

    const result = parseADT_A34(msg);
    expect(result.ok).toBe(false);
    expect(result.err?.message).toContain("PID");
  });

  test("returns error when MRG is missing", () => {
    const msg = [
      "MSH|^~\\&|SEND|SFAC|RECV|RFAC|20231015||ADT^A34^ADT_A34|MSG003|P|2.5.1",
      "EVN|A34",
      "PID|1||12345^^^MRN^MR||Doe^John",
    ].join("\r");

    const result = parseADT_A34(msg);
    expect(result.ok).toBe(false);
    expect(result.err?.message).toContain("MRG");
  });
});

describe("parseADT_A34 — message object", () => {
  test("populates the HL7Message with all segments", () => {
    const result = parseADT_A34(fullMessage);
    expect(result.val!.message).toBeTruthy();
    const segs = result.val!.message.segments;
    expect(segs.some((s) => s.name === "MSH")).toBe(true);
    expect(segs.some((s) => s.name === "PID")).toBe(true);
    expect(segs.some((s) => s.name === "MRG")).toBe(true);
    expect(segs.some((s) => s.name === "EVN")).toBe(true);
  });
});
