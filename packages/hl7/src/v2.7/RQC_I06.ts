/**
 * Builder, parser and structure for RQC^I06 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] QRD [QRF] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{NTE}]
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
import { QRD } from "./QRD.ts";
import { QRF } from "./QRF.ts";
import { PRD } from "./PRD.ts";
import { CTD } from "./CTD.ts";
import { PID } from "./PID.ts";
import { NK1 } from "./NK1.ts";
import { GT1 } from "./GT1.ts";
import { NTE } from "./NTE.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RQC^I06 (HL7 v2.7), in order. */
export const RQC_I06_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
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
  { name: "NK1", required: false, repeating: true },
  { name: "GT1", required: false, repeating: true },
  { name: "NTE", required: false, repeating: true },
];

/** The PROVIDER group of a parsed RQC^I06 (HL7 v2.7) message. */
export interface ParsedProvider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** Structured result of parsing an HL7 RQC^I06 (HL7 v2.7) message. */
export interface ParsedRQC_I06 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PROVIDER groups. */
  providers: ParsedProvider[];
  /** The PID segment. */
  patient: PID;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The segment parsers of RQC^I06 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
};

/** Parser for HL7 RQC^I06 (HL7 v2.7) messages. */
export class RQC_I06_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RQC_I06";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RQC_I06_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRQC_I06> {
    return parseStructure<ParsedRQC_I06>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RQC^I06 (HL7 v2.7) message string into a structured result. */
export function parseRQC_I06(messageString: string): Result<ParsedRQC_I06> {
  return new RQC_I06_Parser().parse(messageString);
}

/** The PROVIDER group of an RQC^I06 (HL7 v2.7) message being built. */
export interface ProviderGroup {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The optional segments and groups of an RQC^I06 (HL7 v2.7) message. */
export interface RQC_I06Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Builder for HL7 RQC^I06 (HL7 v2.7) messages. */
export class RQC_I06<TMSH extends MSH = MSH, TQRD extends QRD = QRD, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RQC_I06";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RQC_I06_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public query: TQRD,
    public providers: ProviderGroup[],
    public patient: TPID,
    public options: RQC_I06Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, query: this.query, providers: this.providers, patient: this.patient };
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

/** Builds an HL7 RQC^I06 (HL7 v2.7) message. */
export function createRQC_I06<TMSH extends MSH = MSH, TQRD extends QRD = QRD, TPID extends PID = PID>(
  header: TMSH,
  query: TQRD,
  providers: ProviderGroup[],
  patient: TPID,
  options: RQC_I06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RQC_I06<TMSH, TQRD, TPID> {
  return new RQC_I06(header, query, providers, patient, options, encoding);
}
