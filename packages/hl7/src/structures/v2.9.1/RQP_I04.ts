/**
 * Message structure for RQP^I04 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] { PROVIDER: PRD [{CTD}] } PID [{GSP}] [{GSR}] [{GSC}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] }] [{GT1}] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of RQP^I04 (HL7 v2.9.1), in order. */
export const RQP_I04_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  {
    name: "PROVIDER",
    required: true,
    repeating: true,
    segments: [
      { name: "PRD", required: true, repeating: false },
      { name: "CTD", required: false, repeating: true },
    ],
  },
  { name: "PID", required: true, repeating: false },
  { name: "GSP", required: false, repeating: true },
  { name: "GSR", required: false, repeating: true },
  { name: "GSC", required: false, repeating: true },
  {
    name: "NEXT_OF_KIN",
    required: false,
    repeating: true,
    segments: [
      { name: "NK1", required: true, repeating: false },
      { name: "GSP", required: false, repeating: true },
      { name: "GSR", required: false, repeating: true },
    ],
  },
  { name: "GT1", required: false, repeating: true },
  { name: "NTE", required: false, repeating: true },
];
