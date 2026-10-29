/**
 * Builder, parser and structure for QSB^Z83 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] QPD RCP [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { QPD } from "./QPD.ts";
import { RCP } from "./RCP.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of QSB^Z83 (HL7 v2.5), in order. */
export const QSB_Z83_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "QPD", required: true, repeating: false },
  { name: "RCP", required: true, repeating: false },
  { name: "DSC", required: false, repeating: false },
];

/** Structured result of parsing an HL7 QSB^Z83 (HL7 v2.5) message. */
export interface ParsedQSB_Z83 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The QPD segment. */
  queryParameters: QPD;
  /** The RCP segment. */
  responseControl: RCP;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of QSB^Z83 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 QSB^Z83 (HL7 v2.5) messages. */
export class QSB_Z83_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QSB_Z83";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QSB_Z83_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQSB_Z83> {
    return parseStructure<ParsedQSB_Z83>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QSB^Z83 (HL7 v2.5) message string into a structured result. */
export function parseQSB_Z83(messageString: string): Result<ParsedQSB_Z83> {
  return new QSB_Z83_Parser().parse(messageString);
}

/** The optional segments and groups of an QSB^Z83 (HL7 v2.5) message. */
export interface QSB_Z83Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 QSB^Z83 (HL7 v2.5) messages. */
export class QSB_Z83<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QSB_Z83";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QSB_Z83_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public queryParameters: TQPD,
    public responseControl: TRCP,
    public options: QSB_Z83Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, queryParameters: this.queryParameters, responseControl: this.responseControl };
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

/** Builds an HL7 QSB^Z83 (HL7 v2.5) message. */
export function createQSB_Z83<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  queryParameters: TQPD,
  responseControl: TRCP,
  options: QSB_Z83Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QSB_Z83<TMSH, TQPD, TRCP> {
  return new QSB_Z83(header, queryParameters, responseControl, options, encoding);
}
