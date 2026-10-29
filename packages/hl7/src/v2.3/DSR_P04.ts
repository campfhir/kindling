/**
 * Builder, parser and structure for DSR^P04 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] [QAK] QRD [QRF] {DSP} [DSC]
 * Shares the DSR^Q01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { DSR_Q01_Parser, type ParsedDSR_Q01, DSR_Q01, type DSR_Q01Options } from "./DSR_Q01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { MSA } from "./MSA.ts";
import type { QRD } from "./QRD.ts";
import type { DSP } from "./DSP.ts";

export { DSR_Q01_STRUCTURE as DSR_P04_STRUCTURE } from "./DSR_Q01.ts";

/** Structured result of parsing an HL7 DSR^P04 (HL7 v2.3) message. */
export type ParsedDSR_P04 = ParsedDSR_Q01;

/** Parser for HL7 DSR^P04 (HL7 v2.3) messages. */
export class DSR_P04_Parser extends DSR_Q01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "DSR_P04";
}

/** Parses an HL7 DSR^P04 (HL7 v2.3) message string into a structured result. */
export function parseDSR_P04(messageString: string): Result<ParsedDSR_P04> {
  return new DSR_P04_Parser().parse(messageString);
}

/** The optional segments and groups of an DSR^P04 (HL7 v2.3) message. */
export type DSR_P04Options = DSR_Q01Options;

/** Builder for HL7 DSR^P04 (HL7 v2.3) messages. */
export class DSR_P04<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD> extends DSR_Q01<TMSH, TMSA, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "DSR_P04";
}

/** Builds an HL7 DSR^P04 (HL7 v2.3) message. */
export function createDSR_P04<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  displayLines: DSP[],
  options: DSR_P04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): DSR_P04<TMSH, TMSA, TQRD> {
  return new DSR_P04(header, acknowledgment, query, displayLines, options, encoding);
}
