/**
 * Message structure for ORD^O04 messages (HL7 v2.5.1).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER_DIET: ORC [{ TIMING_DIET: TQ1 [{TQ2}] }] [{ODS}] [{NTE}] } [{ ORDER_TRAY: ORC [{ TIMING_TRAY: TQ1 [{TQ2}] }] [{ODT}] [{NTE}] }] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ORD^O04 (HL7 v2.5.1), in order. */
export const ORD_O04_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "NTE", required: false, repeating: true },
  {
    name: "RESPONSE",
    required: false,
    repeating: false,
    inline: true,
    segments: [
      {
        name: "PATIENT",
        required: false,
        repeating: false,
        inline: true,
        segments: [
          { name: "PID", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true, as: "patientNotes" },
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
            name: "TIMING_DIET",
            required: false,
            repeating: true,
            as: "timings",
            segments: [
              { name: "TQ1", required: true, repeating: false },
              { name: "TQ2", required: false, repeating: true },
            ],
          },
          { name: "ODS", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "ORDER_TRAY",
        required: false,
        repeating: true,
        as: "trayOrders",
        segments: [
          { name: "ORC", required: true, repeating: false },
          {
            name: "TIMING_TRAY",
            required: false,
            repeating: true,
            as: "timings",
            segments: [
              { name: "TQ1", required: true, repeating: false },
              { name: "TQ2", required: false, repeating: true },
            ],
          },
          { name: "ODT", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
];
