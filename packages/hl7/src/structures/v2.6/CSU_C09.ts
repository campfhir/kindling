/**
 * Message structure for CSU^C09 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] { PATIENT: PID [PD1] [{NTE}] [ VISIT: PV1 [PV2] ] CSR { STUDY_PHASE: [CSP] { STUDY_SCHEDULE: [CSS] { STUDY_OBSERVATION: [ORC] OBR [{ROL}] [{ TIMING_QTY: TQ1 [{TQ2}] }] {OBX} } { STUDY_PHARM: [ORC] { RX_ADMIN: RXA RXR } } } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of CSU^C09 (HL7 v2.6), in order. */
export const CSU_C09_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  {
    name: "PATIENT",
    required: true,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "NTE", required: false, repeating: true },
      {
        name: "VISIT",
        required: false,
        repeating: false,
        segments: [
          { name: "PV1", required: true, repeating: false },
          { name: "PV2", required: false, repeating: false },
        ],
      },
      { name: "CSR", required: true, repeating: false },
      {
        name: "STUDY_PHASE",
        required: true,
        repeating: true,
        segments: [
          { name: "CSP", required: false, repeating: false },
          {
            name: "STUDY_SCHEDULE",
            required: true,
            repeating: true,
            segments: [
              { name: "CSS", required: false, repeating: false },
              {
                name: "STUDY_OBSERVATION",
                required: true,
                repeating: true,
                segments: [
                  { name: "ORC", required: false, repeating: false },
                  { name: "OBR", required: true, repeating: false },
                  { name: "ROL", required: false, repeating: true },
                  {
                    name: "TIMING_QTY",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "TQ1", required: true, repeating: false },
                      { name: "TQ2", required: false, repeating: true },
                    ],
                  },
                  { name: "OBX", required: true, repeating: true },
                ],
              },
              {
                name: "STUDY_PHARM",
                required: true,
                repeating: true,
                segments: [
                  { name: "ORC", required: false, repeating: false },
                  {
                    name: "RX_ADMIN",
                    required: true,
                    repeating: true,
                    segments: [
                      { name: "RXA", required: true, repeating: false },
                      { name: "RXR", required: true, repeating: false },
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
