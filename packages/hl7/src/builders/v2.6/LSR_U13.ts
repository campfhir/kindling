/**
 * Builder for LSR^U13 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EQU {EQP} [ROL]
 * Shares the LSU^U12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { EQU } from "../../segments/v2.6/EQU.ts";
import type { EQP } from "../../segments/v2.6/EQP.ts";
import { LSU_U12, type LSU_U12Options } from "./LSU_U12.ts";

/** The optional segments and groups of an LSR^U13 (HL7 v2.6) message. */
export type LSR_U13Options = LSU_U12Options;

/** Builder for HL7 LSR^U13 (HL7 v2.6) messages. */
export class LSR_U13<TMSH extends MSH = MSH, TEQU extends EQU = EQU> extends LSU_U12<TMSH, TEQU> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "LSR_U13";
}

/** Builds an HL7 LSR^U13 (HL7 v2.6) message. */
export function createLSR_U13<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  equipmentLogServices: EQP[],
  options: LSR_U13Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): LSR_U13<TMSH, TEQU> {
  return new LSR_U13(header, equipmentDetail, equipmentLogServices, options, encoding);
}
