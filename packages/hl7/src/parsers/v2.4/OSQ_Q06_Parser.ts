/**
 * Parser for OSQ^Q06 messages (HL7 v2.4).
 *
 * Structure: MSH QRD [QRF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { OSQ_Q06_STRUCTURE } from "../../structures/v2.4/OSQ_Q06.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { QRD } from "../../segments/v2.4/QRD.ts";
import { QRF } from "../../segments/v2.4/QRF.ts";
import { DSC } from "../../segments/v2.4/DSC.ts";

/** Structured result of parsing an HL7 OSQ^Q06 (HL7 v2.4) message. */
export interface ParsedOSQ_Q06 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of OSQ^Q06 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 OSQ^Q06 (HL7 v2.4) messages. */
export class OSQ_Q06_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OSQ_Q06";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OSQ_Q06_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOSQ_Q06> {
    return parseStructure<ParsedOSQ_Q06>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OSQ^Q06 (HL7 v2.4) message string into a structured result. */
export function parseOSQ_Q06(messageString: string): Result<ParsedOSQ_Q06> {
  return new OSQ_Q06_Parser().parse(messageString);
}
