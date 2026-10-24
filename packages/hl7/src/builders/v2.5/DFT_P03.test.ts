import { describe, test, expect } from "vitest";
import { createDFT_P03, DFT_P03 } from "./DFT_P03.ts";
import { parseDFT_P03 } from "../../parsers/v2.5/DFT_P03_Parser.ts";
import { parseDFT_P03 as parseDFT_P03_v251 } from "../../parsers/v2.5.1/DFT_P03_Parser.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { EVN } from "../../segments/v2.5/EVN.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { ROL } from "../../segments/v2.5/ROL.ts";
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { ORC } from "../../segments/v2.5/ORC.ts";
import { TQ1 } from "../../segments/v2.5/TQ1.ts";
import { TQ2 } from "../../segments/v2.5/TQ2.ts";
import { OBR } from "../../segments/v2.5/OBR.ts";
import { NTE } from "../../segments/v2.5/NTE.ts";
import { OBX } from "../../segments/v2.5/OBX.ts";
import { FT1 } from "../../segments/v2.5/FT1.ts";
import { PR1 } from "../../segments/v2.5/PR1.ts";
import { IN1 } from "../../segments/v2.5/IN1.ts";
import { IN3 } from "../../segments/v2.5/IN3.ts";

const msh = () => new MSH().sendingApplication("BILL").messageType({ messageCode: "DFT", triggerEvent: "P03" });
const evn = () => new EVN().eventTypeCode("P03");
const pid = () => new PID().setId("1").patientName({ familyName: "Doe" });
const types = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));
const MSH_LINE = "MSH|^~\\&|BILL|HOSP|AR|HOSP|20231015120000||DFT^P03^DFT_P03|MSG001|P|2.5";

describe("DFT_P03 (v2.5): SFT, ROLs, order groups, FT1 notes, repeating IN3", () => {
  test("encodes the full structure in spec order and round-trips through v2.5 and v2.5.1", () => {
    const wire = createDFT_P03(msh(), evn(), pid(), [
      {
        ft1: new FT1().setId("1"),
        nte: new NTE().setId("1").comment("charge note"),
        procedures: [{ pr1: new PR1().setId("1"), rolList: [new ROL()] }],
        orders: [{ orc: new ORC().orderControl("NW"), obr: new OBR().setId("1"), observations: [{ obx: new OBX().setId("1"), nteList: [new NTE().setId("1")] }] }],
      },
      { ft1: new FT1().setId("2") },
    ], {
      sftList: [new SFT()],
      rolList: [new ROL()],
      pv1: new PV1().patientClass("O"),
      visitRolList: [new ROL()],
      orders: [
        { orc: new ORC().orderControl("NW"), timing: [{ tq1: new TQ1().setId("1"), tq2List: [new TQ2().setId("1")] }], obr: new OBR().setId("1"), obrNteList: [new NTE().setId("1")] },
        // A second group must start with ORC/TQ1 to be distinguishable from the first group's observations.
        { orc: new ORC().orderControl("SC"), observations: [{ obx: new OBX().setId("1") }, { obx: new OBX().setId("2") }] },
      ],
      insurances: [{ in1: new IN1().setId("1"), in3List: [new IN3().setId("1"), new IN3().setId("2")], rolList: [new ROL()] }],
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
      expect(v.sftList).toHaveLength(1);
      expect(v.rolList).toHaveLength(1);
      expect(v.visitRolList).toHaveLength(1);
      expect(v.orders).toHaveLength(2);
      expect(v.orders[0].timing[0].tq2List).toHaveLength(1);
      expect(v.orders[0].obrNteList).toHaveLength(1);
      expect(v.orders[1].orc).toBeTruthy();
      expect(v.orders[1].obr).toBeUndefined();
      expect(v.orders[1].observations).toHaveLength(2);
      expect(v.financials).toHaveLength(2);
      expect(v.financials[0].nte).toBeTruthy();
      expect(v.financials[0].procedures[0].rolList).toHaveLength(1);
      expect(v.financials[0].orders).toHaveLength(1);
      expect(v.financials[0].orders[0].observations[0].nteList).toHaveLength(1);
      expect(v.financials[1].orders).toHaveLength(0);
      expect(v.insurances[0].in3List).toHaveLength(2);
      expect(v.insurances[0].rolList).toHaveLength(1);
      expect(v.message.encode()).toBe(wire);
    }
  });

  test("verify() rejects empty order groups and notes without OBR", () => {
    const msg = new DFT_P03(msh(), evn(), pid(), [{ ft1: new FT1(), orders: [{}] }], { orders: [{}] });
    expect(msg.verify().errors).toEqual(["COMMON ORDER group 1 is empty", "FINANCIAL group 1 COMMON ORDER group 1 is empty"]);
    expect(createDFT_P03(msh(), evn(), pid(), [{ ft1: new FT1() }], { orders: [{ orc: new ORC(), obrNteList: [new NTE()] }] }).verify().errors)
      .toEqual(["COMMON ORDER group 1: OBR notes require an OBR"]);
  });

  const body = ["EVN|P03", "PID|1||1||Doe"];
  test.each([
    [["ORC|NW", "FT1|1", "ORC|NW", "OBR|1", "PR1|1"], /PR1 segment at line 8 must appear before the order groups of its FT1/],
    [["TQ2|1", "FT1|1"], /TQ2 segment at line 4 must follow a TQ1 segment/],
    [["NTE|1", "FT1|1"], /NTE segment at line 4 must follow FT1, an OBR or an OBX segment/],
    [["FT1|1", "NTE|1", "NTE|2"], /NTE segment at line 6 must follow FT1, an OBR or an OBX segment/],
    [["FT1|1", "DG1|1", "OBX|1"], /OBX segment at line 6 must appear before DG1, DRG, GT1, IN1 and ACC/],
    [["PV1|1|O", "ROL|1", "DB1|1", "ROL|2", "FT1|1"], /ROL segment at line 7 must follow PD1, PV1\/PV2, a PR1 or an insurance segment/],
    [["DB1|1", "PV1|1|O", "FT1|1"], /PV1 segment at line 5 must follow PID and precede DB1/],
  ])("rejects %j", (lines, pattern) => {
    const result = parseDFT_P03([MSH_LINE, ...body, ...lines].join("\r"));
    expect(result.ok).toBe(false);
    expect(result.err!.message).toMatch(pattern);
  });

  test("order groups split on out-of-order segments", () => {
    const result = parseDFT_P03([MSH_LINE, ...body, "ORC|NW", "OBR|1", "ORC|NW", "OBX|1", "TQ1|1", "FT1|1", "OBX|1", "OBX|2", "OBR|2"].join("\r"));
    expect(result.ok).toBe(true);
    const v = result.val!;
    expect(v.orders.map((o) => [Boolean(o.orc), Boolean(o.obr), o.timing.length, o.observations.length])).toEqual([
      [true, true, 0, 0],
      [true, false, 0, 1],
      [false, false, 1, 0],
    ]);
    expect(v.financials[0].orders.map((o) => [Boolean(o.obr), o.observations.length])).toEqual([[false, 2], [true, 0]]);
  });
});
