/**
 * Builder, parser and structure for LSR^U13 messages (HL7 v2.7.1).
 *
 * Structure: MSH [{SFT}] [UAC] EQU {EQP} [ROL]
 * Shares the LSU^U12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { LSU_U12_Parser, type ParsedLSU_U12, LSU_U12, type LSU_U12Options } from "./LSU_U12.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EQU } from "./EQU.ts";
import type { EQP } from "./EQP.ts";

export { LSU_U12_STRUCTURE as LSR_U13_STRUCTURE } from "./LSU_U12.ts";

/** Structured result of parsing an HL7 LSR^U13 (HL7 v2.7.1) message. */
export type ParsedLSR_U13 = ParsedLSU_U12;

/** Parser for HL7 LSR^U13 (HL7 v2.7.1) messages. */
export class LSR_U13_Parser extends LSU_U12_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "LSR_U13";
}

/** Parses an HL7 LSR^U13 (HL7 v2.7.1) message string into a structured result. */
export function parseLSR_U13(messageString: string): Result<ParsedLSR_U13> {
  return new LSR_U13_Parser().parse(messageString);
}

/** The optional segments and groups of an LSR^U13 (HL7 v2.7.1) message. */
export type LSR_U13Options = LSU_U12Options;

/** Builder for HL7 LSR^U13 (HL7 v2.7.1) messages. */
export class LSR_U13<TMSH extends MSH = MSH, TEQU extends EQU = EQU> extends LSU_U12<TMSH, TEQU> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "LSR_U13";
}

/** Builds an HL7 LSR^U13 (HL7 v2.7.1) message. */
export function createLSR_U13<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  equipmentLogServices: EQP[],
  options: LSR_U13Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): LSR_U13<TMSH, TEQU> {
  return new LSR_U13(header, equipmentDetail, equipmentLogServices, options, encoding);
}
