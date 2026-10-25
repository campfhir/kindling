/**
 * Message structure for OMD^O01 messages (HL7 v2.3).
 *
 * Structure: MSH [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { ORDER_DIET: ORC [ DIET: {ODS} [{NTE}] { OBSERVATION: OBX [{NTE}] } ] } [{ ORDER_TRAY: ORC {ODT} [{NTE}] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of OMD^O01 (HL7 v2.3), in order. */
export const OMD_O01_STRUCTURE: StructureItem[] = [
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
      {
        name: "INSURANCE",
        required: false,
        repeating: true,
        segments: [
          { name: "IN1", required: true, repeating: false },
          { name: "IN2", required: false, repeating: false },
          { name: "IN3", required: false, repeating: false },
        ],
      },
      { name: "GT1", required: false, repeating: false },
      { name: "AL1", required: false, repeating: true },
    ],
  },
  {
    name: "ORDER_DIET",
    required: true,
    repeating: true,
    as: "dietOrders",
    segments: [
      { name: "ORC", required: true, repeating: false },
      {
        name: "DIET",
        required: false,
        repeating: false,
        inline: true,
        segments: [
          { name: "ODS", required: true, repeating: true },
          { name: "NTE", required: false, repeating: true },
          {
            name: "OBSERVATION",
            required: true,
            repeating: true,
            as: "observations",
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "NTE", required: false, repeating: true },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "ORDER_TRAY",
    required: false,
    repeating: true,
    as: "trayOrders",
    segments: [
      { name: "ORC", required: true, repeating: false },
      { name: "ODT", required: true, repeating: true },
      { name: "NTE", required: false, repeating: true },
    ],
  },
];
