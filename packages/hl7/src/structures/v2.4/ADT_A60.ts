/**
 * Message structure for ADT^A60 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID [PV1] [PV2] [{IAM}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A60 (HL7 v2.4), in order. */
export const ADT_A60_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PV1", required: false, repeating: false },
  { name: "PV2", required: false, repeating: false },
  { name: "IAM", required: false, repeating: true },
];
