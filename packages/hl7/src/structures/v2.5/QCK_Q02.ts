/**
 * Message structure for QCK^Q02 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA [ERR] [QAK]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of QCK^Q02 (HL7 v2.5), in order. */
export const QCK_Q02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: false, repeating: false },
];
