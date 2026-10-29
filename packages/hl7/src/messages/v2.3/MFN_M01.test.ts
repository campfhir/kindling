/** The master file notifications of HL7 v2.3 other than M02: MSH MFI { MFE <record> }, the records as `entries`. */
import { describe, test, expect } from "vitest";
import { createMFN_M01, MFN_M01 } from "./MFN_M01.ts";
import { createMFN_M03 } from "./MFN_M03.ts";
import { createMFN_M04, MFN_M04 } from "./MFN_M04.ts";
import { createMFN_M05, MFN_M05 } from "./MFN_M05.ts";
import { createMFN_M06 } from "./MFN_M06.ts";
import { createMFN_M07 } from "./MFN_M07.ts";
import { createMFN_M08 } from "./MFN_M08.ts";
import { createMFN_M09, MFN_M09 } from "./MFN_M09.ts";
import { createMFN_M10 } from "./MFN_M10.ts";
import { createMFN_M11, MFN_M11 } from "./MFN_M11.ts";
import { parseMFN_M01 } from "../v2.3/MFN_M01.ts";
import { parseMFN_M03 } from "../v2.3/MFN_M03.ts";
import { parseMFN_M04 } from "../v2.3/MFN_M04.ts";
import { parseMFN_M05 } from "../v2.3/MFN_M05.ts";
import { parseMFN_M06 } from "../v2.3/MFN_M06.ts";
import { parseMFN_M07 } from "../v2.3/MFN_M07.ts";
import { parseMFN_M08 } from "../v2.3/MFN_M08.ts";
import { parseMFN_M09 } from "../v2.3/MFN_M09.ts";
import { parseMFN_M10 } from "../v2.3/MFN_M10.ts";
import { parseMFN_M11 } from "../v2.3/MFN_M11.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MFI } from "../../segments/v2.3/MFI.ts";
import { MFE } from "../../segments/v2.3/MFE.ts";
import { OM1 } from "../../segments/v2.3/OM1.ts";
import { OM2 } from "../../segments/v2.3/OM2.ts";
import { OM3 } from "../../segments/v2.3/OM3.ts";
import { OM4 } from "../../segments/v2.3/OM4.ts";
import { OM5 } from "../../segments/v2.3/OM5.ts";
import { OM6 } from "../../segments/v2.3/OM6.ts";
import { CDM } from "../../segments/v2.3/CDM.ts";
import { PRC } from "../../segments/v2.3/PRC.ts";
import { LOC } from "../../segments/v2.3/LOC.ts";
import { LCH } from "../../segments/v2.3/LCH.ts";
import { LRL } from "../../segments/v2.3/LRL.ts";
import { LDP } from "../../segments/v2.3/LDP.ts";
import { LCC } from "../../segments/v2.3/LCC.ts";
import { CM0 } from "../../segments/v2.3/CM0.ts";
import { CM1 } from "../../segments/v2.3/CM1.ts";
import { CM2 } from "../../segments/v2.3/CM2.ts";
import { ParserUtils } from "../../types/parser.ts";

const msh = (event: string) => new MSH().messageType({ messageCode: "MFN", triggerEvent: event }).messageControlId("M1");
const mfi = (file: string) => new MFI().masterFileIdentifier({ identifier: file }).fileLevelEventCode("UPD");
const mfe = (key: string) => new MFE().recordLevelEventCode("MAD").primaryKeyValue(key);
const names = (wire: string) => wire.split("\r").map((s) => s.slice(0, 3));

