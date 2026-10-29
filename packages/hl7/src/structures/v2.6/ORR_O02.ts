/**
 * Message structure for ORR^O02 messages (HL7 v2.6).
 *
 * Structure: MSH MSA [{ERR}] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{CTI}] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ORR^O02 (HL7 v2.6), in order. */
export const ORR_O02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
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
          { oneOf: ["OBR", "RQD", "RQ1", "RXO", "ODS", "ODT"], required: true },
          { name: "NTE", required: false, repeating: true },
          { name: "CTI", required: false, repeating: true },
        ],
      },
    ],
  },
];
