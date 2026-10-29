/**
 * Message structure for ORN^O08 messages (HL7 v2.7).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] RQD [RQ1] [{NTE}] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ORN^O08 (HL7 v2.7), in order. */
export const ORN_O08_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "NTE", required: false, repeating: true },
  {
    name: "RESPONSE",
    required: false,
    repeating: false,
    segments: [
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
          {
            name: "TIMING",
            required: false,
            repeating: true,
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
