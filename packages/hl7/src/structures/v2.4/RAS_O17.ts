/**
 * Message structure for RAS^O17 messages (HL7 v2.4).
 *
 * Structure: MSH [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [{AL1}] [ PATIENT_VISIT: PV1 [PV2] ] ] { ORDER: ORC [ ORDER_DETAIL: RXO [ ORDER_DETAIL_SUPPLEMENT: {NTE} {RXR} [ COMPONENT: {RXC} [{NTE}] ] ] ] [ ENCODING: RXE {RXR} [{RXC}] ] {RXA} RXR [{ OBSERVATION: OBX [{NTE}] }] [{CTI}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of RAS^O17 (HL7 v2.4), in order. */
export const RAS_O17_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "NTE", required: false, repeating: true },
  {
    name: "PATIENT",
    required: false,
    repeating: false,
    inline: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "NTE", required: false, repeating: true, as: "patientNotes" },
      { name: "AL1", required: false, repeating: true },
      {
        name: "PATIENT_VISIT",
        required: false,
        repeating: false,
        inline: true,
        segments: [
          { name: "PV1", required: true, repeating: false },
          { name: "PV2", required: false, repeating: false },
        ],
      },
    ],
  },
  {
    name: "ORDER",
    required: true,
    repeating: true,
    segments: [
      { name: "ORC", required: true, repeating: false },
      {
        name: "ORDER_DETAIL",
        required: false,
        repeating: false,
        as: "detail",
        segments: [
          { name: "RXO", required: true, repeating: false },
          {
            name: "ORDER_DETAIL_SUPPLEMENT",
            required: false,
            repeating: false,
            inline: true,
            segments: [
              { name: "NTE", required: true, repeating: true },
              { name: "RXR", required: true, repeating: true },
              {
                name: "COMPONENT",
                required: false,
                repeating: false,
                inline: true,
                segments: [
                  { name: "RXC", required: true, repeating: true },
                  { name: "NTE", required: false, repeating: true, as: "componentNotes" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "ENCODING",
        required: false,
        repeating: false,
        segments: [
          { name: "RXE", required: true, repeating: false },
          { name: "RXR", required: true, repeating: true },
          { name: "RXC", required: false, repeating: true },
        ],
      },
      { name: "RXA", required: true, repeating: true },
      { name: "RXR", required: true, repeating: false },
      {
        name: "OBSERVATION",
        required: false,
        repeating: true,
        as: "observations",
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      { name: "CTI", required: false, repeating: true },
    ],
  },
];
