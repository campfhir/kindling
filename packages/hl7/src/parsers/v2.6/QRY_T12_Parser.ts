/**
 * Parser for QRY^T12 messages (HL7 v2.6).
 *
 * Structure: MSH QRD [QRF]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { QRY_T12_STRUCTURE } from "../../structures/v2.6/QRY_T12.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { QRD } from "../../segments/v2.6/QRD.ts";
import { QRF } from "../../segments/v2.6/QRF.ts";

/** Structured result of parsing an HL7 QRY^T12 (HL7 v2.6) message. */
export interface ParsedQRY_T12 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
}

/** The segment parsers of QRY^T12 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
};

/** Parser for HL7 QRY^T12 (HL7 v2.6) messages. */
export class QRY_T12_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QRY_T12";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QRY_T12_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQRY_T12> {
    return parseStructure<ParsedQRY_T12>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QRY^T12 (HL7 v2.6) message string into a structured result. */
export function parseQRY_T12(messageString: string): Result<ParsedQRY_T12> {
  return new QRY_T12_Parser().parse(messageString);
}
