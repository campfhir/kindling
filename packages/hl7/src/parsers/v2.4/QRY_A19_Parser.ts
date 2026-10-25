/**
 * Parser for QRY^A19 messages (HL7 v2.4).
 *
 * Structure: MSH QRD [QRF]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { QRY_A19_STRUCTURE } from "../../structures/v2.4/QRY_A19.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { QRD } from "../../segments/v2.4/QRD.ts";
import { QRF } from "../../segments/v2.4/QRF.ts";

/** Structured result of parsing an HL7 QRY^A19 (HL7 v2.4) message. */
export interface ParsedQRY_A19 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
}

/** The segment parsers of QRY^A19 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
};

/** Parser for HL7 QRY^A19 (HL7 v2.4) messages. */
export class QRY_A19_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QRY_A19";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QRY_A19_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQRY_A19> {
    return parseStructure<ParsedQRY_A19>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QRY^A19 (HL7 v2.4) message string into a structured result. */
export function parseQRY_A19(messageString: string): Result<ParsedQRY_A19> {
  return new QRY_A19_Parser().parse(messageString);
}
