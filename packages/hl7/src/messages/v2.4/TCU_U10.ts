/**
 * Builder, parser and structure for TCU^U10 messages (HL7 v2.4).
 *
 * Structure: MSH EQU {TCC} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { EQU } from "../../segments/v2.4/EQU.ts";
import { TCC } from "../../segments/v2.4/TCC.ts";
import { ROL } from "../../segments/v2.4/ROL.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of TCU^U10 (HL7 v2.4), in order. */
export const TCU_U10_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EQU", required: true, repeating: false },
  { name: "TCC", required: true, repeating: true },
  { name: "ROL", required: false, repeating: false },
];

/** Structured result of parsing an HL7 TCU^U10 (HL7 v2.4) message. */
export interface ParsedTCU_U10 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The TCC segments. */
  testCodeConfigurations: TCC[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of TCU^U10 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EQU: (s, e) => EQU.parse(s, e),
  TCC: (s, e) => TCC.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 TCU^U10 (HL7 v2.4) messages. */
export class TCU_U10_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "TCU_U10";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = TCU_U10_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedTCU_U10> {
    return parseStructure<ParsedTCU_U10>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 TCU^U10 (HL7 v2.4) message string into a structured result. */
export function parseTCU_U10(messageString: string): Result<ParsedTCU_U10> {
  return new TCU_U10_Parser().parse(messageString);
}

/** The optional segments and groups of an TCU^U10 (HL7 v2.4) message. */
export interface TCU_U10Options {
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 TCU^U10 (HL7 v2.4) messages. */
export class TCU_U10<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "TCU_U10";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = TCU_U10_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public testCodeConfigurations: TCC[],
    public options: TCU_U10Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, equipmentDetail: this.equipmentDetail, testCodeConfigurations: this.testCodeConfigurations };
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

/** Builds an HL7 TCU^U10 (HL7 v2.4) message. */
export function createTCU_U10<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  testCodeConfigurations: TCC[],
  options: TCU_U10Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): TCU_U10<TMSH, TEQU> {
  return new TCU_U10(header, equipmentDetail, testCodeConfigurations, options, encoding);
}
