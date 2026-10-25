/**
 * Message structure for MFR^M05 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] [QAK] QRD [QRF] MFI { MF_QUERY: MFE LOC [{LCH}] [{LRL}] { MF_LOC_DEPT: LDP [{LCH}] [{LCC}] } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFR^M05 (HL7 v2.4), in order. */
export const MFR_M05_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
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
      { name: "LOC", required: true, repeating: false },
      { name: "LCH", required: false, repeating: true },
      { name: "LRL", required: false, repeating: true },
      {
        name: "MF_LOC_DEPT",
        required: true,
        repeating: true,
        as: "departments",
        segments: [
          { name: "LDP", required: true, repeating: false },
          { name: "LCH", required: false, repeating: true },
          { name: "LCC", required: false, repeating: true },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];
