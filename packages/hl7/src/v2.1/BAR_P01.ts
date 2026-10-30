/**
 * Builder, parser and structure for BAR^P01 messages (HL7 v2.1).
 *
 * Structure: MSH EVN PID { VISIT: [PV1] [{DG1}] [{PR1}] [{GT1}] [{NK1}] [{IN1}] [ACC] [UB1] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { EVN } from "./EVN.ts";
import { PID } from "./PID.ts";
import { PV1 } from "./PV1.ts";
import { DG1 } from "./DG1.ts";
import { PR1 } from "./PR1.ts";
import { GT1 } from "./GT1.ts";
import { NK1 } from "./NK1.ts";
import { IN1 } from "./IN1.ts";
import { ACC } from "./ACC.ts";
import { UB1 } from "./UB1.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of BAR^P01 (HL7 v2.1), in order. */
export const BAR_P01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  {
    name: "VISIT",
    required: true,
    repeating: true,
    segments: [
      { name: "PV1", required: false, repeating: false },
      { name: "DG1", required: false, repeating: true },
      { name: "PR1", required: false, repeating: true },
      { name: "GT1", required: false, repeating: true },
      { name: "NK1", required: false, repeating: true },
      { name: "IN1", required: false, repeating: true },
      { name: "ACC", required: false, repeating: false },
      { name: "UB1", required: false, repeating: false },
    ],
  },
];

/** The VISIT group of a parsed BAR^P01 (HL7 v2.1) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  visit?: PV1;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The PR1 segments. */
  procedures?: PR1[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The IN1 segments. */
  insurances?: IN1[];
  /** The ACC segment. */
  accident?: ACC;
  /** The UB1 segment. */
  ub82?: UB1;
}

/** Structured result of parsing an HL7 BAR^P01 (HL7 v2.1) message. */
export interface ParsedBAR_P01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The VISIT groups. */
  visits: ParsedVisit[];
}

/** The segment parsers of BAR^P01 (HL7 v2.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  ACC: (s, e) => ACC.parse(s, e),
  UB1: (s, e) => UB1.parse(s, e),
};

/** Parser for HL7 BAR^P01 (HL7 v2.1) messages. */
export class BAR_P01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = BAR_P01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBAR_P01> {
    return parseStructure<ParsedBAR_P01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 BAR^P01 (HL7 v2.1) message string into a structured result. */
export function parseBAR_P01(messageString: string): Result<ParsedBAR_P01> {
  return new BAR_P01_Parser().parse(messageString);
}

/** The VISIT group of an BAR^P01 (HL7 v2.1) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit?: PV1;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The PR1 segments. */
  procedures?: PR1[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The IN1 segments. */
  insurances?: IN1[];
  /** The ACC segment. */
  accident?: ACC;
  /** The UB1 segment. */
  ub82?: UB1;
}

/** The optional segments and groups of an BAR^P01 (HL7 v2.1) message. The message has none. */
export type BAR_P01Options = Record<string, never>;

/** Builder for HL7 BAR^P01 (HL7 v2.1) messages. */
export class BAR_P01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = BAR_P01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public visits: VisitGroup[],
    public options: BAR_P01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, visits: this.visits };
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

/** Builds an HL7 BAR^P01 (HL7 v2.1) message. */
export function createBAR_P01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visits: VisitGroup[],
  options: BAR_P01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BAR_P01<TMSH, TEVN, TPID> {
  return new BAR_P01(header, event, patient, visits, options, encoding);
}
