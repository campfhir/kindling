/**
 * Parser for VQQ^Q07 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] VTQ [RDF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { VQQ_Q07_STRUCTURE } from "../../structures/v2.5.1/VQQ_Q07.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { VTQ } from "../../segments/v2.5.1/VTQ.ts";
import { RDF } from "../../segments/v2.5.1/RDF.ts";
import { DSC } from "../../segments/v2.5.1/DSC.ts";

/** Structured result of parsing an HL7 VQQ^Q07 (HL7 v2.5.1) message. */
export interface ParsedVQQ_Q07 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The VTQ segment. */
  virtualTableQuery: VTQ;
  /** The RDF segment. */
  rowDefinition?: RDF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of VQQ^Q07 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  VTQ: (s, e) => VTQ.parse(s, e),
  RDF: (s, e) => RDF.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 VQQ^Q07 (HL7 v2.5.1) messages. */
export class VQQ_Q07_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "VQQ_Q07";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = VQQ_Q07_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedVQQ_Q07> {
    return parseStructure<ParsedVQQ_Q07>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 VQQ^Q07 (HL7 v2.5.1) message string into a structured result. */
export function parseVQQ_Q07(messageString: string): Result<ParsedVQQ_Q07> {
  return new VQQ_Q07_Parser().parse(messageString);
}
