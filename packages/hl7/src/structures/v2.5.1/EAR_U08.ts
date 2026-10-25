/**
 * Message structure for EAR^U08 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EQU { COMMAND_RESPONSE: ECD [ SPECIMEN_CONTAINER: SAC [{SPM}] ] ECR } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of EAR^U08 (HL7 v2.5.1), in order. */
export const EAR_U08_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EQU", required: true, repeating: false },
  {
    name: "COMMAND_RESPONSE",
    required: true,
    repeating: true,
    segments: [
      { name: "ECD", required: true, repeating: false },
      {
        name: "SPECIMEN_CONTAINER",
        required: false,
        repeating: false,
        segments: [
          { name: "SAC", required: true, repeating: false },
          { name: "SPM", required: false, repeating: true },
        ],
      },
      { name: "ECR", required: true, repeating: false },
    ],
  },
  { name: "ROL", required: false, repeating: false },
];
