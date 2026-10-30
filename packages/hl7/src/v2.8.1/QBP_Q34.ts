/**
 * Builder, parser and structure for QBP^Q34 messages (HL7 v2.8.1).
 *
 * Structure: MSH [{SFT}] [UAC] QPD RCP
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
import { QPD } from "./QPD.ts";
import { RCP } from "./RCP.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of QBP^Q34 (HL7 v2.8.1), in order. */
export const QBP_Q34_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "QPD", required: true, repeating: false },
  { name: "RCP", required: true, repeating: false },
];

/** Structured result of parsing an HL7 QBP^Q34 (HL7 v2.8.1) message. */
export interface ParsedQBP_Q34 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The RCP segment. */
  responseControl: RCP;
}

/** The segment parsers of QBP^Q34 (HL7 v2.8.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
};

/** Parser for HL7 QBP^Q34 (HL7 v2.8.1) messages. */
export class QBP_Q34_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QBP_Q34";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QBP_Q34_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQBP_Q34> {
    return parseStructure<ParsedQBP_Q34>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QBP^Q34 (HL7 v2.8.1) message string into a structured result. */
export function parseQBP_Q34(messageString: string): Result<ParsedQBP_Q34> {
  return new QBP_Q34_Parser().parse(messageString);
}

/** The optional segments and groups of an QBP^Q34 (HL7 v2.8.1) message. */
export interface QBP_Q34Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 QBP^Q34 (HL7 v2.8.1) messages. */
export class QBP_Q34<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QBP_Q34";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QBP_Q34_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public queryParameters: TQPD,
    public responseControl: TRCP,
    public options: QBP_Q34Options = {},
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

/** Builds an HL7 QBP^Q34 (HL7 v2.8.1) message. */
export function createQBP_Q34<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  queryParameters: TQPD,
  responseControl: TRCP,
  options: QBP_Q34Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QBP_Q34<TMSH, TQPD, TRCP> {
  return new QBP_Q34(header, queryParameters, responseControl, options, encoding);
}
