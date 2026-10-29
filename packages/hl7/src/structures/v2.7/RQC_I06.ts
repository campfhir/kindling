/**
 * Message structure for RQC^I06 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] QRD [QRF] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of RQC^I06 (HL7 v2.7), in order. */
export const RQC_I06_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
  {
    name: "PROVIDER",
    required: true,
    repeating: true,
    segments: [
      { name: "PRD", required: true, repeating: false },
      { name: "CTD", required: false, repeating: true },
    ],
  },
  { name: "PID", required: true, repeating: false },
  { name: "NK1", required: false, repeating: true },
  { name: "GT1", required: false, repeating: true },
  { name: "NTE", required: false, repeating: true },
];
