/**
 * Message structure for ADT^A05 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{ARV}] [{ROL}] [{NK1}] PV1 [PV2] [{ARV}] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A05 (HL7 v2.6), in order. */
export const ADT_A05_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "ARV", required: false, repeating: true },
  { name: "ROL", required: false, repeating: true },
  { name: "NK1", required: false, repeating: true },
  { name: "PV1", required: true, repeating: false },
  { name: "PV2", required: false, repeating: false },
  { name: "ARV", required: false, repeating: true, as: "arv2" },
  { name: "ROL", required: false, repeating: true, as: "rol2" },
  { name: "DB1", required: false, repeating: true },
  { name: "OBX", required: false, repeating: true },
  { name: "AL1", required: false, repeating: true },
  { name: "DG1", required: false, repeating: true },
  { name: "DRG", required: false, repeating: false },
  {
    name: "PROCEDURE",
    required: false,
    repeating: true,
    segments: [
      { name: "PR1", required: true, repeating: false },
      { name: "ROL", required: false, repeating: true },
    ],
  },
  { name: "GT1", required: false, repeating: true },
  {
    name: "INSURANCE",
    required: false,
    repeating: true,
    segments: [
      { name: "IN1", required: true, repeating: false },
      { name: "IN2", required: false, repeating: false },
      { name: "IN3", required: false, repeating: true },
      { name: "ROL", required: false, repeating: true },
    ],
  },
  { name: "ACC", required: false, repeating: false },
  { name: "UB1", required: false, repeating: false },
  { name: "UB2", required: false, repeating: false },
];
