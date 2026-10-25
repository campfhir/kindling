/**
 * Parser for MFN^M04 messages (HL7 v2.3).
 *
 * Structure: MSH MFI { MF_CDM: MFE CDM [{PRC}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFN_M04_STRUCTURE } from "../../structures/v2.3/MFN_M04.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MFI } from "../../segments/v2.3/MFI.ts";
import { MFE } from "../../segments/v2.3/MFE.ts";
import { CDM } from "../../segments/v2.3/CDM.ts";
import { PRC } from "../../segments/v2.3/PRC.ts";

/** The MF CDM group of a parsed MFN^M04 (HL7 v2.3) message. */
export interface ParsedChargeDescriptionEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The CDM segment. */
  chargeDescription: CDM;
  /** The PRC segments. */
  prices?: PRC[];
}

/** Structured result of parsing an HL7 MFN^M04 (HL7 v2.3) message. */
export interface ParsedMFN_M04 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF CDM groups. */
  entries: ParsedChargeDescriptionEntry[];
}

/** The segment parsers of MFN^M04 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  CDM: (s, e) => CDM.parse(s, e),
  PRC: (s, e) => PRC.parse(s, e),
};

/** Parser for HL7 MFN^M04 (HL7 v2.3) messages. */
export class MFN_M04_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M04";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M04_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M04> {
    return parseStructure<ParsedMFN_M04>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M04 (HL7 v2.3) message string into a structured result. */
export function parseMFN_M04(messageString: string): Result<ParsedMFN_M04> {
  return new MFN_M04_Parser().parse(messageString);
}
