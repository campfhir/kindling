/**
 * Builder, parser and structure for ORG^O20 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [OBR] [{NTE}] [{CTI}] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { MSA } from "../../segments/v2.4/MSA.ts";
import { ERR } from "../../segments/v2.4/ERR.ts";
import { NTE } from "../../segments/v2.4/NTE.ts";
import { PID } from "../../segments/v2.4/PID.ts";
import { ORC } from "../../segments/v2.4/ORC.ts";
import { OBR } from "../../segments/v2.4/OBR.ts";
import { CTI } from "../../segments/v2.4/CTI.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of ORG^O20 (HL7 v2.4), in order. */
export const ORG_O20_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
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
          { name: "OBR", required: false, repeating: false },
          { name: "NTE", required: false, repeating: true },
          { name: "CTI", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The RESPONSE group of a parsed ORG^O20 (HL7 v2.4) message. */
export interface ParsedResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The PATIENT group of a parsed ORG^O20 (HL7 v2.4) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of a parsed ORG^O20 (HL7 v2.4) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The OBR segment. */
  observationRequest?: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** Structured result of parsing an HL7 ORG^O20 (HL7 v2.4) message. */
export interface ParsedORG_O20 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ParsedResponse;
}

/** The segment parsers of ORG^O20 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
};

/** Parser for HL7 ORG^O20 (HL7 v2.4) messages. */
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

/** Parses an HL7 ORG^O20 (HL7 v2.4) message string into a structured result. */
export function parseORG_O20(messageString: string): Result<ParsedORG_O20> {
  return new ORG_O20_Parser().parse(messageString);
}

/** The RESPONSE group of an ORG^O20 (HL7 v2.4) message being built. */
export interface ResponseGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The PATIENT group of an ORG^O20 (HL7 v2.4) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of an ORG^O20 (HL7 v2.4) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The OBR segment. */
  observationRequest?: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The optional segments and groups of an ORG^O20 (HL7 v2.4) message. */
export interface ORG_O20Options {
  /** The ERR segment. */
  error?: ERR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ResponseGroup;
}

/** Builder for HL7 ORG^O20 (HL7 v2.4) messages. */
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

/** Builds an HL7 ORG^O20 (HL7 v2.4) message. */
export function createORG_O20<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: ORG_O20Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORG_O20<TMSH, TMSA> {
  return new ORG_O20(header, acknowledgment, options, encoding);
}
