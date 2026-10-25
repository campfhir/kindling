/**
 * Message structure for EAN^U09 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EQU { NOTIFICATION: NDS [NTE] } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of EAN^U09 (HL7 v2.5.1), in order. */
export const EAN_U09_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EQU", required: true, repeating: false },
  {
    name: "NOTIFICATION",
    required: true,
    repeating: true,
    segments: [
      { name: "NDS", required: true, repeating: false },
      { name: "NTE", required: false, repeating: false },
    ],
  },
  { name: "ROL", required: false, repeating: false },
];
