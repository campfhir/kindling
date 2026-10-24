import { describe, test, expect } from "vitest";
import { createBAR_P01, BAR_P01 } from "./BAR_P01.ts";
import { createBAR_P02 } from "./BAR_P02.ts";
import { createBAR_P06 } from "./BAR_P06.ts";
import { parseBAR_P01 } from "../../parsers/v2.3/BAR_P01_Parser.ts";
import { parseBAR_P02 } from "../../parsers/v2.3/BAR_P02_Parser.ts";
import { parseBAR_P05 } from "../../parsers/v2.3/BAR_P05_Parser.ts";
import { parseBAR_P06 } from "../../parsers/v2.3/BAR_P06_Parser.ts";
import { parseBAR_P01 as parseBAR_P01_v251 } from "../../parsers/v2.5.1/BAR_P01_Parser.ts";
import { parseBAR_P02 as parseBAR_P02_v251 } from "../../parsers/v2.5.1/BAR_P02_Parser.ts";
import { parseBAR_P06 as parseBAR_P06_v251 } from "../../parsers/v2.5.1/BAR_P06_Parser.ts";
import { createBAR_P05 } from "./BAR_P05.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { EVN } from "../../segments/v2.3/EVN.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PD1 } from "../../segments/v2.3/PD1.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { PV2 } from "../../segments/v2.3/PV2.ts";
import { DB1 } from "../../segments/v2.3/DB1.ts";
import { OBX } from "../../segments/v2.3/OBX.ts";
import { AL1 } from "../../segments/v2.3/AL1.ts";
import { DG1 } from "../../segments/v2.3/DG1.ts";
import { DRG } from "../../segments/v2.3/DRG.ts";
import { PR1 } from "../../segments/v2.3/PR1.ts";
import { ROL } from "../../segments/v2.3/ROL.ts";
import { GT1 } from "../../segments/v2.3/GT1.ts";
import { NK1 } from "../../segments/v2.3/NK1.ts";
import { IN1 } from "../../segments/v2.3/IN1.ts";
import { IN2 } from "../../segments/v2.3/IN2.ts";
import { IN3 } from "../../segments/v2.3/IN3.ts";
import { ACC } from "../../segments/v2.3/ACC.ts";
import { UB1 } from "../../segments/v2.3/UB1.ts";
import { UB2 } from "../../segments/v2.3/UB2.ts";

const msh = (ev: string) => new MSH().sendingApplication("ADT").messageType({ messageCode: "BAR", triggerEvent: ev });
const evn = (ev: string) => new EVN().eventTypeCode(ev);
const pid = (id = "1") => new PID().setId(id).patientName({ familyName: "Doe" });
const types = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));
const MSH_LINE = (ev: string) => `MSH|^~\\&|ADT|HOSP|AR|HOSP|20231015120000||BAR^${ev}^BAR_${ev}|MSG001|P|2.3`;

