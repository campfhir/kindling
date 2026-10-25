import type { MessageSchema } from "../../../src/types/schema";
import { opt, req, wrappers } from "../helpers";
import { chargeDescriptionEntries, clinicalStudyEntries, clinicalStudyScheduleEntries, entries, genericEntries, locationEntries } from "../v2.3/MFN_M01";
import { MFR_GENERIC_EVENTS, mfr } from "../v2.3/MFR_M01";

/** The events that answer with the generic record in v2.4 (M12 is new). */
export const MFR_GENERIC_EVENTS_V24 = [...MFR_GENERIC_EVENTS, "M12"];

/**
 * MFR^Mnn (HL7 v2.4): MSH MSA [ERR] [QAK] QRD [QRF] MFI { MF_QUERY: MFE <record> } [DSC]
 *
 * Compared with v2.3: [QAK] after ERR, the staff record (M02) gains [ORG] and M12 answers with the
 * generic record. The records otherwise match v2.3.
 * Sources: https://www.hl7.eu/HL7v2x/v24/std24/ch08.htm (8.4.3, 8.7), https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/MFR_M01
 */
const head = [req("MSH"), req("MSA"), opt("ERR"), opt("QAK")];
const mfr24 = (triggerEvent: string, record: ReturnType<typeof genericEntries>) => mfr(triggerEvent, record, "2.4", head);

export const MFR_M01_SCHEMA: MessageSchema = mfr24("M01", genericEntries("MF_QUERY"));
export const MFR_M02_SCHEMA: MessageSchema = mfr24("M02", entries("MF_QUERY", "Staff", [req("MFE"), req("STF"), opt("PRA"), opt("ORG")]));
export const MFR_M04_SCHEMA: MessageSchema = mfr24("M04", chargeDescriptionEntries("MF_QUERY"));
export const MFR_M05_SCHEMA: MessageSchema = mfr24("M05", locationEntries("MF_QUERY"));
export const MFR_M06_SCHEMA: MessageSchema = mfr24("M06", clinicalStudyEntries("MF_QUERY"));
export const MFR_M07_SCHEMA: MessageSchema = mfr24("M07", clinicalStudyScheduleEntries("MF_QUERY"));

/** Every v2.4 master files response. */
export const MFR_MESSAGES: MessageSchema[] = [
  MFR_M01_SCHEMA, ...wrappers(MFR_M01_SCHEMA, MFR_GENERIC_EVENTS_V24),
  MFR_M02_SCHEMA, MFR_M04_SCHEMA, MFR_M05_SCHEMA, MFR_M06_SCHEMA, MFR_M07_SCHEMA,
];
