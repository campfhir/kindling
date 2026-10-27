/**
 * Parser for INR^U06 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EQU {INV} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { INR_U06_STRUCTURE } from "../../structures/v2.9.1/INR_U06.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { EQU } from "../../segments/v2.9.1/EQU.ts";
import { INV } from "../../segments/v2.9.1/INV.ts";
import { ROL } from "../../segments/v2.9.1/ROL.ts";

/** Structured result of parsing an HL7 INR^U06 (HL7 v2.9.1) message. */
export interface ParsedINR_U06 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The INV segments. */
  inventoryDetails: INV[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of INR^U06 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EQU: (s, e) => EQU.parse(s, e),
  INV: (s, e) => INV.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 INR^U06 (HL7 v2.9.1) messages. */
export class INR_U06_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "INR_U06";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = INR_U06_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedINR_U06> {
    return parseStructure<ParsedINR_U06>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 INR^U06 (HL7 v2.9.1) message string into a structured result. */
export function parseINR_U06(messageString: string): Result<ParsedINR_U06> {
  return new INR_U06_Parser().parse(messageString);
}
