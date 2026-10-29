/**
 * Builder, parser and structure for EAC^U07 messages (HL7 v2.4).
 *
 * Structure: MSH EQU {ECD} [SAC] [CNS] [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { EQU } from "./EQU.ts";
import { ECD } from "./ECD.ts";
import { SAC } from "./SAC.ts";
import { CNS } from "./CNS.ts";
import { ROL } from "./ROL.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of EAC^U07 (HL7 v2.4), in order. */
export const EAC_U07_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EQU", required: true, repeating: false },
  { name: "ECD", required: true, repeating: true },
  { name: "SAC", required: false, repeating: false },
  { name: "CNS", required: false, repeating: false },
  { name: "ROL", required: false, repeating: false },
];

/** Structured result of parsing an HL7 EAC^U07 (HL7 v2.4) message. */
export interface ParsedEAC_U07 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The ECD segments. */
  equipmentCommands: ECD[];
  /** The SAC segment. */
  specimenContainer?: SAC;
  /** The CNS segment. */
  clearNotification?: CNS;
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of EAC^U07 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EQU: (s, e) => EQU.parse(s, e),
  ECD: (s, e) => ECD.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  CNS: (s, e) => CNS.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 EAC^U07 (HL7 v2.4) messages. */
export class EAC_U07_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EAC_U07";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EAC_U07_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEAC_U07> {
    return parseStructure<ParsedEAC_U07>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EAC^U07 (HL7 v2.4) message string into a structured result. */
export function parseEAC_U07(messageString: string): Result<ParsedEAC_U07> {
  return new EAC_U07_Parser().parse(messageString);
}

/** The optional segments and groups of an EAC^U07 (HL7 v2.4) message. */
export interface EAC_U07Options {
  /** The SAC segment. */
  specimenContainer?: SAC;
  /** The CNS segment. */
  clearNotification?: CNS;
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 EAC^U07 (HL7 v2.4) messages. */
export class EAC_U07<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EAC_U07";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EAC_U07_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public equipmentCommands: ECD[],
    public options: EAC_U07Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, equipmentDetail: this.equipmentDetail, equipmentCommands: this.equipmentCommands };
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

/** Builds an HL7 EAC^U07 (HL7 v2.4) message. */
export function createEAC_U07<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  equipmentCommands: ECD[],
  options: EAC_U07Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EAC_U07<TMSH, TEQU> {
  return new EAC_U07(header, equipmentDetail, equipmentCommands, options, encoding);
}
