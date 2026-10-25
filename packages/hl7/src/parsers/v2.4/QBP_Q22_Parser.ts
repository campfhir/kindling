/**
 * Parser for QBP^Q22 messages (HL7 v2.4).
 *
 * Structure: MSH QPD RCP [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { QBP_Q22_STRUCTURE } from "../../structures/v2.4/QBP_Q22.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { QPD } from "../../segments/v2.4/QPD.ts";
import { RCP } from "../../segments/v2.4/RCP.ts";
import { DSC } from "../../segments/v2.4/DSC.ts";

/** Structured result of parsing an HL7 QBP^Q22 (HL7 v2.4) message. */
export interface ParsedQBP_Q22 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The RCP segment. */
  responseControl: RCP;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of QBP^Q22 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  QPD: (s, e) => QPD.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 QBP^Q22 (HL7 v2.4) messages. */
export class QBP_Q22_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QBP_Q22";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QBP_Q22_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQBP_Q22> {
    return parseStructure<ParsedQBP_Q22>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QBP^Q22 (HL7 v2.4) message string into a structured result. */
export function parseQBP_Q22(messageString: string): Result<ParsedQBP_Q22> {
  return new QBP_Q22_Parser().parse(messageString);
}
