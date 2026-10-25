import type { MessageSchema, SegmentGroup } from "../../../src/types/schema";
import { SFT, opt, optList, req, reqList, reversion, withSft, wrappers } from "../helpers";
import { MFQ_EVENTS, MFQ_M01_SCHEMA as MFQ_M01_V23 } from "../v2.3/MFQ_M01";
import { MFK_EVENTS } from "../v2.3/MFK_M01";
import { MFN_MESSAGES as MFN_V23, chargeDescriptionEntries, clinicalStudyScheduleEntries, entries, genericEntries } from "../v2.3/MFN_M01";
import { MFR_GENERIC_EVENTS } from "../v2.3/MFR_M01";

/**
 * The master file messages of HL7 v2.5 (identical in v2.5.1, chapter 8). Every message gains
 * [{SFT}]; MFK and MFR make ERR repeat; MFR keeps the [QAK] of v2.4. MFD^MFA is no longer defined
 * (withdrawn here) and MFN^M13 (a bare MFE list) is new. MFN^M12 (OM7) and MFN^M15 (IIM) need
 * segments this package does not have yet.
 * Sources: https://www.hl7.eu/HL7v2x/v25/std25/ch08.html and https://www.hl7.eu/HL7v2x/v251/std251/ch08.html
 * (sections 8.4, 8.7–8.11), https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/MFN_Mnn.
 */

/** MFN^M01, M03–M11: the v2.3 structures with [{SFT}] after MSH. */
export const MFN_MESSAGES: MessageSchema[] = MFN_V23.map((m) => withSft(reversion(m, "2.5")));

/** MFN^M13 - Master File Notification - General: MSH [{SFT}] MFI {MFE}, the MFEs as `entries`. */
export const MFN_M13_SCHEMA: MessageSchema = {
  messageType: "MFN",
  triggerEvent: "M13",
  version: "2.5",
  structure: [req("MSH"), SFT, req("MFI"), reqList("MFE", { as: "entries" })],
};

/** MFK^M01: MSH [{SFT}] MSA [{ERR}] MFI [{MFA}]; M02–M13 wrap it. */
export const MFK_M01_SCHEMA: MessageSchema = {
  messageType: "MFK",
  triggerEvent: "M01",
  version: "2.5",
  structure: [req("MSH"), SFT, req("MSA"), optList("ERR"), req("MFI"), optList("MFA")],
};
/** M01 and the events wrapping it (M13 included). */
export const MFK_FAMILY: MessageSchema[] = [MFK_M01_SCHEMA, ...wrappers(MFK_M01_SCHEMA, [...MFK_EVENTS, "M13"])];

/** MFQ^M01: MSH [{SFT}] QRD [QRF] [DSC]; M02–M11 wrap it. */
export const MFQ_M01_SCHEMA: MessageSchema = withSft(reversion(MFQ_M01_V23, "2.5"));
/** M01 and the events wrapping it. */
export const MFQ_FAMILY: MessageSchema[] = [MFQ_M01_SCHEMA, ...wrappers(MFQ_M01_SCHEMA, MFQ_EVENTS)];

/**
 * MFR^Mnn: MSH [{SFT}] MSA [{ERR}] [QAK] QRD [QRF] MFI { MF_QUERY: MFE <record> } [DSC]
 *
 * hl7.eu v2.5 writes the typed records of M05 and M06 flat: `MFE LOC [{LCH}] [{LRL}] {LDP} [{LCH}] [{LCC}]`
 * (the department characteristics as `departmentCharacteristics`) and `MFE CM0 [{CM1}] [{CM2}]`,
 * unlike the nested MFN groups; HAPI v25 agrees. M02 carries the v2.5 staff record.
 */
const mfr25 = (triggerEvent: string, record: SegmentGroup): MessageSchema => ({
  messageType: "MFR",
  triggerEvent,
  version: "2.5",
  structure: [req("MSH"), SFT, req("MSA"), optList("ERR"), opt("QAK"), req("QRD"), opt("QRF"), req("MFI"), record, opt("DSC")],
});
export const MFR_M01_SCHEMA: MessageSchema = mfr25("M01", genericEntries("MF_QUERY"));
export const MFR_M02_SCHEMA: MessageSchema = mfr25("M02", entries("MF_QUERY", "Staff", [req("MFE"), req("STF"), optList("PRA"), optList("ORG"), optList("AFF"), optList("LAN"), optList("EDU"), optList("CER"), optList("NTE")]));
export const MFR_M04_SCHEMA: MessageSchema = mfr25("M04", chargeDescriptionEntries("MF_QUERY"));
export const MFR_M05_SCHEMA: MessageSchema = mfr25("M05", entries("MF_QUERY", "Location", [
  req("MFE"), req("LOC"), optList("LCH"), optList("LRL"), reqList("LDP"), optList("LCH", { as: "departmentCharacteristics" }), optList("LCC"),
]));
export const MFR_M06_SCHEMA: MessageSchema = mfr25("M06", entries("MF_QUERY", "ClinicalStudy", [req("MFE"), req("CM0"), optList("CM1"), optList("CM2")]));
export const MFR_M07_SCHEMA: MessageSchema = mfr25("M07", clinicalStudyScheduleEntries("MF_QUERY"));

/** Every v2.5 master files response. */
export const MFR_MESSAGES: MessageSchema[] = [
  MFR_M01_SCHEMA, ...wrappers(MFR_M01_SCHEMA, MFR_GENERIC_EVENTS),
  MFR_M02_SCHEMA, MFR_M04_SCHEMA, MFR_M05_SCHEMA, MFR_M06_SCHEMA, MFR_M07_SCHEMA,
];

/** Every v2.5 master file message other than MFN^M02. */
export const MASTER_FILE_MESSAGES: MessageSchema[] = [...MFN_MESSAGES, MFN_M13_SCHEMA, ...MFK_FAMILY, ...MFQ_FAMILY, ...MFR_MESSAGES];
