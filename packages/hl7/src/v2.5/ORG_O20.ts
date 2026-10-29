/**
 * Builder, parser and structure for ORG^O20 messages (HL7 v2.5).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [OBR] [{NTE}] [{CTI}] [{ SPECIMEN: SPM [{SAC}] }] } ]
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
import { SFT } from "./SFT.ts";
import { NTE } from "./NTE.ts";
import { PID } from "./PID.ts";
import { ORC } from "./ORC.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { OBR } from "./OBR.ts";
import { CTI } from "./CTI.ts";
import { SPM } from "./SPM.ts";
import { SAC } from "./SAC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ORG^O20 (HL7 v2.5), in order. */
export const ORG_O20_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "NTE", required: false, repeating: true },
  {
    name: "RESPONSE",
    required: false,
    repeating: false,
    segments: [
      {
        name: "PATIENT",
        required: false,
        repeating: false,
        segments: [
          { name: "PID", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "ORDER",
        required: true,
        repeating: true,
        segments: [
          { name: "ORC", required: true, repeating: false },
          {
            name: "TIMING",
            required: false,
            repeating: true,
            segments: [
              { name: "TQ1", required: true, repeating: false },
              { name: "TQ2", required: false, repeating: true },
            ],
          },
          { name: "OBR", required: false, repeating: false },
          { name: "NTE", required: false, repeating: true },
          { name: "CTI", required: false, repeating: true },
          {
            name: "SPECIMEN",
            required: false,
            repeating: true,
            segments: [
              { name: "SPM", required: true, repeating: false },
              { name: "SAC", required: false, repeating: true },
            ],
          },
        ],
      },
    ],
  },
];

/** The RESPONSE group of a parsed ORG^O20 (HL7 v2.5) message. */
export interface ParsedResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The PATIENT group of a parsed ORG^O20 (HL7 v2.5) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of a parsed ORG^O20 (HL7 v2.5) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The OBR segment. */
  observationRequest?: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
  /** The SPECIMEN groups. */
  specimens?: ParsedSpecimen[];
}

/** The TIMING group of a parsed ORG^O20 (HL7 v2.5) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The SPECIMEN group of a parsed ORG^O20 (HL7 v2.5) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The SAC segments. */
  specimenContainers?: SAC[];
}

/** Structured result of parsing an HL7 ORG^O20 (HL7 v2.5) message. */
export interface ParsedORG_O20 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ParsedResponse;
}

/** The segment parsers of ORG^O20 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
};

/** Parser for HL7 ORG^O20 (HL7 v2.5) messages. */
export class ORG_O20_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORG_O20";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORG_O20_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORG_O20> {
    return parseStructure<ParsedORG_O20>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORG^O20 (HL7 v2.5) message string into a structured result. */
export function parseORG_O20(messageString: string): Result<ParsedORG_O20> {
  return new ORG_O20_Parser().parse(messageString);
}

/** The RESPONSE group of an ORG^O20 (HL7 v2.5) message being built. */
export interface ResponseGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The PATIENT group of an ORG^O20 (HL7 v2.5) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of an ORG^O20 (HL7 v2.5) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The OBR segment. */
  observationRequest?: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
  /** The SPECIMEN groups. */
  specimens?: SpecimenGroup[];
}

/** The TIMING group of an ORG^O20 (HL7 v2.5) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The SPECIMEN group of an ORG^O20 (HL7 v2.5) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The SAC segments. */
  specimenContainers?: SAC[];
}

/** The optional segments and groups of an ORG^O20 (HL7 v2.5) message. */
export interface ORG_O20Options {
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ResponseGroup;
}

/** Builder for HL7 ORG^O20 (HL7 v2.5) messages. */
export class ORG_O20<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORG_O20";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORG_O20_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: ORG_O20Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment };
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

/** Builds an HL7 ORG^O20 (HL7 v2.5) message. */
export function createORG_O20<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: ORG_O20Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORG_O20<TMSH, TMSA> {
  return new ORG_O20(header, acknowledgment, options, encoding);
}
