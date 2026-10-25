/**
 * Parser for QVR^Q17 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] QPD RCP [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { QVR_Q17_STRUCTURE } from "../../structures/v2.5.1/QVR_Q17.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { QPD } from "../../segments/v2.5.1/QPD.ts";
import { RCP } from "../../segments/v2.5.1/RCP.ts";
import { DSC } from "../../segments/v2.5.1/DSC.ts";

/** Structured result of parsing an HL7 QVR^Q17 (HL7 v2.5.1) message. */
export interface ParsedQVR_Q17 extends ParsedMessageBase {
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

/** The segment parsers of QVR^Q17 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 QVR^Q17 (HL7 v2.5.1) messages. */
export class QVR_Q17_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QVR_Q17";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QVR_Q17_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQVR_Q17> {
    return parseStructure<ParsedQVR_Q17>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QVR^Q17 (HL7 v2.5.1) message string into a structured result. */
export function parseQVR_Q17(messageString: string): Result<ParsedQVR_Q17> {
  return new QVR_Q17_Parser().parse(messageString);
}
