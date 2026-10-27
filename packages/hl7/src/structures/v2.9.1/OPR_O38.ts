/**
 * Message structure for OPR^O38 messages (HL7 v2.9.1).
 *
 * Structure: MSH MSA [{ARV}] [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: { ORDER: {NK1} [ PATIENT: PID [{PRT}] [{ARV}] ] [{ SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{SAC}] [{ OBSERVATION_REQUEST: ORC [{PRT}] OBR [{PRT}] }] [{ TIMING: TQ1 [{TQ2}] }] }] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of OPR^O38 (HL7 v2.9.1), in order. */
export const OPR_O38_STRUCTURE: StructureItem[] = [
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
        name: "ORDER",
        required: true,
        repeating: true,
        segments: [
          { name: "NK1", required: true, repeating: true },
          {
            name: "PATIENT",
            required: false,
            repeating: false,
            segments: [
              { name: "PID", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
              { name: "ARV", required: false, repeating: true },
            ],
          },
          {
            name: "SPECIMEN",
            required: false,
            repeating: true,
            segments: [
              { name: "SPM", required: true, repeating: false },
              {
                name: "SPECIMEN_OBSERVATION",
                required: false,
                repeating: true,
                segments: [
                  { name: "OBX", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                ],
              },
              { name: "SAC", required: false, repeating: true },
              {
                name: "OBSERVATION_REQUEST",
                required: false,
                repeating: true,
                segments: [
                  { name: "ORC", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                  { name: "OBR", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true, as: "prt2" },
                ],
              },
              {
                name: "TIMING",
                required: false,
                repeating: true,
                segments: [
                  { name: "TQ1", required: true, repeating: false },
                  { name: "TQ2", required: false, repeating: true },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
