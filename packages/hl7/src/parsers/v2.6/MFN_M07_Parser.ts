/**
 * Parser for MFN^M07 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_CLIN_STUDY_SCHED: MFE CM0 [{CM2}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFN_M07_STRUCTURE } from "../../structures/v2.6/MFN_M07.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { MFI } from "../../segments/v2.6/MFI.ts";
import { MFE } from "../../segments/v2.6/MFE.ts";
import { CM0 } from "../../segments/v2.6/CM0.ts";
import { CM2 } from "../../segments/v2.6/CM2.ts";

/** The MF CLIN STUDY SCHED group of a parsed MFN^M07 (HL7 v2.6) message. */
export interface ParsedMfClinStudySched {
  /** The MFE segment. */
  entry: MFE;
  /** The CM0 segment. */
  clinicalStudy: CM0;
  /** The CM2 segments. */
  studySchedules?: CM2[];
}

/** Structured result of parsing an HL7 MFN^M07 (HL7 v2.6) message. */
export interface ParsedMFN_M07 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF CLIN STUDY SCHED groups. */
  mfClinStudyScheds: ParsedMfClinStudySched[];
}

/** The segment parsers of MFN^M07 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  CM0: (s, e) => CM0.parse(s, e),
  CM2: (s, e) => CM2.parse(s, e),
};

/** Parser for HL7 MFN^M07 (HL7 v2.6) messages. */
export class MFN_M07_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M07";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M07_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M07> {
    return parseStructure<ParsedMFN_M07>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M07 (HL7 v2.6) message string into a structured result. */
export function parseMFN_M07(messageString: string): Result<ParsedMFN_M07> {
  return new MFN_M07_Parser().parse(messageString);
}
