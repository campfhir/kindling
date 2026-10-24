import { describe, test, expect } from "vitest";
import { createADT_A01 } from "./ADT_A01.ts";
import { createADT_A02 } from "./ADT_A02.ts";
import { parseADT_A01 } from "../../parsers/v2.4/ADT_A01_Parser.ts";
import { parseADT_A02 } from "../../parsers/v2.4/ADT_A02_Parser.ts";
import { parseADT_A47 } from "../../parsers/v2.4/ADT_A47_Parser.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { EVN } from "../../segments/v2.4/EVN.ts";
import { PID } from "../../segments/v2.4/PID.ts";
import { PV1 } from "../../segments/v2.4/PV1.ts";
import { ROL } from "../../segments/v2.4/ROL.ts";
import { IN1 } from "../../segments/v2.4/IN1.ts";
import { IN3 } from "../../segments/v2.4/IN3.ts";
import { PDA } from "../../segments/v2.4/PDA.ts";
import { ParserUtils } from "../../types/parser.ts";

const msh = (ev: string) => new MSH().sendingApplication("ADT").messageType({ messageCode: "ADT", triggerEvent: ev });
const MSH_LINE = (ev: string) => `MSH|^~\\&|ADT|HOSP|EMR|HOSP|20231015120000||ADT^${ev}^ADT_${ev}|MSG001|P|2.4`;
const types = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("ADT_A01 (v2.4): PDA, ROLs and repeating IN3, no SFT", () => {
  test("encodes and round-trips, and the wrapper events use the v2.4 shape", () => {
    const wire = createADT_A02(msh("A02"), new EVN().eventTypeCode("A02"), new PID().setId("1"), new PV1().patientClass("I"), {
      visitRoles: [new ROL()],
      insuranceGroups: [{ insurance: new IN1().setId("1"), insuranceCertifications: [new IN3().setId("1"), new IN3().setId("2")], roles: [new ROL()] }],
      deathAndAutopsy: new PDA().deathCertifiedIndicator("Y").coronerIndicator("N"),
    }).encode();
    expect(types(wire)).toEqual(["MSH", "EVN", "PID", "PV1", "ROL", "IN1", "IN3", "IN3", "ROL", "PDA"]);
    expect(wire).toContain("ADT^A02");
    const result = parseADT_A02(wire);
    expect(result.ok).toBe(true);
    expect(result.val!.visitRoles).toHaveLength(1);
    expect(result.val!.insuranceGroups![0].insuranceCertifications).toHaveLength(2);
    expect(ParserUtils.getComponent(result.val!.deathAndAutopsy!.fields[2], 0)).toBe("Y");
    expect(result.val!.message.encode()).toBe(wire);
    expect("sftList" in result.val!).toBe(false);
  });

  test("the v2.4 shape has no SFT: an SFT segment is skipped as unsupported", () => {
    const warn = console.warn;
    const warnings: string[] = [];
    console.warn = (m: string) => warnings.push(m);
    try {
      const result = parseADT_A01([MSH_LINE("A01"), "SFT|x", "EVN|A01", "PID|1", "PV1|1|I"].join("\r"));
      expect(result.ok).toBe(true);
      expect(warnings.some((w) => w.includes("'SFT'"))).toBe(true);
    } finally {
      console.warn = warn;
    }
    expect(createADT_A01(msh("A01"), new EVN(), new PID(), new PV1()).verify().valid).toBe(true);
  });

  test("the A34-shaped events are still v2.3 in v2.4 (no PDA, no SFT)", () => {
    const result = parseADT_A47([MSH_LINE("A47"), "EVN|A47", "PID|1", "MRG|OLD"].join("\r"));
    expect(result.ok).toBe(true);
    expect("sftList" in result.val!).toBe(false);
  });
});
