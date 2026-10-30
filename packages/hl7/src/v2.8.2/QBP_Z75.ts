/**
 * Builder, parser and structure for QBP^Z75 messages (HL7 v2.8.2).
 *
 * Structure: MSH [{SFT}] [UAC] QPD [PID] [RDF] RCP [RDF] [DSC]
 * Shares the QBP^Z99 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { QBP_Z99_Parser, type ParsedQBP_Z99, QBP_Z99, type QBP_Z99Options } from "./QBP_Z99.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { QPD } from "./QPD.ts";
import type { RCP } from "./RCP.ts";

export { QBP_Z99_STRUCTURE as QBP_Z75_STRUCTURE } from "./QBP_Z99.ts";

/** Structured result of parsing an HL7 QBP^Z75 (HL7 v2.8.2) message. */
export type ParsedQBP_Z75 = ParsedQBP_Z99;

/** Parser for HL7 QBP^Z75 (HL7 v2.8.2) messages. */
export class QBP_Z75_Parser extends QBP_Z99_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QBP_Z75";
}

/** Parses an HL7 QBP^Z75 (HL7 v2.8.2) message string into a structured result. */
export function parseQBP_Z75(messageString: string): Result<ParsedQBP_Z75> {
  return new QBP_Z75_Parser().parse(messageString);
}

/** The optional segments and groups of an QBP^Z75 (HL7 v2.8.2) message. */
export type QBP_Z75Options = QBP_Z99Options;

/** Builder for HL7 QBP^Z75 (HL7 v2.8.2) messages. */
export class QBP_Z75<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP> extends QBP_Z99<TMSH, TQPD, TRCP> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QBP_Z75";
}

/** Builds an HL7 QBP^Z75 (HL7 v2.8.2) message. */
export function createQBP_Z75<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  queryParameters: TQPD,
  responseControl: TRCP,
  options: QBP_Z75Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QBP_Z75<TMSH, TQPD, TRCP> {
  return new QBP_Z75(header, queryParameters, responseControl, options, encoding);
}
