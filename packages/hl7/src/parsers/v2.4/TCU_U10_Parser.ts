/**
 * Parser for TCU^U10 messages (HL7 v2.4).
 *
 * Structure: MSH EQU {TCC} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { TCU_U10_STRUCTURE } from "../../structures/v2.4/TCU_U10.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { EQU } from "../../segments/v2.4/EQU.ts";
import { TCC } from "../../segments/v2.4/TCC.ts";
import { ROL } from "../../segments/v2.4/ROL.ts";

/** Structured result of parsing an HL7 TCU^U10 (HL7 v2.4) message. */
export interface ParsedTCU_U10 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The TCC segments. */
  testCodeConfigurations: TCC[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of TCU^U10 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EQU: (s, e) => EQU.parse(s, e),
  TCC: (s, e) => TCC.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 TCU^U10 (HL7 v2.4) messages. */
export class TCU_U10_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "TCU_U10";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = TCU_U10_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedTCU_U10> {
    return parseStructure<ParsedTCU_U10>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 TCU^U10 (HL7 v2.4) message string into a structured result. */
export function parseTCU_U10(messageString: string): Result<ParsedTCU_U10> {
  return new TCU_U10_Parser().parse(messageString);
}
