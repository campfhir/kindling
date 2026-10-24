import { describe, test, expect } from "vitest";
import { parseADT_A01 } from "./ADT_A01_Parser.ts";
import { ParserUtils } from "../../types/parser.ts";

const minimalMessage = [
  "MSH|^~\\&|SEND|SFAC|RECV|RFAC|20231015120000||ADT^A01^ADT_A01|MSG001|P|2.5.1",
  "EVN|A01|20231015120000",
  "PID|1||12345^^^MRN^MR||Doe^John^Q||19800115|M",
  "PV1|1|I|WEST^101^1",
].join("\r");

const fullMessage = [
  "MSH|^~\\&|SEND|SFAC|RECV|RFAC|20231015120000||ADT^A01^ADT_A01|MSG001|P|2.5.1",
  "EVN|A01|20231015120000",
  "PID|1||12345^^^MRN^MR||Doe^John^Q||19800115|M",
  "PD1|||CLINIC^MAIN",
  "ROL|1|AD|CP|Smith^Jane",
  "NK1|1|Doe^Jane|SPO|555-1234",
  "PV1|1|I|WEST^101^1",
  "PV2|||Admitted for observation",
  "OBX|1|NM|718-7^Hemoglobin^LN|1|15.5|g/dL",
  "AL1|1|DA|PENICILLIN||RASH",
  "DG1|1|I10|Z00.00^General exam^I10",
  "PR1|1|C4|29881^Arthroscopy^C4|||20231015",
  "ROL|1|AD|CP|Jones^Mark",
  "GT1|1||Doe^John",
  "IN1|1|PPO^BlueCross^INS|BC001",
  "IN2|1|SSN12345",
  "IN3|1|AUTH001",
  "ACC|20231015|WP|Workplace",
].join("\r");

describe("parseADT_A01 — minimal message", () => {
  test("parses valid minimal message", () => {
    const result = parseADT_A01(minimalMessage);
    expect(result.ok).toBe(true);
    expect(result.val).toBeTruthy();
  });

  test("extracts MSH", () => {
    const result = parseADT_A01(minimalMessage);
    expect(result.val!.header.name).toBe("MSH");
    expect(ParserUtils.getComponent(result.val!.header.fields[1], 0)).toBe("SEND");
  });

  test("extracts EVN", () => {
    const result = parseADT_A01(minimalMessage);
    expect(result.val!.event).toBeTruthy();
    expect(result.val!.event!.name).toBe("EVN");
  });

  test("extracts PID", () => {
    const result = parseADT_A01(minimalMessage);
    expect(result.val!.patient).toBeTruthy();
    const familyName = ParserUtils.getComponent(result.val!.patient.fields[4], 0);
    expect(familyName).toBe("Doe");
  });

  test("extracts PV1", () => {
    const result = parseADT_A01(minimalMessage);
    expect(result.val!.visit).toBeTruthy();
    const patientClass = ParserUtils.getComponent(result.val!.visit!.fields[1], 0);
    expect(patientClass).toBe("I");
  });
});

describe("parseADT_A01 — optional segments", () => {
  test("extracts PD1", () => {
    const result = parseADT_A01(fullMessage);
    expect(result.val!.patientDemographics).toBeTruthy();
    expect(result.val!.patientDemographics!.name).toBe("PD1");
  });

  test("extracts patient-level ROL list", () => {
    const result = parseADT_A01(fullMessage);
    expect(result.val!.roles).toBeTruthy();
    expect(result.val!.roles!.length).toBe(1);
    expect(result.val!.roles![0].name).toBe("ROL");
  });

  test("extracts NK1 list", () => {
    const result = parseADT_A01(fullMessage);
    expect(result.val!.nextOfKin).toBeTruthy();
    expect(result.val!.nextOfKin!.length).toBe(1);
  });

  test("extracts PV2", () => {
    const result = parseADT_A01(fullMessage);
    expect(result.val!.visitDetails).toBeTruthy();
    expect(result.val!.visitDetails!.name).toBe("PV2");
  });

  test("extracts OBX list", () => {
    const result = parseADT_A01(fullMessage);
    expect(result.val!.observations).toBeTruthy();
    expect(result.val!.observations!.length).toBe(1);
  });

  test("extracts AL1 list", () => {
    const result = parseADT_A01(fullMessage);
    expect(result.val!.allergies).toBeTruthy();
    expect(result.val!.allergies!.length).toBe(1);
  });

  test("extracts DG1 list", () => {
    const result = parseADT_A01(fullMessage);
    expect(result.val!.diagnoses).toBeTruthy();
    expect(result.val!.diagnoses!.length).toBe(1);
  });

  test("extracts GT1 list", () => {
    const result = parseADT_A01(fullMessage);
    expect(result.val!.guarantors).toBeTruthy();
    expect(result.val!.guarantors!.length).toBe(1);
  });

  test("extracts ACC", () => {
    const result = parseADT_A01(fullMessage);
    expect(result.val!.accident).toBeTruthy();
    expect(result.val!.accident!.name).toBe("ACC");
  });
});

