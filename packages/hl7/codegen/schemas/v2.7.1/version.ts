import type { VersionSchema } from "../../../src/types/schema";
import { V2_7_1_MESSAGES } from "./messages";

/**
 * v2.7.1: HL7 v2 release 2.7.1. Segments are generated from
 * codegen/spec/v2.7.1-segments.json (MSH, BHS and FHS are mirrored from v2.7, see IMPORT.md).
 * Messages are imported from the hl7.eu pages (codegen/extracted/v2.7.1, IMPORT.md).
 * Messages the 2.7.1 table defines but the schema type cannot express yet are listed in withdrawnMessages
 * with the reason; they are not mirrored from v2.7, whose structure differs.
 */
export const V2_7_1: VersionSchema = {
  version: "v2.7.1",
  baseVersion: "v2.7",
  reexport: true,
  ownSegments: [],
  withdrawnMessages: [
    // Not generated: the schema type cannot express their structure yet (choice of groups, unnamed group); see IMPORT.md.
    "CCI_I22",
    "CCM_I21",
    "CCR_I16",
    "CCR_I17",
    "CCR_I18",
    "CCU_I20",
    "CQU_I19",
    "EHC_E24",
    "PPG_PCG",
    "PPG_PCH",
    "PPG_PCJ",
    "PPP_PCB",
    "PPP_PCC",
    "PPP_PCD",
    "PPR_PC1",
    "PPR_PC2",
    "PPR_PC3",
    "PPT_PCL",
    "PPV_PCA",
    "PRR_PC5",
    "PTR_PCF",
    "QBP_Q11",
    "QBP_Q13",
    "QVR_Q17",
    "RSP_K11",
    "SCN_S37",
    "SDN_S36",
    "SDR_S31",
    "SMD_S32",
  ],
  segments: [],
  messages: V2_7_1_MESSAGES,
};
