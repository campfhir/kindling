/**
 * Message structure for CRM^C01 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] { PATIENT: PID [{PRT}] [ PATIENT_VISIT: PV1 [{PRT}] ] CSR [{CSP}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of CRM^C01 (HL7 v2.7), in order. */
export const CRM_C01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  {
    name: "PATIENT",
    required: true,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
      {
        name: "PATIENT_VISIT",
        required: false,
        repeating: false,
        segments: [
          { name: "PV1", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
        ],
      },
      { name: "CSR", required: true, repeating: false },
      { name: "CSP", required: false, repeating: true },
    ],
  },
];
