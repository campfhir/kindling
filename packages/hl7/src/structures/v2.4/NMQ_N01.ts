/**
 * Message structure for NMQ^N01 messages (HL7 v2.4).
 *
 * Structure: MSH [ QRY_WITH_DETAIL: QRD [QRF] ] { CLOCK_AND_STATISTICS: [NCK] [NST] [NSC] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of NMQ^N01 (HL7 v2.4), in order. */
export const NMQ_N01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  {
    name: "QRY_WITH_DETAIL",
    required: false,
    repeating: false,
    inline: true,
    segments: [
      { name: "QRD", required: true, repeating: false },
      { name: "QRF", required: false, repeating: false },
    ],
  },
  {
    name: "CLOCK_AND_STATISTICS",
    required: true,
    repeating: true,
    as: "clockAndStatistics",
    segments: [
      { name: "NCK", required: false, repeating: false },
      { name: "NST", required: false, repeating: false },
      { name: "NSC", required: false, repeating: false },
    ],
  },
];
