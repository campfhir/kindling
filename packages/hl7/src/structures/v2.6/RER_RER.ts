/**
 * Message structure for RER^RER messages (HL7 v2.6).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] { DEFINITION: QRD [QRF] [ PATIENT: PID [{NTE}] ] { ORDER: ORC RXE {RXR} [{RXC}] } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of RER^RER (HL7 v2.6), in order. */
export const RER_RER_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  {
    name: "DEFINITION",
    required: true,
    repeating: true,
    segments: [
      { name: "QRD", required: true, repeating: false },
      { name: "QRF", required: false, repeating: false },
      {
        name: "PATIENT",
        required: false,
        repeating: false,
        segments: [
          { name: "PID", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "ORDER",
        required: true,
        repeating: true,
        segments: [
          { name: "ORC", required: true, repeating: false },
          { name: "RXE", required: true, repeating: false },
          { name: "RXR", required: true, repeating: true },
          { name: "RXC", required: false, repeating: true },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];
