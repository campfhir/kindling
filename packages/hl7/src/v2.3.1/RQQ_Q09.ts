/**
 * Builder, parser and structure for RQQ^Q09 messages (HL7 v2.3.1).
 *
 * Structure: MSH ERQ [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { ERQ } from "./ERQ.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RQQ^Q09 (HL7 v2.3.1), in order. */
export const RQQ_Q09_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ERQ", required: true, repeating: false },
  { name: "DSC", required: false, repeating: false },
];

/** Structured result of parsing an HL7 RQQ^Q09 (HL7 v2.3.1) message. */
export interface ParsedRQQ_Q09 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The ERQ segment. */
  eventReplayQuery: ERQ;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RQQ^Q09 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  ERQ: (s, e) => ERQ.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RQQ^Q09 (HL7 v2.3.1) messages. */
export class RQQ_Q09_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RQQ_Q09";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RQQ_Q09_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRQQ_Q09> {
    return parseStructure<ParsedRQQ_Q09>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RQQ^Q09 (HL7 v2.3.1) message string into a structured result. */
export function parseRQQ_Q09(messageString: string): Result<ParsedRQQ_Q09> {
  return new RQQ_Q09_Parser().parse(messageString);
}

/** The optional segments and groups of an RQQ^Q09 (HL7 v2.3.1) message. */
export interface RQQ_Q09Options {
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RQQ^Q09 (HL7 v2.3.1) messages. */
export class RQQ_Q09<TMSH extends MSH = MSH, TERQ extends ERQ = ERQ> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RQQ_Q09";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RQQ_Q09_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public eventReplayQuery: TERQ,
    public options: RQQ_Q09Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, eventReplayQuery: this.eventReplayQuery };
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

/** Builds an HL7 RQQ^Q09 (HL7 v2.3.1) message. */
export function createRQQ_Q09<TMSH extends MSH = MSH, TERQ extends ERQ = ERQ>(
  header: TMSH,
  eventReplayQuery: TERQ,
  options: RQQ_Q09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RQQ_Q09<TMSH, TERQ> {
  return new RQQ_Q09(header, eventReplayQuery, options, encoding);
}
