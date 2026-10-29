/**
 * Parser for QBP^Z79 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] QPD RCP [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { QBP_Z79_STRUCTURE } from "../../structures/v2.6/QBP_Z79.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { QPD } from "../../segments/v2.6/QPD.ts";
import { RCP } from "../../segments/v2.6/RCP.ts";
import { DSC } from "../../segments/v2.6/DSC.ts";

/** Structured result of parsing an HL7 QBP^Z79 (HL7 v2.6) message. */
export interface ParsedQBP_Z79 extends ParsedMessageBase {
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
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of QBP^Z79 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 QBP^Z79 (HL7 v2.6) messages. */
export class QBP_Z79_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QBP_Z79";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QBP_Z79_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQBP_Z79> {
    return parseStructure<ParsedQBP_Z79>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QBP^Z79 (HL7 v2.6) message string into a structured result. */
export function parseQBP_Z79(messageString: string): Result<ParsedQBP_Z79> {
  return new QBP_Z79_Parser().parse(messageString);
}
