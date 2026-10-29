/**
 * Parser for QRY^Q01 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] QRD [QRF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { QRY_Q01_STRUCTURE } from "../../structures/v2.6/QRY_Q01.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { QRD } from "../../segments/v2.6/QRD.ts";
import { QRF } from "../../segments/v2.6/QRF.ts";
import { DSC } from "../../segments/v2.6/DSC.ts";

/** Structured result of parsing an HL7 QRY^Q01 (HL7 v2.6) message. */
export interface ParsedQRY_Q01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of QRY^Q01 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 QRY^Q01 (HL7 v2.6) messages. */
export class QRY_Q01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QRY_Q01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QRY_Q01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQRY_Q01> {
    return parseStructure<ParsedQRY_Q01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QRY^Q01 (HL7 v2.6) message string into a structured result. */
export function parseQRY_Q01(messageString: string): Result<ParsedQRY_Q01> {
  return new QRY_Q01_Parser().parse(messageString);
}
