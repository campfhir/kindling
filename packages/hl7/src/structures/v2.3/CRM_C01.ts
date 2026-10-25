/**
 * Message structure for CRM^C01 messages (HL7 v2.3).
 *
 * Structure: MSH { PATIENT: PID [PV1] CSR [{CSP}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of CRM^C01 (HL7 v2.3), in order. */
export const CRM_C01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  {
    name: "PATIENT",
    required: true,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PV1", required: false, repeating: false },
      { name: "CSR", required: true, repeating: false },
      { name: "CSP", required: false, repeating: true },
    ],
  },
];
