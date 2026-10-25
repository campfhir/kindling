import type { MessageSchema, VersionSchema } from "../../../src/types/schema";
import { nameOf, reversion } from "../helpers";
import { V2_3_1_MESSAGES } from "../v2.3.1/version";
import { BAR_P01_SCHEMA, BAR_P05_SCHEMA } from "./BAR_P01";
import { DFT_P03_SCHEMA } from "./DFT_P03";
import { ORM_O01_SCHEMA } from "./ORM_O01";
import { VXU_V04_SCHEMA } from "./VXU_V04";
import { MFN_M02_SCHEMA } from "./MFN_M02";
import { ADR_A19_SCHEMA } from "./ADR_A19";
import { ORF_R04_FAMILY } from "./ORF_R04";
import { VXR_V03_SCHEMA } from "./VXR_V03";
import { OSR_Q06_SCHEMA } from "./OSQ_Q06";
import { MFR_MESSAGES } from "./MFR_M01";
import { MFK_FAMILY, MFN_M12_SCHEMA, MFQ_FAMILY } from "./MFN_M12";
import { ORDER_MESSAGES, WITHDRAWN_ORDER_MESSAGES } from "./orders";
import { CSU_FAMILY, RQC_FAMILY } from "./care";
import { ADT_MESSAGES_V24 } from "./ADT";
import { ORR_O02_SCHEMA } from "./ORR_O02";
import { ORU_R01_SCHEMA } from "./ORU_R01";
import { BAR_P10_MESSAGES } from "./BAR_P10";
import { AUTOMATION_MESSAGES } from "./automation";
import { LAB_ORDER_MESSAGES } from "./laboratory";
import { PERSONNEL_MESSAGES } from "./personnel";
import { QBP_MESSAGES } from "./QBP";

/** The v2.3.1 messages withdrawn in 2.4: UDM^R06 and the renumbered order and pharmacy events. */
const WITHDRAWN = ["UDM_R06", ...WITHDRAWN_ORDER_MESSAGES];

/**
 * The messages whose structure differs from v2.3.1, or that 2.4 introduces. Every ADT event is listed
 * (./ADT.ts gives each its 2.4 structure); among the rest, BAR, DFT, ORM, ORU and VXU gain segments,
 * ADR^A19 the A01 ROLs, ORF^R04/W02 [CTD], VXR^V03 [{GT1}], OSR^Q06 a required order detail, ORR^O02
 * a required order detail, MFR [QAK], MFN^M12 (OM7) is new and MFK/MFQ/MFR gain the M12 event, the order
 * and pharmacy events are renumbered (OMD^O03 … RAS^O17), CSU carries repeating CSPs and RQC^I06
 * repeating GT1s. New in 2.4: BAR^P10, the chapter 13 automation messages, the chapter 4 OMG/ORG,
 * OML/ORL, OMP/ORP orders and OUL^R21, the chapter 15 PMU personnel messages and the chapter 5
 * query-by-parameter family (QBP/RSP/RTB/RDY/QSB/QVR/QCN/QSX).
 */
export const V2_4_OWN_MESSAGES: MessageSchema[] = [
  ...ADT_MESSAGES_V24,
  BAR_P01_SCHEMA, BAR_P05_SCHEMA, ...BAR_P10_MESSAGES, DFT_P03_SCHEMA, MFN_M02_SCHEMA, ORM_O01_SCHEMA, ORR_O02_SCHEMA, ORU_R01_SCHEMA, VXU_V04_SCHEMA,
  ADR_A19_SCHEMA, ...ORF_R04_FAMILY, VXR_V03_SCHEMA, OSR_Q06_SCHEMA, ...MFR_MESSAGES, MFN_M12_SCHEMA, ...MFK_FAMILY, ...MFQ_FAMILY,
  ...ORDER_MESSAGES, ...CSU_FAMILY, ...RQC_FAMILY,
  ...AUTOMATION_MESSAGES, ...LAB_ORDER_MESSAGES, ...PERSONNEL_MESSAGES, ...QBP_MESSAGES,
];

const own = new Set(V2_4_OWN_MESSAGES.map(nameOf));
const withdrawn = new Set(WITHDRAWN);

/**
 * Every v2.4 message: the v2.3.1 list re-versioned, minus the withdrawn events and the ADT events
 * (all of which ./ADT.ts defines), with the changed and new structures above. All are generated
 * against the v2.4 segment modules (which re-export the older class where the field table did not
 * change), so a 2.4 message is parsed and built with the 2.4 field tables.
 */
export const V2_4_MESSAGES: MessageSchema[] = [
  ...V2_3_1_MESSAGES.filter((m) => !own.has(nameOf(m)) && !withdrawn.has(nameOf(m)) && m.messageType !== "ADT").map((m) => reversion(m, "2.4")),
  ...V2_4_OWN_MESSAGES,
];

/**
 * v2.4 — a re-export version of v2.3.1 for its segments (the segments whose table changed have their
 * own class, see docs/validation/v2.4-segment-ledger.md; those first defined in 2.4 are listed in
 * `ownSegments`) with every message generated.
 */
export const V2_4: VersionSchema = {
  version: "v2.4",
  baseVersion: "v2.3.1",
  reexport: true,
  ownSegments: [
    "PDA", "ABS", "BLC", "RMI", "ORG", "AFF", "LAN", "EDU", "OM7",
    "CNS", "ECD", "ECR", "EQP", "EQU", "GP1", "GP2", "IAM", "INV", "ISD", "NDS", "QID", "QPD", "QRI", "RCP", "SAC", "SID", "TCC", "TCD",
  ],
  withdrawnMessages: WITHDRAWN,
  segments: [],
  messages: V2_4_MESSAGES,
};
