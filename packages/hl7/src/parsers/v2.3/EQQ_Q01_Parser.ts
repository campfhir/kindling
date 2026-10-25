/**
 * Parser for EQQ^Q01 messages (HL7 v2.3).
 *
 * Structure: MSH EQL [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { EQQ_Q01_STRUCTURE } from "../../structures/v2.3/EQQ_Q01.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { EQL } from "../../segments/v2.3/EQL.ts";
import { DSC } from "../../segments/v2.3/DSC.ts";

/** Structured result of parsing an HL7 EQQ^Q01 (HL7 v2.3) message. */
export interface ParsedEQQ_Q01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EQL segment. */
  embeddedQuery: EQL;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of EQQ^Q01 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EQL: (s, e) => EQL.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 EQQ^Q01 (HL7 v2.3) messages. */
export class EQQ_Q01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EQQ_Q01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EQQ_Q01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEQQ_Q01> {
    return parseStructure<ParsedEQQ_Q01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EQQ^Q01 (HL7 v2.3) message string into a structured result. */
export function parseEQQ_Q01(messageString: string): Result<ParsedEQQ_Q01> {
  return new EQQ_Q01_Parser().parse(messageString);
}
