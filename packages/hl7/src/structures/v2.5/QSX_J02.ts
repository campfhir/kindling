/**
 * Message structure for QSX^J02 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] QID
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of QSX^J02 (HL7 v2.5), in order. */
export const QSX_J02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "QID", required: true, repeating: false },
];
