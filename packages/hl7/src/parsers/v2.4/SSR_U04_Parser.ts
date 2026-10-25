/**
 * Parser for SSR^U04 messages (HL7 v2.4).
 *
 * Structure: MSH EQU {SAC} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { SSR_U04_STRUCTURE } from "../../structures/v2.4/SSR_U04.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { EQU } from "../../segments/v2.4/EQU.ts";
import { SAC } from "../../segments/v2.4/SAC.ts";
import { ROL } from "../../segments/v2.4/ROL.ts";

/** Structured result of parsing an HL7 SSR^U04 (HL7 v2.4) message. */
export interface ParsedSSR_U04 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The SAC segments. */
  specimenContainers: SAC[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of SSR^U04 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EQU: (s, e) => EQU.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 SSR^U04 (HL7 v2.4) messages. */
export class SSR_U04_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SSR_U04";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SSR_U04_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSSR_U04> {
    return parseStructure<ParsedSSR_U04>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SSR^U04 (HL7 v2.4) message string into a structured result. */
export function parseSSR_U04(messageString: string): Result<ParsedSSR_U04> {
  return new SSR_U04_Parser().parse(messageString);
}
