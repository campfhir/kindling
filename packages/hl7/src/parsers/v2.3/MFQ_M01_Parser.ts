/**
 * Parser for MFQ^M01 messages (HL7 v2.3).
 *
 * Structure: MSH QRD [QRF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFQ_M01_STRUCTURE } from "../../structures/v2.3/MFQ_M01.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { QRD } from "../../segments/v2.3/QRD.ts";
import { QRF } from "../../segments/v2.3/QRF.ts";
import { DSC } from "../../segments/v2.3/DSC.ts";

/** Structured result of parsing an HL7 MFQ^M01 (HL7 v2.3) message. */
export interface ParsedMFQ_M01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of MFQ^M01 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 MFQ^M01 (HL7 v2.3) messages. */
export class MFQ_M01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFQ_M01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFQ_M01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFQ_M01> {
    return parseStructure<ParsedMFQ_M01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFQ^M01 (HL7 v2.3) message string into a structured result. */
export function parseMFQ_M01(messageString: string): Result<ParsedMFQ_M01> {
  return new MFQ_M01_Parser().parse(messageString);
}
