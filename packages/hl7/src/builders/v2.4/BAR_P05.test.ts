import { describe, test, expect } from "vitest";
import { createBAR_P01 } from "./BAR_P01.ts";
import { createBAR_P05 } from "./BAR_P05.ts";
import { parseBAR_P01 } from "../../parsers/v2.4/BAR_P01_Parser.ts";
import { parseBAR_P05 } from "../../parsers/v2.4/BAR_P05_Parser.ts";
import { parseBAR_P02 } from "../../parsers/v2.4/BAR_P02_Parser.ts";
import { parseBAR_P02 as parseBAR_P02_v231 } from "../../parsers/v2.3.1/BAR_P02_Parser.ts";
import { BAR_P02_STRUCTURE } from "../../structures/v2.4/BAR_P02.ts";
import { BAR_P02_STRUCTURE as BAR_P02_STRUCTURE_v231 } from "../../structures/v2.3.1/BAR_P02.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { EVN } from "../../segments/v2.4/EVN.ts";
import { PID } from "../../segments/v2.4/PID.ts";
import { PV1 } from "../../segments/v2.4/PV1.ts";
import { ROL } from "../../segments/v2.4/ROL.ts";
import { IN1 } from "../../segments/v2.4/IN1.ts";
import { IN3 } from "../../segments/v2.4/IN3.ts";
import { ABS } from "../../segments/v2.4/ABS.ts";
import { BLC } from "../../segments/v2.4/BLC.ts";
import { RMI } from "../../segments/v2.4/RMI.ts";
import { ParserUtils } from "../../types/parser.ts";

const msh = (ev: string) => new MSH().sendingApplication("ADT").messageType({ messageCode: "BAR", triggerEvent: ev });
const evn = (ev: string) => new EVN().eventTypeCode(ev);
const pid = () => new PID().setId("1");
const types = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));
const MSH_LINE = (ev: string) => `MSH|^~\\&|ADT|HOSP|AR|HOSP|20231015120000||BAR^${ev}^BAR_${ev}|MSG001|P|2.4`;

describe("BAR (v2.4): ROLs, repeating IN3, and ABS/BLC/RMI in P05", () => {
  test("P05 closes each visit with ABS, BLC and RMI", () => {
    const wire = createBAR_P05(msh("P05"), evn("P05"), pid(), [
      {
        visit: new PV1().patientClass("I"), visitRoles: [new ROL()],
        insurances: [{ insurance: new IN1().setId("1"), insuranceCertifications: [new IN3().setId("1"), new IN3().setId("2")], roles: [new ROL()] }],
        abstract: new ABS().caseCategoryCode({ identifier: "ELE", text: "Elective" }).gestationPeriodWeeks(39).stillbornIndicator("N"),
        bloodCodes: [new BLC().bloodProductCode("PRBC").bloodAmount({ quantity: 2, units: "U" }), new BLC().bloodProductCode("FFP")],
        riskManagementIncident: new RMI().riskManagementIncidentCode({ identifier: "FALL" }).dateTimeIncident("20231015120000"),
      },
      { visit: new PV1().patientClass("O"), abstract: new ABS() },
    ], { roles: [new ROL()] }).encode();
    expect(types(wire)).toEqual([
      "MSH", "EVN", "PID", "ROL",
      "PV1", "ROL", "IN1", "IN3", "IN3", "ROL", "ABS", "BLC", "BLC", "RMI",
      "PV1", "ABS",
    ]);
    const result = parseBAR_P05(wire);
    expect(result.ok).toBe(true);
    const v = result.val!;
    expect(v.roles).toHaveLength(1);
    expect(v.visits).toHaveLength(2);
    expect(v.visits[0].visitRoles).toHaveLength(1);
    expect(v.visits[0].insurances![0].insuranceCertifications).toHaveLength(2);
    expect(v.visits[0].insurances![0].roles).toHaveLength(1);
    expect(ParserUtils.getComponent(v.visits[0].abstract!.fields[8], 0)).toBe("ELE");
    expect(ParserUtils.getComponent(v.visits[0].abstract!.fields[11], 0)).toBe("39");
    expect(v.visits[0].bloodCodes).toHaveLength(2);
    expect(ParserUtils.getComponent(v.visits[0].bloodCodes![0].fields[1], 1)).toBe("U");
    expect(ParserUtils.getComponent(v.visits[0].riskManagementIncident!.fields[0], 0)).toBe("FALL");
    expect(v.visits[1].bloodCodes).toHaveLength(0);
    expect(v.message.encode()).toBe(wire);
  });

  test("P01 does not take ABS/BLC/RMI, and a second ABS starts a new visit in P05", () => {
    const p01 = createBAR_P01(msh("P01"), evn("P01"), pid(), [{ visit: new PV1().patientClass("I") }]).encode();
    expect(parseBAR_P01(p01).ok).toBe(true);
    const warn = console.warn;
    const warnings: string[] = [];
    console.warn = (m: string) => warnings.push(m);
    try {
      expect(parseBAR_P01([MSH_LINE("P01"), "EVN|P01", "PID|1", "PV1|1|I", "ABS|x"].join("\r")).ok).toBe(true);
      expect(warnings.some((w) => w.includes("'ABS'"))).toBe(true);
    } finally {
      console.warn = warn;
    }
    const twoAbs = parseBAR_P05([MSH_LINE("P05"), "EVN|P05", "PID|1", "ABS|1", "ABS|2", "RMI|1"].join("\r"));
    expect(twoAbs.ok).toBe(true);
    expect(twoAbs.val!.visits).toHaveLength(2);
    expect(twoAbs.val!.visits[1].riskManagementIncident).toBeTruthy();
  });

  test("P02 keeps its 2.3.1 structure in v2.4, generated against the 2.4 segments", () => {
    expect(parseBAR_P02).not.toBe(parseBAR_P02_v231);
    expect(BAR_P02_STRUCTURE).toEqual(BAR_P02_STRUCTURE_v231);
  });
});
