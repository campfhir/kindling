import type { VersionSchema } from "../../../src/types/schema";
import { ADT_A01_FAMILY } from "./ADT_A01";
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

/**
 * v2.4 — re-exports v2.3.1, except for the messages whose structure changed in 2.4 (listed
 * below, generated against the v2.4 segments) and the segments introduced in 2.4: PDA (Patient
 * Death and Autopsy), ABS (Abstract), BLC (Blood Code), RMI (Risk Management Incident) and the
 * staff master file segments ORG, AFF, LAN and EDU, and OM7 (MFN^M12). Among the queries, ADR^A19 gains the A01
 * ROLs, ORF^R04/W02 gain [CTD], VXR^V03 gains [{GT1}] and OSR^Q06's order detail becomes
 * required; UDM^R06 is withdrawn. The master files responses (MFR) gain [QAK], MFN^M12 (OM7) is
 * new and MFK/MFQ/MFR gain the M12 event. The order and pharmacy events are renumbered (OMD^O03,
 * OMS^O05, OMN^O07, RDE^O11, RDS^O13, RGV^O15, RAS^O17 and their acknowledgments); the v2.3 ones
 * and RDO/RRO are withdrawn, and ORU^W01 gets its own shape. CSU carries repeating CSPs and
 * RQC^I06 repeating GT1s.
 */
export const V2_4: VersionSchema = {
  version: "v2.4",
  baseVersion: "v2.3.1",
  reexport: true,
  ownSegments: ["PDA", "ABS", "BLC", "RMI", "ORG", "AFF", "LAN", "EDU", "OM7"],
  withdrawnMessages: ["UDM_R06", ...WITHDRAWN_ORDER_MESSAGES],
  segments: [],
  messages: [...ADT_A01_FAMILY, BAR_P01_SCHEMA, BAR_P05_SCHEMA, DFT_P03_SCHEMA, MFN_M02_SCHEMA, ORM_O01_SCHEMA, VXU_V04_SCHEMA, ADR_A19_SCHEMA, ...ORF_R04_FAMILY, VXR_V03_SCHEMA, OSR_Q06_SCHEMA, ...MFR_MESSAGES, MFN_M12_SCHEMA, ...MFK_FAMILY, ...MFQ_FAMILY, ...ORDER_MESSAGES, ...CSU_FAMILY, ...RQC_FAMILY],
};
