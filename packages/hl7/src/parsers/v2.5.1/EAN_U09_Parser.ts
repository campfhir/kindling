/**
 * Parser for EAN^U09 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EQU { NOTIFICATION: NDS [NTE] } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { EAN_U09_STRUCTURE } from "../../structures/v2.5.1/EAN_U09.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { EQU } from "../../segments/v2.5.1/EQU.ts";
import { NDS } from "../../segments/v2.5.1/NDS.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { ROL } from "../../segments/v2.5.1/ROL.ts";

/** The NOTIFICATION group of a parsed EAN^U09 (HL7 v2.5.1) message. */
export interface ParsedNotification {
  /** The NDS segment. */
  notificationDetail: NDS;
  /** The NTE segment. */
  note?: NTE;
}

/** Structured result of parsing an HL7 EAN^U09 (HL7 v2.5.1) message. */
export interface ParsedEAN_U09 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The NOTIFICATION groups. */
  notifications: ParsedNotification[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of EAN^U09 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  EQU: (s, e) => EQU.parse(s, e),
  NDS: (s, e) => NDS.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 EAN^U09 (HL7 v2.5.1) messages. */
export class EAN_U09_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EAN_U09";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EAN_U09_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEAN_U09> {
    return parseStructure<ParsedEAN_U09>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EAN^U09 (HL7 v2.5.1) message string into a structured result. */
export function parseEAN_U09(messageString: string): Result<ParsedEAN_U09> {
  return new EAN_U09_Parser().parse(messageString);
}
