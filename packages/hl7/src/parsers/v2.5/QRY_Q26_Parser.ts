/**
 * Parser for QRY^Q26 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] QRD [QRF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { QRY_Q26_STRUCTURE } from "../../structures/v2.5/QRY_Q26.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { QRD } from "../../segments/v2.5/QRD.ts";
import { QRF } from "../../segments/v2.5/QRF.ts";
import { DSC } from "../../segments/v2.5/DSC.ts";

/** Structured result of parsing an HL7 QRY^Q26 (HL7 v2.5) message. */
export interface ParsedQRY_Q26 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of QRY^Q26 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 QRY^Q26 (HL7 v2.5) messages. */
export class QRY_Q26_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QRY_Q26";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QRY_Q26_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQRY_Q26> {
    return parseStructure<ParsedQRY_Q26>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QRY^Q26 (HL7 v2.5) message string into a structured result. */
export function parseQRY_Q26(messageString: string): Result<ParsedQRY_Q26> {
  return new QRY_Q26_Parser().parse(messageString);
}
