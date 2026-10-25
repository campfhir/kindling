import type { MessageSchema, VersionSchema } from "../../../src/types/schema";
import { nameOf, reversion, withSft } from "../helpers";
import { V2_4_MESSAGES } from "../v2.4/version";
import { ACK_SCHEMA } from "./ACK";
import { BAR_P01_SCHEMA, BAR_P02_SCHEMA, BAR_P05_SCHEMA, BAR_P06_SCHEMA } from "./BAR_P01";
import { DFT_P03_SCHEMA } from "./DFT_P03";
import { MDM_FAMILY } from "./MDM_T01";
import { MFN_M02_SCHEMA } from "./MFN_M02";
import { ORM_O01_SCHEMA } from "./ORM_O01";
import { ORR_O02_SCHEMA } from "./ORR_O02";
import { ORU_R01_SCHEMA } from "./ORU_R01";
import { ORU_R30_FAMILY } from "./ORU_R30";
import { SIU_FAMILY } from "./SIU_S12";
import { SRR_FAMILY } from "./SRR_S01";
import { VXU_V04_SCHEMA } from "./VXU_V04";
import { QUERY_MESSAGES } from "./queries";
import { MASTER_FILE_MESSAGES } from "./master-files";
import { ORDERS_CHANGED_IN_2_5, ORDER_MESSAGES } from "./orders";
import { CARE_REFERRAL_MISC_MESSAGES } from "./care";
import { ADT_CHANGED_IN_2_5 } from "./ADT";
import { AUTOMATION_CHANGED_IN_2_5 } from "./automation";
import { LAB_ORDER_MESSAGES } from "./laboratory";
import { IMAGING_MESSAGES } from "./imaging";
import { BLOOD_BANK_MESSAGES } from "./blood-bank";
import { QBP_MESSAGES_2_5 } from "./QBP";
import { PERSONNEL_MESSAGES_2_5 } from "./personnel";
import { FINANCIAL_MESSAGES_2_5 } from "./financial";

/** The hand-written v2.5 schemas (checked by the 2.5 sweep; see docs/validation/v2.5-message-ledger.md). */
const V2_5_HAND_WRITTEN: MessageSchema[] = [
  ACK_SCHEMA,
  BAR_P01_SCHEMA,
  BAR_P02_SCHEMA,
  BAR_P05_SCHEMA,
  BAR_P06_SCHEMA,
  DFT_P03_SCHEMA,
  ...MDM_FAMILY,
  MFN_M02_SCHEMA,
  ORM_O01_SCHEMA,
  ORR_O02_SCHEMA,
  ORU_R01_SCHEMA,
  ...ORU_R30_FAMILY,
  ...SIU_FAMILY,
  ...SRR_FAMILY,
  VXU_V04_SCHEMA,
  ...QUERY_MESSAGES,
  ...MASTER_FILE_MESSAGES,
  ...ORDER_MESSAGES,
  ...CARE_REFERRAL_MISC_MESSAGES,
];

/** The structures written for the 2.5 sweep (changed in 2.5 or new in 2.5); by name they replace the ones above. */
const SWEEP_2_5: MessageSchema[] = [
  ...ADT_CHANGED_IN_2_5, ...AUTOMATION_CHANGED_IN_2_5, ...LAB_ORDER_MESSAGES, ...IMAGING_MESSAGES, ...BLOOD_BANK_MESSAGES,
  ...QBP_MESSAGES_2_5, ...PERSONNEL_MESSAGES_2_5, ...FINANCIAL_MESSAGES_2_5, ...ORDERS_CHANGED_IN_2_5, ...SIU_FAMILY,
];
const SWEEP_NAMES = new Set(SWEEP_2_5.map(nameOf));
/** The hand-written v2.5 structures, the sweep's version of a message replacing an older one. */
const HAND_WRITTEN: MessageSchema[] = [...new Map([...V2_5_HAND_WRITTEN, ...SWEEP_2_5].map((m) => [nameOf(m), m])).values()];

/**
 * The messages 2.5 carries unchanged from 2.3 or 2.4, without the [{SFT}] every other 2.5 message
 * gets after MSH: hl7.eu, Caristix 2.5 and HAPI v25 print them without it (QRY^PC4: hl7.eu and
 * Caristix, HAPI adds it; hl7.eu decides).
 */
const NO_SFT_IN_2_5 = new Set([
  "DOC_T12", "ORM_O01", "ORR_O02", "QRY_PC4", "QRY_T12", "SIU_S12", "SIU_S13", "SIU_S14", "SIU_S15",
  "SIU_S16", "SIU_S17", "SIU_S18", "SIU_S19", "SIU_S20", "SIU_S21", "SIU_S22", "SIU_S23", "SIU_S24",
  "SIU_S26", "SQM_S25", "SRM_S01", "SRM_S02", "SRM_S03", "SRM_S04", "SRM_S05", "SRM_S06", "SRM_S07",
  "SRM_S08", "SRM_S09", "SRM_S10", "SRM_S11", "SUR_P09",
]);

