/**
 * Message structure for ORL^O40 messages (HL7 v2.9.1).
 *
 * Structure: MSH MSA [{ARV}] [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{PRT}] [{ARV}] [{ ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [ OBSERVATION_REQUEST: OBR [{PRT}] [{ SPECIMEN_SHIPMENT: SHP { PACKAGE: PAC [{ SPECIMEN_IN_PACKAGE: SPM [{ SPECIMEN_CONTAINER_IN_PACKAGE: SAC }] }] } }] ] }] ] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ORL^O40 (HL7 v2.9.1), in order. */
export const ORL_O40_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
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
          { name: "PRT", required: false, repeating: true },
          { name: "ARV", required: false, repeating: true },
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
                    name: "SPECIMEN_SHIPMENT",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "SHP", required: true, repeating: false },
                      {
                        name: "PACKAGE",
                        required: true,
                        repeating: true,
                        segments: [
                          { name: "PAC", required: true, repeating: false },
                          {
                            name: "SPECIMEN_IN_PACKAGE",
                            required: false,
                            repeating: true,
                            segments: [
                              { name: "SPM", required: true, repeating: false },
                              {
                                name: "SPECIMEN_CONTAINER_IN_PACKAGE",
                                required: false,
                                repeating: true,
                                segments: [
                                  { name: "SAC", required: true, repeating: false },
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
            ],
          },
        ],
      },
    ],
  },
];
