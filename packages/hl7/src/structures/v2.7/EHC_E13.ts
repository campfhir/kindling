/**
 * Message structure for EHC^E13 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [{UAC}] MSA [{ERR}] RFI [{CTD}] IVC PSS PSG [PID] [PSL] { REQUEST: [CTD] OBR [NTE] { RESPONSE: OBX [NTE] [TXA] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of EHC^E13 (HL7 v2.7), in order. */
export const EHC_E13_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "RFI", required: true, repeating: false },
  { name: "CTD", required: false, repeating: true },
  { name: "IVC", required: true, repeating: false },
  { name: "PSS", required: true, repeating: false },
  { name: "PSG", required: true, repeating: false },
  { name: "PID", required: false, repeating: false },
  { name: "PSL", required: false, repeating: false },
  {
    name: "REQUEST",
    required: true,
    repeating: true,
    segments: [
      { name: "CTD", required: false, repeating: false },
      { name: "OBR", required: true, repeating: false },
      { name: "NTE", required: false, repeating: false },
      {
        name: "RESPONSE",
        required: true,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "NTE", required: false, repeating: false },
          { name: "TXA", required: false, repeating: false },
        ],
      },
    ],
  },
];
