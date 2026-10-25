/**
 * Message structure for PMU^B01 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN STF [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of PMU^B01 (HL7 v2.5), in order. */
export const PMU_B01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EVN", required: true, repeating: false },
  { name: "STF", required: true, repeating: false },
  { name: "PRA", required: false, repeating: true },
  { name: "ORG", required: false, repeating: true },
  { name: "AFF", required: false, repeating: true },
  { name: "LAN", required: false, repeating: true },
  { name: "EDU", required: false, repeating: true },
  { name: "CER", required: false, repeating: true },
];
