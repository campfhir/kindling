/**
 * Builder, parser and structure for QBP^E03 messages (HL7 v2.7.1).
 *
 * Structure: MSH [{SFT}] [{UAC}]  QUERY_INFORMATION: QPD RCP 
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

/** The segments, choices and groups of QBP^E03 (HL7 v2.7.1), in order. */
export const QBP_E03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  {
    name: "QUERY_INFORMATION",
    required: true,
    repeating: false,
    segments: [
      { name: "QPD", required: true, repeating: false },
      { name: "RCP", required: true, repeating: false },
    ],
  },
];

/** The QUERY INFORMATION group of a parsed QBP^E03 (HL7 v2.7.1) message. */
export interface ParsedQueryInformation {
  /** The QPD segment. */
  queryParameters: QPD;
  /** The RCP segment. */
  responseControl: RCP;
}

/** Structured result of parsing an HL7 QBP^E03 (HL7 v2.7.1) message. */
export interface ParsedQBP_E03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The QUERY INFORMATION group. */
  queryInformation: ParsedQueryInformation;
}

/** The segment parsers of QBP^E03 (HL7 v2.7.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
};

/** Parser for HL7 QBP^E03 (HL7 v2.7.1) messages. */
export class QBP_E03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QBP_E03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QBP_E03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQBP_E03> {
    return parseStructure<ParsedQBP_E03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QBP^E03 (HL7 v2.7.1) message string into a structured result. */
export function parseQBP_E03(messageString: string): Result<ParsedQBP_E03> {
  return new QBP_E03_Parser().parse(messageString);
}

/** The QUERY INFORMATION group of an QBP^E03 (HL7 v2.7.1) message being built. */
export interface QueryInformationGroup {
  /** The QPD segment. */
  queryParameters: QPD;
  /** The RCP segment. */
  responseControl: RCP;
}

/** The optional segments and groups of an QBP^E03 (HL7 v2.7.1) message. */
export interface QBP_E03Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
}

/** Builder for HL7 QBP^E03 (HL7 v2.7.1) messages. */
export class QBP_E03<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QBP_E03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QBP_E03_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public queryInformation: QueryInformationGroup,
    public options: QBP_E03Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, queryInformation: this.queryInformation };
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

/** Builds an HL7 QBP^E03 (HL7 v2.7.1) message. */
export function createQBP_E03<TMSH extends MSH = MSH>(
  header: TMSH,
  queryInformation: QueryInformationGroup,
  options: QBP_E03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QBP_E03<TMSH> {
  return new QBP_E03(header, queryInformation, options, encoding);
}
