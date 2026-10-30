/**
 * Builder, parser and structure for ORX^O43 messages (HL7 v2.8.1).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] [{PRT}] [{ARV}] ] { ORDER: ORC [{PRT}] TXA [{CTI}] } ]
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
import { UAC } from "./UAC.ts";
import { NTE } from "./NTE.ts";
import { PID } from "./PID.ts";
import { PRT } from "./PRT.ts";
import { ARV } from "./ARV.ts";
import { ORC } from "./ORC.ts";
import { TXA } from "./TXA.ts";
import { CTI } from "./CTI.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ORX^O43 (HL7 v2.8.1), in order. */
export const ORX_O43_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
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
          { name: "PRT", required: false, repeating: true },
          { name: "ARV", required: false, repeating: true },
        ],
      },
      {
        name: "ORDER",
        required: true,
        repeating: true,
        segments: [
          { name: "ORC", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "TXA", required: true, repeating: false },
          { name: "CTI", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The RESPONSE group of a parsed ORX^O43 (HL7 v2.8.1) message. */
export interface ParsedResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The PATIENT group of a parsed ORX^O43 (HL7 v2.8.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ARV segments. */
  arvList?: ARV[];
}

/** The ORDER group of a parsed ORX^O43 (HL7 v2.8.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TXA segment. */
  document: TXA;
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** Structured result of parsing an HL7 ORX^O43 (HL7 v2.8.1) message. */
export interface ParsedORX_O43 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ParsedResponse;
}

/** The segment parsers of ORX^O43 (HL7 v2.8.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  ARV: (s, e) => ARV.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TXA: (s, e) => TXA.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
};

/** Parser for HL7 ORX^O43 (HL7 v2.8.1) messages. */
export class ORX_O43_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORX_O43";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORX_O43_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORX_O43> {
    return parseStructure<ParsedORX_O43>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORX^O43 (HL7 v2.8.1) message string into a structured result. */
export function parseORX_O43(messageString: string): Result<ParsedORX_O43> {
  return new ORX_O43_Parser().parse(messageString);
}

/** The RESPONSE group of an ORX^O43 (HL7 v2.8.1) message being built. */
export interface ResponseGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The PATIENT group of an ORX^O43 (HL7 v2.8.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ARV segments. */
  arvList?: ARV[];
}

/** The ORDER group of an ORX^O43 (HL7 v2.8.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TXA segment. */
  document: TXA;
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The optional segments and groups of an ORX^O43 (HL7 v2.8.1) message. */
export interface ORX_O43Options {
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ResponseGroup;
}

/** Builder for HL7 ORX^O43 (HL7 v2.8.1) messages. */
export class ORX_O43<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORX_O43";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORX_O43_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: ORX_O43Options = {},
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

/** Builds an HL7 ORX^O43 (HL7 v2.8.1) message. */
export function createORX_O43<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: ORX_O43Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORX_O43<TMSH, TMSA> {
  return new ORX_O43(header, acknowledgment, options, encoding);
}
