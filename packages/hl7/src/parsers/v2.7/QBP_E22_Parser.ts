/**
 * Parser for QBP^E22 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [{UAC}]  QUERY: QPD RCP 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { QBP_E22_STRUCTURE } from "../../structures/v2.7/QBP_E22.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { QPD } from "../../segments/v2.7/QPD.ts";
import { RCP } from "../../segments/v2.7/RCP.ts";

/** The QUERY group of a parsed QBP^E22 (HL7 v2.7) message. */
export interface ParsedQuery {
  /** The QPD segment. */
  queryParameters: QPD;
  /** The RCP segment. */
  responseControl: RCP;
}

/** Structured result of parsing an HL7 QBP^E22 (HL7 v2.7) message. */
export interface ParsedQBP_E22 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The QUERY group. */
  query: ParsedQuery;
}

/** The segment parsers of QBP^E22 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
};

/** Parser for HL7 QBP^E22 (HL7 v2.7) messages. */
export class QBP_E22_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QBP_E22";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QBP_E22_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQBP_E22> {
    return parseStructure<ParsedQBP_E22>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QBP^E22 (HL7 v2.7) message string into a structured result. */
export function parseQBP_E22(messageString: string): Result<ParsedQBP_E22> {
  return new QBP_E22_Parser().parse(messageString);
}
