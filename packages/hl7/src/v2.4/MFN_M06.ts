/**
 * Builder, parser and structure for MFN^M06 messages (HL7 v2.4).
 *
 * Structure: MSH MFI { MF_CLIN_STUDY: MFE CM0 [{ MF_PHASE_SCHED_DETAIL: CM1 [{CM2}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { MFI } from "./MFI.ts";
import { MFE } from "./MFE.ts";
import { CM0 } from "./CM0.ts";
import { CM1 } from "./CM1.ts";
import { CM2 } from "./CM2.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MFN^M06 (HL7 v2.4), in order. */
export const MFN_M06_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_CLIN_STUDY",
    required: true,
    repeating: true,
    as: "entries",
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "CM0", required: true, repeating: false },
      {
        name: "MF_PHASE_SCHED_DETAIL",
        required: false,
        repeating: true,
        as: "phases",
        segments: [
          { name: "CM1", required: true, repeating: false },
          { name: "CM2", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The MF CLIN STUDY group of a parsed MFN^M06 (HL7 v2.4) message. */
export interface ParsedClinicalStudyEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The CM0 segment. */
  clinicalStudy: CM0;
  /** The MF PHASE SCHED DETAIL groups. */
  phases?: ParsedStudyPhase[];
}

/** The MF PHASE SCHED DETAIL group of a parsed MFN^M06 (HL7 v2.4) message. */
export interface ParsedStudyPhase {
  /** The CM1 segment. */
  studyPhase: CM1;
  /** The CM2 segments. */
  studySchedules?: CM2[];
}

/** Structured result of parsing an HL7 MFN^M06 (HL7 v2.4) message. */
export interface ParsedMFN_M06 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF CLIN STUDY groups. */
  entries: ParsedClinicalStudyEntry[];
}

/** The segment parsers of MFN^M06 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  CM0: (s, e) => CM0.parse(s, e),
  CM1: (s, e) => CM1.parse(s, e),
  CM2: (s, e) => CM2.parse(s, e),
};

/** Parser for HL7 MFN^M06 (HL7 v2.4) messages. */
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

/** Parses an HL7 MFN^M06 (HL7 v2.4) message string into a structured result. */
export function parseMFN_M06(messageString: string): Result<ParsedMFN_M06> {
  return new MFN_M06_Parser().parse(messageString);
}

/** The MF CLIN STUDY group of an MFN^M06 (HL7 v2.4) message being built. */
export interface ClinicalStudyEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The CM0 segment. */
  clinicalStudy: CM0;
  /** The MF PHASE SCHED DETAIL groups. */
  phases?: StudyPhase[];
}

/** The MF PHASE SCHED DETAIL group of an MFN^M06 (HL7 v2.4) message being built. */
export interface StudyPhase {
  /** The CM1 segment. */
  studyPhase: CM1;
  /** The CM2 segments. */
  studySchedules?: CM2[];
}

/** The optional segments and groups of an MFN^M06 (HL7 v2.4) message. The message has none. */
export type MFN_M06Options = Record<string, never>;

/** Builder for HL7 MFN^M06 (HL7 v2.4) messages. */
export class MFN_M06<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M06";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M06_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public entries: ClinicalStudyEntry[],
    public options: MFN_M06Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, entries: this.entries };
  }

  /** Validates the message structure, returning a result. */
  verify(): { valid: boolean; errors: string[] } {
    const errors = verifyStructure(this.structure, this.toInput());
    return { valid: errors.length === 0, errors };
  }

  /** Encodes this message to its HL7 wire string. */
  encode(): string {
    const verification = this.verify();
    if (!verification.valid) {
      throw new Error(`Cannot encode invalid ${this.messageName} message:\n${verification.errors.join("\n")}`);
    }
    return encodeStructure(this.structure, this.toInput(), this.encoding);
  }
}

/** Builds an HL7 MFN^M06 (HL7 v2.4) message. */
export function createMFN_M06<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  entries: ClinicalStudyEntry[],
  options: MFN_M06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M06<TMSH, TMFI> {
  return new MFN_M06(header, masterFile, entries, options, encoding);
}
