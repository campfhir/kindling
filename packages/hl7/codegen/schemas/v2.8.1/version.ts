import type { VersionSchema } from "../../../src/types/schema";
import { V2_8_1_MESSAGES } from "./messages";

/**
 * v2.8.1: HL7 v2 release 2.8.1. Segments are generated from
 * codegen/spec/v2.8.1-segments.json (MSH, BHS and FHS are mirrored from v2.8, see IMPORT.md).
 * Messages are imported from the hl7.eu pages (codegen/extracted/v2.8.1, IMPORT.md).
 * Messages the 2.8.1 table defines but the schema type cannot express yet are listed in withdrawnMessages
 * with the reason; they are not mirrored from v2.8, whose structure differs.
 */
export const V2_8_1: VersionSchema = {
  version: "v2.8.1",
  baseVersion: "v2.8",
  reexport: true,
  ownSegments: [],
  withdrawnMessages: [
    // Not generated: the table holds a placeholder group, an open choice (etc.) or a choice of one group the schema cannot express yet; see IMPORT.md.
    "CCI_I22",
    "CCM_I21",
    "CCR_I16",
    "CCR_I17",
    "CCR_I18",
    "CCU_I20",
    "CQU_I19",
    "PPG_PCG",
    "PPG_PCH",
    "PPG_PCJ",
    "PPP_PCB",
    "PPP_PCC",
    "PPP_PCD",
    "PPR_PC1",
    "PPR_PC2",
    "PPR_PC3",
    "QBP_Q11",
    "QBP_Q31",
    "QBP_Z87",
    "QBP_Z89",
    "QVR_Q17",
    "RSP_K11",
  ],
  segments: [],
  messages: V2_8_1_MESSAGES,
};
