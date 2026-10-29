/**
 * Message structure for RSP^E22 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}] MSA [{ERR}]  QUERY_ACK: QAK QPD [ AUTHORIZATION_INFO: IVC PSG { PSL_ITEM_INFO: PSL } ] 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of RSP^E22 (HL7 v2.6), in order. */
export const RSP_E22_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  {
    name: "QUERY_ACK",
    required: true,
    repeating: false,
    segments: [
      { name: "QAK", required: true, repeating: false },
      { name: "QPD", required: true, repeating: false },
      {
        name: "AUTHORIZATION_INFO",
        required: false,
        repeating: false,
        segments: [
          { name: "IVC", required: true, repeating: false },
          { name: "PSG", required: true, repeating: false },
          {
            name: "PSL_ITEM_INFO",
            required: true,
            repeating: true,
            segments: [
              { name: "PSL", required: true, repeating: false },
            ],
          },
        ],
      },
    ],
  },
];
