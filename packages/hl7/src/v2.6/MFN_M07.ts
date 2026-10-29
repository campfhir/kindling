/**
 * Builder, parser and structure for MFN^M07 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_CLIN_STUDY_SCHED: MFE CM0 [{CM2}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { MFI } from "./MFI.ts";
import { MFE } from "./MFE.ts";
import { CM0 } from "./CM0.ts";
import { CM2 } from "./CM2.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MFN^M07 (HL7 v2.6), in order. */
export const MFN_M07_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_CLIN_STUDY_SCHED",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "CM0", required: true, repeating: false },
      { name: "CM2", required: false, repeating: true },
    ],
  },
];

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

/** The MF CLIN STUDY SCHED group of an MFN^M07 (HL7 v2.6) message being built. */
export interface MfClinStudySchedGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The CM0 segment. */
  clinicalStudy: CM0;
  /** The CM2 segments. */
  studySchedules?: CM2[];
}

/** The optional segments and groups of an MFN^M07 (HL7 v2.6) message. */
export interface MFN_M07Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 MFN^M07 (HL7 v2.6) messages. */
export class MFN_M07<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M07";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M07_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public mfClinStudyScheds: MfClinStudySchedGroup[],
    public options: MFN_M07Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, mfClinStudyScheds: this.mfClinStudyScheds };
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

/** Builds an HL7 MFN^M07 (HL7 v2.6) message. */
export function createMFN_M07<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  mfClinStudyScheds: MfClinStudySchedGroup[],
  options: MFN_M07Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M07<TMSH, TMFI> {
  return new MFN_M07(header, masterFile, mfClinStudyScheds, options, encoding);
}
