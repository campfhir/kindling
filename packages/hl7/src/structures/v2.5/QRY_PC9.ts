/**
 * Message structure for QRY^PC9 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] QRD [QRF]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of QRY^PC9 (HL7 v2.5), in order. */
export const QRY_PC9_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
];
