/**
 * Message structure for NMD^N02 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] { CLOCK_AND_STATS_WITH_NOTES: [ CLOCK: NCK [{NTE}] ] [ APP_STATS: NST [{NTE}] ] [ APP_STATUS: NSC [{NTE}] ] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of NMD^N02 (HL7 v2.6), in order. */
export const NMD_N02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  {
    name: "CLOCK_AND_STATS_WITH_NOTES",
    required: true,
    repeating: true,
    segments: [
      {
        name: "CLOCK",
        required: false,
        repeating: false,
        segments: [
          { name: "NCK", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "APP_STATS",
        required: false,
        repeating: false,
        segments: [
          { name: "NST", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "APP_STATUS",
        required: false,
        repeating: false,
        segments: [
          { name: "NSC", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
];
