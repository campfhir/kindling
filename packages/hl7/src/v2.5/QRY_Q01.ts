/**
 * Builder, parser and structure for QRY^Q01 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] QRD [QRF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { QRD } from "./QRD.ts";
import { QRF } from "./QRF.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of QRY^Q01 (HL7 v2.5), in order. */
export const QRY_Q01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
  { name: "DSC", required: false, repeating: false },
];

/** Structured result of parsing an HL7 QRY^Q01 (HL7 v2.5) message. */
export interface ParsedQRY_Q01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of QRY^Q01 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 QRY^Q01 (HL7 v2.5) messages. */
export class QRY_Q01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QRY_Q01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QRY_Q01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQRY_Q01> {
    return parseStructure<ParsedQRY_Q01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QRY^Q01 (HL7 v2.5) message string into a structured result. */
export function parseQRY_Q01(messageString: string): Result<ParsedQRY_Q01> {
  return new QRY_Q01_Parser().parse(messageString);
}

/** The optional segments and groups of an QRY^Q01 (HL7 v2.5) message. */
export interface QRY_Q01Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 QRY^Q01 (HL7 v2.5) messages. */
export class QRY_Q01<TMSH extends MSH = MSH, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QRY_Q01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QRY_Q01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public query: TQRD,
    public options: QRY_Q01Options = {},
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

/** Builds an HL7 QRY^Q01 (HL7 v2.5) message. */
export function createQRY_Q01<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_Q01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_Q01<TMSH, TQRD> {
  return new QRY_Q01(header, query, options, encoding);
}
