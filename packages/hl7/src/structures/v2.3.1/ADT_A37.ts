/**
 * Message structure for ADT^A37 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN PID [PD1] [PV1] [{DB1}] PID [PD1] [PV1] [{DB1}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A37 (HL7 v2.3.1), in order. */
export const ADT_A37_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "PV1", required: false, repeating: false },
  { name: "DB1", required: false, repeating: true },
  { name: "PID", required: true, repeating: false, as: "otherPatient" },
  { name: "PD1", required: false, repeating: false, as: "otherPatientDemographics" },
  { name: "PV1", required: false, repeating: false, as: "otherVisit" },
  { name: "DB1", required: false, repeating: true, as: "otherDisabilities" },
];
