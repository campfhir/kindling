/**
 * Message structure for RAR^RAR messages (HL7 v2.5).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] { DEFINITION: QRD [QRF] [ PATIENT: PID [{NTE}] ] { ORDER: ORC [ ENCODING: RXE {RXR} [{RXC}] ] {RXA} RXR } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of RAR^RAR (HL7 v2.5), in order. */
export const RAR_RAR_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
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
        inline: true,
        segments: [
          { name: "PID", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true, as: "patientNotes" },
        ],
      },
      {
        name: "ORDER",
        required: true,
        repeating: true,
        segments: [
          { name: "ORC", required: true, repeating: false },
          {
            name: "ENCODING",
            required: false,
            repeating: false,
            segments: [
              { name: "RXE", required: true, repeating: false },
              { name: "RXR", required: true, repeating: true },
              { name: "RXC", required: false, repeating: true },
            ],
          },
          { name: "RXA", required: true, repeating: true },
          { name: "RXR", required: true, repeating: false },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];
