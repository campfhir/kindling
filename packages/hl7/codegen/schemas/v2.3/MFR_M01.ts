import type { MessageSchema, SegmentGroup } from "../../../src/types/schema";
import { opt, req, wrappers } from "../helpers";
import { chargeDescriptionEntries, clinicalStudyEntries, clinicalStudyScheduleEntries, entries, genericEntries, locationEntries } from "./MFN_M01";

/**
 * MFR^Mnn - Master Files Response (HL7 v2.3, chapter 8 section 8.3.3).
 *
 * MSH MSA [ERR] QRD [QRF] MFI { MF_QUERY: MFE <record> } [DSC]
 *
 * The record after each MFE is the one of the master file queried: hl7.eu states the replacement
 * for staff (M02: STF [PRA]), charge descriptions (M04), locations (M05) and clinical studies
 * (M06, M07), which get their own schemas; the other events (M01, M03, M08–M11) keep the generic
 * `{ MFE }` of the base definition, as on Caristix. v2.4 adds [QAK]; v2.5 adds [{SFT}], a
 * repeating ERR and flattens the M05/M06 records (see those schemas).
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch8.htm (8.3.3, 8.6–8.10), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/MFR_M01
 */
export const mfr = (triggerEvent: string, record: SegmentGroup, version = "2.3", head = [req("MSH"), req("MSA"), opt("ERR")]): MessageSchema => ({
  messageType: "MFR",
  triggerEvent,
  version,
  structure: [...head, req("QRD"), opt("QRF"), req("MFI"), record, opt("DSC")],
});

/** MFR^M01: MSH MSA [ERR] QRD [QRF] MFI { MF_QUERY: MFE } [DSC] */
export const MFR_M01_SCHEMA = mfr("M01", genericEntries("MF_QUERY"));
/** The events that answer with the generic record. */
export const MFR_GENERIC_EVENTS = ["M03", "M08", "M09", "M10", "M11"];
/** MFR^M02: the record is MFE STF [PRA]. */
export const MFR_M02_SCHEMA = mfr("M02", entries("MF_QUERY", "Staff", [req("MFE"), req("STF"), opt("PRA")]));
/** MFR^M04: the record is MFE CDM [{PRC}]. */
export const MFR_M04_SCHEMA = mfr("M04", chargeDescriptionEntries("MF_QUERY"));
/** MFR^M05: the record is MFE LOC [{LCH}] [{LRL}] { LDP [{LCH}] [{LCC}] }. */
export const MFR_M05_SCHEMA = mfr("M05", locationEntries("MF_QUERY"));
/** MFR^M06: the record is MFE CM0 [{ CM1 [{CM2}] }]. */
export const MFR_M06_SCHEMA = mfr("M06", clinicalStudyEntries("MF_QUERY"));
/** MFR^M07: the record is MFE CM0 [{CM2}]. */
export const MFR_M07_SCHEMA = mfr("M07", clinicalStudyScheduleEntries("MF_QUERY"));

/** Every v2.3 master files response. */
export const MFR_MESSAGES: MessageSchema[] = [
  MFR_M01_SCHEMA, ...wrappers(MFR_M01_SCHEMA, MFR_GENERIC_EVENTS),
  MFR_M02_SCHEMA, MFR_M04_SCHEMA, MFR_M05_SCHEMA, MFR_M06_SCHEMA, MFR_M07_SCHEMA,
];
