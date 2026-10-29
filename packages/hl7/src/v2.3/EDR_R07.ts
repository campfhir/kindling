/**
 * Builder, parser and structure for EDR^R07 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] QAK {DSP} [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { ERR } from "./ERR.ts";
import { QAK } from "./QAK.ts";
import { DSP } from "./DSP.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of EDR^R07 (HL7 v2.3), in order. */
export const EDR_R07_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: true, repeating: false },
  { name: "DSP", required: true, repeating: true },
  { name: "DSC", required: false, repeating: false },
];

/** Structured result of parsing an HL7 EDR^R07 (HL7 v2.3) message. */
export interface ParsedEDR_R07 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The DSP segments. */
  displayLines: DSP[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of EDR^R07 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  DSP: (s, e) => DSP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 EDR^R07 (HL7 v2.3) messages. */
export class EDR_R07_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EDR_R07";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EDR_R07_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEDR_R07> {
    return parseStructure<ParsedEDR_R07>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EDR^R07 (HL7 v2.3) message string into a structured result. */
export function parseEDR_R07(messageString: string): Result<ParsedEDR_R07> {
  return new EDR_R07_Parser().parse(messageString);
}

/** The optional segments and groups of an EDR^R07 (HL7 v2.3) message. */
export interface EDR_R07Options {
  /** The ERR segment. */
  error?: ERR;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 EDR^R07 (HL7 v2.3) messages. */
export class EDR_R07<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EDR_R07";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EDR_R07_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public displayLines: DSP[],
    public options: EDR_R07Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAcknowledgment: this.queryAcknowledgment, displayLines: this.displayLines };
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

/** Builds an HL7 EDR^R07 (HL7 v2.3) message. */
export function createEDR_R07<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  displayLines: DSP[],
  options: EDR_R07Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EDR_R07<TMSH, TMSA, TQAK> {
  return new EDR_R07(header, acknowledgment, queryAcknowledgment, displayLines, options, encoding);
}
