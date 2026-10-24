/**
 * Message structure for DFT^P03 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] [{ROL}] [PV1] [PV2] [{ROL}] [{DB1}] [{ COMMON_ORDER: [ORC] [{ TIMING_QUANTITY: TQ1 [{TQ2}] }] [ ORDER: OBR [{NTE}] ] [{ OBSERVATION: OBX [{NTE}] }] }] { FINANCIAL: FT1 [NTE] [{ FINANCIAL_PROCEDURE: PR1 [{ROL}] }] [{ FINANCIAL_COMMON_ORDER: [ORC] [{ FINANCIAL_TIMING_QUANTITY: TQ1 [{TQ2}] }] [ FINANCIAL_ORDER: OBR [{NTE}] ] [{ FINANCIAL_OBSERVATION: OBX [{NTE}] }] }] } [{DG1}] [DRG] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of DFT^P03 (HL7 v2.5), in order. */
export const DFT_P03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "ROL", required: false, repeating: true },
  { name: "PV1", required: false, repeating: false },
  { name: "PV2", required: false, repeating: false },
  { name: "ROL", required: false, repeating: true, as: "visitRolList" },
  { name: "DB1", required: false, repeating: true },
  {
    name: "COMMON_ORDER",
    required: false,
    repeating: true,
    as: "orders",
    segments: [
      { name: "ORC", required: false, repeating: false },
      {
        name: "TIMING_QUANTITY",
        required: false,
        repeating: true,
        as: "timing",
        segments: [
          { name: "TQ1", required: true, repeating: false },
          { name: "TQ2", required: false, repeating: true },
        ],
      },
      {
        name: "ORDER",
        required: false,
        repeating: false,
        inline: true,
        segments: [
          { name: "OBR", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true, as: "obrNteList" },
        ],
      },
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
    ],
  },
  {
    name: "FINANCIAL",
    required: true,
    repeating: true,
    segments: [
      { name: "FT1", required: true, repeating: false },
      { name: "NTE", required: false, repeating: false },
      {
        name: "FINANCIAL_PROCEDURE",
        required: false,
        repeating: true,
        as: "procedures",
        segments: [
          { name: "PR1", required: true, repeating: false },
          { name: "ROL", required: false, repeating: true },
        ],
      },
      {
        name: "FINANCIAL_COMMON_ORDER",
        required: false,
        repeating: true,
        as: "orders",
        segments: [
          { name: "ORC", required: false, repeating: false },
          {
            name: "FINANCIAL_TIMING_QUANTITY",
            required: false,
            repeating: true,
            as: "timing",
            segments: [
              { name: "TQ1", required: true, repeating: false },
              { name: "TQ2", required: false, repeating: true },
            ],
          },
          {
            name: "FINANCIAL_ORDER",
            required: false,
            repeating: false,
            inline: true,
            segments: [
              { name: "OBR", required: true, repeating: false },
              { name: "NTE", required: false, repeating: true, as: "obrNteList" },
            ],
          },
          {
            name: "FINANCIAL_OBSERVATION",
            required: false,
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
  { name: "DG1", required: false, repeating: true },
  { name: "DRG", required: false, repeating: false },
  { name: "GT1", required: false, repeating: true },
  {
    name: "INSURANCE",
    required: false,
    repeating: true,
    as: "insurances",
    segments: [
      { name: "IN1", required: true, repeating: false },
      { name: "IN2", required: false, repeating: false },
      { name: "IN3", required: false, repeating: true },
      { name: "ROL", required: false, repeating: true },
    ],
  },
  { name: "ACC", required: false, repeating: false },
];
