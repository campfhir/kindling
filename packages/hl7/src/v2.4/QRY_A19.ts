/**
 * Builder, parser and structure for QRY^A19 messages (HL7 v2.4).
 *
 * Structure: MSH QRD [QRF]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeMessage, verifyStructure, type StructureInput, type EncodeOptions } from "../types/structure.ts";
import type { ParsedHL7MessageOf } from "../dispatch.ts";
import { MSH } from "./MSH.ts";
import { QRD } from "./QRD.ts";
import { QRF } from "./QRF.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of QRY^A19 (HL7 v2.4), in order. */
export const QRY_A19_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
];

/** Structured result of parsing an HL7 QRY^A19 (HL7 v2.4) message. */
export interface ParsedQRY_A19 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
}

/**
 * An HL7 QRY^A19 (HL7 v2.4) message as the root `parse()` returns it. Narrow a parsed
 * message to it with `isMessage<DispatchedQRY_A19>(message, "2.4", "QRY_A19")` of `@campfhir/hl7/parse`.
 */
export type DispatchedQRY_A19 = ParsedHL7MessageOf<"2.4", "QRY_A19", ParsedQRY_A19>;

/** The segment parsers of QRY^A19 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
};

/** Parser for HL7 QRY^A19 (HL7 v2.4) messages. */
export class QRY_A19_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QRY_A19";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QRY_A19_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQRY_A19> {
    return parseStructure<ParsedQRY_A19>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QRY^A19 (HL7 v2.4) message string into a structured result. */
export function parseQRY_A19(messageString: string): Result<ParsedQRY_A19> {
  return new QRY_A19_Parser().parse(messageString);
}

/** The optional segments and groups of an QRY^A19 (HL7 v2.4) message. */
export interface QRY_A19Options {
  /** The QRF segment. */
  queryFilter?: QRF;
}

/** Builder for HL7 QRY^A19 (HL7 v2.4) messages. */
export class QRY_A19<TMSH extends MSH = MSH, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QRY_A19";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QRY_A19_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public query: TQRD,
    public options: QRY_A19Options = {},
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

  /**
   * Encodes this message to its HL7 wire string, every segment ending with `\r`. Pass
   * `{ mllp: true }` to frame it for MLLP as `<VT>message<FS><CR>`.
   */
  encode(options?: EncodeOptions): string {
    const verification = this.verify();
    if (!verification.valid) {
      throw new Error(`Cannot encode invalid ${this.messageName} message:\n${verification.errors.join("\n")}`);
    }
    return encodeMessage(this.structure, this.toInput(), this.encoding, options);
  }
}

/** Builds an HL7 QRY^A19 (HL7 v2.4) message. */
export function createQRY_A19<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_A19Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_A19<TMSH, TQRD> {
  return new QRY_A19(header, query, options, encoding);
}
