/**
 * Builder, parser and structure for SSR^U04 messages (HL7 v2.4).
 *
 * Structure: MSH EQU {SAC} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { EQU } from "./EQU.ts";
import { SAC } from "./SAC.ts";
import { ROL } from "./ROL.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of SSR^U04 (HL7 v2.4), in order. */
export const SSR_U04_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EQU", required: true, repeating: false },
  { name: "SAC", required: true, repeating: true },
  { name: "ROL", required: false, repeating: false },
];

/** Structured result of parsing an HL7 SSR^U04 (HL7 v2.4) message. */
export interface ParsedSSR_U04 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The SAC segments. */
  specimenContainers: SAC[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of SSR^U04 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EQU: (s, e) => EQU.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 SSR^U04 (HL7 v2.4) messages. */
export class SSR_U04_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SSR_U04";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SSR_U04_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSSR_U04> {
    return parseStructure<ParsedSSR_U04>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SSR^U04 (HL7 v2.4) message string into a structured result. */
export function parseSSR_U04(messageString: string): Result<ParsedSSR_U04> {
  return new SSR_U04_Parser().parse(messageString);
}

/** The optional segments and groups of an SSR^U04 (HL7 v2.4) message. */
export interface SSR_U04Options {
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 SSR^U04 (HL7 v2.4) messages. */
export class SSR_U04<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SSR_U04";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SSR_U04_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public specimenContainers: SAC[],
    public options: SSR_U04Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, equipmentDetail: this.equipmentDetail, specimenContainers: this.specimenContainers };
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

/** Builds an HL7 SSR^U04 (HL7 v2.4) message. */
export function createSSR_U04<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  specimenContainers: SAC[],
  options: SSR_U04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SSR_U04<TMSH, TEQU> {
  return new SSR_U04(header, equipmentDetail, specimenContainers, options, encoding);
}
