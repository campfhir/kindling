/**
 * Parser for VQQ^Q01 messages (HL7 v2.3).
 *
 * Structure: MSH VTQ [RDF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { VQQ_Q01_STRUCTURE } from "../../structures/v2.3/VQQ_Q01.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { VTQ } from "../../segments/v2.3/VTQ.ts";
import { RDF } from "../../segments/v2.3/RDF.ts";
import { DSC } from "../../segments/v2.3/DSC.ts";

/** Structured result of parsing an HL7 VQQ^Q01 (HL7 v2.3) message. */
export interface ParsedVQQ_Q01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The VTQ segment. */
  virtualTableQuery: VTQ;
  /** The RDF segment. */
  rowDefinition?: RDF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of VQQ^Q01 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  VTQ: (s, e) => VTQ.parse(s, e),
  RDF: (s, e) => RDF.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 VQQ^Q01 (HL7 v2.3) messages. */
export class VQQ_Q01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "VQQ_Q01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = VQQ_Q01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedVQQ_Q01> {
    return parseStructure<ParsedVQQ_Q01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 VQQ^Q01 (HL7 v2.3) message string into a structured result. */
export function parseVQQ_Q01(messageString: string): Result<ParsedVQQ_Q01> {
  return new VQQ_Q01_Parser().parse(messageString);
}
