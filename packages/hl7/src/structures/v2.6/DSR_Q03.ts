/**
 * Message structure for DSR^Q03 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] [MSA] [ERR] [QAK] QRD [QRF] {DSP} [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of DSR^Q03 (HL7 v2.6), in order. */
export const DSR_Q03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: false, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: false, repeating: false },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
  { name: "DSP", required: true, repeating: true },
  { name: "DSC", required: false, repeating: false },
];
