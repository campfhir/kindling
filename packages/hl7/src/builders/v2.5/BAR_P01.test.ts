import { describe, test, expect } from "vitest";
import { createBAR_P01 } from "./BAR_P01.ts";
import { createBAR_P05 } from "./BAR_P05.ts";
import { createBAR_P02 } from "./BAR_P02.ts";
import { createBAR_P06 } from "./BAR_P06.ts";
import { parseBAR_P01 } from "../../parsers/v2.5/BAR_P01_Parser.ts";
import { parseBAR_P05 } from "../../parsers/v2.5/BAR_P05_Parser.ts";
import { parseBAR_P02 } from "../../parsers/v2.5/BAR_P02_Parser.ts";
import { parseBAR_P06 } from "../../parsers/v2.5/BAR_P06_Parser.ts";
import { parseBAR_P01 as parseBAR_P01_v251 } from "../../parsers/v2.5.1/BAR_P01_Parser.ts";
import { parseBAR_P05 as parseBAR_P05_v251 } from "../../parsers/v2.5.1/BAR_P05_Parser.ts";
import { parseBAR_P02 as parseBAR_P02_v251 } from "../../parsers/v2.5.1/BAR_P02_Parser.ts";
import { parseBAR_P06 as parseBAR_P06_v251 } from "../../parsers/v2.5.1/BAR_P06_Parser.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { EVN } from "../../segments/v2.5/EVN.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { PD1 } from "../../segments/v2.5/PD1.ts";
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { ROL } from "../../segments/v2.5/ROL.ts";
import { DG1 } from "../../segments/v2.5/DG1.ts";
import { ABS } from "../../segments/v2.5/ABS.ts";
import { RMI } from "../../segments/v2.5/RMI.ts";

const msh = (ev: string) => new MSH().sendingApplication("ADT").messageType({ messageCode: "BAR", triggerEvent: ev });
const evn = (ev: string) => new EVN().eventTypeCode(ev);
const pid = (id = "1") => new PID().setId(id);
const sft = () => new SFT().softwareVendorOrganization("Kindling");
const types = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));
const MSH_LINE = (ev: string) => `MSH|^~\\&|ADT|HOSP|AR|HOSP|20231015120000||BAR^${ev}^BAR_${ev}|MSG001|P|2.5`;

describe("BAR (v2.5): SFT after MSH on every event", () => {
  test("P01 round-trips through v2.5 and v2.5.1", () => {
    const wire = createBAR_P01(msh("P01"), evn("P01"), pid(), [{ visit: new PV1().patientClass("I"), visitRoles: [new ROL()], diagnoses: [new DG1()] }], { software: [sft()], patientDemographics: new PD1(), roles: [new ROL()] }).encode();
    expect(types(wire)).toEqual(["MSH", "SFT", "EVN", "PID", "PD1", "ROL", "PV1", "ROL", "DG1"]);
    for (const parse of [parseBAR_P01, parseBAR_P01_v251]) {
      const result = parse(wire);
      expect(result.ok).toBe(true);
      expect(result.val!.software).toHaveLength(1);
      expect(result.val!.roles).toHaveLength(1);
      expect(result.val!.visits[0].visitRoles).toHaveLength(1);
      expect(result.val!.message.encode()).toBe(wire);
    }
    expect(parseBAR_P01([MSH_LINE("P01"), "EVN|P01", "SFT|x", "PID|1", "PV1|1"].join("\r")).err!.message).toMatch(/BAR_P01 message must contain a PID segment/);
  });

  test("P05 round-trips with ABS/BLC/RMI through v2.5 and v2.5.1", () => {
    const wire = createBAR_P05(msh("P05"), evn("P05"), pid(), [{ visit: new PV1().patientClass("I"), abstract: new ABS().stillbornIndicator("N"), riskManagementIncident: new RMI() }], { software: [sft()] }).encode();
    expect(types(wire)).toEqual(["MSH", "SFT", "EVN", "PID", "PV1", "ABS", "RMI"]);
    for (const parse of [parseBAR_P05, parseBAR_P05_v251]) {
      const result = parse(wire);
      expect(result.ok).toBe(true);
      expect(result.val!.visits[0].abstract).toBeTruthy();
      expect(result.val!.visits[0].riskManagementIncident).toBeTruthy();
      expect(result.val!.message.encode()).toBe(wire);
    }
  });

  test("P02 and P06 carry SFT", () => {
    const p02 = createBAR_P02(msh("P02"), evn("P02"), [{ patient: pid("1"), visit: new PV1().patientClass("I") }, { patient: pid("2") }], { software: [sft()] }).encode();
    expect(types(p02)).toEqual(["MSH", "SFT", "EVN", "PID", "PV1", "PID"]);
    for (const parse of [parseBAR_P02, parseBAR_P02_v251]) {
      expect(parse(p02).val!.software).toHaveLength(1);
      expect(parse(p02).val!.patients).toHaveLength(2);
    }
    const p06 = createBAR_P06(msh("P06"), evn("P06"), [{ patient: pid("1") }], { software: [sft(), sft()] }).encode();
    expect(types(p06)).toEqual(["MSH", "SFT", "SFT", "EVN", "PID"]);
    for (const parse of [parseBAR_P06, parseBAR_P06_v251]) {
      expect(parse(p06).val!.software).toHaveLength(2);
      expect(parse(p06).val!.message.encode()).toBe(p06);
    }
    expect(parseBAR_P06([MSH_LINE("P06"), "EVN|P06", "SFT|x", "PID|1"].join("\r")).err!.message).toMatch(/BAR_P06 message must contain at least one PID segment/);
  });
});
