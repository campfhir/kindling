/**
 * Message structure for NMR^N01 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] [QRD] { CLOCK_AND_STATS_WITH_NOTES_ALT: [NCK] [{NTE}] [NST] [{NTE}] [NSC] [{NTE}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of NMR^N01 (HL7 v2.3), in order. */
export const NMR_N01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QRD", required: false, repeating: false },
  {
    name: "CLOCK_AND_STATS_WITH_NOTES_ALT",
    required: true,
    repeating: true,
    as: "clockAndStatistics",
    segments: [
      { name: "NCK", required: false, repeating: false },
      { name: "NTE", required: false, repeating: true, as: "clockNotes" },
      { name: "NST", required: false, repeating: false },
      { name: "NTE", required: false, repeating: true, as: "statisticsNotes" },
      { name: "NSC", required: false, repeating: false },
      { name: "NTE", required: false, repeating: true, as: "statusNotes" },
    ],
  },
];
