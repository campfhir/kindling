/**
 * Message structure for CCQ^I19 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] RF1 [{ PROVIDER_CONTACT: PRD [{CTD}] }] [{REL}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of CCQ^I19 (HL7 v2.9.1), in order. */
export const CCQ_I19_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "RF1", required: true, repeating: false },
  {
    name: "PROVIDER_CONTACT",
    required: false,
    repeating: true,
    segments: [
      { name: "PRD", required: true, repeating: false },
      { name: "CTD", required: false, repeating: true },
    ],
  },
  { name: "REL", required: false, repeating: true },
];
