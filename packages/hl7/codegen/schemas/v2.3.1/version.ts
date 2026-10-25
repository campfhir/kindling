import type { VersionSchema } from "../../../src/types/schema";
import { ADR_A19_SCHEMA } from "./ADR_A19";
import { RENUMBERED_QUERY_MESSAGES, WITHDRAWN_Q01_MESSAGES } from "./EQQ_Q04";
import { ORF_R04_FAMILY } from "./ORF_R04";
import { DOC_T12_SCHEMA } from "./QRY_T12";

/**
 * v2.3.1 — re-exports v2.3, except for the query messages whose structure changed in 2.3.1
 * (ADR^A19, ORF^R04/W02 and DOC^T12 gain a QAK) and the renumbered enhanced-mode queries
 * (EQQ^Q04, VQQ^Q07, SPQ^Q08, RQQ^Q09, TBR^R08 replace the v2.3 Q01 events).
 */
export const V2_3_1: VersionSchema = {
  version: "v2.3.1",
  baseVersion: "v2.3",
  reexport: true,
  ownSegments: [],
  withdrawnMessages: WITHDRAWN_Q01_MESSAGES,
  segments: [],
  messages: [ADR_A19_SCHEMA, ...ORF_R04_FAMILY, DOC_T12_SCHEMA, ...RENUMBERED_QUERY_MESSAGES],
};
