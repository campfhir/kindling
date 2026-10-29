/**
 * Builder, parser and structure for RSP^K32 messages (HL7 v2.8.1).
 *
 * Structure: MSH [{SFT}] MSA [ERR] QAK QPD [{ QUERY_RESPONSE: PID [PD1] [{NK1}] PV1 [PV2] [QRI] }] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { MSA } from "./MSA.ts";
import { ERR } from "./ERR.ts";
import { QAK } from "./QAK.ts";
import { QPD } from "./QPD.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { NK1 } from "./NK1.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { QRI } from "./QRI.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RSP^K32 (HL7 v2.8.1), in order. */
export const RSP_K32_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: true, repeating: false },
  { name: "QPD", required: true, repeating: false },
  {
    name: "QUERY_RESPONSE",
    required: false,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "NK1", required: false, repeating: true },
      { name: "PV1", required: true, repeating: false },
      { name: "PV2", required: false, repeating: false },
      { name: "QRI", required: false, repeating: false },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The QUERY RESPONSE group of a parsed RSP^K32 (HL7 v2.8.1) message. */
export interface ParsedQueryResponse {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The QRI segment. */
  queryResponseInstance?: QRI;
}

/** Structured result of parsing an HL7 RSP^K32 (HL7 v2.8.1) message. */
export interface ParsedRSP_K32 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The QUERY RESPONSE groups. */
  queryResponses?: ParsedQueryResponse[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RSP^K32 (HL7 v2.8.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  QRI: (s, e) => QRI.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RSP^K32 (HL7 v2.8.1) messages. */
export class RSP_K32_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K32";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RSP_K32_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRSP_K32> {
    return parseStructure<ParsedRSP_K32>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RSP^K32 (HL7 v2.8.1) message string into a structured result. */
export function parseRSP_K32(messageString: string): Result<ParsedRSP_K32> {
  return new RSP_K32_Parser().parse(messageString);
}

/** The QUERY RESPONSE group of an RSP^K32 (HL7 v2.8.1) message being built. */
export interface QueryResponseGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The QRI segment. */
  queryResponseInstance?: QRI;
}

/** The optional segments and groups of an RSP^K32 (HL7 v2.8.1) message. */
export interface RSP_K32Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The ERR segment. */
  error?: ERR;
  /** The QUERY RESPONSE groups. */
  queryResponses?: QueryResponseGroup[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RSP^K32 (HL7 v2.8.1) messages. */
export class RSP_K32<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K32";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RSP_K32_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public queryParameters: TQPD,
    public options: RSP_K32Options = {},
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

/** Builds an HL7 RSP^K32 (HL7 v2.8.1) message. */
export function createRSP_K32<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  options: RSP_K32Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RSP_K32<TMSH, TMSA, TQAK, TQPD> {
  return new RSP_K32(header, acknowledgment, queryAcknowledgment, queryParameters, options, encoding);
}
