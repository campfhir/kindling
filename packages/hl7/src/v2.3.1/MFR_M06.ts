/**
 * Builder, parser and structure for MFR^M06 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA [ERR] QRD [QRF] MFI { MF_QUERY: MFE CM0 [{ MF_PHASE_SCHED_DETAIL: CM1 [{CM2}] }] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { ERR } from "./ERR.ts";
import { QRD } from "./QRD.ts";
import { QRF } from "./QRF.ts";
import { MFI } from "./MFI.ts";
import { MFE } from "./MFE.ts";
import { CM0 } from "./CM0.ts";
import { CM1 } from "./CM1.ts";
import { CM2 } from "./CM2.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MFR^M06 (HL7 v2.3.1), in order. */
export const MFR_M06_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_QUERY",
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
  { name: "DSC", required: false, repeating: false },
];

/** The MF QUERY group of a parsed MFR^M06 (HL7 v2.3.1) message. */
export interface ParsedClinicalStudyEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The CM0 segment. */
  clinicalStudy: CM0;
  /** The MF PHASE SCHED DETAIL groups. */
  phases?: ParsedStudyPhase[];
}

/** The MF PHASE SCHED DETAIL group of a parsed MFR^M06 (HL7 v2.3.1) message. */
export interface ParsedStudyPhase {
  /** The CM1 segment. */
  studyPhase: CM1;
  /** The CM2 segments. */
  studySchedules?: CM2[];
}

/** Structured result of parsing an HL7 MFR^M06 (HL7 v2.3.1) message. */
export interface ParsedMFR_M06 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF QUERY groups. */
  entries: ParsedClinicalStudyEntry[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of MFR^M06 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  CM0: (s, e) => CM0.parse(s, e),
  CM1: (s, e) => CM1.parse(s, e),
  CM2: (s, e) => CM2.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 MFR^M06 (HL7 v2.3.1) messages. */
export class MFR_M06_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFR_M06";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFR_M06_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFR_M06> {
    return parseStructure<ParsedMFR_M06>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFR^M06 (HL7 v2.3.1) message string into a structured result. */
export function parseMFR_M06(messageString: string): Result<ParsedMFR_M06> {
  return new MFR_M06_Parser().parse(messageString);
}

/** The MF QUERY group of an MFR^M06 (HL7 v2.3.1) message being built. */
export interface ClinicalStudyEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The CM0 segment. */
  clinicalStudy: CM0;
  /** The MF PHASE SCHED DETAIL groups. */
  phases?: StudyPhase[];
}

/** The MF PHASE SCHED DETAIL group of an MFR^M06 (HL7 v2.3.1) message being built. */
export interface StudyPhase {
  /** The CM1 segment. */
  studyPhase: CM1;
  /** The CM2 segments. */
  studySchedules?: CM2[];
}

/** The optional segments and groups of an MFR^M06 (HL7 v2.3.1) message. */
export interface MFR_M06Options {
  /** The ERR segment. */
  error?: ERR;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 MFR^M06 (HL7 v2.3.1) messages. */
export class MFR_M06<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFR_M06";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFR_M06_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public masterFile: TMFI,
    public entries: ClinicalStudyEntry[],
    public options: MFR_M06Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query, masterFile: this.masterFile, entries: this.entries };
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

/** Builds an HL7 MFR^M06 (HL7 v2.3.1) message. */
export function createMFR_M06<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  masterFile: TMFI,
  entries: ClinicalStudyEntry[],
  options: MFR_M06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFR_M06<TMSH, TMSA, TQRD, TMFI> {
  return new MFR_M06(header, acknowledgment, query, masterFile, entries, options, encoding);
}
