import type { MessageSchema, SegmentGroup, StructureItem } from "../../../src/types/schema";
import { group, opt, optList, req, reqList, wrappers } from "../helpers";

/**
 * The clinical trial, product experience and application management messages of HL7 v2.3
 * (chapters 7 and 14): CRM^C01–C08 (study registration), CSU^C09–C12 (unsolicited study data),
 * PEX^P07/P08 (product experience), SUR^P09 (summary product experience report) and NMQ/NMR^N01,
 * NMD^N02 (network management).
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch7.htm (7.6, 7.9–7.11), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/CRM_C01 (and the other events; the
 * v2.3 chapter 14 page is not on hl7.eu, so NMQ/NMR/NMD rest on Caristix and HAPI v24).
 */
const schema = (messageType: string, triggerEvent: string, structure: StructureItem[], version = "2.3"): MessageSchema => ({ messageType, triggerEvent, version, structure });

/** CRM^C01 - Clinical Study Registration: MSH { PATIENT: PID [PV1] CSR [{CSP}] }; C02–C08 wrap it. */
export const CRM_C01_SCHEMA = schema("CRM", "C01", [req("MSH"), group("PATIENT", "required", "repeating", [req("PID"), opt("PV1"), req("CSR"), optList("CSP")])]);
export const CRM_FAMILY: MessageSchema[] = [CRM_C01_SCHEMA, ...wrappers(CRM_C01_SCHEMA, ["C02", "C03", "C04", "C05", "C06", "C07", "C08"])];

/** The STUDY_PHASE group of CSU: { [CSP] { STUDY_SCHEDULE: [CSS] <observations> { STUDY_PHARM: [ORC] { RX_ADMIN: RXA RXR } } } } */
export const studyPhases = (studyObservation: SegmentGroup, csp: StructureItem = opt("CSP")): SegmentGroup =>
  group("STUDY_PHASE", "required", "repeating", [
    csp,
    group("STUDY_SCHEDULE", "required", "repeating", [
      opt("CSS"),
      studyObservation,
      group("STUDY_PHARM", "required", "repeating", [opt("ORC"), group("RX_ADMIN", "required", "repeating", [req("RXA"), req("RXR")], { as: "administrations", exportTypeName: "ParsedRxAdmin", builderTypeName: "RxAdmin" })], { exportTypeName: "ParsedStudyPharm", builderTypeName: "StudyPharm" }),
    ], { exportTypeName: "ParsedStudySchedule", builderTypeName: "StudySchedule" }),
  ], { exportTypeName: "ParsedStudyPhase", builderTypeName: "StudyPhase" });
/** The STUDY_OBSERVATION group: [ORC] OBR {OBX} (optional in v2.3, required from v2.3.1). */
export const studyObservations = (usage: "required" | "optional", extra: StructureItem[] = []): SegmentGroup =>
  group("STUDY_OBSERVATION", usage, "repeating", [opt("ORC"), req("OBR"), ...extra, reqList("OBX")], { exportTypeName: "ParsedStudyObservation", builderTypeName: "StudyObservation" });
/** CSU^C09 - Unsolicited Study Data: MSH { PATIENT: PID [PD1] [{NTE}] [ VISIT: PV1 [PV2] ] CSR { STUDY_PHASE } }; C10–C12 wrap it. */
export const csu = (version: string, head: StructureItem[], studyObservation: SegmentGroup, csp?: StructureItem): MessageSchema =>
  schema("CSU", "C09", [
    ...head,
    group("PATIENT", "required", "repeating", [
      req("PID"), opt("PD1"), optList("NTE"),
      group("VISIT", "optional", "single", [req("PV1"), opt("PV2")], { inline: true }),
      req("CSR"),
      studyPhases(studyObservation, csp),
    ]),
  ], version);
export const CSU_C09_SCHEMA = csu("2.3", [req("MSH")], studyObservations("optional"));
export const CSU_EVENTS = ["C10", "C11", "C12"];
export const CSU_FAMILY: MessageSchema[] = [CSU_C09_SCHEMA, ...wrappers(CSU_C09_SCHEMA, CSU_EVENTS)];

