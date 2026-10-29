/**
 * Builder, parser and structure for ACK messages (HL7 v2.8.1).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}]
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
import { MSA } from "./MSA.ts";
import { ERR } from "./ERR.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ACK (HL7 v2.8.1), in order. */
export const ACK_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
];

/** Structured result of parsing an HL7 ACK (HL7 v2.8.1) message. */
export interface ParsedACK extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
}

/** The segment parsers of ACK (HL7 v2.8.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
};

/** Parser for HL7 ACK (HL7 v2.8.1) messages. */
export class ACK_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ACK";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ACK_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedACK> {
    return parseStructure<ParsedACK>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ACK (HL7 v2.8.1) message string into a structured result. */
export function parseACK(messageString: string): Result<ParsedACK> {
  return new ACK_Parser().parse(messageString);
}

/** The optional segments and groups of an ACK (HL7 v2.8.1) message. */
export interface ACKOptions {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ERR segments. */
  errors?: ERR[];
}

/** Builder for HL7 ACK (HL7 v2.8.1) messages. */
export class ACK<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ACK";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ACK_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: ACKOptions = {},
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

/** Builds an HL7 ACK (HL7 v2.8.1) message. */
export function createACK<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: ACKOptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ACK<TMSH, TMSA> {
  return new ACK(header, acknowledgment, options, encoding);
}
