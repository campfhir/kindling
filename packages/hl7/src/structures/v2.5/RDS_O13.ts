/**
 * Message structure for RDS^O13 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [{AL1}] [ PATIENT_VISIT: PV1 [PV2] ] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: RXO [ ORDER_DETAIL_SUPPLEMENT: {NTE} {RXR} [{ COMPONENT: RXC [{NTE}] }] ] ] [ ENCODING: RXE [{NTE}] { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] ] RXD [{NTE}] {RXR} [{RXC}] [{ OBSERVATION: OBX [{NTE}] }] [{FT1}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of RDS^O13 (HL7 v2.5), in order. */
export const RDS_O13_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
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
        name: "TIMING",
        required: false,
        repeating: true,
        as: "timings",
        segments: [
          { name: "TQ1", required: true, repeating: false },
          { name: "TQ2", required: false, repeating: true },
        ],
      },
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
                repeating: true,
                as: "components",
                segments: [
                  { name: "RXC", required: true, repeating: false },
                  { name: "NTE", required: false, repeating: true },
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
          { name: "NTE", required: false, repeating: true },
          {
            name: "TIMING_ENCODED",
            required: true,
            repeating: true,
            as: "encodedTimings",
            segments: [
              { name: "TQ1", required: true, repeating: false },
              { name: "TQ2", required: false, repeating: true },
            ],
          },
          { name: "RXR", required: true, repeating: true },
          { name: "RXC", required: false, repeating: true },
        ],
      },
      { name: "RXD", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      { name: "RXR", required: true, repeating: true },
      { name: "RXC", required: false, repeating: true },
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
      { name: "FT1", required: false, repeating: true },
    ],
  },
];
