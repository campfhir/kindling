/**
 * Parser for SPQ^Q01 messages (HL7 v2.3).
 *
 * Structure: MSH SPR [RDF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { SPQ_Q01_STRUCTURE } from "../../structures/v2.3/SPQ_Q01.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { SPR } from "../../segments/v2.3/SPR.ts";
import { RDF } from "../../segments/v2.3/RDF.ts";
import { DSC } from "../../segments/v2.3/DSC.ts";

/** Structured result of parsing an HL7 SPQ^Q01 (HL7 v2.3) message. */
export interface ParsedSPQ_Q01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SPR segment. */
  storedProcedureRequest: SPR;
  /** The RDF segment. */
  rowDefinition?: RDF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of SPQ^Q01 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SPR: (s, e) => SPR.parse(s, e),
  RDF: (s, e) => RDF.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 SPQ^Q01 (HL7 v2.3) messages. */
export class SPQ_Q01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SPQ_Q01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SPQ_Q01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSPQ_Q01> {
    return parseStructure<ParsedSPQ_Q01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SPQ^Q01 (HL7 v2.3) message string into a structured result. */
export function parseSPQ_Q01(messageString: string): Result<ParsedSPQ_Q01> {
  return new SPQ_Q01_Parser().parse(messageString);
}
