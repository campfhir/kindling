/**
 * Parser for QBP^Q23 messages (HL7 v2.4).
 *
 * Structure: MSH QPD RCP [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { QBP_Q23_STRUCTURE } from "../../structures/v2.4/QBP_Q23.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { QPD } from "../../segments/v2.4/QPD.ts";
import { RCP } from "../../segments/v2.4/RCP.ts";
import { DSC } from "../../segments/v2.4/DSC.ts";

/** Structured result of parsing an HL7 QBP^Q23 (HL7 v2.4) message. */
export interface ParsedQBP_Q23 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The RCP segment. */
  responseControl: RCP;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of QBP^Q23 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  QPD: (s, e) => QPD.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 QBP^Q23 (HL7 v2.4) messages. */
export class QBP_Q23_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QBP_Q23";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QBP_Q23_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQBP_Q23> {
    return parseStructure<ParsedQBP_Q23>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QBP^Q23 (HL7 v2.4) message string into a structured result. */
export function parseQBP_Q23(messageString: string): Result<ParsedQBP_Q23> {
  return new QBP_Q23_Parser().parse(messageString);
}
