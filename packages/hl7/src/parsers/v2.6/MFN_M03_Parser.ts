/**
 * Parser for MFN^M03 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] MFI { MF_TEST: MFE OM1 }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFN_M03_STRUCTURE } from "../../structures/v2.6/MFN_M03.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { MFI } from "../../segments/v2.6/MFI.ts";
import { MFE } from "../../segments/v2.6/MFE.ts";
import { OM1 } from "../../segments/v2.6/OM1.ts";

/** The MF TEST group of a parsed MFN^M03 (HL7 v2.6) message. */
export interface ParsedMfTest {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
}

/** Structured result of parsing an HL7 MFN^M03 (HL7 v2.6) message. */
export interface ParsedMFN_M03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF TEST groups. */
  mfTests: ParsedMfTest[];
}

/** The segment parsers of MFN^M03 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  OM1: (s, e) => OM1.parse(s, e),
};

/** Parser for HL7 MFN^M03 (HL7 v2.6) messages. */
export class MFN_M03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M03> {
    return parseStructure<ParsedMFN_M03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M03 (HL7 v2.6) message string into a structured result. */
export function parseMFN_M03(messageString: string): Result<ParsedMFN_M03> {
  return new MFN_M03_Parser().parse(messageString);
}
