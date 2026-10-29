/**
 * Builder, parser and structure for MFQ^M01 messages (HL7 v2.3.1).
 *
 * Structure: MSH QRD [QRF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { QRD } from "./QRD.ts";
import { QRF } from "./QRF.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MFQ^M01 (HL7 v2.3.1), in order. */
export const MFQ_M01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
  { name: "DSC", required: false, repeating: false },
];

/** Structured result of parsing an HL7 MFQ^M01 (HL7 v2.3.1) message. */
export interface ParsedMFQ_M01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of MFQ^M01 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 MFQ^M01 (HL7 v2.3.1) messages. */
export class MFQ_M01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFQ_M01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFQ_M01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFQ_M01> {
    return parseStructure<ParsedMFQ_M01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFQ^M01 (HL7 v2.3.1) message string into a structured result. */
export function parseMFQ_M01(messageString: string): Result<ParsedMFQ_M01> {
  return new MFQ_M01_Parser().parse(messageString);
}

/** The optional segments and groups of an MFQ^M01 (HL7 v2.3.1) message. */
export interface MFQ_M01Options {
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 MFQ^M01 (HL7 v2.3.1) messages. */
export class MFQ_M01<TMSH extends MSH = MSH, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFQ_M01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFQ_M01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public query: TQRD,
    public options: MFQ_M01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, query: this.query };
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

/** Builds an HL7 MFQ^M01 (HL7 v2.3.1) message. */
export function createMFQ_M01<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: MFQ_M01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFQ_M01<TMSH, TQRD> {
  return new MFQ_M01(header, query, options, encoding);
}
