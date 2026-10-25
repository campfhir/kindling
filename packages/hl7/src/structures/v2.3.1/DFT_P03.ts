/**
 * Message structure for DFT^P03 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN PID [PD1] [PV1] [PV2] [{DB1}] [{OBX}] { FINANCIAL: FT1 [{ FINANCIAL_PROCEDURE: PR1 [{ROL}] }] } [{DG1}] [DRG] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] }] [ACC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of DFT^P03 (HL7 v2.3.1), in order. */
export const DFT_P03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "PV1", required: false, repeating: false },
  { name: "PV2", required: false, repeating: false },
  { name: "DB1", required: false, repeating: true },
  { name: "OBX", required: false, repeating: true },
  {
    name: "FINANCIAL",
    required: true,
    repeating: true,
    segments: [
      { name: "FT1", required: true, repeating: false },
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
    ],
  },
  { name: "ACC", required: false, repeating: false },
];
