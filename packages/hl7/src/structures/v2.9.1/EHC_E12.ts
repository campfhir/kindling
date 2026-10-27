/**
 * Message structure for EHC^E12 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [{UAC}] RFI [{CTD}] IVC PSS PSG [PID] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{PSL}] { REQUEST: [CTD] OBR [{PRT}] [NTE] [{OBX}] [{PRT}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of EHC^E12 (HL7 v2.9.1), in order. */
export const EHC_E12_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  { name: "RFI", required: true, repeating: false },
  { name: "CTD", required: false, repeating: true },
  { name: "IVC", required: true, repeating: false },
  { name: "PSS", required: true, repeating: false },
  { name: "PSG", required: true, repeating: false },
  { name: "PID", required: false, repeating: false },
  { name: "GSP", required: false, repeating: true },
  { name: "GSR", required: false, repeating: true },
  { name: "GSC", required: false, repeating: true },
  { name: "PRT", required: false, repeating: true },
  { name: "PSL", required: false, repeating: true },
  {
    name: "REQUEST",
    required: true,
    repeating: true,
    segments: [
      { name: "CTD", required: false, repeating: false },
      { name: "OBR", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
      { name: "NTE", required: false, repeating: false },
      { name: "OBX", required: false, repeating: true },
      { name: "PRT", required: false, repeating: true, as: "prt2" },
    ],
  },
];
