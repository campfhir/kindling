import { describe, test, expect } from "vitest";
import { createDFT_P03, DFT_P03 } from "./DFT_P03.ts";
import { parseDFT_P03 } from "./DFT_P03.ts";
import { parseDFT_P03 as parseDFT_P03_v251 } from "../v2.5.1/DFT_P03.ts";
import { MSH } from "./MSH.ts";
import { EVN } from "./EVN.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { DB1 } from "./DB1.ts";
import { OBX } from "./OBX.ts";
import { FT1 } from "./FT1.ts";
import { PR1 } from "./PR1.ts";
import { ROL } from "./ROL.ts";
import { DG1 } from "./DG1.ts";
import { DRG } from "./DRG.ts";
import { GT1 } from "./GT1.ts";
import { IN1 } from "./IN1.ts";
import { IN2 } from "./IN2.ts";
import { IN3 } from "./IN3.ts";
import { ACC } from "./ACC.ts";
import { ParserUtils } from "../types/parser.ts";

const msh = () => new MSH().sendingApplication("BILL").messageType({ messageCode: "DFT", triggerEvent: "P03" });
const evn = () => new EVN().eventTypeCode("P03");
const pid = () => new PID().setId("1").patientName({ familyName: "Doe", givenName: "John" });
const types = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));
const MSH_LINE = "MSH|^~\\&|BILL|HOSP|AR|HOSP|20231015120000||DFT^P03^DFT_P03|MSG001|P|2.3";

describe("DFT_P03 builder (v2.3)", () => {
  test("verify() requires MSH, EVN, PID and an FT1", () => {
    expect(new DFT_P03(null as any, null as any, null as any, []).verify().errors).toEqual([
      "MSH segment is required", "EVN segment is required", "PID segment is required", "At least one FINANCIAL group (FT1) is required",
    ]);
    expect(createDFT_P03(msh(), evn(), pid(), [{ transaction: new FT1().setId("1") }], { visitDetails: new PV2() }).verify().errors).toEqual([]);
    expect(createDFT_P03(msh(), evn(), pid(), [{} as any]).verify().errors).toEqual(["FINANCIAL group 1: FT1 segment is required"]);
  });

  test("encodes every group in spec order and round-trips", () => {
    const wire = createDFT_P03(msh(), evn(), pid(), [
      { transaction: new FT1().setId("1"), procedures: [{ procedure: new PR1().setId("1"), roles: [new ROL()] }, { procedure: new PR1().setId("2") }] },
      { transaction: new FT1().setId("2") },
    ], {
      patientDemographics: new PD1(), visit: new PV1().patientClass("O"), visitDetails: new PV2(), disabilities: [new DB1().setId("1")], observations: [new OBX().setId("1")],
      diagnoses: [new DG1().setId("1")], diagnosisRelatedGroup: new DRG(), guarantors: [new GT1().setId("1")],
      insurances: [{ insurance: new IN1().setId("1"), insuranceDetails: new IN2(), insuranceCertification: new IN3().setId("1") }, { insurance: new IN1().setId("2") }], accident: new ACC(),
    }).encode();
    expect(types(wire)).toEqual([
      "MSH", "EVN", "PID", "PD1", "PV1", "PV2", "DB1", "OBX",
      "FT1", "PR1", "ROL", "PR1", "FT1",
      "DG1", "DRG", "GT1", "IN1", "IN2", "IN3", "IN1", "ACC",
    ]);
    {
      const result = parseDFT_P03(wire);
      expect(result.ok).toBe(true);
      const v = result.val!;
      expect(ParserUtils.getComponent(v.patient.fields[4], 0)).toBe("Doe");
      expect(v.financials).toHaveLength(2);
      expect(v.financials[0].procedures).toHaveLength(2);
      expect(v.financials[0].procedures![0].roles).toHaveLength(1);
      expect(v.financials[1].procedures).toHaveLength(0);
      expect(v.insurances).toHaveLength(2);
      expect(v.insurances![0].insuranceCertification).toBeTruthy();
      expect(v.insurances![1].insuranceDetails).toBeUndefined();
      expect(v.accident).toBeTruthy();
      expect(v.message.encode()).toBe(wire);
    }
    // The v2.5.1 parser (v2.5 structure) also accepts a v2.3 wire message; IN3 is a list there.
    const v251 = parseDFT_P03_v251(wire);
    expect(v251.ok).toBe(true);
    expect(v251.val!.financials).toHaveLength(2);
    expect(v251.val!.insurances![0].insuranceCertifications).toHaveLength(1);
    expect(v251.val!.message.encode()).toBe(wire);
  });
});

describe("parseDFT_P03 (v2.3)", () => {
  test("parses a minimal wire message", () => {
    const result = parseDFT_P03([MSH_LINE, "EVN|P03|20231015120000", "PID|1||12345^^^MRN^MR||Doe^John", "FT1|1||||20231015|20231015|CG|Office visit"].join("\r"));
    expect(result.ok).toBe(true);
    expect(result.val!.financials).toHaveLength(1);
    expect(result.val!.visit).toBeUndefined();
  });

  test.each([
    [["EVN|P03", "PID|1"], /must contain at least one FT1 segment/],
    [["EVN|P03", "PID|1", "FT1|1", "PV1|1|O"], /PV1 segment at line 5 is not allowed at this position in DFT_P03/],
    [["EVN|P03", "PID|1", "FT1|1", "DG1|1", "FT1|2"], /FT1 segment at line 6 is not allowed at this position in DFT_P03/],
    [["EVN|P03", "PID|1", "PR1|1", "FT1|1"], /must contain at least one FT1 segment/],
    [["EVN|P03", "PID|1", "FT1|1", "ROL|1"], /ROL segment at line 5 is not allowed at this position in DFT_P03/],
    [["EVN|P03", "PID|1", "FT1|1", "IN2|1"], /IN2 segment at line 5 is not allowed at this position in DFT_P03/],
    [["EVN|P03", "PID|1", "FT1|1", "IN1|1", "IN3|1", "IN2|1"], /IN2 segment at line 7 is not allowed at this position in DFT_P03/],
    [["EVN|P03", "PID|1", "FT1|1", "ACC|1", "ACC|2"], /ACC segment at line 6 is not allowed at this position in DFT_P03/],
  ])("rejects %j", (lines, pattern) => {
    const result = parseDFT_P03([MSH_LINE, ...lines].join("\r"));
    expect(result.ok).toBe(false);
    expect(result.err!.message).toMatch(pattern);
  });
});
