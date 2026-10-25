import type { VersionSchema } from "../../../src/types/schema";
import { ACK_SCHEMA } from "./ACK";
import { ADT_A01_FAMILY } from "./ADT_A01";
import { ADT_A17_SCHEMA, ADT_A20_SCHEMA, ADT_A24_SCHEMA } from "./ADT_A17";
import { ADT_A34_FAMILY } from "./ADT_A34";
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
import { ORDER_MESSAGES } from "./orders";

/** Every message whose structure changed in 2.5 (or is new in 2.5). v2.5.1 re-versions this list. */
export const V2_5_MESSAGES = [
  ACK_SCHEMA,
  ...ADT_A01_FAMILY,
  ADT_A17_SCHEMA,
  ADT_A24_SCHEMA,
  ADT_A20_SCHEMA,
  ...ADT_A34_FAMILY,
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
];

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
  ownSegments: ["SFT", "SPM", "TQ1", "TQ2", "CER", "EDU", "IIM"],
  withdrawnMessages: ["QRY_P04", "DSR_P04", "MFD_MFA"],
  segments: [],
  messages: V2_5_MESSAGES,
};
