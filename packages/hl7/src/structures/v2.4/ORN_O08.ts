/**
 * Message structure for ORN^O08 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC RQD [RQ1] [{NTE}] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ORN^O08 (HL7 v2.4), in order. */
export const ORN_O08_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
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
          { name: "RQD", required: true, repeating: false },
          { name: "RQ1", required: false, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
];
