/**
 * Message structure for OSR^Q06 messages (HL7 v2.5).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [{NTE}] QRD [QRF] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{CTI}] ] } ] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of OSR^Q06 (HL7 v2.5), in order. */
export const OSR_Q06_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "NTE", required: false, repeating: true },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
  {
    name: "RESPONSE",
    required: false,
    repeating: false,
    inline: true,
    segments: [
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
            name: "TIMING",
            required: false,
            repeating: true,
            as: "timings",
            segments: [
              { name: "TQ1", required: true, repeating: false },
              { name: "TQ2", required: false, repeating: true },
            ],
          },
          {
            name: "ORDER_DETAIL",
            required: false,
            repeating: false,
            as: "detail",
            segments: [
              { oneOf: ["OBR", "RQD", "RQ1", "RXO", "ODS", "ODT"], required: true },
              { name: "NTE", required: false, repeating: true },
              { name: "CTI", required: false, repeating: true },
            ],
          },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];
