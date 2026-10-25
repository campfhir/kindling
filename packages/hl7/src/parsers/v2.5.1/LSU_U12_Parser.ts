/**
 * Parser for LSU^U12 messages (HL7 v2.5.1).
 *
 * Structure: MSH EQU {EQP} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { LSU_U12_STRUCTURE } from "../../structures/v2.5.1/LSU_U12.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { EQU } from "../../segments/v2.5.1/EQU.ts";
import { EQP } from "../../segments/v2.5.1/EQP.ts";
import { ROL } from "../../segments/v2.5.1/ROL.ts";

/** Structured result of parsing an HL7 LSU^U12 (HL7 v2.5.1) message. */
export interface ParsedLSU_U12 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The EQP segments. */
  equipmentLogServices: EQP[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of LSU^U12 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EQU: (s, e) => EQU.parse(s, e),
  EQP: (s, e) => EQP.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 LSU^U12 (HL7 v2.5.1) messages. */
export class LSU_U12_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "LSU_U12";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = LSU_U12_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedLSU_U12> {
    return parseStructure<ParsedLSU_U12>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 LSU^U12 (HL7 v2.5.1) message string into a structured result. */
export function parseLSU_U12(messageString: string): Result<ParsedLSU_U12> {
  return new LSU_U12_Parser().parse(messageString);
}