describe("BAR_P01 / BAR_P05 (v2.3)", () => {
  test("verify() requires the header segments and a non-empty visit", () => {
    expect(new BAR_P01(null as any, null as any, null as any, []).verify().errors).toEqual([
      "MSH segment is required", "EVN segment is required", "PID segment is required", "At least one VISIT group is required",
    ]);
    expect(createBAR_P01(msh("P01"), evn("P01"), pid(), [{}, { pv2: new PV2() }]).verify().errors).toEqual([
      "VISIT group 1 is empty", "VISIT group 2: PV2 requires PV1",
    ]);
  });

  test("encodes two visits in spec order and the parser splits them again", () => {
    const wire = createBAR_P01(msh("P01"), evn("P01"), pid(), [
      {
        pv1: new PV1().patientClass("I"), pv2: new PV2(), db1List: [new DB1().setId("1")], obxList: [new OBX().setId("1")],
        al1List: [new AL1().setId("1")], dg1List: [new DG1().setId("1"), new DG1().setId("2")], drg: new DRG(),
        procedures: [{ pr1: new PR1().setId("1"), rolList: [new ROL()] }], gt1List: [new GT1().setId("1")],
        nk1List: [new NK1().setId("1")], insurances: [{ in1: new IN1().setId("1"), in2: new IN2(), in3: new IN3().setId("1") }],
        acc: new ACC(), ub1: new UB1(), ub2: new UB2(),
      },
      { pv1: new PV1().patientClass("O"), dg1List: [new DG1().setId("1")] },
    ], { pd1: new PD1() }).encode();
    expect(types(wire)).toEqual([
      "MSH", "EVN", "PID", "PD1",
      "PV1", "PV2", "DB1", "OBX", "AL1", "DG1", "DG1", "DRG", "PR1", "ROL", "GT1", "NK1", "IN1", "IN2", "IN3", "ACC", "UB1", "UB2",
      "PV1", "DG1",
    ]);
    {
      const result = parseBAR_P01(wire);
      expect(result.ok).toBe(true);
      const v = result.val!;
      expect(v.pd1).toBeTruthy();
      expect(v.visits).toHaveLength(2);
      expect(v.visits[0].dg1List).toHaveLength(2);
      expect(v.visits[0].procedures[0].rolList).toHaveLength(1);
      expect(v.visits[0].insurances[0].in3).toBeTruthy();
      expect(v.visits[0].ub2).toBeTruthy();
      expect(v.visits[1].pv1).toBeTruthy();
      expect(v.visits[1].dg1List).toHaveLength(1);
      expect(v.visits[1].acc).toBeUndefined();
      expect(v.message.encode()).toBe(wire);
    }
    // The v2.5.1 parser (v2.5 shape, IN3 as a list) accepts the same wire message.
    const v251 = parseBAR_P01_v251(wire);
    expect(v251.ok).toBe(true);
    expect(v251.val!.visits).toHaveLength(2);
    expect(v251.val!.visits[0].insurances[0].in3List).toHaveLength(1);
    expect(v251.val!.message.encode()).toBe(wire);
  });

  test("a visit without PV1 starts at any group segment, and out-of-order segments open a new visit", () => {
    const result = parseBAR_P01([MSH_LINE("P01"), "EVN|P01", "PID|1||1||Doe", "DG1|1", "ACC|1", "DB1|1", "GT1|1", "GT1|2", "PV1|1|I"].join("\r"));
    expect(result.ok).toBe(true);
    const visits = result.val!.visits;
    expect(visits).toHaveLength(3);
    expect(visits[0].dg1List).toHaveLength(1);
    expect(visits[0].acc).toBeTruthy();
    expect(visits[1].db1List).toHaveLength(1);
    expect(visits[1].gt1List).toHaveLength(2);
    expect(visits[2].pv1).toBeTruthy();
  });

  test("P05 reuses P01 under its own name", () => {
    const wire = createBAR_P05(msh("P05"), evn("P05"), pid(), [{ pv1: new PV1().patientClass("I") }]).encode();
    expect(wire).toContain("BAR^P05");
    expect(parseBAR_P05(wire).ok).toBe(true);
    expect(parseBAR_P05([MSH_LINE("P05"), "EVN|P05", "PID|1"].join("\r")).err!.message).toMatch(/BAR_P05 message must contain at least one VISIT group segment/);
  });

  test.each([
    [["EVN|P01", "PID|1", "PV1|1|I", "PD1|1"], /PD1 segment at line 5 must directly follow PID/],
    [["EVN|P01", "PID|1", "ROL|1"], /ROL segment at line 4 must follow a PR1 segment/],
    [["EVN|P01", "PID|1", "PV1|1|I", "IN3|1"], /IN3 segment at line 5 must follow IN1 or IN2/],
    [["EVN|P01", "PV1|1|I"], /PV1 segment at line 3 must follow PID/],
  ])("rejects %j", (lines, pattern) => {
    const result = parseBAR_P01([MSH_LINE("P01"), ...lines].join("\r"));
    expect(result.ok).toBe(false);
    expect(result.err!.message).toMatch(pattern);
  });
});

describe("BAR_P02 and BAR_P06 (v2.3)", () => {
  test("P02 encodes PATIENT groups with PD1, PV1 and DB1 and round-trips", () => {
    const wire = createBAR_P02(msh("P02"), evn("P02"), [
      { pid: pid("1"), pd1: new PD1(), pv1: new PV1().patientClass("I"), db1List: [new DB1().setId("1"), new DB1().setId("2")] },
      { pid: pid("2") },
    ]).encode();
    expect(types(wire)).toEqual(["MSH", "EVN", "PID", "PD1", "PV1", "DB1", "DB1", "PID"]);
    for (const parse of [parseBAR_P02, parseBAR_P02_v251]) {
      const result = parse(wire);
      expect(result.ok).toBe(true);
      expect(result.val!.patients.map((p) => p.db1List.length)).toEqual([2, 0]);
      expect(result.val!.message.encode()).toBe(wire);
    }
    expect(parseBAR_P02([MSH_LINE("P02"), "EVN|P02", "PID|1", "PV1|1", "PV1|2"].join("\r")).err!.message).toMatch(/PV1 segment at line 5 appears more than once/);
    expect(parseBAR_P02([MSH_LINE("P02"), "EVN|P02"].join("\r")).err!.message).toMatch(/BAR_P02 message must contain at least one PID segment/);
    expect(createBAR_P02(msh("P02"), evn("P02"), []).verify().errors).toEqual(["At least one PATIENT group (PID) is required"]);
  });

  test("P06 encodes PATIENT groups with PV1 and round-trips", () => {
    const wire = createBAR_P06(msh("P06"), evn("P06"), [{ pid: pid("1"), pv1: new PV1().patientClass("I") }, { pid: pid("2") }]).encode();
    expect(types(wire)).toEqual(["MSH", "EVN", "PID", "PV1", "PID"]);
    for (const parse of [parseBAR_P06, parseBAR_P06_v251]) {
      const result = parse(wire);
      expect(result.ok).toBe(true);
      expect(result.val!.patients[1].pv1).toBeUndefined();
      expect(result.val!.message.encode()).toBe(wire);
    }
    expect(parseBAR_P06([MSH_LINE("P06"), "PID|1"].join("\r")).err!.message).toMatch(/PID segment at line 2 must follow the EVN segment/);
  });
});
