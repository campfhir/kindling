/**
 * Message structure for ADR^A19 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] [QAK] QRD [QRF] { QUERY_RESPONSE: [EVN] PID [PD1] [{ROL}] [{NK1}] PV1 [PV2] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADR^A19 (HL7 v2.4), in order. */
export const ADR_A19_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: false, repeating: false },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
  {
    name: "QUERY_RESPONSE",
    required: true,
    repeating: true,
    segments: [
      { name: "EVN", required: false, repeating: false },
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "ROL", required: false, repeating: true },
      { name: "NK1", required: false, repeating: true },
      { name: "PV1", required: true, repeating: false },
      { name: "PV2", required: false, repeating: false },
      { name: "ROL", required: false, repeating: true, as: "visitRoles" },
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
        as: "insuranceGroups",
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
    ],
  },
  { name: "DSC", required: false, repeating: false },
];
