/**
 * Parser for QCN^J01 messages (HL7 v2.5.1).
 *
 * Structure: MSH QID
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { QCN_J01_STRUCTURE } from "../../structures/v2.5.1/QCN_J01.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { QID } from "../../segments/v2.5.1/QID.ts";

/** Structured result of parsing an HL7 QCN^J01 (HL7 v2.5.1) message. */
export interface ParsedQCN_J01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The QID segment. */
  queryIdentification: QID;
}

/** The segment parsers of QCN^J01 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  QID: (s, e) => QID.parse(s, e),
};

/** Parser for HL7 QCN^J01 (HL7 v2.5.1) messages. */
export class QCN_J01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QCN_J01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QCN_J01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQCN_J01> {
    return parseStructure<ParsedQCN_J01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QCN^J01 (HL7 v2.5.1) message string into a structured result. */
export function parseQCN_J01(messageString: string): Result<ParsedQCN_J01> {
  return new QCN_J01_Parser().parse(messageString);
}
