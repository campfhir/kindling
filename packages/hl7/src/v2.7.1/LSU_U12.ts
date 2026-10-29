/**
 * Builder, parser and structure for LSU^U12 messages (HL7 v2.7.1).
 *
 * Structure: MSH [{SFT}] [UAC] EQU {EQP} [ROL]
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
import { EQU } from "./EQU.ts";
import { EQP } from "./EQP.ts";
import { ROL } from "./ROL.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of LSU^U12 (HL7 v2.7.1), in order. */
export const LSU_U12_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EQU", required: true, repeating: false },
  { name: "EQP", required: true, repeating: true },
  { name: "ROL", required: false, repeating: false },
];

/** Structured result of parsing an HL7 LSU^U12 (HL7 v2.7.1) message. */
export interface ParsedLSU_U12 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The EQP segments. */
  equipmentLogServices: EQP[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of LSU^U12 (HL7 v2.7.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EQU: (s, e) => EQU.parse(s, e),
  EQP: (s, e) => EQP.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 LSU^U12 (HL7 v2.7.1) messages. */
export class LSU_U12_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "LSU_U12";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = LSU_U12_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedLSU_U12> {
    return parseStructure<ParsedLSU_U12>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 LSU^U12 (HL7 v2.7.1) message string into a structured result. */
export function parseLSU_U12(messageString: string): Result<ParsedLSU_U12> {
  return new LSU_U12_Parser().parse(messageString);
}

/** The optional segments and groups of an LSU^U12 (HL7 v2.7.1) message. */
export interface LSU_U12Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 LSU^U12 (HL7 v2.7.1) messages. */
export class LSU_U12<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "LSU_U12";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = LSU_U12_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public equipmentLogServices: EQP[],
    public options: LSU_U12Options = {},
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

/** Builds an HL7 LSU^U12 (HL7 v2.7.1) message. */
export function createLSU_U12<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  equipmentLogServices: EQP[],
  options: LSU_U12Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): LSU_U12<TMSH, TEQU> {
  return new LSU_U12(header, equipmentDetail, equipmentLogServices, options, encoding);
}