/** The PEX_CAUSE group: PCR [ RX_ORDER: RXE [{RXR}] ] [{ RX_ADMINISTRATION: RXA [RXR] }] [{PRB}] [{OBX}] [{NTE}] [ ASSOCIATED_PERSON: NK1 ... ] [{ STUDY: CSR [{CSP}] }] */
export const pexCauses = (rxOrderExtra: StructureItem[] = [], associatedRxOrderExtra: StructureItem[] = []): SegmentGroup =>
  group("PEX_CAUSE", "required", "repeating", [
    req("PCR"),
    group("RX_ORDER", "optional", "single", [req("RXE"), ...rxOrderExtra, optList("RXR")], { as: "rxOrder", exportTypeName: "ParsedRxOrder", builderTypeName: "RxOrder" }),
    group("RX_ADMINISTRATION", "optional", "repeating", [req("RXA"), opt("RXR")], { as: "rxAdministrations", exportTypeName: "ParsedRxAdministration", builderTypeName: "RxAdministration" }),
    optList("PRB"), optList("OBX"), optList("NTE"),
    group("ASSOCIATED_PERSON", "optional", "single", [
      req("NK1"),
      group("ASSOCIATED_RX_ORDER", "optional", "single", [req("RXE"), ...associatedRxOrderExtra, optList("RXR")], { as: "rxOrder", exportTypeName: "ParsedAssociatedRxOrder", builderTypeName: "AssociatedRxOrder" }),
      group("ASSOCIATED_RX_ADMIN", "optional", "repeating", [req("RXA"), opt("RXR")], { as: "rxAdministrations", exportTypeName: "ParsedAssociatedRxAdmin", builderTypeName: "AssociatedRxAdmin" }),
      optList("PRB"), optList("OBX"),
    ], { exportTypeName: "ParsedAssociatedPerson", builderTypeName: "AssociatedPerson" }),
    group("STUDY", "optional", "repeating", [req("CSR"), optList("CSP")], { as: "studies", exportTypeName: "ParsedStudy", builderTypeName: "Study" }),
  ], { as: "causes", exportTypeName: "ParsedPexCause", builderTypeName: "PexCause" });
/** PEX^P07 - Unsolicited Initial Individual Product Experience Report: MSH EVN PID [PD1] [{NTE}] [ VISIT ] { EXPERIENCE: PES { PEX_OBSERVATION: PEO { PEX_CAUSE } } }; P08 (update) wraps it. */
export const pex = (version: string, head: StructureItem[], causes: SegmentGroup): MessageSchema =>
  schema("PEX", "P07", [
    ...head, req("EVN"), req("PID"), opt("PD1"), optList("NTE"),
    group("VISIT", "optional", "single", [req("PV1"), opt("PV2")], { inline: true }),
    group("EXPERIENCE", "required", "repeating", [
      req("PES"),
      group("PEX_OBSERVATION", "required", "repeating", [req("PEO"), causes], { as: "observations", exportTypeName: "ParsedPexObservation", builderTypeName: "PexObservation" }),
    ], { exportTypeName: "ParsedExperience", builderTypeName: "Experience" }),
  ], version);
export const PEX_P07_SCHEMA = pex("2.3", [req("MSH")], pexCauses());
export const PEX_FAMILY: MessageSchema[] = [PEX_P07_SCHEMA, ...wrappers(PEX_P07_SCHEMA, ["P08"])];

/**
 * SUR^P09 - Summary Product Experience Report: MSH { FACILITY: FAC { PRODUCT: PSH PDC } PSH { FACILITY_DETAIL: FAC PDC NTE } }
 * The standard's table ends each FACILITY with an "ED" line, which is a data type and not a segment,
 * so it is not modelled (Caristix and HAPI omit it too). Unchanged through v2.5.1.
 */
