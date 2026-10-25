/**
 * Message structure for MFN^M08 messages (HL7 v2.3.1).
 *
 * Structure: MSH MFI { MF_TEST_NUMERIC: MFE OM1 [OM2] [OM3] [OM4] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFN^M08 (HL7 v2.3.1), in order. */
export const MFN_M08_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_TEST_NUMERIC",
    required: true,
    repeating: true,
    as: "entries",
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "OM1", required: true, repeating: false },
      { name: "OM2", required: false, repeating: false },
      { name: "OM3", required: false, repeating: false },
      { name: "OM4", required: false, repeating: false },
    ],
  },
];
