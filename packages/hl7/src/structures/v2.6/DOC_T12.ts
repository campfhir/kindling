/**
 * Message structure for DOC^T12 messages (HL7 v2.6).
 *
 * Structure: MSH MSA [ERR] [QAK] QRD { RESULT: [EVN] PID PV1 TXA [{OBX}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of DOC^T12 (HL7 v2.6), in order. */
export const DOC_T12_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: false, repeating: false },
  { name: "QRD", required: true, repeating: false },
  {
    name: "RESULT",
    required: true,
    repeating: true,
    segments: [
      { name: "EVN", required: false, repeating: false },
      { name: "PID", required: true, repeating: false },
      { name: "PV1", required: true, repeating: false },
      { name: "TXA", required: true, repeating: false },
      { name: "OBX", required: false, repeating: true },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];
