/**
 * Message structure for VXX^V02 messages (HL7 v2.3).
 *
 * Structure: MSH MSA QRD [QRF] { PATIENT: PID [{NK1}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of VXX^V02 (HL7 v2.3), in order. */
export const VXX_V02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
  {
    name: "PATIENT",
    required: true,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "NK1", required: false, repeating: true },
    ],
  },
];
