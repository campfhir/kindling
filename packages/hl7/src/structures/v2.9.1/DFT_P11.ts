/**
 * Message structure for DFT^P11 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [{PRT}] [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ROL}] [ VISIT: [PV1] [PV2] [{PRT}] [{ROL}] ] [{DB1}] [{ COMMON_ORDER: ORC [{PRT}] [{ TIMING_QUANTITY: TQ1 [{TQ2}] }] [ ORDER: OBR [{PRT}] [{NTE}] ] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] }] [{ DIAGNOSIS: DG1 }] [DRG] [{GT1}] [{GSP}] [{GSR}] [{ INSURANCE: IN1 [{GSP}] [{GSR}] [IN2] [{IN3}] [{PRT}] [{ROL}] }] [ACC] { FINANCIAL: FT1 [{NTE}] [{PRT}] [{ FINANCIAL_PROCEDURE: PR1 [{PRT}] [{ROL}] }] [{ FINANCIAL_OBSERVATION_STANDALONE: OBX [{PRT}] [{NTE}] }] [{ FINANCIAL_ORDER_STANDALONE: OBR [{PRT}] [{NTE}] [{ FINANCIAL_OBSERVATION: OBX [{PRT}] [{NTE}] }] }] [{ FINANCIAL_COMMON_ORDER: ORC [{PRT}] [{ FINANCIAL_TIMING_QUANTITY: TQ1 [{TQ2}] }] [ FINANCIAL_ORDER: OBR [{PRT}] [{NTE}] ] [{ FINANCIAL_OBSERVATION: OBX [{PRT}] [{NTE}] }] }] [{ DIAGNOSIS_FT1: DG1 }] [DRG] [{GT1}] [{GSP}] [{GSR}] [{ FINANCIAL_INSURANCE: IN1 [{GSP}] [{GSR}] [IN2] [{IN3}] [{PRT}] [{ROL}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of DFT^P11 (HL7 v2.9.1), in order. */
export const DFT_P11_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PRT", required: false, repeating: true },
  { name: "PD1", required: false, repeating: false },
  { name: "GSP", required: false, repeating: true },
  { name: "GSR", required: false, repeating: true },
  { name: "GSC", required: false, repeating: true },
  { name: "PRT", required: false, repeating: true, as: "prt2" },
  { name: "ROL", required: false, repeating: true },
  {
    name: "VISIT",
    required: false,
    repeating: false,
    segments: [
      { name: "PV1", required: false, repeating: false },
      { name: "PV2", required: false, repeating: false },
      { name: "PRT", required: false, repeating: true },
      { name: "ROL", required: false, repeating: true },
    ],
  },
  { name: "DB1", required: false, repeating: true },
  {
    name: "COMMON_ORDER",
    required: false,
    repeating: true,
    segments: [
      { name: "ORC", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
      {
        name: "TIMING_QUANTITY",
        required: false,
        repeating: true,
        segments: [
          { name: "TQ1", required: true, repeating: false },
          { name: "TQ2", required: false, repeating: true },
        ],
      },
      {
        name: "ORDER",
        required: false,
        repeating: false,
        segments: [
          { name: "OBR", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "OBSERVATION",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
  {
    name: "DIAGNOSIS",
    required: false,
    repeating: true,
    segments: [
      { name: "DG1", required: true, repeating: false },
    ],
  },
  { name: "DRG", required: false, repeating: false },
  { name: "GT1", required: false, repeating: true },
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
  {
    name: "FINANCIAL",
    required: true,
    repeating: true,
    segments: [
      { name: "FT1", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      { name: "PRT", required: false, repeating: true },
      {
        name: "FINANCIAL_PROCEDURE",
        required: false,
        repeating: true,
        segments: [
          { name: "PR1", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "ROL", required: false, repeating: true },
        ],
      },
      {
        name: "FINANCIAL_OBSERVATION_STANDALONE",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "FINANCIAL_ORDER_STANDALONE",
        required: false,
        repeating: true,
        segments: [
          { name: "OBR", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
          {
            name: "FINANCIAL_OBSERVATION",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
              { name: "NTE", required: false, repeating: true },
            ],
          },
        ],
      },
      {
        name: "FINANCIAL_COMMON_ORDER",
        required: false,
        repeating: true,
        segments: [
          { name: "ORC", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          {
            name: "FINANCIAL_TIMING_QUANTITY",
            required: false,
            repeating: true,
            segments: [
              { name: "TQ1", required: true, repeating: false },
              { name: "TQ2", required: false, repeating: true },
            ],
          },
          {
            name: "FINANCIAL_ORDER",
            required: false,
            repeating: false,
            segments: [
              { name: "OBR", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
              { name: "NTE", required: false, repeating: true },
            ],
          },
          {
            name: "FINANCIAL_OBSERVATION",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
              { name: "NTE", required: false, repeating: true },
            ],
          },
        ],
      },
      {
        name: "DIAGNOSIS_FT1",
        required: false,
        repeating: true,
        segments: [
          { name: "DG1", required: true, repeating: false },
        ],
      },
      { name: "DRG", required: false, repeating: false },
      { name: "GT1", required: false, repeating: true },
      { name: "GSP", required: false, repeating: true },
      { name: "GSR", required: false, repeating: true },
      {
        name: "FINANCIAL_INSURANCE",
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
    ],
  },
];
