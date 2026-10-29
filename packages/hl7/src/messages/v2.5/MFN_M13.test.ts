/** The v2.5 master file messages: SFT everywhere, repeating ERR in MFK/MFR, MFN^M13, flattened MFR^M05/M06 records. */
import { describe, test, expect } from "vitest";
import { createMFN_M13, MFN_M13 } from "./MFN_M13.ts";
import { createMFN_M04 } from "./MFN_M04.ts";
import { createMFK_M01 } from "./MFK_M01.ts";
import { createMFK_M13 } from "./MFK_M13.ts";
import { createMFR_M05 } from "./MFR_M05.ts";
import { createMFR_M06 } from "./MFR_M06.ts";
import { parseMFN_M13 } from "../v2.5/MFN_M13.ts";
import { parseMFN_M04 } from "../v2.5/MFN_M04.ts";
import { parseMFK_M01 } from "../v2.5/MFK_M01.ts";
import { parseMFR_M05 } from "../v2.5/MFR_M05.ts";
import { parseMFR_M06 } from "../v2.5/MFR_M06.ts";
import { parseMFR_M05 as parseMFR_M05_v24 } from "../v2.4/MFR_M05.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { MSA } from "../../segments/v2.5/MSA.ts";
import { ERR } from "../../segments/v2.5/ERR.ts";
import { QRD } from "../../segments/v2.5/QRD.ts";
import { MFI } from "../../segments/v2.5/MFI.ts";
import { MFE } from "../../segments/v2.5/MFE.ts";
import { MFA } from "../../segments/v2.5/MFA.ts";
import { CDM } from "../../segments/v2.5/CDM.ts";
import { LOC } from "../../segments/v2.5/LOC.ts";
import { LCH } from "../../segments/v2.5/LCH.ts";
import { LDP } from "../../segments/v2.5/LDP.ts";
import { LCC } from "../../segments/v2.5/LCC.ts";
import { CM0 } from "../../segments/v2.5/CM0.ts";
import { CM1 } from "../../segments/v2.5/CM1.ts";
import { CM2 } from "../../segments/v2.5/CM2.ts";

const msh = (type: string, event: string) => new MSH().messageType({ messageCode: type, triggerEvent: event }).messageControlId("M1");
const sft = () => new SFT().softwareProductName("kindling");
const msa = () => new MSA().acknowledgmentCode("AA").messageControlId("Q1");
const qrd = () => new QRD().queryFormatCode("R").queryPriority("I").queryId("Q1");
const mfi = (file: string) => new MFI().masterFileIdentifier({ identifier: file }).fileLevelEventCode("UPD");
const mfe = (key: string) => new MFE().recordLevelEventCode("MAD").primaryKeyValue(key);
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("master files (v2.5)", () => {
  test("MFN^M13 is MSH [{SFT}] MFI {MFE}; the other notifications gain SFT", () => {
    const m13 = createMFN_M13(msh("MFN", "M13"), mfi("ZZZ"), [mfe("A"), mfe("B")], { software: [sft()] });
    expect(m13).toBeInstanceOf(MFN_M13);
    expect(names(m13.encode())).toEqual(["MSH", "SFT", "MFI", "MFE", "MFE"]);
    expect(parseMFN_M13(m13.encode()).val!.entries).toHaveLength(2);
    expect(createMFN_M13(msh("MFN", "M13"), mfi("ZZZ"), []).verify().errors).toEqual(["At least one MFE segment is required"]);

    const m04 = createMFN_M04(msh("MFN", "M04"), mfi("CDM"), [{ entry: mfe("C1"), chargeDescription: new CDM() }], { software: [sft()] }).encode();
    expect(names(m04)).toEqual(["MSH", "SFT", "MFI", "MFE", "CDM"]);
    expect(parseMFN_M04(m04).val!.software).toHaveLength(1);
  });

  test("MFK gains SFT and a repeating ERR; M13 wraps M01", () => {
    const wire = createMFK_M01(msh("MFK", "M01"), msa(), mfi("CDM"), { software: [sft()], errors: [new ERR(), new ERR()], entryAcknowledgments: [new MFA().recordLevelEventCode("MAD")] }).encode();
    expect(names(wire)).toEqual(["MSH", "SFT", "MSA", "ERR", "ERR", "MFI", "MFA"]);
    expect(parseMFK_M01(wire).val!.errors).toHaveLength(2);
    expect(parseMFK_M01(wire).val!.message.encode()).toBe(wire);
    expect(createMFK_M13(msh("MFK", "M13"), msa(), mfi("ZZZ")).encode()).toContain("MFI|");
  });

  test("MFR^M05 and M06 records are flat in v2.5", () => {
    const m05 = createMFR_M05(msh("MFR", "M05"), msa(), qrd(), mfi("LOC"), [{
      entry: mfe("L1"),
      patientLocation: new LOC(),
      locationCharacteristics: [new LCH()],
      locationDepartments: [new LDP(), new LDP()],
      departmentCharacteristics: [new LCH()],
      locationChargeCodes: [new LCC()],
    }], { errors: [new ERR()] }).encode();
    expect(names(m05)).toEqual(["MSH", "MSA", "ERR", "QRD", "MFI", "MFE", "LOC", "LCH", "LDP", "LDP", "LCH", "LCC"]);
    const parsed = parseMFR_M05(m05).val!;
    expect(parsed.entries[0].locationDepartments).toHaveLength(2);
    expect(parsed.entries[0].departmentCharacteristics).toHaveLength(1);
    expect(parsed.message.encode()).toBe(m05);
    // v2.4 nests the departments: the LCH after the second LDP belongs to that department there.
    const v24 = parseMFR_M05_v24(m05.split("\r").filter((s) => !s.startsWith("ERR")).join("\r")).val!;
    expect(v24.entries[0].departments).toHaveLength(2);
    expect(v24.entries[0].departments[1].locationCharacteristics).toHaveLength(1);

    const m06 = createMFR_M06(msh("MFR", "M06"), msa(), qrd(), mfi("CMA"), [{ entry: mfe("S1"), clinicalStudy: new CM0().setId("1"), studyPhases: [new CM1().setId("1")], studySchedules: [new CM2().setId("1")] }]).encode();
    expect(names(m06)).toEqual(["MSH", "MSA", "QRD", "MFI", "MFE", "CM0", "CM1", "CM2"]);
    expect(parseMFR_M06(m06).val!.entries[0].studyPhases).toHaveLength(1);
  });
});
