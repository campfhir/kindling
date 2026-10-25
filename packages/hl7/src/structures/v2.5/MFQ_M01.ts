/**
 * Message structure for MFQ^M01 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] QRD [QRF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFQ^M01 (HL7 v2.5), in order. */
export const MFQ_M01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
  { name: "DSC", required: false, repeating: false },
];
