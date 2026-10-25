/**
 * Message structure for ORL^O22 messages (HL7 v2.5.1).
 *
 * Structure: MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID { GENERAL_ORDER: [ CONTAINER: SAC [{OBX}] ] [{ ORDER: ORC [ OBSERVATION_REQUEST: OBR [{SAC}] ] }] } ] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ORL^O22 (HL7 v2.5.1), in order. */
export const ORL_O22_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
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
            name: "GENERAL_ORDER",
            required: true,
            repeating: true,
            segments: [
              {
                name: "CONTAINER",
                required: false,
                repeating: false,
                segments: [
                  { name: "SAC", required: true, repeating: false },
                  { name: "OBX", required: false, repeating: true },
                ],
              },
              {
                name: "ORDER",
                required: false,
                repeating: true,
                segments: [
                  { name: "ORC", required: true, repeating: false },
                  {
                    name: "OBSERVATION_REQUEST",
                    required: false,
                    repeating: false,
                    segments: [
                      { name: "OBR", required: true, repeating: false },
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
