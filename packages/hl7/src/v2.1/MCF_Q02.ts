/**
 * Builder, parser and structure for MCF^Q02 messages (HL7 v2.1).
 *
 * Structure: MSH MSA
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MCF^Q02 (HL7 v2.1), in order. */
export const MCF_Q02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
];

/** Structured result of parsing an HL7 MCF^Q02 (HL7 v2.1) message. */
export interface ParsedMCF_Q02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
}

/** The segment parsers of MCF^Q02 (HL7 v2.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
};

/** Parser for HL7 MCF^Q02 (HL7 v2.1) messages. */
export class MCF_Q02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MCF_Q02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MCF_Q02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMCF_Q02> {
    return parseStructure<ParsedMCF_Q02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MCF^Q02 (HL7 v2.1) message string into a structured result. */
export function parseMCF_Q02(messageString: string): Result<ParsedMCF_Q02> {
  return new MCF_Q02_Parser().parse(messageString);
}

/** The optional segments and groups of an MCF^Q02 (HL7 v2.1) message. The message has none. */
export type MCF_Q02Options = Record<string, never>;

/** Builder for HL7 MCF^Q02 (HL7 v2.1) messages. */
export class MCF_Q02<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MCF_Q02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MCF_Q02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: MCF_Q02Options = {},
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

/** Builds an HL7 MCF^Q02 (HL7 v2.1) message. */
export function createMCF_Q02<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: MCF_Q02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MCF_Q02<TMSH, TMSA> {
  return new MCF_Q02(header, acknowledgment, options, encoding);
}
