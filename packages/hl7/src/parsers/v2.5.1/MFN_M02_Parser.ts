/**
 * Parser for MFN^M02 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MFI { MF_STAFF: MFE STF [{PRA}] [{NTE}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFN_M02_STRUCTURE } from "../../structures/v2.5.1/MFN_M02.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { MFI } from "../../segments/v2.5.1/MFI.ts";
import { MFE } from "../../segments/v2.5.1/MFE.ts";
import { STF } from "../../segments/v2.5.1/STF.ts";
import { PRA } from "../../segments/v2.5.1/PRA.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";

/** The MF STAFF group of a parsed MFN^M02 (HL7 v2.5.1) message. */
export interface ParsedStaffEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The STF segment. */
  staff: STF;
  /** The PRA segments. */
  practitioners?: PRA[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 MFN^M02 (HL7 v2.5.1) message. */
export interface ParsedMFN_M02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF STAFF groups. */
  staffEntries: ParsedStaffEntry[];
}

/** The segment parsers of MFN^M02 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  STF: (s, e) => STF.parse(s, e),
  PRA: (s, e) => PRA.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
};

/** Parser for HL7 MFN^M02 (HL7 v2.5.1) messages. */
export class MFN_M02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M02> {
    return parseStructure<ParsedMFN_M02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M02 (HL7 v2.5.1) message string into a structured result. */
export function parseMFN_M02(messageString: string): Result<ParsedMFN_M02> {
  return new MFN_M02_Parser().parse(messageString);
}
