/**
 * Builder, parser and structure for QSB^Z83 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] QPD RCP [DSC]
 * Shares the QSB^Q16 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { QSB_Q16_Parser, type ParsedQSB_Q16, QSB_Q16, type QSB_Q16Options } from "./QSB_Q16.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { QPD } from "./QPD.ts";
import type { RCP } from "./RCP.ts";

export { QSB_Q16_STRUCTURE as QSB_Z83_STRUCTURE } from "./QSB_Q16.ts";

/** Structured result of parsing an HL7 QSB^Z83 (HL7 v2.7) message. */
export type ParsedQSB_Z83 = ParsedQSB_Q16;

/** Parser for HL7 QSB^Z83 (HL7 v2.7) messages. */
export class QSB_Z83_Parser extends QSB_Q16_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QSB_Z83";
}

/** Parses an HL7 QSB^Z83 (HL7 v2.7) message string into a structured result. */
export function parseQSB_Z83(messageString: string): Result<ParsedQSB_Z83> {
  return new QSB_Z83_Parser().parse(messageString);
}

/** The optional segments and groups of an QSB^Z83 (HL7 v2.7) message. */
export type QSB_Z83Options = QSB_Q16Options;

/** Builder for HL7 QSB^Z83 (HL7 v2.7) messages. */
export class QSB_Z83<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP> extends QSB_Q16<TMSH, TQPD, TRCP> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QSB_Z83";
}

/** Builds an HL7 QSB^Z83 (HL7 v2.7) message. */
export function createQSB_Z83<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  queryParameters: TQPD,
  responseControl: TRCP,
  options: QSB_Z83Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QSB_Z83<TMSH, TQPD, TRCP> {
  return new QSB_Z83(header, queryParameters, responseControl, options, encoding);
}
