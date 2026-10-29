import { describe, test, expect } from "vitest";
import { parseADT_A17 } from "./ADT_A17.ts";
import { ParserUtils } from "../../types/parser.ts";

const MSH = "MSH|^~\\&|SEND|SFAC|RECV|RFAC|20231015120000||ADT^A17^ADT_A17|MSG001|P|2.5.1";

const fullMessage = [
  MSH,
  "EVN|A17|20231015120000",
  "PID|1||12345^^^MRN^MR||Doe^John^Q||19800115|M",
  "PD1|||CLINIC^MAIN",
  "PV1|1|I|WEST^101^1",
  "PV2|||Admitted for observation",
  "DB1|1|PT|D-1",
  "OBX|1|NM|718-7^Hemoglobin^LN|1|15.5|g/dL",
  "OBX|2|NM|4544-3^Hematocrit^LN|1|45|%",
  "PID|2||67890^^^MRN^MR||Roe^Jane||19750220|F",
  "PV1|1|I|WEST^102^1",
  "DB1|1|PT|D-2",
].join("\r");

describe("parseADT_A17", () => {
  test("parses a full message into two patient groups", () => {
    const result = parseADT_A17(fullMessage);
    expect(result.ok).toBe(true);
    const { header: msh, event: evn, patients: [patient1, patient2], message } = result.val!;
    expect(ParserUtils.getComponent(msh.fields[1], 0)).toBe("SEND");
    expect(ParserUtils.getComponent(evn.fields[0], 0)).toBe("A17");

    expect(ParserUtils.getComponent(patient1.patient.fields[4], 0)).toBe("Doe");
    expect(patient1.patientDemographics).toBeTruthy();
    expect(ParserUtils.getComponent(patient1.visit.fields[2], 1)).toBe("101");
    expect(patient1.visitDetails).toBeTruthy();
    expect(patient1.disabilities).toHaveLength(1);
    expect(patient1.observations).toHaveLength(2);
    expect(ParserUtils.getComponent(patient1.observations![1].fields[2], 0)).toBe("4544-3");

    expect(ParserUtils.getComponent(patient2.patient.fields[4], 0)).toBe("Roe");
    expect(patient2.patientDemographics).toBeUndefined();
    expect(ParserUtils.getComponent(patient2.visit.fields[2], 1)).toBe("102");
    expect(patient2.visitDetails).toBeUndefined();
    expect(patient2.disabilities).toHaveLength(1);
    expect(patient2.observations).toHaveLength(0);

    expect(message.segments).toHaveLength(12);
  });

  test("re-encodes to the original wire string", () => {
    const result = parseADT_A17(fullMessage);
    expect(result.val!.message.encode()).toBe(fullMessage);
  });

  test("fails without EVN", () => {
    const result = parseADT_A17([MSH, "PID|1||1||Doe", "PV1|1|I", "PID|2||2||Roe", "PV1|1|I"].join("\r"));
    expect(result.ok).toBe(false);
    expect(result.err!.message).toMatch(/ADT_A17 message must contain an EVN segment/);
  });

  test("fails with only one PID", () => {
    const result = parseADT_A17([MSH, "EVN|A17", "PID|1||1||Doe", "PV1|1|I"].join("\r"));
    expect(result.ok).toBe(false);
    expect(result.err!.message).toMatch(/ADT_A17 message must contain at least 2 PATIENT groups/);
  });

  test("fails when the second patient has no PV1", () => {
    const result = parseADT_A17([MSH, "EVN|A17", "PID|1||1||Doe", "PV1|1|I", "PID|2||2||Roe"].join("\r"));
    expect(result.ok).toBe(false);
    expect(result.err!.message).toMatch(/ADT_A17 message must contain a PV1 segment/);
  });

  test("fails when a patient segment precedes the first PID", () => {
    const result = parseADT_A17([MSH, "EVN|A17", "PV1|1|I", "PID|1||1||Doe"].join("\r"));
    expect(result.ok).toBe(false);
    expect(result.err!.message).toMatch(/ADT_A17 message must contain at least 2 PATIENT groups/);
  });

  test("fails when the message does not start with MSH", () => {
    const result = parseADT_A17("EVN|A17\rPID|1");
    expect(result.ok).toBe(false);
    expect(result.err!.message).toMatch(/must start with MSH/);
  });
});
