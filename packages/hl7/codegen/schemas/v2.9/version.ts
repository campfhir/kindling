import type { VersionSchema } from "../../../src/types/schema";
import { V2_9_MESSAGES } from "./messages";

/**
 * v2.9: HL7 v2 release 2.9. Segments are generated from
 * codegen/spec/v2.9-segments.json (MSH, BHS and FHS are mirrored from v2.8.2, see IMPORT.md).
 * Messages are imported from the official PDFs (codegen/extracted/v2.9, IMPORT.md).
 * Messages the 2.9 table defines but the schema type cannot express yet are listed in withdrawnMessages
 * with the reason; they are not mirrored from v2.8.2, whose structure differs.
 */
export const V2_9: VersionSchema = {
  version: "v2.9",
  baseVersion: "v2.8.2",
  reexport: true,
  ownSegments: [],
  withdrawnMessages: [
    // Withdrawn in the 2.9 index.
    "RDR_RDR",
    // Not generated: the schema type cannot express their structure yet (choice of groups, unnamed group); see IMPORT.md.
    "CCI_I22",
    "CCM_I21",
    "CCR_I16",
    "CCR_I17",
    "CCR_I18",
    "CCU_I20",
    "CQU_I19",
    "PGL_PC6",
    "PGL_PC7",
    "PGL_PC8",
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
    // Absent from the extraction: not in the 2.9 index and not generated. They may be withdrawn earlier or missed by the extraction; check the PDFs before relying on them.
    "OMQ_O42",
    "ORX_O43",
    "OSU_O41",
    "UDM_Q05",
  ],
  segments: [],
  messages: V2_9_MESSAGES,
};
