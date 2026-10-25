/**
 * Parser for EQQ^Q04 messages (HL7 v2.4).
 *
 * Structure: MSH EQL [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { EQQ_Q04_STRUCTURE } from "../../structures/v2.4/EQQ_Q04.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { EQL } from "../../segments/v2.4/EQL.ts";
import { DSC } from "../../segments/v2.4/DSC.ts";

/** Structured result of parsing an HL7 EQQ^Q04 (HL7 v2.4) message. */
export interface ParsedEQQ_Q04 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EQL segment. */
  embeddedQuery: EQL;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of EQQ^Q04 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EQL: (s, e) => EQL.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 EQQ^Q04 (HL7 v2.4) messages. */
export class EQQ_Q04_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EQQ_Q04";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EQQ_Q04_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEQQ_Q04> {
    return parseStructure<ParsedEQQ_Q04>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EQQ^Q04 (HL7 v2.4) message string into a structured result. */
export function parseEQQ_Q04(messageString: string): Result<ParsedEQQ_Q04> {
  return new EQQ_Q04_Parser().parse(messageString);
}
