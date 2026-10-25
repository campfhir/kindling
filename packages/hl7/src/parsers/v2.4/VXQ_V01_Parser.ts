/**
 * Parser for VXQ^V01 messages (HL7 v2.4).
 *
 * Structure: MSH QRD [QRF]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { VXQ_V01_STRUCTURE } from "../../structures/v2.4/VXQ_V01.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { QRD } from "../../segments/v2.4/QRD.ts";
import { QRF } from "../../segments/v2.4/QRF.ts";

/** Structured result of parsing an HL7 VXQ^V01 (HL7 v2.4) message. */
export interface ParsedVXQ_V01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
}

/** The segment parsers of VXQ^V01 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
};

/** Parser for HL7 VXQ^V01 (HL7 v2.4) messages. */
export class VXQ_V01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "VXQ_V01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = VXQ_V01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedVXQ_V01> {
    return parseStructure<ParsedVXQ_V01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 VXQ^V01 (HL7 v2.4) message string into a structured result. */
export function parseVXQ_V01(messageString: string): Result<ParsedVXQ_V01> {
  return new VXQ_V01_Parser().parse(messageString);
}
