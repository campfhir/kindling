/**
 * Parser for QRY^PC4 messages (HL7 v2.5).
 *
 * Structure: MSH QRD [QRF]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { QRY_PC4_STRUCTURE } from "../../structures/v2.5/QRY_PC4.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { QRD } from "../../segments/v2.5/QRD.ts";
import { QRF } from "../../segments/v2.5/QRF.ts";

/** Structured result of parsing an HL7 QRY^PC4 (HL7 v2.5) message. */
export interface ParsedQRY_PC4 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
}

/** The segment parsers of QRY^PC4 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
};

/** Parser for HL7 QRY^PC4 (HL7 v2.5) messages. */
export class QRY_PC4_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QRY_PC4";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QRY_PC4_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQRY_PC4> {
    return parseStructure<ParsedQRY_PC4>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QRY^PC4 (HL7 v2.5) message string into a structured result. */
export function parseQRY_PC4(messageString: string): Result<ParsedQRY_PC4> {
  return new QRY_PC4_Parser().parse(messageString);
}
