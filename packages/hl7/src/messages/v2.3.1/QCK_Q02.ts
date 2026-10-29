/**
 * Builder, parser and structure for QCK^Q02 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA [ERR] [QAK]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { MSA } from "../../segments/v2.3.1/MSA.ts";
import { ERR } from "../../segments/v2.3.1/ERR.ts";
import { QAK } from "../../segments/v2.3.1/QAK.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of QCK^Q02 (HL7 v2.3.1), in order. */
export const QCK_Q02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: false, repeating: false },
];

/** Structured result of parsing an HL7 QCK^Q02 (HL7 v2.3.1) message. */
export interface ParsedQCK_Q02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
}

/** The segment parsers of QCK^Q02 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
};

/** Parser for HL7 QCK^Q02 (HL7 v2.3.1) messages. */
export class QCK_Q02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QCK_Q02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QCK_Q02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQCK_Q02> {
    return parseStructure<ParsedQCK_Q02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QCK^Q02 (HL7 v2.3.1) message string into a structured result. */
export function parseQCK_Q02(messageString: string): Result<ParsedQCK_Q02> {
  return new QCK_Q02_Parser().parse(messageString);
}

/** The optional segments and groups of an QCK^Q02 (HL7 v2.3.1) message. */
export interface QCK_Q02Options {
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
}

/** Builder for HL7 QCK^Q02 (HL7 v2.3.1) messages. */
export class QCK_Q02<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QCK_Q02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QCK_Q02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: QCK_Q02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment };
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

/** Builds an HL7 QCK^Q02 (HL7 v2.3.1) message. */
export function createQCK_Q02<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: QCK_Q02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QCK_Q02<TMSH, TMSA> {
  return new QCK_Q02(header, acknowledgment, options, encoding);
}
