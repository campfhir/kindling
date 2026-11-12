/**
 * Builder, parser and structure for QRY^Q28 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] QRD [QRF] [DSC]
 * Shares the QRY^Q01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import type { ParsedHL7MessageOf } from "../dispatch.ts";
import { QRY_Q01_Parser, type ParsedQRY_Q01, QRY_Q01, type QRY_Q01Options } from "./QRY_Q01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { QRD } from "./QRD.ts";

export { QRY_Q01_STRUCTURE as QRY_Q28_STRUCTURE } from "./QRY_Q01.ts";

/** Structured result of parsing an HL7 QRY^Q28 (HL7 v2.6) message. */
export type ParsedQRY_Q28 = ParsedQRY_Q01;

/**
 * An HL7 QRY^Q28 (HL7 v2.6) message as the root `parse()` returns it. Narrow a parsed
 * message to it with `isMessage<DispatchedQRY_Q28>(message, "2.6", "QRY_Q28")` of `@campfhir/hl7/parse`.
 */
export type DispatchedQRY_Q28 = ParsedHL7MessageOf<"2.6", "QRY_Q28", ParsedQRY_Q28>;

/** Parser for HL7 QRY^Q28 (HL7 v2.6) messages. */
export class QRY_Q28_Parser extends QRY_Q01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_Q28";
}

/** Parses an HL7 QRY^Q28 (HL7 v2.6) message string into a structured result. */
export function parseQRY_Q28(messageString: string): Result<ParsedQRY_Q28> {
  return new QRY_Q28_Parser().parse(messageString);
}

/** The optional segments and groups of an QRY^Q28 (HL7 v2.6) message. */
export type QRY_Q28Options = QRY_Q01Options;

/** Builder for HL7 QRY^Q28 (HL7 v2.6) messages. */
export class QRY_Q28<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends QRY_Q01<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_Q28";
}

/** Builds an HL7 QRY^Q28 (HL7 v2.6) message. */
export function createQRY_Q28<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_Q28Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_Q28<TMSH, TQRD> {
  return new QRY_Q28(header, query, options, encoding);
}
