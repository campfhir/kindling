import type { MessageSchema, SegmentGroup, StructureItem } from "../../../src/types/schema";
import { group, opt, optList, req } from "../helpers";

/**
 * The master file notifications of HL7 v2.3 chapter 8 (MFN^M02 lives in MFN_M02.ts). Every message
 * is `MSH MFI { MFE <record> }`, the record being the segments of one master file; each group of
 * entries is exposed as `entries`. The same records fill the MFR^Mnn responses (see MFR_M01.ts).
 * Structures were checked on https://www.hl7.eu/HL7v2x/v23/std23/ch8.htm (sections 8.3, 8.7–8.10)
 * and https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/MFN_Mnn.
 */

/** A group of master file entries named `name`, exposed as `entries` of type `<entry>Entry`. */
export function entries(name: string, entry: string, segments: StructureItem[]): SegmentGroup {
  return group(name, "required", "repeating", segments, { as: "entries", exportTypeName: `Parsed${entry}Entry`, builderTypeName: `${entry}Entry` });
}

/** MFN^M01 record: a bare MFE (the record itself is in site-defined Z segments, which are skipped). */
export const genericEntries = (name = "MF") => entries(name, "", [req("MFE")]);
/** MFN^M03 record: MFE OM1 (the detail segments depend on the kind of test, see M08–M11). */
export const testEntries = (name = "MF_TEST") => entries(name, "Test", [req("MFE"), req("OM1")]);
/** MFN^M04 record: MFE CDM [{PRC}] */
export const chargeDescriptionEntries = (name = "MF_CDM") => entries(name, "ChargeDescription", [req("MFE"), req("CDM"), optList("PRC")]);
/** MFN^M05 record: MFE LOC [{LCH}] [{LRL}] { MF_LOC_DEPT: LDP [{LCH}] [{LCC}] }, the departments as `departments`. */
export const locationEntries = (name = "MF_LOCATION") => entries(name, "Location", [
  req("MFE"), req("LOC"), optList("LCH"), optList("LRL"),
  group("MF_LOC_DEPT", "required", "repeating", [req("LDP"), optList("LCH"), optList("LCC")], { as: "departments", exportTypeName: "ParsedLocationDepartment", builderTypeName: "LocationDepartment" }),
]);
/** MFN^M06 record: MFE CM0 [{ MF_PHASE_SCHED_DETAIL: CM1 [{CM2}] }], the phases as `phases`. */
export const clinicalStudyEntries = (name = "MF_CLIN_STUDY") => entries(name, "ClinicalStudy", [
  req("MFE"), req("CM0"),
  group("MF_PHASE_SCHED_DETAIL", "optional", "repeating", [req("CM1"), optList("CM2")], { as: "phases", exportTypeName: "ParsedStudyPhase", builderTypeName: "StudyPhase" }),
]);
/** MFN^M07 record: MFE CM0 [{CM2}] (a study without phases). */
export const clinicalStudyScheduleEntries = (name = "MF_CLIN_STUDY_SCHED") => entries(name, "ClinicalStudySchedule", [req("MFE"), req("CM0"), optList("CM2")]);
/** MFN^M08 record: MFE OM1 [OM2] [OM3] [OM4] (numeric observations). */
export const numericTestEntries = (name = "MF_TEST_NUMERIC") => entries(name, "NumericTest", [req("MFE"), req("OM1"), opt("OM2"), opt("OM3"), opt("OM4")]);
/** MFN^M09 record: MFE OM1 [ MF_TEST_CAT_DETAIL: OM3 [{OM4}] ] (categorical observations; the detail is inlined). */
export const categoricalTestEntries = (name = "MF_TEST_CATEGORICAL") => entries(name, "CategoricalTest", [
  req("MFE"), req("OM1"),
  group("MF_TEST_CAT_DETAIL", "optional", "single", [req("OM3"), optList("OM4")], { inline: true }),
]);
/** MFN^M10 record: MFE OM1 [ MF_TEST_BATT_DETAIL: OM5 [{OM4}] ] (observation batteries; the detail is inlined). */
export const batteryEntries = (name = "MF_TEST_BATTERIES") => entries(name, "Battery", [
  req("MFE"), req("OM1"),
  group("MF_TEST_BATT_DETAIL", "optional", "single", [req("OM5"), optList("OM4")], { inline: true }),
]);
/** MFN^M11 record: MFE OM1 [ MF_TEST_CALC_DETAIL: OM6 OM2 ] (calculated observations; the detail is inlined). */
export const calculatedTestEntries = (name = "MF_TEST_CALCULATED") => entries(name, "CalculatedTest", [
  req("MFE"), req("OM1"),
  group("MF_TEST_CALC_DETAIL", "optional", "single", [req("OM6"), req("OM2")], { inline: true }),
]);

