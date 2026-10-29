/**
 * MFN^M02 (v2.5, identical in v2.5.1): MSH [{SFT}] MFI { MF_STAFF: MFE STF [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}] [{NTE}] }
 */
import { describe, test, expect } from "vitest";
import { createMFN_M02 } from "./MFN_M02.ts";
import { createMFN_M02 as createMFN_M02_v251 } from "../v2.5.1/MFN_M02.ts";
import { parseMFN_M02 } from "../v2.5/MFN_M02.ts";
import { parseMFN_M02 as parseMFN_M02_v251 } from "../v2.5.1/MFN_M02.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { MFI } from "../../segments/v2.5/MFI.ts";
import { MFE } from "../../segments/v2.5/MFE.ts";
import { STF } from "../../segments/v2.5/STF.ts";
import { PRA } from "../../segments/v2.5/PRA.ts";
import { ORG } from "../../segments/v2.5/ORG.ts";
import { AFF } from "../../segments/v2.5/AFF.ts";
import { LAN } from "../../segments/v2.5/LAN.ts";
import { EDU } from "../../segments/v2.5/EDU.ts";
import { CER } from "../../segments/v2.5/CER.ts";
import { NTE } from "../../segments/v2.5/NTE.ts";
import { ParserUtils } from "../../types/parser.ts";

const msh = () => new MSH().sendingApplication("HR").messageType({ messageCode: "MFN", triggerEvent: "M02" }).messageControlId("1");
const mfi = () => new MFI().masterFileIdentifier({ identifier: "PRA" }).fileLevelEventCode("UPD").responseLevelCode("NE");
const types = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));
const MSH_LINE = "MSH|^~\\&|HR|HOSP|EMR|HOSP|20231015120000||MFN^M02^MFN_M02|MSG001|P|2.5";

describe("MFN_M02 (v2.5): staff entries with ORG, AFF, LAN, EDU, CER and NTE", () => {
  const entry = () => ({
    entry: new MFE().recordLevelEventCode("MAD").primaryKeyValue("DR1"),
    staff: new STF().primaryKeyValue({ identifier: "DR1" }),
    practitioners: [new PRA().primaryKeyValue({ identifier: "DR1" })],
    organizationUnits: [new ORG().setId("1").organizationUnitCode({ identifier: "CARD", text: "Cardiology" })],
    affiliations: [new AFF().setId("1").professionalOrganization({ organizationName: "ACC" })],
    languages: [new LAN().setId("1").languageCode({ identifier: "en" }), new LAN().setId("2").languageCode({ identifier: "es" })],
    educations: [new EDU().setId("1").academicDegree("MD").majorFieldOfStudy("MED")],
    certificates: [new CER().setId("1").subjectName("Dr One").certificateType({ code: "BOARD" })],
    notes: [new NTE().setId("1").comment("on call")],
  });

  test("encodes every list in spec order and round-trips through v2.5 and v2.5.1", () => {
    const build = (create: (...args: any[]) => { encode(): string }) =>
      create(msh(), mfi(), [entry(), { entry: new MFE().recordLevelEventCode("MAD").primaryKeyValue("DR2"), staff: new STF() }], { software: [new SFT()] }).encode();
    const wire = build(createMFN_M02);
    expect(build(createMFN_M02_v251)).toBe(wire);
    expect(types(wire)).toEqual(["MSH", "SFT", "MFI", "MFE", "STF", "PRA", "ORG", "AFF", "LAN", "LAN", "EDU", "CER", "NTE", "MFE", "STF"]);
    for (const parse of [parseMFN_M02, parseMFN_M02_v251]) {
      const result = parse(wire);
      expect(result.ok).toBe(true);
      const v = result.val!;
      expect(v.software).toHaveLength(1);
      expect(v.staffEntries).toHaveLength(2);
      const first = v.staffEntries[0];
      expect(first.practitioners).toHaveLength(1);
      expect(ParserUtils.getComponent(first.organizationUnits![0].fields[1], 1)).toBe("Cardiology");
      expect(first.affiliations).toHaveLength(1);
      expect(first.languages!.map((l) => ParserUtils.getComponent(l.fields[1], 0))).toEqual(["en", "es"]);
      expect(ParserUtils.getComponent(first.educations![0].fields[8], 0)).toBe("MED");
      expect(ParserUtils.getComponent(first.certificates![0].fields[12], 0)).toBe("Dr One");
      expect(first.notes).toHaveLength(1);
      expect(v.staffEntries[1].organizationUnits).toEqual([]);
      expect(v.message.encode()).toBe(wire);
    }
  });

  test("verify() requires MFE and STF in every entry", () => {
    const msg = createMFN_M02(msh(), mfi(), [{ entry: new MFE() } as any, { staff: new STF(), certificates: [new CER()] } as any]);
    expect(msg.verify().errors).toEqual(["MF STAFF group 1: STF segment is required", "MF STAFF group 2: MFE segment is required"]);
  });

  test.each([
    [["MFI|PRA", "MFE|MAD", "STF|1", "ORG|1", "PRA|1"], /PRA segment at line 6 is not allowed at this position in MFN_M02/],
    [["MFI|PRA", "MFE|MAD", "CER|1"], /MFN_M02 message must contain an STF segment/],
    [["MFI|PRA", "SFT|x", "MFE|MAD", "STF|1"], /MFN_M02 message must contain at least one MFE segment/],
  ])("rejects %j", (lines, pattern) => {
    const result = parseMFN_M02([MSH_LINE, ...lines].join("\r"));
    expect(result.ok).toBe(false);
    expect(result.err!.message).toMatch(pattern);
  });
});
