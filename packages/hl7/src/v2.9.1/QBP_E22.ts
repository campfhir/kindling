/**
 * Builder, parser and structure for QBP^E22 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [{UAC}]  QUERY: QPD RCP 
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

/** The segments, choices and groups of QBP^E22 (HL7 v2.9.1), in order. */
export const QBP_E22_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  {
    name: "QUERY",
    required: true,
    repeating: false,
    segments: [
      { name: "QPD", required: true, repeating: false },
      { name: "RCP", required: true, repeating: false },
    ],
  },
];

/** The QUERY group of a parsed QBP^E22 (HL7 v2.9.1) message. */
export interface ParsedQuery {
  /** The QPD segment. */
  queryParameters: QPD;
  /** The RCP segment. */
  responseControl: RCP;
}

/** Structured result of parsing an HL7 QBP^E22 (HL7 v2.9.1) message. */
export interface ParsedQBP_E22 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The QUERY group. */
  query: ParsedQuery;
}

/** The segment parsers of QBP^E22 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
};

/** Parser for HL7 QBP^E22 (HL7 v2.9.1) messages. */
export class QBP_E22_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QBP_E22";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QBP_E22_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQBP_E22> {
    return parseStructure<ParsedQBP_E22>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QBP^E22 (HL7 v2.9.1) message string into a structured result. */
export function parseQBP_E22(messageString: string): Result<ParsedQBP_E22> {
  return new QBP_E22_Parser().parse(messageString);
}

/** The QUERY group of an QBP^E22 (HL7 v2.9.1) message being built. */
export interface QueryGroup {
  /** The QPD segment. */
  queryParameters: QPD;
  /** The RCP segment. */
  responseControl: RCP;
}

/** The optional segments and groups of an QBP^E22 (HL7 v2.9.1) message. */
export interface QBP_E22Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
}

/** Builder for HL7 QBP^E22 (HL7 v2.9.1) messages. */
export class QBP_E22<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QBP_E22";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QBP_E22_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public query: QueryGroup,
    public options: QBP_E22Options = {},
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

/** Builds an HL7 QBP^E22 (HL7 v2.9.1) message. */
export function createQBP_E22<TMSH extends MSH = MSH>(
  header: TMSH,
  query: QueryGroup,
  options: QBP_E22Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QBP_E22<TMSH> {
  return new QBP_E22(header, query, options, encoding);
}
