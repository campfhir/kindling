/**
 * Parser for INR^U14 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EQU [{INV}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { INR_U14_STRUCTURE } from "../../structures/v2.9.1/INR_U14.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { EQU } from "../../segments/v2.9.1/EQU.ts";
import { INV } from "../../segments/v2.9.1/INV.ts";

/** Structured result of parsing an HL7 INR^U14 (HL7 v2.9.1) message. */
export interface ParsedINR_U14 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The INV segments. */
  inventoryDetails?: INV[];
}

/** The segment parsers of INR^U14 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EQU: (s, e) => EQU.parse(s, e),
  INV: (s, e) => INV.parse(s, e),
};

/** Parser for HL7 INR^U14 (HL7 v2.9.1) messages. */
export class INR_U14_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "INR_U14";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = INR_U14_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedINR_U14> {
    return parseStructure<ParsedINR_U14>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 INR^U14 (HL7 v2.9.1) message string into a structured result. */
export function parseINR_U14(messageString: string): Result<ParsedINR_U14> {
  return new INR_U14_Parser().parse(messageString);
}
