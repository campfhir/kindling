/**
 * Builder, parser and structure for ADR^A19 messages (HL7 v2.1).
 *
 * Structure: MSH MSA QRD { QUERY_RESPONSE: [EVN] PID PV1 } [DSC]
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
import { EVN } from "./EVN.ts";
import { PID } from "./PID.ts";
import { PV1 } from "./PV1.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ADR^A19 (HL7 v2.1), in order. */
export const ADR_A19_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "QRD", required: true, repeating: false },
  {
    name: "QUERY_RESPONSE",
    required: true,
    repeating: true,
    segments: [
      { name: "EVN", required: false, repeating: false },
      { name: "PID", required: true, repeating: false },
      { name: "PV1", required: true, repeating: false },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The QUERY RESPONSE group of a parsed ADR^A19 (HL7 v2.1) message. */
export interface ParsedQueryResponse {
  /** The EVN segment. */
  event?: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit: PV1;
}

/** Structured result of parsing an HL7 ADR^A19 (HL7 v2.1) message. */
export interface ParsedADR_A19 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The QRD segment. */
  query: QRD;
  /** The QUERY RESPONSE groups. */
  queryResponses: ParsedQueryResponse[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of ADR^A19 (HL7 v2.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 ADR^A19 (HL7 v2.1) messages. */
export class ADR_A19_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADR_A19";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADR_A19_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADR_A19> {
    return parseStructure<ParsedADR_A19>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADR^A19 (HL7 v2.1) message string into a structured result. */
export function parseADR_A19(messageString: string): Result<ParsedADR_A19> {
  return new ADR_A19_Parser().parse(messageString);
}

/** The QUERY RESPONSE group of an ADR^A19 (HL7 v2.1) message being built. */
export interface QueryResponseGroup {
  /** The EVN segment. */
  event?: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit: PV1;
}

/** The optional segments and groups of an ADR^A19 (HL7 v2.1) message. */
export interface ADR_A19Options {
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 ADR^A19 (HL7 v2.1) messages. */
export class ADR_A19<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADR_A19";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADR_A19_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public queryResponses: QueryResponseGroup[],
    public options: ADR_A19Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query, queryResponses: this.queryResponses };
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

/** Builds an HL7 ADR^A19 (HL7 v2.1) message. */
export function createADR_A19<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  queryResponses: QueryResponseGroup[],
  options: ADR_A19Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADR_A19<TMSH, TMSA, TQRD> {
  return new ADR_A19(header, acknowledgment, query, queryResponses, options, encoding);
}
