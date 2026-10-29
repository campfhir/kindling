/**
 * Builder, parser and structure for RSP^K21 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] QAK QPD [ QUERY_RESPONSE: PID [PD1] ] [DSC]
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
import { QAK } from "../../segments/v2.4/QAK.ts";
import { QPD } from "../../segments/v2.4/QPD.ts";
import { PID } from "../../segments/v2.4/PID.ts";
import { PD1 } from "../../segments/v2.4/PD1.ts";
import { DSC } from "../../segments/v2.4/DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of RSP^K21 (HL7 v2.4), in order. */
export const RSP_K21_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: true, repeating: false },
  { name: "QPD", required: true, repeating: false },
  {
    name: "QUERY_RESPONSE",
    required: false,
    repeating: false,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The QUERY RESPONSE group of a parsed RSP^K21 (HL7 v2.4) message. */
export interface ParsedQueryResponse {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
}

/** Structured result of parsing an HL7 RSP^K21 (HL7 v2.4) message. */
export interface ParsedRSP_K21 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The QUERY RESPONSE group. */
  queryResponse?: ParsedQueryResponse;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RSP^K21 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RSP^K21 (HL7 v2.4) messages. */
export class RSP_K21_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K21";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RSP_K21_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRSP_K21> {
    return parseStructure<ParsedRSP_K21>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RSP^K21 (HL7 v2.4) message string into a structured result. */
export function parseRSP_K21(messageString: string): Result<ParsedRSP_K21> {
  return new RSP_K21_Parser().parse(messageString);
}

/** The QUERY RESPONSE group of an RSP^K21 (HL7 v2.4) message being built. */
export interface QueryResponseGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
}

/** The optional segments and groups of an RSP^K21 (HL7 v2.4) message. */
export interface RSP_K21Options {
  /** The ERR segment. */
  error?: ERR;
  /** The QUERY RESPONSE group. */
  queryResponse?: QueryResponseGroup;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RSP^K21 (HL7 v2.4) messages. */
export class RSP_K21<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K21";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RSP_K21_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public queryParameters: TQPD,
    public options: RSP_K21Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAcknowledgment: this.queryAcknowledgment, queryParameters: this.queryParameters };
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

/** Builds an HL7 RSP^K21 (HL7 v2.4) message. */
export function createRSP_K21<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  options: RSP_K21Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RSP_K21<TMSH, TMSA, TQAK, TQPD> {
  return new RSP_K21(header, acknowledgment, queryAcknowledgment, queryParameters, options, encoding);
}
