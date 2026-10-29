/**
 * Builder, parser and structure for QRY^R02 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] QRD QRF
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { QRD } from "../../segments/v2.5.1/QRD.ts";
import { QRF } from "../../segments/v2.5.1/QRF.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of QRY^R02 (HL7 v2.5.1), in order. */
export const QRY_R02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: true, repeating: false },
];

/** Structured result of parsing an HL7 QRY^R02 (HL7 v2.5.1) message. */
export interface ParsedQRY_R02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter: QRF;
}

/** The segment parsers of QRY^R02 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
};

/** Parser for HL7 QRY^R02 (HL7 v2.5.1) messages. */
export class QRY_R02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QRY_R02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QRY_R02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQRY_R02> {
    return parseStructure<ParsedQRY_R02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QRY^R02 (HL7 v2.5.1) message string into a structured result. */
export function parseQRY_R02(messageString: string): Result<ParsedQRY_R02> {
  return new QRY_R02_Parser().parse(messageString);
}

/** The optional segments and groups of an QRY^R02 (HL7 v2.5.1) message. */
export interface QRY_R02Options {
  /** The SFT segments. */
  software?: SFT[];
}

/** Builder for HL7 QRY^R02 (HL7 v2.5.1) messages. */
export class QRY_R02<TMSH extends MSH = MSH, TQRD extends QRD = QRD, TQRF extends QRF = QRF> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QRY_R02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QRY_R02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public query: TQRD,
    public queryFilter: TQRF,
    public options: QRY_R02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, query: this.query, queryFilter: this.queryFilter };
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

/** Builds an HL7 QRY^R02 (HL7 v2.5.1) message. */
export function createQRY_R02<TMSH extends MSH = MSH, TQRD extends QRD = QRD, TQRF extends QRF = QRF>(
  header: TMSH,
  query: TQRD,
  queryFilter: TQRF,
  options: QRY_R02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_R02<TMSH, TQRD, TQRF> {
  return new QRY_R02(header, query, queryFilter, options, encoding);
}
