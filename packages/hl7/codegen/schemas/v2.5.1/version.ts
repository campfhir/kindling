import type { VersionSchema } from "../../../src/types/schema";
import { reversionAll } from "../helpers";
import { SRM_FAMILY } from "../v2.3/SRM_S01";
import { QRY_T12_SCHEMA } from "../v2.3/QRY_T12";
import { SQM_S25_SCHEMA } from "../v2.3/SQM_S25";
import { DOC_T12_SCHEMA } from "../v2.3.1/QRY_T12";
import { V2_5_MESSAGES } from "../v2.5/version";

/**
 * v2.5.1 — derived from v2.5: every segment its messages use gets a generated wrapper class
 * (hand-edited where 2.5.1 adds fields), and every message is generated against those classes.
 * No message structure changed between 2.5 and 2.5.1, so the v2.5 schemas are re-versioned; SRM,
 * SQM^S25 and QRY^T12 are unchanged since v2.3 and DOC^T12 since v2.3.1.
 */
export const V2_5_1: VersionSchema = {
  version: "v2.5.1",
  baseVersion: "v2.5",
  segments: [
    // Pharmacy and other segments without a message here yet, kept so their wrappers exist.
    "RXE", "RXD",
  ],
  messages: reversionAll([...V2_5_MESSAGES, ...SRM_FAMILY, SQM_S25_SCHEMA, QRY_T12_SCHEMA, DOC_T12_SCHEMA], "2.5.1"),
};
