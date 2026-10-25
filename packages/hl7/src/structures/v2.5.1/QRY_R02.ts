/**
 * Message structure for QRY^R02 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] QRD QRF
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of QRY^R02 (HL7 v2.5.1), in order. */
export const QRY_R02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: true, repeating: false },
];
