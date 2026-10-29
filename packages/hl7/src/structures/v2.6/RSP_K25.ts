/**
 * Message structure for RSP^K25 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] QAK QPD RCP { STAFF: STF [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of RSP^K25 (HL7 v2.6), in order. */
export const RSP_K25_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "QAK", required: true, repeating: false },
  { name: "QPD", required: true, repeating: false },
  { name: "RCP", required: true, repeating: false },
  {
    name: "STAFF",
    required: true,
    repeating: true,
    segments: [
      { name: "STF", required: true, repeating: false },
      { name: "PRA", required: false, repeating: true },
      { name: "ORG", required: false, repeating: true },
      { name: "AFF", required: false, repeating: true },
      { name: "LAN", required: false, repeating: true },
      { name: "EDU", required: false, repeating: true },
      { name: "CER", required: false, repeating: true },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];
