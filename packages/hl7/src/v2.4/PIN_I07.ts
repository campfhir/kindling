/**
 * Builder, parser and structure for PIN^I07 messages (HL7 v2.4).
 *
 * Structure: MSH { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { PRD } from "./PRD.ts";
import { CTD } from "./CTD.ts";
import { PID } from "./PID.ts";
import { NK1 } from "./NK1.ts";
import { GT1 } from "./GT1.ts";
import { IN1 } from "./IN1.ts";
import { IN2 } from "./IN2.ts";
import { IN3 } from "./IN3.ts";
import { NTE } from "./NTE.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of PIN^I07 (HL7 v2.4), in order. */
export const PIN_I07_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
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
  {
    name: "GUARANTOR_INSURANCE",
    required: false,
    repeating: false,
    inline: true,
    segments: [
      { name: "GT1", required: false, repeating: true },
      {
        name: "INSURANCE",
        required: true,
        repeating: true,
        segments: [
          { name: "IN1", required: true, repeating: false },
          { name: "IN2", required: false, repeating: false },
          { name: "IN3", required: false, repeating: false },
        ],
      },
    ],
  },
  { name: "NTE", required: false, repeating: true },
];

/** The PROVIDER group of a parsed PIN^I07 (HL7 v2.4) message. */
export interface ParsedProvider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The INSURANCE group of a parsed PIN^I07 (HL7 v2.4) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** Structured result of parsing an HL7 PIN^I07 (HL7 v2.4) message. */
export interface ParsedPIN_I07 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The PROVIDER groups. */
  providers: ParsedProvider[];
  /** The PID segment. */
  patient: PID;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The segment parsers of PIN^I07 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  PRD: (s, e) => PRD.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
};

/** Parser for HL7 PIN^I07 (HL7 v2.4) messages. */
export class PIN_I07_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PIN_I07";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = PIN_I07_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedPIN_I07> {
    return parseStructure<ParsedPIN_I07>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 PIN^I07 (HL7 v2.4) message string into a structured result. */
export function parsePIN_I07(messageString: string): Result<ParsedPIN_I07> {
  return new PIN_I07_Parser().parse(messageString);
}

/** The PROVIDER group of an PIN^I07 (HL7 v2.4) message being built. */
export interface Provider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The INSURANCE group of an PIN^I07 (HL7 v2.4) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The optional segments and groups of an PIN^I07 (HL7 v2.4) message. */
export interface PIN_I07Options {
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Builder for HL7 PIN^I07 (HL7 v2.4) messages. */
export class PIN_I07<TMSH extends MSH = MSH, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PIN_I07";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = PIN_I07_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public providers: Provider[],
    public patient: TPID,
    public options: PIN_I07Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, providers: this.providers, patient: this.patient };
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

/** Builds an HL7 PIN^I07 (HL7 v2.4) message. */
export function createPIN_I07<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providers: Provider[],
  patient: TPID,
  options: PIN_I07Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PIN_I07<TMSH, TPID> {
  return new PIN_I07(header, providers, patient, options, encoding);
}
