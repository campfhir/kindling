/**
 * Builder, parser and structure for DOC^T12 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] QRD { RESULT: [EVN] PID PV1 TXA [{OBX}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { ERR } from "../../segments/v2.3/ERR.ts";
import { QRD } from "../../segments/v2.3/QRD.ts";
import { EVN } from "../../segments/v2.3/EVN.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { TXA } from "../../segments/v2.3/TXA.ts";
import { OBX } from "../../segments/v2.3/OBX.ts";
import { DSC } from "../../segments/v2.3/DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of DOC^T12 (HL7 v2.3), in order. */
export const DOC_T12_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QRD", required: true, repeating: false },
  {
    name: "RESULT",
    required: true,
    repeating: true,
    segments: [
      { name: "EVN", required: false, repeating: false },
      { name: "PID", required: true, repeating: false },
      { name: "PV1", required: true, repeating: false },
      { name: "TXA", required: true, repeating: false },
      { name: "OBX", required: false, repeating: true },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The RESULT group of a parsed DOC^T12 (HL7 v2.3) message. */
export interface ParsedResult {
  /** The EVN segment. */
  event?: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit: PV1;
  /** The TXA segment. */
  document: TXA;
  /** The OBX segments. */
  observations?: OBX[];
}

/** Structured result of parsing an HL7 DOC^T12 (HL7 v2.3) message. */
export interface ParsedDOC_T12 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QRD segment. */
  query: QRD;
  /** The RESULT groups. */
  results: ParsedResult[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of DOC^T12 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  TXA: (s, e) => TXA.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 DOC^T12 (HL7 v2.3) messages. */
export class DOC_T12_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DOC_T12";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = DOC_T12_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedDOC_T12> {
    return parseStructure<ParsedDOC_T12>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 DOC^T12 (HL7 v2.3) message string into a structured result. */
export function parseDOC_T12(messageString: string): Result<ParsedDOC_T12> {
  return new DOC_T12_Parser().parse(messageString);
}

/** The RESULT group of an DOC^T12 (HL7 v2.3) message being built. */
export interface ResultGroup {
  /** The EVN segment. */
  event?: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit: PV1;
  /** The TXA segment. */
  document: TXA;
  /** The OBX segments. */
  observations?: OBX[];
}

/** The optional segments and groups of an DOC^T12 (HL7 v2.3) message. */
export interface DOC_T12Options {
  /** The ERR segment. */
  error?: ERR;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 DOC^T12 (HL7 v2.3) messages. */
export class DOC_T12<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DOC_T12";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = DOC_T12_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public results: ResultGroup[],
    public options: DOC_T12Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query, results: this.results };
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

/** Builds an HL7 DOC^T12 (HL7 v2.3) message. */
export function createDOC_T12<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  results: ResultGroup[],
  options: DOC_T12Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): DOC_T12<TMSH, TMSA, TQRD> {
  return new DOC_T12(header, acknowledgment, query, results, options, encoding);
}
