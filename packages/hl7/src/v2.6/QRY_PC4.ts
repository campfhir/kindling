/**
 * Builder, parser and structure for QRY^PC4 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] QRD [QRF]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { QRD } from "./QRD.ts";
import { QRF } from "./QRF.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of QRY^PC4 (HL7 v2.6), in order. */
export const QRY_PC4_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
];

/** Structured result of parsing an HL7 QRY^PC4 (HL7 v2.6) message. */
export interface ParsedQRY_PC4 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
}

/** The segment parsers of QRY^PC4 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
};

/** Parser for HL7 QRY^PC4 (HL7 v2.6) messages. */
export class QRY_PC4_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QRY_PC4";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QRY_PC4_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQRY_PC4> {
    return parseStructure<ParsedQRY_PC4>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QRY^PC4 (HL7 v2.6) message string into a structured result. */
export function parseQRY_PC4(messageString: string): Result<ParsedQRY_PC4> {
  return new QRY_PC4_Parser().parse(messageString);
}

/** The optional segments and groups of an QRY^PC4 (HL7 v2.6) message. */
export interface QRY_PC4Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QRF segment. */
  queryFilter?: QRF;
}

/** Builder for HL7 QRY^PC4 (HL7 v2.6) messages. */
export class QRY_PC4<TMSH extends MSH = MSH, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QRY_PC4";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QRY_PC4_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public query: TQRD,
    public options: QRY_PC4Options = {},
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

/** Builds an HL7 QRY^PC4 (HL7 v2.6) message. */
export function createQRY_PC4<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_PC4Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_PC4<TMSH, TQRD> {
  return new QRY_PC4(header, query, options, encoding);
}
