/**
 * Builder, parser and structure for MFQ^M03 messages (HL7 v2.4).
 *
 * Structure: MSH QRD [QRF] [DSC]
 * Shares the MFQ^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { MFQ_M01_Parser, type ParsedMFQ_M01, MFQ_M01, type MFQ_M01Options } from "./MFQ_M01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { QRD } from "./QRD.ts";

export { MFQ_M01_STRUCTURE as MFQ_M03_STRUCTURE } from "./MFQ_M01.ts";

/** Structured result of parsing an HL7 MFQ^M03 (HL7 v2.4) message. */
export type ParsedMFQ_M03 = ParsedMFQ_M01;

/** Parser for HL7 MFQ^M03 (HL7 v2.4) messages. */
export class MFQ_M03_Parser extends MFQ_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFQ_M03";
}

/** Parses an HL7 MFQ^M03 (HL7 v2.4) message string into a structured result. */
export function parseMFQ_M03(messageString: string): Result<ParsedMFQ_M03> {
  return new MFQ_M03_Parser().parse(messageString);
}

/** The optional segments and groups of an MFQ^M03 (HL7 v2.4) message. */
export type MFQ_M03Options = MFQ_M01Options;

/** Builder for HL7 MFQ^M03 (HL7 v2.4) messages. */
export class MFQ_M03<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends MFQ_M01<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFQ_M03";
}

/** Builds an HL7 MFQ^M03 (HL7 v2.4) message. */
export function createMFQ_M03<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: MFQ_M03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFQ_M03<TMSH, TQRD> {
  return new MFQ_M03(header, query, options, encoding);
}
