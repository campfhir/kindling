/**
 * Message structure for NMR^N01 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] [QRD] { CLOCK_AND_STATS_WITH_NOTES_ALT: [NCK] [{NTE}] [NST] [{NTE}] [NSC] [{NTE}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of NMR^N01 (HL7 v2.6), in order. */
export const NMR_N01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "QRD", required: false, repeating: false },
  {
    name: "CLOCK_AND_STATS_WITH_NOTES_ALT",
    required: true,
    repeating: true,
    segments: [
      { name: "NCK", required: false, repeating: false },
      { name: "NTE", required: false, repeating: true },
      { name: "NST", required: false, repeating: false },
      { name: "NTE", required: false, repeating: true, as: "nte2" },
      { name: "NSC", required: false, repeating: false },
      { name: "NTE", required: false, repeating: true, as: "nte3" },
    ],
  },
];
