/**
 * Builder, parser and structure for QBP^Z77 messages (HL7 v2.9).
 *
 * Structure: MSH [{SFT}] [UAC] QPD [PID] [RDF] RCP [RDF] [DSC]
 * Shares the QBP^Z75 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { QBP_Z75_Parser, type ParsedQBP_Z75, QBP_Z75, type QBP_Z75Options } from "./QBP_Z75.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { QPD } from "./QPD.ts";
import type { RCP } from "./RCP.ts";

export { QBP_Z75_STRUCTURE as QBP_Z77_STRUCTURE } from "./QBP_Z75.ts";

/** Structured result of parsing an HL7 QBP^Z77 (HL7 v2.9) message. */
export type ParsedQBP_Z77 = ParsedQBP_Z75;

/** Parser for HL7 QBP^Z77 (HL7 v2.9) messages. */
export class QBP_Z77_Parser extends QBP_Z75_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QBP_Z77";
}

/** Parses an HL7 QBP^Z77 (HL7 v2.9) message string into a structured result. */
export function parseQBP_Z77(messageString: string): Result<ParsedQBP_Z77> {
  return new QBP_Z77_Parser().parse(messageString);
}

/** The optional segments and groups of an QBP^Z77 (HL7 v2.9) message. */
export type QBP_Z77Options = QBP_Z75Options;

/** Builder for HL7 QBP^Z77 (HL7 v2.9) messages. */
export class QBP_Z77<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP> extends QBP_Z75<TMSH, TQPD, TRCP> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QBP_Z77";
}

/** Builds an HL7 QBP^Z77 (HL7 v2.9) message. */
export function createQBP_Z77<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  queryParameters: TQPD,
  responseControl: TRCP,
  options: QBP_Z77Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QBP_Z77<TMSH, TQPD, TRCP> {
  return new QBP_Z77(header, queryParameters, responseControl, options, encoding);
}
