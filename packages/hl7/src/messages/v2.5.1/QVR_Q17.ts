/**
 * Builder, parser and structure for QVR^Q17 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] QPD RCP [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { QPD } from "../../segments/v2.5.1/QPD.ts";
import { RCP } from "../../segments/v2.5.1/RCP.ts";
import { DSC } from "../../segments/v2.5.1/DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of QVR^Q17 (HL7 v2.5.1), in order. */
export const QVR_Q17_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "QPD", required: true, repeating: false },
  { name: "RCP", required: true, repeating: false },
  { name: "DSC", required: false, repeating: false },
];

/** Structured result of parsing an HL7 QVR^Q17 (HL7 v2.5.1) message. */
export interface ParsedQVR_Q17 extends ParsedMessageBase {
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

/** The segment parsers of QVR^Q17 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 QVR^Q17 (HL7 v2.5.1) messages. */
export class QVR_Q17_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QVR_Q17";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QVR_Q17_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQVR_Q17> {
    return parseStructure<ParsedQVR_Q17>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QVR^Q17 (HL7 v2.5.1) message string into a structured result. */
export function parseQVR_Q17(messageString: string): Result<ParsedQVR_Q17> {
  return new QVR_Q17_Parser().parse(messageString);
}

/** The optional segments and groups of an QVR^Q17 (HL7 v2.5.1) message. */
export interface QVR_Q17Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 QVR^Q17 (HL7 v2.5.1) messages. */
export class QVR_Q17<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QVR_Q17";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QVR_Q17_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public queryParameters: TQPD,
    public responseControl: TRCP,
    public options: QVR_Q17Options = {},
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

/** Builds an HL7 QVR^Q17 (HL7 v2.5.1) message. */
export function createQVR_Q17<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  queryParameters: TQPD,
  responseControl: TRCP,
  options: QVR_Q17Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QVR_Q17<TMSH, TQPD, TRCP> {
  return new QVR_Q17(header, queryParameters, responseControl, options, encoding);
}
