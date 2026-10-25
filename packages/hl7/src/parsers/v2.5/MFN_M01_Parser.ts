/**
 * Parser for MFN^M01 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MFI { MF: MFE }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFN_M01_STRUCTURE } from "../../structures/v2.5/MFN_M01.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { MFI } from "../../segments/v2.5/MFI.ts";
import { MFE } from "../../segments/v2.5/MFE.ts";

/** The MF group of a parsed MFN^M01 (HL7 v2.5) message. */
export interface ParsedEntry {
  /** The MFE segment. */
  entry: MFE;
}

/** Structured result of parsing an HL7 MFN^M01 (HL7 v2.5) message. */
export interface ParsedMFN_M01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF groups. */
  entries: ParsedEntry[];
}

/** The segment parsers of MFN^M01 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
};

/** Parser for HL7 MFN^M01 (HL7 v2.5) messages. */
export class MFN_M01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M01> {
    return parseStructure<ParsedMFN_M01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M01 (HL7 v2.5) message string into a structured result. */
export function parseMFN_M01(messageString: string): Result<ParsedMFN_M01> {
  return new MFN_M01_Parser().parse(messageString);
}
