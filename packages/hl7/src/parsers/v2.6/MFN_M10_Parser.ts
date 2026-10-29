/**
 * Parser for MFN^M10 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_TEST_BATTERIES: MFE OM1 [ MF_TEST_BATT_DETAIL: OM5 [{OM4}] ] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFN_M10_STRUCTURE } from "../../structures/v2.6/MFN_M10.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { MFI } from "../../segments/v2.6/MFI.ts";
import { MFE } from "../../segments/v2.6/MFE.ts";
import { OM1 } from "../../segments/v2.6/OM1.ts";
import { OM5 } from "../../segments/v2.6/OM5.ts";
import { OM4 } from "../../segments/v2.6/OM4.ts";

/** The MF TEST BATTERIES group of a parsed MFN^M10 (HL7 v2.6) message. */
export interface ParsedMfTestBatteries {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The MF TEST BATT DETAIL group. */
  mfTestBattDetail?: ParsedMfTestBattDetail;
}

/** The MF TEST BATT DETAIL group of a parsed MFN^M10 (HL7 v2.6) message. */
export interface ParsedMfTestBattDetail {
  /** The OM5 segment. */
  observationBattery: OM5;
  /** The OM4 segments. */
  specimenRequirements?: OM4[];
}

/** Structured result of parsing an HL7 MFN^M10 (HL7 v2.6) message. */
export interface ParsedMFN_M10 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF TEST BATTERIES groups. */
  mfTestBatteries: ParsedMfTestBatteries[];
}

/** The segment parsers of MFN^M10 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  OM1: (s, e) => OM1.parse(s, e),
  OM5: (s, e) => OM5.parse(s, e),
  OM4: (s, e) => OM4.parse(s, e),
};

/** Parser for HL7 MFN^M10 (HL7 v2.6) messages. */
export class MFN_M10_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M10";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M10_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M10> {
    return parseStructure<ParsedMFN_M10>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M10 (HL7 v2.6) message string into a structured result. */
export function parseMFN_M10(messageString: string): Result<ParsedMFN_M10> {
  return new MFN_M10_Parser().parse(messageString);
}
