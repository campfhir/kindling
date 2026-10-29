import { describe, test, expect } from "vitest";
import { createDFT_P03, DFT_P03 } from "./DFT_P03.ts";
import { parseDFT_P03 } from "./DFT_P03.ts";
import { parseDFT_P03 as parseDFT_P03_v251 } from "../v2.5.1/DFT_P03.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { EVN } from "./EVN.ts";
import { PID } from "./PID.ts";
import { ROL } from "./ROL.ts";
import { PV1 } from "./PV1.ts";
import { ORC } from "./ORC.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { OBR } from "./OBR.ts";
import { NTE } from "./NTE.ts";
import { OBX } from "./OBX.ts";
import { FT1 } from "./FT1.ts";
import { PR1 } from "./PR1.ts";
import { IN1 } from "./IN1.ts";
import { IN3 } from "./IN3.ts";

const msh = () => new MSH().sendingApplication("BILL").messageType({ messageCode: "DFT", triggerEvent: "P03" });
const evn = () => new EVN().eventTypeCode("P03");
const pid = () => new PID().setId("1").patientName({ familyName: "Doe" });
const types = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));
const MSH_LINE = "MSH|^~\\&|BILL|HOSP|AR|HOSP|20231015120000||DFT^P03^DFT_P03|MSG001|P|2.5";

describe("DFT_P03 (v2.5): SFT, ROLs, order groups, FT1 notes, repeating IN3", () => {
  test("encodes the full structure in spec order and round-trips through v2.5 and v2.5.1", () => {
    const wire = createDFT_P03(msh(), evn(), pid(), [
      {
        transaction: new FT1().setId("1"),
        note: new NTE().setId("1").comment("charge note"),
        procedures: [{ procedure: new PR1().setId("1"), roles: [new ROL()] }],
        orders: [{ commonOrder: new ORC().orderControl("NW"), observationRequest: new OBR().setId("1"), observations: [{ observation: new OBX().setId("1"), notes: [new NTE().setId("1")] }] }],
      },
      { transaction: new FT1().setId("2") },
    ], {
      software: [new SFT()],
      roles: [new ROL()],
      visit: new PV1().patientClass("O"),
      visitRoles: [new ROL()],
      orders: [
        { commonOrder: new ORC().orderControl("NW"), timings: [{ timing: new TQ1().setId("1"), timingRelationships: [new TQ2().setId("1")] }], observationRequest: new OBR().setId("1"), notes: [new NTE().setId("1")] },
        // A second group must start with ORC/TQ1 to be distinguishable from the first group's observations.
        { commonOrder: new ORC().orderControl("SC"), observations: [{ observation: new OBX().setId("1") }, { observation: new OBX().setId("2") }] },
      ],
      insurances: [{ insurance: new IN1().setId("1"), insuranceCertifications: [new IN3().setId("1"), new IN3().setId("2")], roles: [new ROL()] }],
    }).encode();
    expect(types(wire)).toEqual([
      "MSH", "SFT", "EVN", "PID", "ROL", "PV1", "ROL",
      "ORC", "TQ1", "TQ2", "OBR", "NTE", "ORC", "OBX", "OBX",
      "FT1", "NTE", "PR1", "ROL", "ORC", "OBR", "OBX", "NTE",
      "FT1",
      "IN1", "IN3", "IN3", "ROL",
    ]);
    for (const parse of [parseDFT_P03, parseDFT_P03_v251]) {
      const result = parse(wire);
      expect(result.ok).toBe(true);
      const v = result.val!;
      expect(v.software).toHaveLength(1);
      expect(v.roles).toHaveLength(1);
      expect(v.visitRoles).toHaveLength(1);
      expect(v.orders).toHaveLength(2);
      expect(v.orders![0].timings![0].timingRelationships).toHaveLength(1);
      expect(v.orders![0].notes).toHaveLength(1);
      expect(v.orders![1].commonOrder).toBeTruthy();
      expect(v.orders![1].observationRequest).toBeUndefined();
      expect(v.orders![1].observations).toHaveLength(2);
      expect(v.financials).toHaveLength(2);
      expect(v.financials[0].note).toBeTruthy();
      expect(v.financials[0].procedures![0].roles).toHaveLength(1);
      expect(v.financials[0].orders).toHaveLength(1);
      expect(v.financials[0].orders![0].observations![0].notes).toHaveLength(1);
      expect(v.financials[1].orders).toHaveLength(0);
      expect(v.insurances![0].insuranceCertifications).toHaveLength(2);
      expect(v.insurances![0].roles).toHaveLength(1);
      expect(v.message.encode()).toBe(wire);
    }
  });

  test("verify() rejects empty order groups and notes without OBR", () => {
    const msg = new DFT_P03(msh(), evn(), pid(), [{ transaction: new FT1(), orders: [{}] }], { orders: [{}] });
    expect(msg.verify().errors).toEqual(["COMMON ORDER group 1 is empty", "FINANCIAL group 1: FINANCIAL COMMON ORDER group 1 is empty"]);
    expect(createDFT_P03(msh(), evn(), pid(), [{ transaction: new FT1() }], { orders: [{ commonOrder: new ORC(), notes: [new NTE()] }] }).verify().errors)
      .toEqual(["COMMON ORDER group 1: OBR segment is required"]);
  });

  const body = ["EVN|P03", "PID|1||1||Doe"];
  test.each([
    [["ORC|NW", "FT1|1", "ORC|NW", "OBR|1", "PR1|1"], /PR1 segment at line 8 is not allowed at this position in DFT_P03/],
    [["TQ2|1", "FT1|1"], /DFT_P03 message must contain at least one FT1 segment/],
    [["NTE|1", "FT1|1"], /DFT_P03 message must contain at least one FT1 segment/],
    [["FT1|1", "NTE|1", "NTE|2"], /NTE segment at line 6 is not allowed at this position in DFT_P03/],
    [["FT1|1", "DG1|1", "OBX|1"], /OBX segment at line 6 is not allowed at this position in DFT_P03/],
    [["PV1|1|O", "ROL|1", "DB1|1", "ROL|2", "FT1|1"], /DFT_P03 message must contain at least one FT1 segment/],
    [["DB1|1", "PV1|1|O", "FT1|1"], /DFT_P03 message must contain at least one FT1 segment/],
  ])("rejects %j", (lines, pattern) => {
    const result = parseDFT_P03([MSH_LINE, ...body, ...lines].join("\r"));
    expect(result.ok).toBe(false);
    expect(result.err!.message).toMatch(pattern);
  });

  test("order groups split on out-of-order segments", () => {
    const result = parseDFT_P03([MSH_LINE, ...body, "ORC|NW", "OBR|1", "ORC|NW", "OBX|1", "TQ1|1", "FT1|1", "OBX|1", "OBX|2", "OBR|2"].join("\r"));
    expect(result.ok).toBe(true);
    const v = result.val!;
    expect(v.orders!.map((o) => [Boolean(o.commonOrder), Boolean(o.observationRequest), o.timings!.length, o.observations!.length])).toEqual([
      [true, true, 0, 0],
      [true, false, 0, 1],
      [false, false, 1, 0],
    ]);
    expect(v.financials[0].orders!.map((o) => [Boolean(o.observationRequest), o.observations!.length])).toEqual([[false, 2], [true, 0]]);
  });
});
