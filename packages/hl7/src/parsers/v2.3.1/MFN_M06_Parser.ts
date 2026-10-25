/**
 * Parser for MFN^M06 messages (HL7 v2.3.1).
 *
 * Structure: MSH MFI { MF_CLIN_STUDY: MFE CM0 [{ MF_PHASE_SCHED_DETAIL: CM1 [{CM2}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFN_M06_STRUCTURE } from "../../structures/v2.3.1/MFN_M06.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { MFI } from "../../segments/v2.3.1/MFI.ts";
import { MFE } from "../../segments/v2.3.1/MFE.ts";
import { CM0 } from "../../segments/v2.3.1/CM0.ts";
import { CM1 } from "../../segments/v2.3.1/CM1.ts";
import { CM2 } from "../../segments/v2.3.1/CM2.ts";

/** The MF CLIN STUDY group of a parsed MFN^M06 (HL7 v2.3.1) message. */
export interface ParsedClinicalStudyEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The CM0 segment. */
  clinicalStudy: CM0;
  /** The MF PHASE SCHED DETAIL groups. */
  phases?: ParsedStudyPhase[];
}

/** The MF PHASE SCHED DETAIL group of a parsed MFN^M06 (HL7 v2.3.1) message. */
export interface ParsedStudyPhase {
  /** The CM1 segment. */
  studyPhase: CM1;
  /** The CM2 segments. */
  studySchedules?: CM2[];
}

/** Structured result of parsing an HL7 MFN^M06 (HL7 v2.3.1) message. */
export interface ParsedMFN_M06 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF CLIN STUDY groups. */
  entries: ParsedClinicalStudyEntry[];
}

/** The segment parsers of MFN^M06 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  CM0: (s, e) => CM0.parse(s, e),
  CM1: (s, e) => CM1.parse(s, e),
  CM2: (s, e) => CM2.parse(s, e),
};

/** Parser for HL7 MFN^M06 (HL7 v2.3.1) messages. */
export class MFN_M06_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M06";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M06_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M06> {
    return parseStructure<ParsedMFN_M06>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M06 (HL7 v2.3.1) message string into a structured result. */
export function parseMFN_M06(messageString: string): Result<ParsedMFN_M06> {
  return new MFN_M06_Parser().parse(messageString);
}
