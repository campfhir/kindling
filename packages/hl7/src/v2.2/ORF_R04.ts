/**
 * Builder, parser and structure for ORF^R04 messages (HL7 v2.2).
 *
 * Structure: MSH MSA { QUERY_RESPONSE: QRD [QRF] [PID] [{NTE}] } { ORDER: [ORC] OBR [{NTE}] { OBSERVATION: [OBX] [{NTE}] } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { QRD } from "./QRD.ts";
import { QRF } from "./QRF.ts";
import { PID } from "./PID.ts";
import { NTE } from "./NTE.ts";
import { ORC } from "./ORC.ts";
import { OBR } from "./OBR.ts";
import { OBX } from "./OBX.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ORF^R04 (HL7 v2.2), in order. */
export const ORF_R04_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  {
    name: "QUERY_RESPONSE",
    required: true,
    repeating: true,
    segments: [
      { name: "QRD", required: true, repeating: false },
      { name: "QRF", required: false, repeating: false },
      { name: "PID", required: false, repeating: false },
      { name: "NTE", required: false, repeating: true },
    ],
  },
  {
    name: "ORDER",
    required: true,
    repeating: true,
    segments: [
      { name: "ORC", required: false, repeating: false },
      { name: "OBR", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      {
        name: "OBSERVATION",
        required: true,
        repeating: true,
        segments: [
          { name: "OBX", required: false, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The QUERY RESPONSE group of a parsed ORF^R04 (HL7 v2.2) message. */
export interface ParsedQueryResponse {
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of a parsed ORF^R04 (HL7 v2.2) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBSERVATION groups. */
  observations: ParsedObservation[];
}

/** The OBSERVATION group of a parsed ORF^R04 (HL7 v2.2) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 ORF^R04 (HL7 v2.2) message. */
export interface ParsedORF_R04 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The QUERY RESPONSE groups. */
  queryResponses: ParsedQueryResponse[];
  /** The ORDER groups. */
  orders: ParsedOrder[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of ORF^R04 (HL7 v2.2). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 ORF^R04 (HL7 v2.2) messages. */
export class ORF_R04_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORF_R04";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORF_R04_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORF_R04> {
    return parseStructure<ParsedORF_R04>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORF^R04 (HL7 v2.2) message string into a structured result. */
export function parseORF_R04(messageString: string): Result<ParsedORF_R04> {
  return new ORF_R04_Parser().parse(messageString);
}

/** The QUERY RESPONSE group of an ORF^R04 (HL7 v2.2) message being built. */
export interface QueryResponseGroup {
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of an ORF^R04 (HL7 v2.2) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBSERVATION groups. */
  observations: ObservationGroup[];
}

/** The OBSERVATION group of an ORF^R04 (HL7 v2.2) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an ORF^R04 (HL7 v2.2) message. */
export interface ORF_R04Options {
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 ORF^R04 (HL7 v2.2) messages. */
export class ORF_R04<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORF_R04";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORF_R04_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryResponses: QueryResponseGroup[],
    public orders: OrderGroup[],
    public options: ORF_R04Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryResponses: this.queryResponses, orders: this.orders };
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

/** Builds an HL7 ORF^R04 (HL7 v2.2) message. */
export function createORF_R04<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  queryResponses: QueryResponseGroup[],
  orders: OrderGroup[],
  options: ORF_R04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORF_R04<TMSH, TMSA> {
  return new ORF_R04(header, acknowledgment, queryResponses, orders, options, encoding);
}
