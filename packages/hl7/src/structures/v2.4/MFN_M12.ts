/**
 * Message structure for MFN^M12 messages (HL7 v2.4).
 *
 * Structure: MSH MFI { MF_OBS_ATTRIBUTES: MFE OM1 [OM7] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFN^M12 (HL7 v2.4), in order. */
export const MFN_M12_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_OBS_ATTRIBUTES",
    required: true,
    repeating: true,
    as: "entries",
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "OM1", required: true, repeating: false },
      { name: "OM7", required: false, repeating: false },
    ],
  },
];
