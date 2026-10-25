/**
 * Parser for INU^U05 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EQU {INV} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { INU_U05_STRUCTURE } from "../../structures/v2.5.1/INU_U05.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { EQU } from "../../segments/v2.5.1/EQU.ts";
import { INV } from "../../segments/v2.5.1/INV.ts";
import { ROL } from "../../segments/v2.5.1/ROL.ts";

/** Structured result of parsing an HL7 INU^U05 (HL7 v2.5.1) message. */
export interface ParsedINU_U05 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The INV segments. */
  inventoryDetails: INV[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of INU^U05 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  EQU: (s, e) => EQU.parse(s, e),
  INV: (s, e) => INV.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 INU^U05 (HL7 v2.5.1) messages. */
export class INU_U05_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "INU_U05";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = INU_U05_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedINU_U05> {
    return parseStructure<ParsedINU_U05>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 INU^U05 (HL7 v2.5.1) message string into a structured result. */
export function parseINU_U05(messageString: string): Result<ParsedINU_U05> {
  return new INU_U05_Parser().parse(messageString);
}
