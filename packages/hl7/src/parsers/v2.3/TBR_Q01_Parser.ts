/**
 * Parser for TBR^Q01 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] QAK RDF {RDT} [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { TBR_Q01_STRUCTURE } from "../../structures/v2.3/TBR_Q01.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { ERR } from "../../segments/v2.3/ERR.ts";
import { QAK } from "../../segments/v2.3/QAK.ts";
import { RDF } from "../../segments/v2.3/RDF.ts";
import { RDT } from "../../segments/v2.3/RDT.ts";
import { DSC } from "../../segments/v2.3/DSC.ts";

/** Structured result of parsing an HL7 TBR^Q01 (HL7 v2.3) message. */
export interface ParsedTBR_Q01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The RDF segment. */
  rowDefinition: RDF;
  /** The RDT segments. */
  rows: RDT[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of TBR^Q01 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  RDF: (s, e) => RDF.parse(s, e),
  RDT: (s, e) => RDT.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 TBR^Q01 (HL7 v2.3) messages. */
export class TBR_Q01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "TBR_Q01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = TBR_Q01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedTBR_Q01> {
    return parseStructure<ParsedTBR_Q01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 TBR^Q01 (HL7 v2.3) message string into a structured result. */
export function parseTBR_Q01(messageString: string): Result<ParsedTBR_Q01> {
  return new TBR_Q01_Parser().parse(messageString);
}