describe("master file notifications (v2.3)", () => {
  test("MFN^M01 carries bare entries; MFN^M03 an OM1 per entry", () => {
    const m01 = createMFN_M01(msh("M01"), mfi("ZZZ"), [{ entry: mfe("A") }, { entry: mfe("B") }]);
    expect(m01).toBeInstanceOf(MFN_M01);
    expect(names(m01.encode())).toEqual(["MSH", "MFI", "MFE", "MFE"]);
    const parsed = parseMFN_M01(m01.encode()).val!;
    expect(parsed.entries).toHaveLength(2);
    expect(ParserUtils.getComponent(parsed.entries[1].entry.fields[3], 0)).toBe("B");
    // Site-defined Z segments after an MFE are skipped as unknown segments.
    expect(parseMFN_M01([msh("M01").encode(), "MFI|ZZZ||UPD", "MFE|MAD|||A", "ZXX|1|site data", "MFE|MAD|||B"].join("\r")).val!.entries).toHaveLength(2);

    const m03 = createMFN_M03(msh("M03"), mfi("OMA"), [{ entry: mfe("GLU"), observationDefinition: new OM1().sequenceNumber("1") }]).encode();
    expect(names(m03)).toEqual(["MSH", "MFI", "MFE", "OM1"]);
    expect(parseMFN_M03(m03).val!.entries[0].observationDefinition.name).toBe("OM1");
    // @ts-expect-error OM1 is required
    expect(createMFN_M03(msh("M03"), mfi("OMA"), [{ entry: mfe("GLU") }]).verify().errors).toEqual(["MF TEST group 1: OM1 segment is required"]);
  });

  test("MFN^M04: MFE CDM [{PRC}]", () => {
    const msg = createMFN_M04(msh("M04"), mfi("CDM"), [
      { entry: mfe("C1"), chargeDescription: new CDM(), prices: [new PRC(), new PRC()] },
      { entry: mfe("C2"), chargeDescription: new CDM() },
    ]);
    expect(msg).toBeInstanceOf(MFN_M04);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "MFI", "MFE", "CDM", "PRC", "PRC", "MFE", "CDM"]);
    const parsed = parseMFN_M04(wire).val!;
    expect(parsed.entries[0].prices).toHaveLength(2);
    expect(parsed.entries[1].prices).toEqual([]);
    expect(parsed.message.encode()).toBe(wire);
  });

  test("MFN^M05: MFE LOC [{LCH}] [{LRL}] { LDP [{LCH}] [{LCC}] }, the departments as a nested group", () => {
    const msg = createMFN_M05(msh("M05"), mfi("LOC"), [{
      entry: mfe("ICU"),
      patientLocation: new LOC(),
      locationCharacteristics: [new LCH()],
      locationRelationships: [new LRL()],
      departments: [
        { locationDepartment: new LDP(), locationCharacteristics: [new LCH(), new LCH()], locationChargeCodes: [new LCC()] },
        { locationDepartment: new LDP() },
      ],
    }]);
    expect(msg).toBeInstanceOf(MFN_M05);
    const wire = msg.encode();
    expect(names(wire)).toEqual(["MSH", "MFI", "MFE", "LOC", "LCH", "LRL", "LDP", "LCH", "LCH", "LCC", "LDP"]);
    const parsed = parseMFN_M05(wire).val!;
    expect(parsed.entries[0].locationCharacteristics).toHaveLength(1);
    expect(parsed.entries[0].departments).toHaveLength(2);
    expect(parsed.entries[0].departments[0].locationCharacteristics).toHaveLength(2);
    expect(parsed.entries[0].departments[1].locationChargeCodes).toEqual([]);
    expect(parsed.message.encode()).toBe(wire);
    // @ts-expect-error at least one department is required
    expect(createMFN_M05(msh("M05"), mfi("LOC"), [{ entry: mfe("ICU"), patientLocation: new LOC() }]).verify().errors).toEqual(["MF LOCATION group 1: At least one MF LOC DEPT group (LDP) is required"]);
  });

  test("MFN^M06 nests schedules under phases; MFN^M07 has schedules only", () => {
    const m06 = createMFN_M06(msh("M06"), mfi("CMA"), [{
      entry: mfe("S1"),
      clinicalStudy: new CM0().setId("1"),
      phases: [{ studyPhase: new CM1().setId("1"), studySchedules: [new CM2().setId("1"), new CM2().setId("2")] }, { studyPhase: new CM1().setId("2") }],
    }]).encode();
    expect(names(m06)).toEqual(["MSH", "MFI", "MFE", "CM0", "CM1", "CM2", "CM2", "CM1"]);
    const parsed = parseMFN_M06(m06).val!;
    expect(parsed.entries[0].phases).toHaveLength(2);
    expect(parsed.entries[0].phases![0].studySchedules).toHaveLength(2);

    const m07 = createMFN_M07(msh("M07"), mfi("CMB"), [{ entry: mfe("S2"), clinicalStudy: new CM0().setId("1"), studySchedules: [new CM2().setId("1")] }]).encode();
    expect(names(m07)).toEqual(["MSH", "MFI", "MFE", "CM0", "CM2"]);
    expect(parseMFN_M07(m07).val!.entries[0].studySchedules).toHaveLength(1);
    // A CM1 is not part of M07.
    expect(parseMFN_M07([...m07.split("\r"), "CM1|1"].join("\r")).val!.message.segments.map((s) => s.name)).not.toContain("CM1");
  });

  test("MFN^M08–M11 carry OM1 and the detail segments of their kind of test", () => {
    const om1 = () => new OM1().sequenceNumber("1");
    const m08 = createMFN_M08(msh("M08"), mfi("OMA"), [{ entry: mfe("T"), observationDefinition: om1(), numericObservation: new OM2(), specimenRequirement: new OM4() }]).encode();
    expect(names(m08)).toEqual(["MSH", "MFI", "MFE", "OM1", "OM2", "OM4"]);
    expect(parseMFN_M08(m08).val!.entries[0].categoricalObservation).toBeUndefined();
    expect(parseMFN_M08(m08).val!.entries[0].specimenRequirement!.name).toBe("OM4");

    const m09 = createMFN_M09(msh("M09"), mfi("OMB"), [{ entry: mfe("T"), observationDefinition: om1(), categoricalObservation: new OM3(), specimenRequirements: [new OM4(), new OM4()] }]);
    expect(m09).toBeInstanceOf(MFN_M09);
    expect(names(m09.encode())).toEqual(["MSH", "MFI", "MFE", "OM1", "OM3", "OM4", "OM4"]);
    expect(parseMFN_M09(m09.encode()).val!.entries[0].specimenRequirements).toHaveLength(2);
    // The categorical detail is an inlined group: OM4s need their OM3 (typed optional, checked by verify()).
    expect(createMFN_M09(msh("M09"), mfi("OMB"), [{ entry: mfe("T"), observationDefinition: om1(), specimenRequirements: [new OM4()] }]).verify().errors).toEqual(["MF TEST CATEGORICAL group 1: OM3 segment is required"]);

    const m10 = createMFN_M10(msh("M10"), mfi("OMC"), [{ entry: mfe("T"), observationDefinition: om1(), observationBattery: new OM5(), specimenRequirements: [new OM4()] }]).encode();
    expect(names(m10)).toEqual(["MSH", "MFI", "MFE", "OM1", "OM5", "OM4"]);
    expect(parseMFN_M10(m10).val!.entries[0].observationBattery!.name).toBe("OM5");

    const m11 = createMFN_M11(msh("M11"), mfi("OMD"), [{ entry: mfe("T"), observationDefinition: om1(), calculatedObservation: new OM6(), numericObservation: new OM2() }]);
    expect(m11).toBeInstanceOf(MFN_M11);
    expect(names(m11.encode())).toEqual(["MSH", "MFI", "MFE", "OM1", "OM6", "OM2"]);
    expect(parseMFN_M11(m11.encode()).val!.entries[0].numericObservation!.name).toBe("OM2");
    expect(createMFN_M11(msh("M11"), mfi("OMD"), [{ entry: mfe("T"), observationDefinition: om1(), calculatedObservation: new OM6() }]).verify().errors).toEqual(["MF TEST CALCULATED group 1: OM2 segment is required"]);
    expect(parseMFN_M11([msh("M11").encode(), "MFI|OMD||UPD", "MFE|MAD|||T", "OM1|1", "OM6|1"].join("\r")).err!.message).toBe("MFN_M11 message must contain an OM2 segment");
  });

  test("verify() requires MFI and at least one entry", () => {
    // @ts-expect-error missing required segments
    expect(new MFN_M04(msh("M04"), undefined, []).verify().errors).toEqual(["MFI segment is required", "At least one MF CDM group (MFE) is required"]);
  });
});
