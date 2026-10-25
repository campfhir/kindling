/**
 * Parser for TBR^R08 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA [ERR] QAK RDF {RDT} [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { TBR_R08_STRUCTURE } from "../../structures/v2.3.1/TBR_R08.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { MSA } from "../../segments/v2.3.1/MSA.ts";
import { ERR } from "../../segments/v2.3.1/ERR.ts";
import { QAK } from "../../segments/v2.3.1/QAK.ts";
import { RDF } from "../../segments/v2.3.1/RDF.ts";
import { RDT } from "../../segments/v2.3.1/RDT.ts";
import { DSC } from "../../segments/v2.3.1/DSC.ts";

/** Structured result of parsing an HL7 TBR^R08 (HL7 v2.3.1) message. */
export interface ParsedTBR_R08 extends ParsedMessageBase {
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

/** The segment parsers of TBR^R08 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  RDF: (s, e) => RDF.parse(s, e),
  RDT: (s, e) => RDT.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 TBR^R08 (HL7 v2.3.1) messages. */
export class TBR_R08_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "TBR_R08";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = TBR_R08_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedTBR_R08> {
    return parseStructure<ParsedTBR_R08>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 TBR^R08 (HL7 v2.3.1) message string into a structured result. */
export function parseTBR_R08(messageString: string): Result<ParsedTBR_R08> {
  return new TBR_R08_Parser().parse(messageString);
}
