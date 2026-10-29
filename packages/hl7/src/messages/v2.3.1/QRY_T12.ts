/**
 * Builder, parser and structure for QRY^T12 messages (HL7 v2.3.1).
 *
 * Structure: MSH QRD [QRF]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { QRD } from "../../segments/v2.3.1/QRD.ts";
import { QRF } from "../../segments/v2.3.1/QRF.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of QRY^T12 (HL7 v2.3.1), in order. */
export const QRY_T12_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
];

/** Structured result of parsing an HL7 QRY^T12 (HL7 v2.3.1) message. */
export interface ParsedQRY_T12 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
}

/** The segment parsers of QRY^T12 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
};

/** Parser for HL7 QRY^T12 (HL7 v2.3.1) messages. */
export class QRY_T12_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QRY_T12";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QRY_T12_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQRY_T12> {
    return parseStructure<ParsedQRY_T12>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QRY^T12 (HL7 v2.3.1) message string into a structured result. */
export function parseQRY_T12(messageString: string): Result<ParsedQRY_T12> {
  return new QRY_T12_Parser().parse(messageString);
}

/** The optional segments and groups of an QRY^T12 (HL7 v2.3.1) message. */
export interface QRY_T12Options {
  /** The QRF segment. */
  queryFilter?: QRF;
}

/** Builder for HL7 QRY^T12 (HL7 v2.3.1) messages. */
export class QRY_T12<TMSH extends MSH = MSH, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QRY_T12";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QRY_T12_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public query: TQRD,
    public options: QRY_T12Options = {},
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

/** Builds an HL7 QRY^T12 (HL7 v2.3.1) message. */
export function createQRY_T12<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_T12Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_T12<TMSH, TQRD> {
  return new QRY_T12(header, query, options, encoding);
}
