/**
 * Parser for LSR^U13 messages (HL7 v2.4).
 *
 * Structure: MSH EQU {EQP} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { LSR_U13_STRUCTURE } from "../../structures/v2.4/LSR_U13.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { EQU } from "../../segments/v2.4/EQU.ts";
import { EQP } from "../../segments/v2.4/EQP.ts";
import { ROL } from "../../segments/v2.4/ROL.ts";

/** Structured result of parsing an HL7 LSR^U13 (HL7 v2.4) message. */
export interface ParsedLSR_U13 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The EQP segments. */
  equipmentLogServices: EQP[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of LSR^U13 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EQU: (s, e) => EQU.parse(s, e),
  EQP: (s, e) => EQP.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 LSR^U13 (HL7 v2.4) messages. */
export class LSR_U13_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "LSR_U13";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = LSR_U13_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedLSR_U13> {
    return parseStructure<ParsedLSR_U13>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 LSR^U13 (HL7 v2.4) message string into a structured result. */
export function parseLSR_U13(messageString: string): Result<ParsedLSR_U13> {
  return new LSR_U13_Parser().parse(messageString);
}
