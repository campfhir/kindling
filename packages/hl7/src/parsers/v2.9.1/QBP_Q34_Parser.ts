/**
 * Parser for QBP^Q34 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] QPD RCP
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { QBP_Q34_STRUCTURE } from "../../structures/v2.9.1/QBP_Q34.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { QPD } from "../../segments/v2.9.1/QPD.ts";
import { RCP } from "../../segments/v2.9.1/RCP.ts";

/** Structured result of parsing an HL7 QBP^Q34 (HL7 v2.9.1) message. */
export interface ParsedQBP_Q34 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The RCP segment. */
  responseControl: RCP;
}

/** The segment parsers of QBP^Q34 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
};

/** Parser for HL7 QBP^Q34 (HL7 v2.9.1) messages. */
export class QBP_Q34_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QBP_Q34";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QBP_Q34_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQBP_Q34> {
    return parseStructure<ParsedQBP_Q34>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QBP^Q34 (HL7 v2.9.1) message string into a structured result. */
export function parseQBP_Q34(messageString: string): Result<ParsedQBP_Q34> {
  return new QBP_Q34_Parser().parse(messageString);
}
