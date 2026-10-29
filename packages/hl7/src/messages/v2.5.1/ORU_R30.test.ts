import { describe, test, expect } from "vitest";
import { createORU_R30, ORU_R30 } from "./ORU_R30.ts";
import { createORU_R31, ORU_R31 } from "./ORU_R31.ts";
import { createORU_R32, ORU_R32 } from "./ORU_R32.ts";
import { parseORU_R30 } from "../v2.5.1/ORU_R30.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PD1 } from "../../segments/v2.5.1/PD1.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { PV2 } from "../../segments/v2.5.1/PV2.ts";
import { ORC } from "../../segments/v2.5.1/ORC.ts";
import { OBR } from "../../segments/v2.5.1/OBR.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import { OBX } from "../../segments/v2.5.1/OBX.ts";

const msh = (ev = "R30") => new MSH().sendingApplication("POC").messageType({ messageCode: "ORU", triggerEvent: ev }).messageControlId("1");
const pid = () => new PID().setId("1").patientName({ familyName: "Smith", givenName: "Jane" });
const orc = () => new ORC().orderControl("NW").placerOrderNumber("POC1");
const obr = () => new OBR().setId("1").universalServiceIdentifier({ identifier: "GLUC", text: "Glucose", nameOfCodingSystem: "LN" });
const obx = (id: string, value: string) => new OBX().setId(id).valueType("NM").observationValue(value);
const types = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("ORU_R30 builder (v2.5.1)", () => {
  test("createORU_R30 returns an ORU_R30; R31 and R32 are their own classes", () => {
    expect(createORU_R30(msh(), pid(), orc(), obr(), [{ observation: obx("1", "185") }])).toBeInstanceOf(ORU_R30);
    expect(createORU_R31(msh("R31"), pid(), orc(), obr(), [{ observation: obx("1", "185") }])).toBeInstanceOf(ORU_R31);
    expect(createORU_R32(msh("R32"), pid(), orc(), obr(), [{ observation: obx("1", "185") }])).toBeInstanceOf(ORU_R32);
  });

  test("verify() requires MSH, PID, ORC, OBR and at least one observation with an OBX", () => {
    expect(new ORU_R30(null as any, null as any, null as any, null as any, []).verify().errors).toEqual([
      "MSH segment is required",
      "PID segment is required",
      "ORC segment is required",
      "OBR segment is required",
      "At least one OBSERVATION group (OBX) is required",
    ]);
    const noObx = createORU_R30(msh(), pid(), orc(), obr(), [{ observation: obx("1", "1") }, { notes: [new NTE()] } as any]);
    expect(noObx.verify().errors).toEqual(["OBSERVATION group 2: OBX segment is required"]);
    expect(() => noObx.encode()).toThrow(/Cannot encode invalid ORU_R30 message/);
    expect(() => createORU_R31(msh("R31"), pid(), orc(), obr(), []).encode()).toThrow(/Cannot encode invalid ORU_R31 message/);
  });

  test("encodes the minimal message", () => {
    const wire = createORU_R30(msh(), pid(), orc(), obr(), [{ observation: obx("1", "185") }]).encode();
    expect(types(wire)).toEqual(["MSH", "PID", "ORC", "OBR", "OBX"]);
    expect(wire).toContain("ORU^R30");
  });

  test("encodes every optional segment and group in spec order and round-trips", () => {
    const wire = createORU_R30(msh(), pid(), orc(), obr(), [
      { observation: obx("1", "185"), notes: [new NTE().setId("1").comment("high"), new NTE().setId("2").comment("repeat")] },
      { observation: obx("2", "210") },
    ], {
      software: [new SFT().softwareVendorOrganization("Kindling")],
      patientDemographics: new PD1(),
      visit: new PV1().patientClass("E"),
      visitDetails: new PV2(),
      notes: [new NTE().setId("1").comment("order note")],
      timings: [{ timing: new TQ1().setId("1"), timingRelationships: [new TQ2().setId("1")] }, { timing: new TQ1().setId("2") }],
    }).encode();
    expect(types(wire)).toEqual([
      "MSH", "SFT", "PID", "PD1", "PV1", "PV2", "ORC", "OBR", "NTE", "TQ1", "TQ2", "TQ1", "OBX", "NTE", "NTE", "OBX",
    ]);
    const result = parseORU_R30(wire);
    expect(result.ok).toBe(true);
    const v = result.val!;
    expect(v.software).toHaveLength(1);
    expect(v.visitDetails).toBeTruthy();
    expect(v.notes).toHaveLength(1);
    expect(v.timings!.map((t) => t.timingRelationships!.length)).toEqual([1, 0]);
    expect(v.observations.map((o) => o.notes!.length)).toEqual([2, 0]);
    expect(v.message.encode()).toBe(wire);
  });

  test("the parsed result can be modified and rebuilt", () => {
    const parsed = parseORU_R30(createORU_R30(msh(), pid(), orc(), obr(), [{ observation: obx("1", "185") }]).encode()).val!;
    parsed.observations.push({ observation: obx("2", "190"), notes: [] });
    const rebuilt = createORU_R30(parsed.header, parsed.patient, parsed.commonOrder, parsed.observationRequest, parsed.observations, { visit: parsed.visit }).encode();
    expect(types(rebuilt)).toEqual(["MSH", "PID", "ORC", "OBR", "OBX", "OBX"]);
  });
});
