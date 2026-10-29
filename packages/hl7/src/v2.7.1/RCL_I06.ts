/**
 * Builder, parser and structure for RCL^I06 messages (HL7 v2.7.1).
 *
 * Structure: MSH [{SFT}] [UAC] MSA QRD [QRF] { PROVIDER: PRD [{CTD}] } PID [{DG1}] [{DRG}] [{AL1}] [{NTE}] [{DSP}] [DSC]
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
import { MSA } from "./MSA.ts";
import { QRD } from "./QRD.ts";
import { QRF } from "./QRF.ts";
import { PRD } from "./PRD.ts";
import { CTD } from "./CTD.ts";
import { PID } from "./PID.ts";
import { DG1 } from "./DG1.ts";
import { DRG } from "./DRG.ts";
import { AL1 } from "./AL1.ts";
import { NTE } from "./NTE.ts";
import { DSP } from "./DSP.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RCL^I06 (HL7 v2.7.1), in order. */
export const RCL_I06_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
  {
    name: "PROVIDER",
    required: true,
    repeating: true,
    segments: [
      { name: "PRD", required: true, repeating: false },
      { name: "CTD", required: false, repeating: true },
    ],
  },
  { name: "PID", required: true, repeating: false },
  { name: "DG1", required: false, repeating: true },
  { name: "DRG", required: false, repeating: true },
  { name: "AL1", required: false, repeating: true },
  { name: "NTE", required: false, repeating: true },
  { name: "DSP", required: false, repeating: true },
  { name: "DSC", required: false, repeating: false },
];

/** The PROVIDER group of a parsed RCL^I06 (HL7 v2.7.1) message. */
export interface ParsedProvider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** Structured result of parsing an HL7 RCL^I06 (HL7 v2.7.1) message. */
export interface ParsedRCL_I06 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PROVIDER groups. */
  providers: ParsedProvider[];
  /** The PID segment. */
  patient: PID;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segments. */
  diagnosisRelatedGroups?: DRG[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The DSP segments. */
  displayLines?: DSP[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RCL^I06 (HL7 v2.7.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  DRG: (s, e) => DRG.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  DSP: (s, e) => DSP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RCL^I06 (HL7 v2.7.1) messages. */
export class RCL_I06_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RCL_I06";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RCL_I06_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRCL_I06> {
    return parseStructure<ParsedRCL_I06>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RCL^I06 (HL7 v2.7.1) message string into a structured result. */
export function parseRCL_I06(messageString: string): Result<ParsedRCL_I06> {
  return new RCL_I06_Parser().parse(messageString);
}

/** The PROVIDER group of an RCL^I06 (HL7 v2.7.1) message being built. */
export interface ProviderGroup {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The optional segments and groups of an RCL^I06 (HL7 v2.7.1) message. */
export interface RCL_I06Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segments. */
  diagnosisRelatedGroups?: DRG[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The DSP segments. */
  displayLines?: DSP[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RCL^I06 (HL7 v2.7.1) messages. */
export class RCL_I06<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RCL_I06";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RCL_I06_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public providers: ProviderGroup[],
    public patient: TPID,
    public options: RCL_I06Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query, providers: this.providers, patient: this.patient };
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

/** Builds an HL7 RCL^I06 (HL7 v2.7.1) message. */
export function createRCL_I06<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TPID extends PID = PID>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  providers: ProviderGroup[],
  patient: TPID,
  options: RCL_I06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RCL_I06<TMSH, TMSA, TQRD, TPID> {
  return new RCL_I06(header, acknowledgment, query, providers, patient, options, encoding);
}