describe("parseADT_A01 — procedure groups", () => {
  test("extracts procedure group with PR1", () => {
    const result = parseADT_A01(fullMessage);
    expect(result.val!.procedures).toBeTruthy();
    expect(result.val!.procedures!.length).toBe(1);
    expect(result.val!.procedures![0].procedure.name).toBe("PR1");
  });

  test("procedure ROL belongs to procedure group, not patient-level", () => {
    const result = parseADT_A01(fullMessage);
    expect(result.val!.roles!.length).toBe(1);
    const proc = result.val!.procedures![0];
    expect(proc.roles).toBeTruthy();
    expect(proc.roles!.length).toBe(1);
  });

  test("handles multiple procedure groups", () => {
    const msg = [
      "MSH|^~\\&|SEND|SFAC|RECV|RFAC|20231015||ADT^A01^ADT_A01|MSG002|P|2.5.1",
      "EVN|A01|20231015",
      "PID|1||99999|||Smith^Jane",
      "PV1|1|I",
      "PR1|1|C4|29881^Arthroscopy^C4|||20231015",
      "PR1|2|C4|29882^Knee^C4|||20231015",
    ].join("\r");

    const result = parseADT_A01(msg);
    expect(result.ok).toBe(true);
    expect(result.val!.procedures!.length).toBe(2);
  });
});

describe("parseADT_A01 — insurance groups", () => {
  test("extracts insurance group with IN1", () => {
    const result = parseADT_A01(fullMessage);
    expect(result.val!.insuranceGroups).toBeTruthy();
    expect(result.val!.insuranceGroups!.length).toBe(1);
    expect(result.val!.insuranceGroups![0].insurance.name).toBe("IN1");
  });

  test("extracts IN2 and IN3 within insurance group", () => {
    const result = parseADT_A01(fullMessage);
    const ins = result.val!.insuranceGroups![0];
    expect(ins.insuranceDetails).toBeTruthy();
    expect(ins.insuranceCertifications).toBeTruthy();
    expect(ins.insuranceCertifications!.length).toBe(1);
  });

  test("handles multiple insurance groups", () => {
    const msg = [
      "MSH|^~\\&|SEND|SFAC|RECV|RFAC|20231015||ADT^A01^ADT_A01|MSG003|P|2.5.1",
      "EVN|A01|20231015",
      "PID|1||77777|||Jones^Bob",
      "PV1|1|I",
      "IN1|1|PPO^BlueCross^INS|BC001",
      "IN1|2|HMO^Aetna^INS|AE002",
    ].join("\r");

    const result = parseADT_A01(msg);
    expect(result.ok).toBe(true);
    expect(result.val!.insuranceGroups!.length).toBe(2);
  });
});

describe("parseADT_A01 — error cases", () => {
  test("returns error for empty message", () => {
    const result = parseADT_A01("");
    expect(result.ok).toBe(false);
  });

  test("returns error when message does not start with MSH", () => {
    const result = parseADT_A01("EVN|A01|20231015\rPID|1||12345");
    expect(result.ok).toBe(false);
    expect(result.err?.message).toContain("MSH");
  });

  test("returns error when PID is missing", () => {
    const msg = [
      "MSH|^~\\&|SEND|SFAC|RECV|RFAC|20231015||ADT^A01^ADT_A01|MSG004|P|2.5.1",
      "EVN|A01|20231015",
      "PV1|1|I",
    ].join("\r");

    const result = parseADT_A01(msg);
    expect(result.ok).toBe(false);
    expect(result.err?.message).toContain("PID");
  });
});

describe("parseADT_A01 — message object", () => {
  test("populates the HL7Message with all segments", () => {
    const result = parseADT_A01(minimalMessage);
    expect(result.val!.message).toBeTruthy();
    const segs = result.val!.message.segments;
    expect(segs.some((s) => s.name === "MSH")).toBe(true);
    expect(segs.some((s) => s.name === "PID")).toBe(true);
    expect(segs.some((s) => s.name === "PV1")).toBe(true);
  });
});
