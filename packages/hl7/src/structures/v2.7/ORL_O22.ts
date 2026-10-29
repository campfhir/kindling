/**
 * Message structure for ORL^O22 messages (HL7 v2.7).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: PID [{PRT}] [{ ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [ OBSERVATION_REQUEST: OBR [{PRT}] [{ SPECIMEN: SPM [{SAC}] }] ] }] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ORL^O22 (HL7 v2.7), in order. */
export const ORL_O22_STRUCTURE: StructureItem[] = [
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
      { name: "PID", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
      {
        name: "ORDER",
        required: false,
        repeating: true,
        segments: [
          { name: "ORC", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          {
            name: "TIMING",
            required: false,
            repeating: true,
            segments: [
              { name: "TQ1", required: true, repeating: false },
              { name: "TQ2", required: false, repeating: true },
            ],
          },
          {
            name: "OBSERVATION_REQUEST",
            required: false,
            repeating: false,
            segments: [
              { name: "OBR", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
              {
                name: "SPECIMEN",
                required: false,
                repeating: true,
                segments: [
                  { name: "SPM", required: true, repeating: false },
                  { name: "SAC", required: false, repeating: true },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
