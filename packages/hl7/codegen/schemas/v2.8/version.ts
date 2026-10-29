import type { VersionSchema } from "../../../src/types/schema";
import { V2_8_MESSAGES } from "./messages";

/**
 * v2.8: HL7 v2 release 2.8. Segments are generated from
 * codegen/spec/v2.8-segments.json (MSH, BHS and FHS are mirrored from v2.7.1, see IMPORT.md).
 * Messages are imported from the hl7.eu pages (codegen/extracted/v2.8, IMPORT.md).
 * Messages the 2.8 table defines but the schema type cannot express yet are listed in withdrawnMessages
 * with the reason; they are not mirrored from v2.7.1, whose structure differs.
 */
export const V2_8: VersionSchema = {
  version: "v2.8",
  baseVersion: "v2.7.1",
  reexport: true,
  ownSegments: [],
  withdrawnMessages: [
    // Withdrawn as printed in the chapter text, not in the index.
    "QRY_PC4",
    "QRY_PC9",
    "QRY_PCE",
    "QRY_PCK",
    "RCI_I05",
    "RCL_I06",
    "RQC_I05",
    "RQC_I06",
    // Not generated: the schema type cannot express their structure yet (choice of groups, unnamed group); see IMPORT.md.
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
    "QBP_Z81",
    "QBP_Z85",
    "QBP_Z87",
    "QBP_Z89",
    "QVR_Q17",
    "RSP_K11",
  ],
  segments: [],
  messages: V2_8_MESSAGES,
};
