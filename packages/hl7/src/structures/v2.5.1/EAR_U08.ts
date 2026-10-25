/**
 * Message structure for EAR^U08 messages (HL7 v2.5.1).
 *
 * Structure: MSH EQU { COMMAND_RESPONSE: ECD [SAC] ECR } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of EAR^U08 (HL7 v2.5.1), in order. */
export const EAR_U08_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EQU", required: true, repeating: false },
  {
    name: "COMMAND_RESPONSE",
    required: true,
    repeating: true,
    segments: [
      { name: "ECD", required: true, repeating: false },
      { name: "SAC", required: false, repeating: false },
      { name: "ECR", required: true, repeating: false },
    ],
  },
  { name: "ROL", required: false, repeating: false },
];
