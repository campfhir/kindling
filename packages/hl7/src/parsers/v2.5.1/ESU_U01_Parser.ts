/**
 * Parser for ESU^U01 messages (HL7 v2.5.1).
 *
 * Structure: MSH EQU [{ISD}] [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ESU_U01_STRUCTURE } from "../../structures/v2.5.1/ESU_U01.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { EQU } from "../../segments/v2.5.1/EQU.ts";
import { ISD } from "../../segments/v2.5.1/ISD.ts";
import { ROL } from "../../segments/v2.5.1/ROL.ts";

/** Structured result of parsing an HL7 ESU^U01 (HL7 v2.5.1) message. */
export interface ParsedESU_U01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The ISD segments. */
  interactionStatuses?: ISD[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of ESU^U01 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EQU: (s, e) => EQU.parse(s, e),
  ISD: (s, e) => ISD.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 ESU^U01 (HL7 v2.5.1) messages. */
export class ESU_U01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ESU_U01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ESU_U01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedESU_U01> {
    return parseStructure<ParsedESU_U01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ESU^U01 (HL7 v2.5.1) message string into a structured result. */
export function parseESU_U01(messageString: string): Result<ParsedESU_U01> {
  return new ESU_U01_Parser().parse(messageString);
}
