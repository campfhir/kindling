/**
 * Message structure for QCN^J01 messages (HL7 v2.4).
 *
 * Structure: MSH QID
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of QCN^J01 (HL7 v2.4), in order. */
export const QCN_J01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "QID", required: true, repeating: false },
];
