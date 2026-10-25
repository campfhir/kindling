/**
 * Message structure for ORS^O06 messages (HL7 v2.5).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] RQD [RQ1] [{NTE}] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ORS^O06 (HL7 v2.5), in order. */
export const ORS_O06_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "NTE", required: false, repeating: true },
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
          { name: "RQD", required: true, repeating: false },
          { name: "RQ1", required: false, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
];
