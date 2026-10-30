/**
 * Builder, parser and structure for INU^U05 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EQU {INV} [ROL]
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
import { INV } from "./INV.ts";
import { ROL } from "./ROL.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of INU^U05 (HL7 v2.9.1), in order. */
export const INU_U05_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EQU", required: true, repeating: false },
  { name: "INV", required: true, repeating: true },
  { name: "ROL", required: false, repeating: false },
];

/** Structured result of parsing an HL7 INU^U05 (HL7 v2.9.1) message. */
export interface ParsedINU_U05 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The INV segments. */
  inventoryDetails: INV[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of INU^U05 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EQU: (s, e) => EQU.parse(s, e),
  INV: (s, e) => INV.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 INU^U05 (HL7 v2.9.1) messages. */
export class INU_U05_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "INU_U05";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = INU_U05_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedINU_U05> {
    return parseStructure<ParsedINU_U05>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 INU^U05 (HL7 v2.9.1) message string into a structured result. */
export function parseINU_U05(messageString: string): Result<ParsedINU_U05> {
  return new INU_U05_Parser().parse(messageString);
}

/** The optional segments and groups of an INU^U05 (HL7 v2.9.1) message. */
export interface INU_U05Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 INU^U05 (HL7 v2.9.1) messages. */
export class INU_U05<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "INU_U05";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = INU_U05_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public inventoryDetails: INV[],
    public options: INU_U05Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, equipmentDetail: this.equipmentDetail, inventoryDetails: this.inventoryDetails };
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

/** Builds an HL7 INU^U05 (HL7 v2.9.1) message. */
export function createINU_U05<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  inventoryDetails: INV[],
  options: INU_U05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): INU_U05<TMSH, TEQU> {
  return new INU_U05(header, equipmentDetail, inventoryDetails, options, encoding);
}
