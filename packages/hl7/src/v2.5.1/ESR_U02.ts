/**
 * Builder, parser and structure for ESR^U02 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EQU [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { EQU } from "./EQU.ts";
import { ROL } from "./ROL.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ESR^U02 (HL7 v2.5.1), in order. */
export const ESR_U02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EQU", required: true, repeating: false },
  { name: "ROL", required: false, repeating: false },
];

/** Structured result of parsing an HL7 ESR^U02 (HL7 v2.5.1) message. */
export interface ParsedESR_U02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of ESR^U02 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  EQU: (s, e) => EQU.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 ESR^U02 (HL7 v2.5.1) messages. */
export class ESR_U02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ESR_U02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ESR_U02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedESR_U02> {
    return parseStructure<ParsedESR_U02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ESR^U02 (HL7 v2.5.1) message string into a structured result. */
export function parseESR_U02(messageString: string): Result<ParsedESR_U02> {
  return new ESR_U02_Parser().parse(messageString);
}

/** The optional segments and groups of an ESR^U02 (HL7 v2.5.1) message. */
export interface ESR_U02Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 ESR^U02 (HL7 v2.5.1) messages. */
export class ESR_U02<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ESR_U02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ESR_U02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public options: ESR_U02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, equipmentDetail: this.equipmentDetail };
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

/** Builds an HL7 ESR^U02 (HL7 v2.5.1) message. */
export function createESR_U02<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  options: ESR_U02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ESR_U02<TMSH, TEQU> {
  return new ESR_U02(header, equipmentDetail, options, encoding);
}
