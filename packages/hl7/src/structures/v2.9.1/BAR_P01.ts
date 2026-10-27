/**
 * Message structure for BAR^P01 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ROL}] { VISIT: PV1 [PV2] [{PRT}] [{ROL}] [{DB1}] [{OBX}] [{PRT}] [{AL1}] [{ DIAGNOSIS: DG1 }] [DRG] [{ PROCEDURE: PR1 [{PRT}] [{ROL}] }] [{GT1}] [{GSP}] [{GSR}] [{NK1}] [{GSP}] [{GSR}] [{ INSURANCE: IN1 [{GSP}] [{GSR}] [IN2] [{IN3}] [{PRT}] [{ROL}] }] [ACC] [UB1] [UB2] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of BAR^P01 (HL7 v2.9.1), in order. */
export const BAR_P01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "GSP", required: false, repeating: true },
  { name: "GSR", required: false, repeating: true },
  { name: "GSC", required: false, repeating: true },
  { name: "PRT", required: false, repeating: true },
  { name: "ROL", required: false, repeating: true },
  {
    name: "VISIT",
    required: true,
    repeating: true,
    segments: [
      { name: "PV1", required: true, repeating: false },
      { name: "PV2", required: false, repeating: false },
      { name: "PRT", required: false, repeating: true },
      { name: "ROL", required: false, repeating: true },
      { name: "DB1", required: false, repeating: true },
      { name: "OBX", required: false, repeating: true },
      { name: "PRT", required: false, repeating: true, as: "prt2" },
      { name: "AL1", required: false, repeating: true },
      {
        name: "DIAGNOSIS",
        required: false,
        repeating: true,
        segments: [
          { name: "DG1", required: true, repeating: false },
        ],
      },
      { name: "DRG", required: false, repeating: false },
      {
        name: "PROCEDURE",
        required: false,
        repeating: true,
        segments: [
          { name: "PR1", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "ROL", required: false, repeating: true },
        ],
      },
      { name: "GT1", required: false, repeating: true },
      { name: "GSP", required: false, repeating: true },
      { name: "GSR", required: false, repeating: true },
      { name: "NK1", required: false, repeating: true },
      { name: "GSP", required: false, repeating: true, as: "gsp2" },
      { name: "GSR", required: false, repeating: true, as: "gsr2" },
      {
        name: "INSURANCE",
        required: false,
        repeating: true,
        segments: [
          { name: "IN1", required: true, repeating: false },
          { name: "GSP", required: false, repeating: true },
          { name: "GSR", required: false, repeating: true },
          { name: "IN2", required: false, repeating: false },
          { name: "IN3", required: false, repeating: true },
          { name: "PRT", required: false, repeating: true },
          { name: "ROL", required: false, repeating: true },
        ],
      },
      { name: "ACC", required: false, repeating: false },
      { name: "UB1", required: false, repeating: false },
      { name: "UB2", required: false, repeating: false },
    ],
  },
];
