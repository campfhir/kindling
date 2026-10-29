/**
 * Message structure for RQI^I03 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of RQI^I03 (HL7 v2.7), in order. */
export const RQI_I03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  {
    name: "PROVIDER",
    required: true,
    repeating: true,
    segments: [
      { name: "PRD", required: true, repeating: false },
      { name: "CTD", required: false, repeating: true },
    ],
  },
  { name: "PID", required: true, repeating: false },
  { name: "NK1", required: false, repeating: true },
  {
    name: "GUARANTOR_INSURANCE",
    required: false,
    repeating: false,
    segments: [
      { name: "GT1", required: false, repeating: true },
      {
        name: "INSURANCE",
        required: true,
        repeating: true,
        segments: [
          { name: "IN1", required: true, repeating: false },
          { name: "IN2", required: false, repeating: false },
          { name: "IN3", required: false, repeating: false },
        ],
      },
    ],
  },
  { name: "NTE", required: false, repeating: true },
];
