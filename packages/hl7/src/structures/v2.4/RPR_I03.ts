/**
 * Message structure for RPR^I03 messages (HL7 v2.4).
 *
 * Structure: MSH MSA { PROVIDER: PRD [{CTD}] } [{PID}] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of RPR^I03 (HL7 v2.4), in order. */
export const RPR_I03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  {
    name: "PROVIDER",
    required: true,
    repeating: true,
    segments: [
      { name: "PRD", required: true, repeating: false },
      { name: "CTD", required: false, repeating: true },
    ],
  },
  { name: "PID", required: false, repeating: true },
  { name: "NTE", required: false, repeating: true },
];
