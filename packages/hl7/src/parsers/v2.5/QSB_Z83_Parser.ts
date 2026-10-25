/**
 * Parser for QSB^Z83 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] QPD RCP [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { QSB_Z83_STRUCTURE } from "../../structures/v2.5/QSB_Z83.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { QPD } from "../../segments/v2.5/QPD.ts";
import { RCP } from "../../segments/v2.5/RCP.ts";
import { DSC } from "../../segments/v2.5/DSC.ts";

/** Structured result of parsing an HL7 QSB^Z83 (HL7 v2.5) message. */
export interface ParsedQSB_Z83 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The QPD segment. */
  queryParameters: QPD;
  /** The RCP segment. */
  responseControl: RCP;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of QSB^Z83 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 QSB^Z83 (HL7 v2.5) messages. */
export class QSB_Z83_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QSB_Z83";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QSB_Z83_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQSB_Z83> {
    return parseStructure<ParsedQSB_Z83>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QSB^Z83 (HL7 v2.5) message string into a structured result. */
export function parseQSB_Z83(messageString: string): Result<ParsedQSB_Z83> {
  return new QSB_Z83_Parser().parse(messageString);
}
