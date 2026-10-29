/** MFR^Mnn (v2.3): MSH MSA [ERR] QRD [QRF] MFI { MFE <record> } [DSC]; the record is typed for M02, M04–M07 and generic otherwise. */
import { describe, test, expect } from "vitest";
import { createMFR_M01, MFR_M01 } from "./MFR_M01.ts";
import { createMFR_M03 } from "./MFR_M03.ts";
import { createMFR_M08 } from "./MFR_M08.ts";
import { createMFR_M02, MFR_M02 } from "./MFR_M02.ts";
import { createMFR_M04 } from "./MFR_M04.ts";
import { createMFR_M05 } from "./MFR_M05.ts";
import { createMFR_M06 } from "./MFR_M06.ts";
import { createMFR_M07 } from "./MFR_M07.ts";
import { parseMFR_M01 } from "../v2.3/MFR_M01.ts";
import { parseMFR_M02 } from "../v2.3/MFR_M02.ts";
import { parseMFR_M04 } from "../v2.3/MFR_M04.ts";
import { parseMFR_M05 } from "../v2.3/MFR_M05.ts";
import { parseMFR_M06 } from "../v2.3/MFR_M06.ts";
import { parseMFR_M07 } from "../v2.3/MFR_M07.ts";
import { parseMFR_M11 } from "../v2.3/MFR_M11.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { QRD } from "../../segments/v2.3/QRD.ts";
import { QRF } from "../../segments/v2.3/QRF.ts";
import { MFI } from "../../segments/v2.3/MFI.ts";
import { MFE } from "../../segments/v2.3/MFE.ts";
import { STF } from "../../segments/v2.3/STF.ts";
import { PRA } from "../../segments/v2.3/PRA.ts";
import { CDM } from "../../segments/v2.3/CDM.ts";
import { PRC } from "../../segments/v2.3/PRC.ts";
import { LOC } from "../../segments/v2.3/LOC.ts";
import { LDP } from "../../segments/v2.3/LDP.ts";
import { LCH } from "../../segments/v2.3/LCH.ts";
import { CM0 } from "../../segments/v2.3/CM0.ts";
import { CM1 } from "../../segments/v2.3/CM1.ts";
import { CM2 } from "../../segments/v2.3/CM2.ts";
import { DSC } from "../../segments/v2.3/DSC.ts";

const msh = (event: string) => new MSH().messageType({ messageCode: "MFR", triggerEvent: event }).messageControlId("R1");
const msa = () => new MSA().acknowledgmentCode("AA").messageControlId("Q1");
const qrd = () => new QRD().queryFormatCode("R").queryPriority("I").queryId("Q1").whatSubjectFilter({ code: "MFQ" });
const mfi = (file: string) => new MFI().masterFileIdentifier({ identifier: file }).fileLevelEventCode("UPD");
const mfe = (key: string) => new MFE().recordLevelEventCode("MAD").primaryKeyValue(key);
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("MFR (v2.3)", () => {
  test("M01 answers with bare entries; M03 and M08–M11 wrap it", () => {
    const msg = createMFR_M01(msh("M01"), msa(), qrd(), mfi("ZZZ"), [{ entry: mfe("A") }], { queryFilter: new QRF().whereSubjectFilter("X"), continuation: new DSC().continuationPointer("P2") });
    expect(msg).toBeInstanceOf(MFR_M01);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "MSA", "QRD", "QRF", "MFI", "MFE", "DSC"]);
    const parsed = parseMFR_M01(wire).val!;
    expect(parsed.entries).toHaveLength(1);
    expect(parsed.continuation!.name).toBe("DSC");
    expect(parsed.message.encode()).toBe(wire);
    expect(createMFR_M03(msh("M03"), msa(), qrd(), mfi("OMA"), [])).toBeInstanceOf(MFR_M01);
    expect(createMFR_M08(msh("M08"), msa(), qrd(), mfi("OMA"), [])).toBeInstanceOf(MFR_M01);
    expect(parseMFR_M11([msh("M11").encode(), "MSA|AA|Q1", "QRD|||R|I|Q1", "MFI|OMD||UPD"].join("\r")).err!.message).toBe("MFR_M11 message must contain at least one MFE segment");
  });

  test("M02, M04, M05, M06 and M07 carry the records of their master file", () => {
    const m02 = createMFR_M02(msh("M02"), msa(), qrd(), mfi("PRA"), [{ entry: mfe("D1"), staff: new STF(), practitioner: new PRA() }]);
    expect(m02).toBeInstanceOf(MFR_M02);
    expect(m02).not.toBeInstanceOf(MFR_M01);
    expect(names(m02.encode())).toEqual(["MSH", "MSA", "QRD", "MFI", "MFE", "STF", "PRA"]);
    expect(parseMFR_M02(m02.encode()).val!.entries[0].practitioner!.name).toBe("PRA");

    const m04 = createMFR_M04(msh("M04"), msa(), qrd(), mfi("CDM"), [{ entry: mfe("C1"), chargeDescription: new CDM(), prices: [new PRC()] }]).encode();
    expect(names(m04)).toEqual(["MSH", "MSA", "QRD", "MFI", "MFE", "CDM", "PRC"]);
    expect(parseMFR_M04(m04).val!.entries[0].prices).toHaveLength(1);

    const m05 = createMFR_M05(msh("M05"), msa(), qrd(), mfi("LOC"), [{ entry: mfe("L1"), patientLocation: new LOC(), departments: [{ locationDepartment: new LDP(), locationCharacteristics: [new LCH()] }] }]).encode();
    expect(names(m05)).toEqual(["MSH", "MSA", "QRD", "MFI", "MFE", "LOC", "LDP", "LCH"]);
    expect(parseMFR_M05(m05).val!.entries[0].departments[0].locationCharacteristics).toHaveLength(1);

    const m06 = createMFR_M06(msh("M06"), msa(), qrd(), mfi("CMA"), [{ entry: mfe("S1"), clinicalStudy: new CM0().setId("1"), phases: [{ studyPhase: new CM1().setId("1"), studySchedules: [new CM2().setId("1")] }] }]).encode();
    expect(names(m06)).toEqual(["MSH", "MSA", "QRD", "MFI", "MFE", "CM0", "CM1", "CM2"]);
    expect(parseMFR_M06(m06).val!.entries[0].phases![0].studySchedules).toHaveLength(1);

    const m07 = createMFR_M07(msh("M07"), msa(), qrd(), mfi("CMB"), [{ entry: mfe("S2"), clinicalStudy: new CM0().setId("1"), studySchedules: [new CM2().setId("1")] }]).encode();
    expect(names(m07)).toEqual(["MSH", "MSA", "QRD", "MFI", "MFE", "CM0", "CM2"]);
    expect(parseMFR_M07(m07).val!.entries[0].studySchedules).toHaveLength(1);
  });

  test("verify() requires MSA, QRD, MFI and the record of each entry", () => {
    // @ts-expect-error missing required segments
    expect(new MFR_M02(msh("M02"), undefined, undefined, undefined, [{ entry: mfe("D1") }]).verify().errors).toEqual([
      "MSA segment is required",
      "QRD segment is required",
      "MFI segment is required",
      "MF QUERY group 1: STF segment is required",
    ]);
  });
});
