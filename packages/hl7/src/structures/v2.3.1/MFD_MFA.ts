/**
 * Message structure for MFD^MFA messages (HL7 v2.3.1).
 *
 * Structure: MSH MFI [{MFA}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFD^MFA (HL7 v2.3.1), in order. */
export const MFD_MFA_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MFI", required: true, repeating: false },
  { name: "MFA", required: false, repeating: true },
];
