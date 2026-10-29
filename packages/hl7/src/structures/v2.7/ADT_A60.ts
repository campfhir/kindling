/**
 * Message structure for ADT^A60 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [{ARV}] [PV1] [PV2] [{ARV}] [{ ADVERSE_REACTION_GROUP: IAM [{NTE}] [{IAR}] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A60 (HL7 v2.7), in order. */
export const ADT_A60_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
  { name: "PV1", required: false, repeating: false },
  { name: "PV2", required: false, repeating: false },
  { name: "ARV", required: false, repeating: true, as: "arv2" },
  {
    name: "ADVERSE_REACTION_GROUP",
    required: false,
    repeating: true,
    segments: [
      { name: "IAM", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      { name: "IAR", required: false, repeating: true },
    ],
  },
];
