/**
 * ORU^R30/R31/R32 (v2.5.1): MSH [{SFT}] PID [PD1] [ VISIT: PV1 [PV2] ] ORC OBR [{NTE}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { OBSERVATION: OBX [{NTE}] }
 * One patient and one order per message.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { ORU_R30_Parser, parseORU_R30 } from "./ORU_R30.ts";
import { parseORU_R31 } from "./ORU_R31.ts";
import { parseORU_R32 } from "./ORU_R32.ts";
import { createORU_R30 } from "../v2.5.1/ORU_R30.ts";
import { createORU_R31 } from "../v2.5.1/ORU_R31.ts";
import { createORU_R32 } from "../v2.5.1/ORU_R32.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { ORC } from "../../segments/v2.5.1/ORC.ts";
import { OBR } from "../../segments/v2.5.1/OBR.ts";
import { OBX } from "../../segments/v2.5.1/OBX.ts";
import { ParserUtils } from "../../types/parser.ts";

const MSH_LINE = (ev = "R30") => `MSH|^~\\&|POC|Lab|LIS|Hospital|20251119120000||ORU^${ev}|MSG001|P|2.5.1`;
const minimal = ["PID|1||98765^^^MRN||Smith^Jane^M", "ORC|NW|POC12345", "OBR|1|POC12345||GLUC^Glucose^LN", "OBX|1|NM|2339-0^Glucose POC^LN|1|185|mg/dL"];
const types = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("ORU_R30_Parser", () => {
  const parser = new ORU_R30_Parser();

  it("parses the minimal message: PID, ORC, OBR and one OBX", () => {
    const result = parser.parse([MSH_LINE(), ...minimal].join("\r"));
    expect(result.ok).toBe(true);
    const v = result.val!;
    expect(ParserUtils.getComponent(v.patient.fields[4], 0)).toBe("Smith");
    expect(ParserUtils.getComponent(v.commonOrder.fields[0], 0)).toBe("NW");
    expect(ParserUtils.getComponent(v.observationRequest.fields[3], 0)).toBe("GLUC");
    expect(v.observations).toHaveLength(1);
    expect(ParserUtils.getComponent(v.observations[0].observation.fields[4], 0)).toBe("185");
    expect(v.visit).toBeUndefined();
    expect(v.timings).toEqual([]);
    expect(v.notes).toEqual([]);
  });

  it("parses every optional segment and group in spec order", () => {
    const wire = [
      MSH_LINE(),
      "SFT|Vendor|1.0|POC",
      "PID|1||98765^^^MRN||Smith^Jane",
      "PD1|||CLINIC",
      "PV1|1|E|ER^5^B",
      "PV2|||Chest pain",
      "ORC|NW|POC12345",
      "OBR|1|POC12345||PANEL^Basic Panel^LN",
      "NTE|1||order note",
      "TQ1|1||||||20251119120000",
      "TQ2|1",
      "OBX|1|NM|2339-0^Glucose^LN|1|185|mg/dL",
      "NTE|1||high",
      "NTE|2||repeat",
      "OBX|2|NM|2093-3^Cholesterol^LN|1|210|mg/dL",
    ].join("\r");
    const result = parseORU_R30(wire);
    expect(result.ok).toBe(true);
    const v = result.val!;
    expect(v.software).toHaveLength(1);
    expect(v.patientDemographics).toBeTruthy();
    expect(ParserUtils.getComponent(v.visit!.fields[1], 0)).toBe("E");
    expect(v.visitDetails).toBeTruthy();
    expect(v.notes).toHaveLength(1);
    expect(v.timings).toHaveLength(1);
    expect(v.timings![0].timingRelationships).toHaveLength(1);
    expect(v.observations.map((o) => o.notes!.length)).toEqual([2, 0]);
    expect(v.message.segments).toHaveLength(15);
    expect(v.message.encode()).toBe(wire);
  });

  it("R31 and R32 parse under their own names", () => {
    expect(parseORU_R31([MSH_LINE("R31"), ...minimal].join("\r")).val!.header.encode()).toContain("ORU^R31");
    expect(parseORU_R32([MSH_LINE("R32"), ...minimal].join("\r")).ok).toBe(true);
    expect(parseORU_R31([MSH_LINE("R31")].join("\r")).err!.message).toBe("ORU_R31 message must contain a PID segment");
  });

  it.each([
    [["ORC|NW|1", "OBR|1", "OBX|1"], "ORU_R30 message must contain a PID segment"],
    [["PID|1", "OBR|1", "OBX|1"], "ORU_R30 message must contain an ORC segment"],
    [["PID|1", "ORC|NW|1", "OBX|1"], "ORU_R30 message must contain an OBR segment"],
    [["PID|1", "ORC|NW|1", "OBR|1"], "ORU_R30 message must contain at least one OBX segment"],
    [["PID|1", "PV2|1", "ORC|NW|1", "OBR|1", "OBX|1"], "ORU_R30 message must contain an ORC segment"],
    [[...minimal, "PID|2", "ORC|NW|2", "OBR|2", "OBX|1"], "PID segment at line 6 is not allowed at this position in ORU_R30"],
    [[...minimal, "ORC|NW|2", "OBR|2", "OBX|1"], "ORC segment at line 6 is not allowed at this position in ORU_R30"],
    [["PID|1", "ORC|NW|1", "OBR|1", "NTE|1", "TQ2|1", "OBX|1"], "ORU_R30 message must contain at least one OBX segment"],
  ])("rejects %j", (lines, message) => {
    const result = parseORU_R30([MSH_LINE(), ...lines].join("\r"));
    expect(result.ok).toBe(false);
    expect(result.err!.message).toBe(message);
  });

  it("rejects an empty message and one that does not start with MSH", () => {
    expect(parseORU_R30("").err!.message).toBe("Empty message");
    expect(parseORU_R30(minimal.join("\r")).err!.message).toBe("Message must start with MSH segment");
  });

  it.each(["\r", "\n", "\r\n"])("accepts %j line endings", (sep) => {
    const result = parseORU_R30([MSH_LINE(), ...minimal].join(sep));
    expect(result.ok).toBe(true);
    expect(result.val!.observations).toHaveLength(1);
  });

  it("round-trips a built message through R30, R31 and R32", () => {
    const build = (create: typeof createORU_R30, ev: string) =>
      create(
        new MSH().sendingApplication("POC").messageType({ messageCode: "ORU", triggerEvent: ev }).messageControlId("1"),
        new PID().setId("1").patientName({ familyName: "Smith", givenName: "Jane" }),
        new ORC().orderControl("NW").placerOrderNumber("POC1"),
        new OBR().setId("1").universalServiceIdentifier({ identifier: "GLUC", text: "Glucose", nameOfCodingSystem: "LN" }),
        [{ observation: new OBX().setId("1").valueType("NM").observationValue("185") }],
        { visit: new PV1().patientClass("E") },
      ).encode();
    for (const [create, parse, ev] of [
      [createORU_R30, parseORU_R30, "R30"],
      [createORU_R31, parseORU_R31, "R31"],
      [createORU_R32, parseORU_R32, "R32"],
    ] as const) {
      const wire = build(create, ev);
      expect(types(wire)).toEqual(["MSH", "PID", "PV1", "ORC", "OBR", "OBX"]);
      const result = parse(wire);
      expect(result.ok).toBe(true);
      expect(result.val!.message.encode()).toBe(wire);
      expect(ParserUtils.getComponent(result.val!.observations[0].observation.fields[4], 0)).toBe("185");
    }
  });
});

// ---------------------------------------------------------------------------
// Integration tests — parse validated example .hl7 files
// ---------------------------------------------------------------------------

const testDataDir = join(import.meta.dirname, "..", "testdata", "ORU_R30");
const testFiles = readdirSync(testDataDir).filter((f) => f.endsWith(".hl7"));
const read = (file: string) => readFileSync(join(testDataDir, file), "utf-8");

describe("ORU_R30 Integration Tests - validated example messages", () => {
  for (const testFile of testFiles) {
    it(`parses and round-trips ${testFile}`, () => {
      const result = parseORU_R30(read(testFile));
      expect(result.ok, `Failed to parse ${testFile}: ${result.err?.message}`).toBe(true);
      const v = result.val!;
      expect(v.header.getMessageType().messageCode).toBe("ORU");
      expect(v.patient).toBeTruthy();
      expect(v.visit).toBeTruthy();
      expect(v.commonOrder).toBeTruthy();
      expect(v.observations.length, `No OBX in ${testFile}`).toBeGreaterThan(0);

      const again = parseORU_R30(v.message.encode());
      expect(again.ok, `Round-trip failed for ${testFile}: ${again.err?.message}`).toBe(true);
      expect(again.val!.observations).toHaveLength(v.observations.length);
    });
  }

  it.each([
    ["02_blood_pressure_r30.hl7", 2],
    ["06_arterial_blood_gas_r32.hl7", 6],
    ["11_multiple_vitals_r30.hl7", 7],
  ])("%s has at least %i observations", (file, min) => {
    const result = parseORU_R30(read(file));
    expect(result.ok).toBe(true);
    expect(result.val!.observations.length).toBeGreaterThanOrEqual(min);
  });
});
