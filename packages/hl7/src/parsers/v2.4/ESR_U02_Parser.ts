/**
 * Parser for ESR^U02 messages (HL7 v2.4).
 *
 * Structure: MSH EQU [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ESR_U02_STRUCTURE } from "../../structures/v2.4/ESR_U02.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { EQU } from "../../segments/v2.4/EQU.ts";
import { ROL } from "../../segments/v2.4/ROL.ts";

/** Structured result of parsing an HL7 ESR^U02 (HL7 v2.4) message. */
export interface ParsedESR_U02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of ESR^U02 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EQU: (s, e) => EQU.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 ESR^U02 (HL7 v2.4) messages. */
export class ESR_U02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ESR_U02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ESR_U02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedESR_U02> {
    return parseStructure<ParsedESR_U02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ESR^U02 (HL7 v2.4) message string into a structured result. */
export function parseESR_U02(messageString: string): Result<ParsedESR_U02> {
  return new ESR_U02_Parser().parse(messageString);
}
