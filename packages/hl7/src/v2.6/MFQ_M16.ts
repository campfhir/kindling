/**
 * Builder, parser and structure for MFQ^M16 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] QRD [QRF] [DSC]
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

export { MFQ_M01_STRUCTURE as MFQ_M16_STRUCTURE } from "./MFQ_M01.ts";

/** Structured result of parsing an HL7 MFQ^M16 (HL7 v2.6) message. */
export type ParsedMFQ_M16 = ParsedMFQ_M01;

/** Parser for HL7 MFQ^M16 (HL7 v2.6) messages. */
export class MFQ_M16_Parser extends MFQ_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFQ_M16";
}

/** Parses an HL7 MFQ^M16 (HL7 v2.6) message string into a structured result. */
export function parseMFQ_M16(messageString: string): Result<ParsedMFQ_M16> {
  return new MFQ_M16_Parser().parse(messageString);
}

/** The optional segments and groups of an MFQ^M16 (HL7 v2.6) message. */
export type MFQ_M16Options = MFQ_M01Options;

/** Builder for HL7 MFQ^M16 (HL7 v2.6) messages. */
export class MFQ_M16<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends MFQ_M01<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFQ_M16";
}

/** Builds an HL7 MFQ^M16 (HL7 v2.6) message. */
export function createMFQ_M16<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: MFQ_M16Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFQ_M16<TMSH, TQRD> {
  return new MFQ_M16(header, query, options, encoding);
}
