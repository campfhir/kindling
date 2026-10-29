/**
 * Builder, parser and structure for QSX^J02 messages (HL7 v2.4).
 *
 * Structure: MSH QID
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { QID } from "./QID.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of QSX^J02 (HL7 v2.4), in order. */
export const QSX_J02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "QID", required: true, repeating: false },
];

/** Structured result of parsing an HL7 QSX^J02 (HL7 v2.4) message. */
export interface ParsedQSX_J02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The QID segment. */
  queryIdentification: QID;
}

/** The segment parsers of QSX^J02 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  QID: (s, e) => QID.parse(s, e),
};

/** Parser for HL7 QSX^J02 (HL7 v2.4) messages. */
export class QSX_J02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QSX_J02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QSX_J02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQSX_J02> {
    return parseStructure<ParsedQSX_J02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QSX^J02 (HL7 v2.4) message string into a structured result. */
export function parseQSX_J02(messageString: string): Result<ParsedQSX_J02> {
  return new QSX_J02_Parser().parse(messageString);
}

/** The optional segments and groups of an QSX^J02 (HL7 v2.4) message. The message has none. */
export type QSX_J02Options = Record<string, never>;

/** Builder for HL7 QSX^J02 (HL7 v2.4) messages. */
export class QSX_J02<TMSH extends MSH = MSH, TQID extends QID = QID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QSX_J02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QSX_J02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public queryIdentification: TQID,
    public options: QSX_J02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, queryIdentification: this.queryIdentification };
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

/** Builds an HL7 QSX^J02 (HL7 v2.4) message. */
export function createQSX_J02<TMSH extends MSH = MSH, TQID extends QID = QID>(
  header: TMSH,
  queryIdentification: TQID,
  options: QSX_J02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QSX_J02<TMSH, TQID> {
  return new QSX_J02(header, queryIdentification, options, encoding);
}
