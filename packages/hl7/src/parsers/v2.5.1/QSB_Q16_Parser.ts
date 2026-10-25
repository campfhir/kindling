/**
 * Parser for QSB^Q16 messages (HL7 v2.5.1).
 *
 * Structure: MSH QPD RCP [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { QSB_Q16_STRUCTURE } from "../../structures/v2.5.1/QSB_Q16.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { QPD } from "../../segments/v2.5.1/QPD.ts";
import { RCP } from "../../segments/v2.5.1/RCP.ts";
import { DSC } from "../../segments/v2.5.1/DSC.ts";

/** Structured result of parsing an HL7 QSB^Q16 (HL7 v2.5.1) message. */
export interface ParsedQSB_Q16 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The RCP segment. */
  responseControl: RCP;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of QSB^Q16 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  QPD: (s, e) => QPD.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 QSB^Q16 (HL7 v2.5.1) messages. */
export class QSB_Q16_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QSB_Q16";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QSB_Q16_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQSB_Q16> {
    return parseStructure<ParsedQSB_Q16>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QSB^Q16 (HL7 v2.5.1) message string into a structured result. */
export function parseQSB_Q16(messageString: string): Result<ParsedQSB_Q16> {
  return new QSB_Q16_Parser().parse(messageString);
}
