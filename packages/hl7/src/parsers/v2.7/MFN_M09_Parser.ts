/**
 * Parser for MFN^M09 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_TEST_CATEGORICAL: MFE OM1 [ MF_TEST_CAT_DETAIL: OM3 [{OM4}] ] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFN_M09_STRUCTURE } from "../../structures/v2.7/MFN_M09.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { MFI } from "../../segments/v2.7/MFI.ts";
import { MFE } from "../../segments/v2.7/MFE.ts";
import { OM1 } from "../../segments/v2.7/OM1.ts";
import { OM3 } from "../../segments/v2.7/OM3.ts";
import { OM4 } from "../../segments/v2.7/OM4.ts";

/** The MF TEST CATEGORICAL group of a parsed MFN^M09 (HL7 v2.7) message. */
export interface ParsedMfTestCategorical {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The MF TEST CAT DETAIL group. */
  mfTestCatDetail?: ParsedMfTestCatDetail;
}

/** The MF TEST CAT DETAIL group of a parsed MFN^M09 (HL7 v2.7) message. */
export interface ParsedMfTestCatDetail {
  /** The OM3 segment. */
  categoricalObservation: OM3;
  /** The OM4 segments. */
  specimenRequirements?: OM4[];
}

/** Structured result of parsing an HL7 MFN^M09 (HL7 v2.7) message. */
export interface ParsedMFN_M09 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF TEST CATEGORICAL groups. */
  mfTestCategoricals: ParsedMfTestCategorical[];
}

/** The segment parsers of MFN^M09 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  OM1: (s, e) => OM1.parse(s, e),
  OM3: (s, e) => OM3.parse(s, e),
  OM4: (s, e) => OM4.parse(s, e),
};

/** Parser for HL7 MFN^M09 (HL7 v2.7) messages. */
export class MFN_M09_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M09";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M09_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M09> {
    return parseStructure<ParsedMFN_M09>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M09 (HL7 v2.7) message string into a structured result. */
export function parseMFN_M09(messageString: string): Result<ParsedMFN_M09> {
  return new MFN_M09_Parser().parse(messageString);
}
