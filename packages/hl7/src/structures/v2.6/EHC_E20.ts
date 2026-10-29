/**
 * Message structure for EHC^E20 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}]  AUTHORIZATION_REQUEST: IVC {CTD} [{LOC}] [{ROL}] { PAT_INFO: PID [{ACC}] { INSURANCE: IN1 [IN2] } [{ DIAGNOSIS: DG1 [{NTE}] }] [{OBX}] } { PSL_ITEM_INFO: PSL [{NTE}] [{ADJ}] [{LOC}] [{ROL}] } 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of EHC^E20 (HL7 v2.6), in order. */
export const EHC_E20_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  {
    name: "AUTHORIZATION_REQUEST",
    required: true,
    repeating: false,
    segments: [
      { name: "IVC", required: true, repeating: false },
      { name: "CTD", required: true, repeating: true },
      { name: "LOC", required: false, repeating: true },
      { name: "ROL", required: false, repeating: true },
      {
        name: "PAT_INFO",
        required: true,
        repeating: true,
        segments: [
          { name: "PID", required: true, repeating: false },
          { name: "ACC", required: false, repeating: true },
          {
            name: "INSURANCE",
            required: true,
            repeating: true,
            segments: [
              { name: "IN1", required: true, repeating: false },
              { name: "IN2", required: false, repeating: false },
            ],
          },
          {
            name: "DIAGNOSIS",
            required: false,
            repeating: true,
            segments: [
              { name: "DG1", required: true, repeating: false },
              { name: "NTE", required: false, repeating: true },
            ],
          },
          { name: "OBX", required: false, repeating: true },
        ],
      },
      {
        name: "PSL_ITEM_INFO",
        required: true,
        repeating: true,
        segments: [
          { name: "PSL", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
          { name: "ADJ", required: false, repeating: true },
          { name: "LOC", required: false, repeating: true },
          { name: "ROL", required: false, repeating: true },
        ],
      },
    ],
  },
];
