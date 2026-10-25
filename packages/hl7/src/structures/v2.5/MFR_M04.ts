/**
 * Message structure for MFR^M04 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA [{ERR}] [QAK] QRD [QRF] MFI { MF_QUERY: MFE CDM [{PRC}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFR^M04 (HL7 v2.5), in order. */
export const MFR_M04_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "QAK", required: false, repeating: false },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_QUERY",
    required: true,
    repeating: true,
    as: "entries",
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "CDM", required: true, repeating: false },
      { name: "PRC", required: false, repeating: true },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];
