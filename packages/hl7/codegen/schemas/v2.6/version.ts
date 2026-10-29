import type { VersionSchema } from "../../../src/types/schema";
import { V2_6_MESSAGES } from "./messages";

/**
 * v2.6: HL7 v2 release 2.6. Segments are generated from
 * codegen/spec/v2.6-segments.json (MSH, BHS and FHS are mirrored from v2.5.1, see IMPORT.md).
 * Messages are imported from the hl7.eu pages (codegen/extracted/v2.6, IMPORT.md).
 * Messages the 2.6 table defines but the schema type cannot express yet are listed in withdrawnMessages
 * with the reason; they are not mirrored from v2.5.1, whose structure differs.
 */
export const V2_6: VersionSchema = {
  version: "v2.6",
  baseVersion: "v2.5.1",
  reexport: true,
  ownSegments: [],
  withdrawnMessages: [
    // Not generated: the schema type cannot express their structure yet (choice of groups, unnamed group); see IMPORT.md.
    "QBP_Q11",
    "QBP_Q13",
    "QVR_Q17",
    "RSP_K11",
    "SCN_S37",
    "SDN_S36",
    "SDR_S31",
    "SMD_S32",
    // Absent from the extraction: not in the 2.6 index and not generated. They may be withdrawn earlier or missed by the extraction; check the pages before relying on them.
    "EDR_R07",
    "EQQ_Q04",
    "ERP_R09",
    "ORF_W02",
    "ORU_W01",
    "QBP_Q25",
    "RQQ_Q09",
    "SPQ_Q08",
    "TBR_R08",
    "VQQ_Q07",
  ],
  segments: [],
  messages: V2_6_MESSAGES,
};
