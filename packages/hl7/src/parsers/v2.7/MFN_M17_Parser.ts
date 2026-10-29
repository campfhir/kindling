/**
 * Parser for MFN^M17 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_DRG: MFE DMI }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFN_M17_STRUCTURE } from "../../structures/v2.7/MFN_M17.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { MFI } from "../../segments/v2.7/MFI.ts";
import { MFE } from "../../segments/v2.7/MFE.ts";
import { DMI } from "../../segments/v2.7/DMI.ts";

/** The MF DRG group of a parsed MFN^M17 (HL7 v2.7) message. */
export interface ParsedMfDrg {
  /** The MFE segment. */
  entry: MFE;
  /** The DMI segment. */
  dmi: DMI;
}

/** Structured result of parsing an HL7 MFN^M17 (HL7 v2.7) message. */
export interface ParsedMFN_M17 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF DRG groups. */
  mfDrgs: ParsedMfDrg[];
}

/** The segment parsers of MFN^M17 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  DMI: (s, e) => DMI.parse(s, e),
};

/** Parser for HL7 MFN^M17 (HL7 v2.7) messages. */
export class MFN_M17_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M17";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M17_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M17> {
    return parseStructure<ParsedMFN_M17>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M17 (HL7 v2.7) message string into a structured result. */
export function parseMFN_M17(messageString: string): Result<ParsedMFN_M17> {
  return new MFN_M17_Parser().parse(messageString);
}
