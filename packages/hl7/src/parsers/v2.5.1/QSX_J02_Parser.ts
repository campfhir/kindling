/**
 * Parser for QSX^J02 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] QID
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { QSX_J02_STRUCTURE } from "../../structures/v2.5.1/QSX_J02.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { QID } from "../../segments/v2.5.1/QID.ts";

/** Structured result of parsing an HL7 QSX^J02 (HL7 v2.5.1) message. */
export interface ParsedQSX_J02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The QID segment. */
  queryIdentification: QID;
}

/** The segment parsers of QSX^J02 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  QID: (s, e) => QID.parse(s, e),
};

/** Parser for HL7 QSX^J02 (HL7 v2.5.1) messages. */
export class QSX_J02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QSX_J02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QSX_J02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQSX_J02> {
    return parseStructure<ParsedQSX_J02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QSX^J02 (HL7 v2.5.1) message string into a structured result. */
export function parseQSX_J02(messageString: string): Result<ParsedQSX_J02> {
  return new QSX_J02_Parser().parse(messageString);
}