/** The v2.4 messages withdrawn in 2.5 (none of hl7.eu, Caristix 2.5 or HAPI v25 has them). */
const WITHDRAWN = ["QRY_P04", "DSR_P04", "MFD_MFA", "RSP_K13", "RSP_K15", "RTB_Q13"];

const v24Names = new Set(V2_4_MESSAGES.map(nameOf));
/** The v2.4 messages whose 2.5 structure changed beyond [{SFT}]: the hand-written v2.5 schema replaces the derived one. */
const CHANGED_IN_2_5 = new Set([
  ...MASTER_FILE_MESSAGES.map(nameOf), ...SWEEP_NAMES,
  // The patient care responses: ERR repeats in 2.5 (hl7.eu ch12, Caristix 2.5, HAPI v25).
  "PRR_PC5", "PPV_PCA", "PTR_PCF", "PPT_PCL",
  "ACK", "CSU_C09", "CSU_C10", "CSU_C11", "CSU_C12", "DFT_P03", "MDM_T01", "MDM_T02", "MDM_T03", "MDM_T04",
  "MDM_T05", "MDM_T06", "MDM_T07", "MDM_T08", "MDM_T09", "MDM_T10", "MDM_T11", "MFK_M01", "MFK_M03",
  "MFK_M13", "MFK_M15", "MFN_M02", "MFR_M05", "MFR_M06", "MFR_M07", "NMR_N01", "OMD_O03", "OMN_O07",
  "OMS_O05", "ORD_O04", "ORF_R04", "ORF_W02", "ORN_O08", "ORS_O06", "ORU_R01", "ORU_W01", "PEX_P07",
  "PEX_P08", "QRY_PC9", "QRY_PCE", "QRY_PCK", "RAR_RAR", "RAS_O17", "RDE_O11", "RDR_RDR", "RDS_O13",
  "RER_RER", "RGR_RGR", "RGV_O15", "ROR_ROR", "RRA_O18", "RRD_O14", "RRE_O12", "RRG_O16", "SQR_S25",
  "SRR_S01", "SRR_S02", "SRR_S03", "SRR_S04", "SRR_S05", "SRR_S06", "SRR_S07", "SRR_S08", "SRR_S09",
  "SRR_S10", "SRR_S11", "VXR_V03", "VXU_V04", "VXX_V02",
]);
/** The messages 2.5 introduces (no v2.4 structure to derive from), and those whose 2.5 structure is written by hand. */
export const V2_5_OWN_MESSAGES: MessageSchema[] = HAND_WRITTEN.filter(
  (m) => !v24Names.has(nameOf(m)) || CHANGED_IN_2_5.has(nameOf(m)) || (m.baseMessage !== undefined && CHANGED_IN_2_5.has(m.baseMessage)),
);
const own = new Set(V2_5_OWN_MESSAGES.map(nameOf));
const withdrawn = new Set(WITHDRAWN);

/**
 * Every v2.5 message: the v2.4 list re-versioned with [{SFT}] after MSH (2.5 adds the Software
 * segment to every message), minus the withdrawn events, plus the structures above. All are
 * generated against the v2.5 segment modules.
 */
const assembled: MessageSchema[] = [
  ...V2_4_MESSAGES.filter((m) => !own.has(nameOf(m)) && !withdrawn.has(nameOf(m))).map((m) =>
    NO_SFT_IN_2_5.has(nameOf(m)) || (m.baseMessage !== undefined && NO_SFT_IN_2_5.has(m.baseMessage)) ? reversion(m, "2.5") : withSft(reversion(m, "2.5")),
  ),
  ...V2_5_OWN_MESSAGES,
];
const byName = new Map(assembled.map((m) => [nameOf(m), m]));
/** A wrapper event has its base's structure, whichever list the base came from. */
export const V2_5_MESSAGES: MessageSchema[] = assembled.map((m) =>
  m.baseMessage !== undefined && byName.has(m.baseMessage) ? { ...m, structure: byName.get(m.baseMessage)!.structure } : m,
);

/**
 * v2.5 — re-exports v2.4, except for the messages listed above (generated against the v2.5
 * segments) and the SFT (Software), SPM (Specimen), TQ1 (Timing/Quantity) and TQ2
 * (Timing/Quantity Relationship), CER (Certificate Detail) and IIM (Inventory Item Master) segments
 * introduced in 2.5, and the
 * EDU subclass that adds EDU-9. SRM, SQM^S25, QRY^T12 and DOC^T12 are unchanged since v2.3 (or
 * v2.3.1); QRY^P04, DSR^P04 and MFD^MFA are withdrawn.
 */
export const V2_5: VersionSchema = {
  version: "v2.5",
  baseVersion: "v2.4",
  reexport: true,
  ownSegments: ["SFT", "SPM", "TQ1", "TQ2", "CER", "EDU", "IIM", "BPO", "BPX", "BTX", "CON", "IPC", "OVR"],
  withdrawnMessages: WITHDRAWN,
  segments: [],
  messages: V2_5_MESSAGES,
};
