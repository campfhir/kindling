/**
 * Message structure for ORL^O36 messages (HL7 v2.6).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: PID { SPECIMEN: SPM [{OBX}] [{NTE}] { SPECIMEN_CONTAINER: SAC [{ ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ OBSERVATION_REQUEST: OBR [{ROL}] ] }] } } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ORL^O36 (HL7 v2.6), in order. */
export const ORL_O36_STRUCTURE: StructureItem[] = [
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
      {
        name: "SPECIMEN",
        required: true,
        repeating: true,
        segments: [
          { name: "SPM", required: true, repeating: false },
          { name: "OBX", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
          {
            name: "SPECIMEN_CONTAINER",
            required: true,
            repeating: true,
            segments: [
              { name: "SAC", required: true, repeating: false },
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
                      { name: "ROL", required: false, repeating: true },
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
