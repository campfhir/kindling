import type { MessageSchema, VersionSchema } from "../../../src/types/schema";
import { nameOf, reversion } from "../helpers";
import { V2_3 } from "../v2.3/version";
import { ADR_A19_SCHEMA } from "./ADR_A19";
import { RENUMBERED_QUERY_MESSAGES, WITHDRAWN_Q01_MESSAGES } from "./EQQ_Q04";
import { ORF_R04_FAMILY } from "./ORF_R04";
import { DOC_T12_SCHEMA } from "./QRY_T12";
import { RAS_O01_SCHEMA } from "./RAS_O01";
import { CARE_RESPONSES, CSU_FAMILY } from "./care";
import { ADT_MESSAGES_V231 } from "./ADT";
import { CHANGED_MESSAGES } from "./changed";

/** The v2.3 messages withdrawn in 2.3.1: the Q01 enhanced-mode queries (renumbered) and RAS^O02 (RAS^O01). */
const WITHDRAWN = [...WITHDRAWN_Q01_MESSAGES, "RAS_O02"];

/**
 * The messages whose structure differs from v2.3: the query responses that gain [QAK] (ADR^A19,
 * ORF^R04/W02, DOC^T12, the patient care responses), the renumbered enhanced-mode queries
 * (EQQ^Q04, VQQ^Q07, SPQ^Q08, RQQ^Q09, TBR^R08), RAS^O01, CSU's required study observations, the
 * ADT changes (repeating IN3, the A06/A07 erratum, A16, A37) and the repeating IN3, NK1 and PD1
 * additions of BAR, DFT, ORM, ORU and SIU.
 */
export const V2_3_1_OWN_MESSAGES: MessageSchema[] = [
  ADR_A19_SCHEMA, ...ORF_R04_FAMILY, DOC_T12_SCHEMA, ...RENUMBERED_QUERY_MESSAGES, RAS_O01_SCHEMA, ...CARE_RESPONSES, ...CSU_FAMILY,
  ...ADT_MESSAGES_V231, ...CHANGED_MESSAGES,
];

const own = new Set(V2_3_1_OWN_MESSAGES.map(nameOf));
const withdrawn = new Set(WITHDRAWN);

/**
 * Every v2.3.1 message: the v2.3 list re-versioned, minus the withdrawn events, with the changed
 * structures above in place of their v2.3 originals. All 276 are generated against the v2.3.1
 * segment modules (which re-export the v2.3 class where the field table did not change), so a
 * 2.3.1 message is parsed and built with the 2.3.1 field tables.
 */
export const V2_3_1_MESSAGES: MessageSchema[] = [
  ...V2_3.messages.filter((m) => !own.has(nameOf(m)) && !withdrawn.has(nameOf(m))).map((m) => reversion(m, "2.3.1")),
  ...V2_3_1_OWN_MESSAGES,
];

/**
 * v2.3.1 — a re-export version of v2.3 for its segments (the 53 whose table changed have their own
 * class, see docs/validation/v2.3.1-segment-ledger.md) with every message generated.
 */
export const V2_3_1: VersionSchema = {
  version: "v2.3.1",
  baseVersion: "v2.3",
  reexport: true,
  ownSegments: [],
  withdrawnMessages: WITHDRAWN,
  segments: [],
  messages: V2_3_1_MESSAGES,
};
