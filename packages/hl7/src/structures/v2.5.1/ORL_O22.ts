/**
 * Message structure for ORL^O22 messages (HL7 v2.5.1).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [{NTE}] [ RESPONSE: [ PATIENT: PID [{ ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ OBSERVATION_REQUEST: OBR [{ SPECIMEN: SPM [{SAC}] }] ] }] ] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ORL^O22 (HL7 v2.5.1), in order. */
export const ORL_O22_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
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
          {
            name: "ORDER",
            required: false,
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
              {
                name: "OBSERVATION_REQUEST",
                required: false,
                repeating: false,
                segments: [
                  { name: "OBR", required: true, repeating: false },
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
    ],
  },
];
