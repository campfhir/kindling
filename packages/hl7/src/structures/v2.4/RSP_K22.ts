/**
 * Message structure for RSP^K22 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] QAK QPD [{ QUERY_RESPONSE: PID [PD1] [QRI] }] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of RSP^K22 (HL7 v2.4), in order. */
export const RSP_K22_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: true, repeating: false },
  { name: "QPD", required: true, repeating: false },
  {
    name: "QUERY_RESPONSE",
    required: false,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "QRI", required: false, repeating: false },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];
