/**
 * Builder, parser and structure for QCN^J01 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] QID
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
import { QID } from "./QID.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of QCN^J01 (HL7 v2.7), in order. */
export const QCN_J01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "QID", required: true, repeating: false },
];

/** Structured result of parsing an HL7 QCN^J01 (HL7 v2.7) message. */
export interface ParsedQCN_J01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QID segment. */
  queryIdentification: QID;
}

/** The segment parsers of QCN^J01 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  QID: (s, e) => QID.parse(s, e),
};

/** Parser for HL7 QCN^J01 (HL7 v2.7) messages. */
export class QCN_J01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QCN_J01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QCN_J01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQCN_J01> {
    return parseStructure<ParsedQCN_J01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QCN^J01 (HL7 v2.7) message string into a structured result. */
export function parseQCN_J01(messageString: string): Result<ParsedQCN_J01> {
  return new QCN_J01_Parser().parse(messageString);
}

/** The optional segments and groups of an QCN^J01 (HL7 v2.7) message. */
export interface QCN_J01Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 QCN^J01 (HL7 v2.7) messages. */
export class QCN_J01<TMSH extends MSH = MSH, TQID extends QID = QID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QCN_J01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QCN_J01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public queryIdentification: TQID,
    public options: QCN_J01Options = {},
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

/** Builds an HL7 QCN^J01 (HL7 v2.7) message. */
export function createQCN_J01<TMSH extends MSH = MSH, TQID extends QID = QID>(
  header: TMSH,
  queryIdentification: TQID,
  options: QCN_J01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QCN_J01<TMSH, TQID> {
  return new QCN_J01(header, queryIdentification, options, encoding);
}
