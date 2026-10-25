/**
 * Message structure for SUR^P09 messages (HL7 v2.5).
 *
 * Structure: MSH { FACILITY: FAC { PRODUCT: PSH PDC } PSH { FACILITY_DETAIL: FAC PDC NTE } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of SUR^P09 (HL7 v2.5), in order. */
export const SUR_P09_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  {
    name: "FACILITY",
    required: true,
    repeating: true,
    as: "facilities",
    segments: [
      { name: "FAC", required: true, repeating: false },
      {
        name: "PRODUCT",
        required: true,
        repeating: true,
        segments: [
          { name: "PSH", required: true, repeating: false },
          { name: "PDC", required: true, repeating: false },
        ],
      },
      { name: "PSH", required: true, repeating: false },
      {
        name: "FACILITY_DETAIL",
        required: true,
        repeating: true,
        segments: [
          { name: "FAC", required: true, repeating: false },
          { name: "PDC", required: true, repeating: false },
          { name: "NTE", required: true, repeating: false },
        ],
      },
    ],
  },
];
