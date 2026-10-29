/**
 * Builder, parser and structure for LSR^U13 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EQU {EQP} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { EQU } from "../../segments/v2.5/EQU.ts";
import { EQP } from "../../segments/v2.5/EQP.ts";
import { ROL } from "../../segments/v2.5/ROL.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of LSR^U13 (HL7 v2.5), in order. */
export const LSR_U13_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EQU", required: true, repeating: false },
  { name: "EQP", required: true, repeating: true },
  { name: "ROL", required: false, repeating: false },
];

/** Structured result of parsing an HL7 LSR^U13 (HL7 v2.5) message. */
export interface ParsedLSR_U13 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The EQP segments. */
  equipmentLogServices: EQP[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of LSR^U13 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  EQU: (s, e) => EQU.parse(s, e),
  EQP: (s, e) => EQP.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 LSR^U13 (HL7 v2.5) messages. */
export class LSR_U13_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "LSR_U13";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = LSR_U13_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedLSR_U13> {
    return parseStructure<ParsedLSR_U13>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 LSR^U13 (HL7 v2.5) message string into a structured result. */
export function parseLSR_U13(messageString: string): Result<ParsedLSR_U13> {
  return new LSR_U13_Parser().parse(messageString);
}

/** The optional segments and groups of an LSR^U13 (HL7 v2.5) message. */
export interface LSR_U13Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 LSR^U13 (HL7 v2.5) messages. */
export class LSR_U13<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "LSR_U13";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = LSR_U13_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public equipmentLogServices: EQP[],
    public options: LSR_U13Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, equipmentDetail: this.equipmentDetail, equipmentLogServices: this.equipmentLogServices };
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

/** Builds an HL7 LSR^U13 (HL7 v2.5) message. */
export function createLSR_U13<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  equipmentLogServices: EQP[],
  options: LSR_U13Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): LSR_U13<TMSH, TEQU> {
  return new LSR_U13(header, equipmentDetail, equipmentLogServices, options, encoding);
}