export const SUR_P09_SCHEMA = schema("SUR", "P09", [
  req("MSH"),
  group("FACILITY", "required", "repeating", [
    req("FAC"),
    group("PRODUCT", "required", "repeating", [req("PSH"), req("PDC")], { exportTypeName: "ParsedProduct", builderTypeName: "Product" }),
    req("PSH"),
    group("FACILITY_DETAIL", "required", "repeating", [req("FAC"), req("PDC"), req("NTE")], { exportTypeName: "ParsedFacilityDetail", builderTypeName: "FacilityDetail" }),
  ], { as: "facilities", exportTypeName: "ParsedFacility", builderTypeName: "Facility" }),
]);

/** NMQ^N01 - Application Management Query: MSH [ QRY_WITH_DETAIL: QRD [QRF] ] { CLOCK_AND_STATISTICS: [NCK] [NST] [NSC] } */
export const nmq = (version: string, head: StructureItem[]): MessageSchema => schema("NMQ", "N01", [
  ...head,
  group("QRY_WITH_DETAIL", "optional", "single", [req("QRD"), opt("QRF")], { inline: true }),
  group("CLOCK_AND_STATISTICS", "required", "repeating", [opt("NCK"), opt("NST"), opt("NSC")], { as: "clockAndStatistics", exportTypeName: "ParsedClockAndStatistics", builderTypeName: "ClockAndStatistics" }),
], version);
export const NMQ_N01_SCHEMA = nmq("2.3", [req("MSH")]);
/** NMR^N01 - Application Management Response: MSH MSA [{ERR}] [QRD] { [NCK] [{NTE}] [NST] [{NTE}] [NSC] [{NTE}] } (Caristix v2.3 lists ERR as repeating, v2.4 as single; hl7.eu has no v2.3 chapter 14 page). */
export const nmr = (version: string, head: StructureItem[]): MessageSchema => schema("NMR", "N01", [
  ...head, opt("QRD"),
  group("CLOCK_AND_STATS_WITH_NOTES_ALT", "required", "repeating", [opt("NCK"), optList("NTE", { as: "clockNotes" }), opt("NST"), optList("NTE", { as: "statisticsNotes" }), opt("NSC"), optList("NTE", { as: "statusNotes" })], { as: "clockAndStatistics", exportTypeName: "ParsedClockAndStatistics", builderTypeName: "ClockAndStatistics" }),
], version);
export const NMR_N01_SCHEMA = nmr("2.3", [req("MSH"), req("MSA"), optList("ERR")]);
/** NMD^N02 - Application Management Data: MSH { CLOCK_AND_STATS_WITH_NOTES: [ CLOCK: NCK [{NTE}] ] [ APP_STATS: NST [{NTE}] ] [ APP_STATUS: NSC [{NTE}] ] } (the inner groups are inlined). */
export const nmd = (version: string, head: StructureItem[]): MessageSchema => schema("NMD", "N02", [
  ...head,
  group("CLOCK_AND_STATS_WITH_NOTES", "required", "repeating", [
    group("CLOCK", "optional", "single", [req("NCK"), optList("NTE", { as: "clockNotes" })], { inline: true }),
    group("APP_STATS", "optional", "single", [req("NST"), optList("NTE", { as: "statisticsNotes" })], { inline: true }),
    group("APP_STATUS", "optional", "single", [req("NSC"), optList("NTE", { as: "statusNotes" })], { inline: true }),
  ], { as: "clockAndStatistics", exportTypeName: "ParsedClockAndStatistics", builderTypeName: "ClockAndStatistics" }),
], version);
export const NMD_N02_SCHEMA = nmd("2.3", [req("MSH")]);

/** Every v2.3 clinical trial, product experience and application management message. */
export const MISC_MESSAGES: MessageSchema[] = [...CRM_FAMILY, ...CSU_FAMILY, ...PEX_FAMILY, SUR_P09_SCHEMA, NMQ_N01_SCHEMA, NMR_N01_SCHEMA, NMD_N02_SCHEMA];
