/**
 * Builder, parser and structure for MFQ^M10 messages (HL7 v2.3).
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

export { MFQ_M01_STRUCTURE as MFQ_M10_STRUCTURE } from "./MFQ_M01.ts";

/** Structured result of parsing an HL7 MFQ^M10 (HL7 v2.3) message. */
export type ParsedMFQ_M10 = ParsedMFQ_M01;

/** Parser for HL7 MFQ^M10 (HL7 v2.3) messages. */
export class MFQ_M10_Parser extends MFQ_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFQ_M10";
}

/** Parses an HL7 MFQ^M10 (HL7 v2.3) message string into a structured result. */
export function parseMFQ_M10(messageString: string): Result<ParsedMFQ_M10> {
  return new MFQ_M10_Parser().parse(messageString);
}

/** The optional segments and groups of an MFQ^M10 (HL7 v2.3) message. */
export type MFQ_M10Options = MFQ_M01Options;

/** Builder for HL7 MFQ^M10 (HL7 v2.3) messages. */
export class MFQ_M10<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends MFQ_M01<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFQ_M10";
}

/** Builds an HL7 MFQ^M10 (HL7 v2.3) message. */
export function createMFQ_M10<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: MFQ_M10Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFQ_M10<TMSH, TQRD> {
  return new MFQ_M10(header, query, options, encoding);
}
