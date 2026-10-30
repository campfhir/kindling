/**
 * Builder, parser and structure for QBP^Z95 messages (HL7 v2.9).
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

export { QBP_Z99_STRUCTURE as QBP_Z95_STRUCTURE } from "./QBP_Z99.ts";

/** Structured result of parsing an HL7 QBP^Z95 (HL7 v2.9) message. */
export type ParsedQBP_Z95 = ParsedQBP_Z99;

/** Parser for HL7 QBP^Z95 (HL7 v2.9) messages. */
export class QBP_Z95_Parser extends QBP_Z99_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QBP_Z95";
}

/** Parses an HL7 QBP^Z95 (HL7 v2.9) message string into a structured result. */
export function parseQBP_Z95(messageString: string): Result<ParsedQBP_Z95> {
  return new QBP_Z95_Parser().parse(messageString);
}

/** The optional segments and groups of an QBP^Z95 (HL7 v2.9) message. */
export type QBP_Z95Options = QBP_Z99Options;

/** Builder for HL7 QBP^Z95 (HL7 v2.9) messages. */
export class QBP_Z95<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP> extends QBP_Z99<TMSH, TQPD, TRCP> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QBP_Z95";
}

/** Builds an HL7 QBP^Z95 (HL7 v2.9) message. */
export function createQBP_Z95<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  queryParameters: TQPD,
  responseControl: TRCP,
  options: QBP_Z95Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QBP_Z95<TMSH, TQPD, TRCP> {
  return new QBP_Z95(header, queryParameters, responseControl, options, encoding);
}
