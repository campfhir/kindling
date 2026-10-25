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

/**
 * v2.4 — re-exports v2.3.1, except for the messages whose structure changed in 2.4 (listed
 * below, generated against the v2.4 segments) and the segments introduced in 2.4: PDA (Patient
 * Death and Autopsy), ABS (Abstract), BLC (Blood Code), RMI (Risk Management Incident) and the
 * staff master file segments ORG, AFF, LAN and EDU. Among the queries, ADR^A19 gains the A01
 * ROLs, ORF^R04/W02 gain [CTD], VXR^V03 gains [{GT1}] and OSR^Q06's order detail becomes
 * required; UDM^R06 is withdrawn.
 */
export const V2_4: VersionSchema = {
  version: "v2.4",
  baseVersion: "v2.3.1",
  reexport: true,
  ownSegments: ["PDA", "ABS", "BLC", "RMI", "ORG", "AFF", "LAN", "EDU"],
  withdrawnMessages: ["UDM_R06"],
  segments: [],
  messages: [...ADT_A01_FAMILY, BAR_P01_SCHEMA, BAR_P05_SCHEMA, DFT_P03_SCHEMA, MFN_M02_SCHEMA, ORM_O01_SCHEMA, VXU_V04_SCHEMA, ADR_A19_SCHEMA, ...ORF_R04_FAMILY, VXR_V03_SCHEMA, OSR_Q06_SCHEMA],
};
