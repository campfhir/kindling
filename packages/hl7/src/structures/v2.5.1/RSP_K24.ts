/**
 * Message structure for RSP^K24 messages (HL7 v2.5.1).
 *
 * Structure: MSH MSA [ERR] QAK QPD [PID] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of RSP^K24 (HL7 v2.5.1), in order. */
export const RSP_K24_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: true, repeating: false },
  { name: "QPD", required: true, repeating: false },
  { name: "PID", required: false, repeating: false },
  { name: "DSC", required: false, repeating: false },
];
