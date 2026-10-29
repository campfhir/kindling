import { describe, test, expect } from "vitest";
import { parseADT_A24 } from "./ADT_A24.ts";
import { ParserUtils } from "../../types/parser.ts";

const MSH = "MSH|^~\\&|SEND|SFAC|RECV|RFAC|20231015120000||ADT^A24^ADT_A24|MSG001|P|2.5.1";

const fullMessage = [
  MSH,
  "EVN|A24|20231015120000",
  "PID|1||12345^^^MRN^MR||Doe^John^Q||19800115|M",
  "PD1|||CLINIC^MAIN",
  "PV1|1|O|CLINIC^A^1",
  "DB1|1|PT|D-1",
  "DB1|2|PT|D-2",
  "PID|2||67890^^^MRN^MR||Doe^Johnny||19800115|M",
].join("\r");

describe("parseADT_A24", () => {
  test("parses a full message into two patient groups", () => {
    const result = parseADT_A24(fullMessage);
    expect(result.ok).toBe(true);
    const { event: evn, patients: [patient1, patient2], message } = result.val!;
    expect(ParserUtils.getComponent(evn.fields[0], 0)).toBe("A24");

    expect(ParserUtils.getComponent(patient1.patient.fields[4], 1)).toBe("John");
    expect(patient1.patientDemographics).toBeTruthy();
    expect(ParserUtils.getComponent(patient1.visit!.fields[1], 0)).toBe("O");
    expect(patient1.disabilities).toHaveLength(2);

    expect(ParserUtils.getComponent(patient2.patient.fields[4], 1)).toBe("Johnny");
    expect(patient2.patientDemographics).toBeUndefined();
    expect(patient2.visit).toBeUndefined();
    expect(patient2.disabilities).toHaveLength(0);

    expect(message.segments).toHaveLength(8);
    expect(message.encode()).toBe(fullMessage);
  });

  test("accepts the minimal message (MSH, EVN and two PIDs)", () => {
    const result = parseADT_A24([MSH, "EVN|A24", "PID|1||1||Doe", "PID|2||2||Doe"].join("\r"));
    expect(result.ok).toBe(true);
  });

  test("fails without EVN", () => {
    const result = parseADT_A24([MSH, "PID|1||1||Doe", "PID|2||2||Doe"].join("\r"));
    expect(result.ok).toBe(false);
    expect(result.err!.message).toMatch(/ADT_A24 message must contain an EVN segment/);
  });

  test("fails with three PIDs", () => {
    const result = parseADT_A24([MSH, "EVN|A24", "PID|1", "PID|2", "PID|3"].join("\r"));
    expect(result.ok).toBe(false);
    expect(result.err!.message).toMatch(/PID segment at line 5 is not allowed at this position in ADT_A24/);
  });

  test("fails when DB1 precedes the first PID", () => {
    const result = parseADT_A24([MSH, "EVN|A24", "DB1|1", "PID|1", "PID|2"].join("\r"));
    expect(result.ok).toBe(false);
    expect(result.err!.message).toMatch(/ADT_A24 message must contain at least 2 PATIENT groups/);
  });
});