const mfn = (triggerEvent: string, record: SegmentGroup): MessageSchema => ({ messageType: "MFN", triggerEvent, version: "2.3", structure: [req("MSH"), req("MFI"), record] });

/** MFN^M01 - Master File Not Otherwise Specified: MSH MFI { MF: MFE } */
export const MFN_M01_SCHEMA = mfn("M01", genericEntries());
/** MFN^M03 - Test/Observation master file: MSH MFI { MF_TEST: MFE OM1 } */
export const MFN_M03_SCHEMA = mfn("M03", testEntries());
/** MFN^M04 - Charge Description master file: MSH MFI { MF_CDM: MFE CDM [{PRC}] } */
export const MFN_M04_SCHEMA = mfn("M04", chargeDescriptionEntries());
/** MFN^M05 - Patient Location master file: MSH MFI { MF_LOCATION: MFE LOC [{LCH}] [{LRL}] { LDP [{LCH}] [{LCC}] } } */
export const MFN_M05_SCHEMA = mfn("M05", locationEntries());
/** MFN^M06 - Clinical Study with phases and schedules: MSH MFI { MF_CLIN_STUDY: MFE CM0 [{ CM1 [{CM2}] }] } */
export const MFN_M06_SCHEMA = mfn("M06", clinicalStudyEntries());
/**
 * MFN^M07 - Clinical Study without phases but with schedules: MSH MFI { MF_CLIN_STUDY_SCHED: MFE CM0 [{CM2}] }
 * (hl7.eu v2.3 section 8.10, "case 2"; Caristix shows the M06 structure for the v2.3 M07, the v2.4 one matches hl7.eu).
 */
export const MFN_M07_SCHEMA = mfn("M07", clinicalStudyScheduleEntries());
/** MFN^M08 - Test/Observation (Numeric): MSH MFI { MF_TEST_NUMERIC: MFE OM1 [OM2] [OM3] [OM4] } */
export const MFN_M08_SCHEMA = mfn("M08", numericTestEntries());
/** MFN^M09 - Test/Observation (Categorical): MSH MFI { MF_TEST_CATEGORICAL: MFE OM1 [ OM3 [{OM4}] ] } */
export const MFN_M09_SCHEMA = mfn("M09", categoricalTestEntries());
/** MFN^M10 - Test/Observation Batteries: MSH MFI { MF_TEST_BATTERIES: MFE OM1 [ OM5 [{OM4}] ] } */
export const MFN_M10_SCHEMA = mfn("M10", batteryEntries());
/** MFN^M11 - Test/Calculated Observations: MSH MFI { MF_TEST_CALCULATED: MFE OM1 [ OM6 OM2 ] } */
export const MFN_M11_SCHEMA = mfn("M11", calculatedTestEntries());

/** The v2.3 master file notifications other than M02. */
export const MFN_MESSAGES: MessageSchema[] = [
  MFN_M01_SCHEMA, MFN_M03_SCHEMA, MFN_M04_SCHEMA, MFN_M05_SCHEMA, MFN_M06_SCHEMA, MFN_M07_SCHEMA,
  MFN_M08_SCHEMA, MFN_M09_SCHEMA, MFN_M10_SCHEMA, MFN_M11_SCHEMA,
];
