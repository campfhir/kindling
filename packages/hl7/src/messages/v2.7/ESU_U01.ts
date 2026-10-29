/**
 * Builder, parser and structure for ESU^U01 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EQU [{ISD}] [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { EQU } from "../../segments/v2.7/EQU.ts";
import { ISD } from "../../segments/v2.7/ISD.ts";
import { ROL } from "../../segments/v2.7/ROL.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of ESU^U01 (HL7 v2.7), in order. */
export const ESU_U01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EQU", required: true, repeating: false },
  { name: "ISD", required: false, repeating: true },
  { name: "ROL", required: false, repeating: false },
];

/** Structured result of parsing an HL7 ESU^U01 (HL7 v2.7) message. */
export interface ParsedESU_U01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The ISD segments. */
  interactionStatuses?: ISD[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of ESU^U01 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EQU: (s, e) => EQU.parse(s, e),
  ISD: (s, e) => ISD.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 ESU^U01 (HL7 v2.7) messages. */
export class ESU_U01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ESU_U01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ESU_U01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedESU_U01> {
    return parseStructure<ParsedESU_U01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ESU^U01 (HL7 v2.7) message string into a structured result. */
export function parseESU_U01(messageString: string): Result<ParsedESU_U01> {
  return new ESU_U01_Parser().parse(messageString);
}

/** The optional segments and groups of an ESU^U01 (HL7 v2.7) message. */
export interface ESU_U01Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ISD segments. */
  interactionStatuses?: ISD[];
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 ESU^U01 (HL7 v2.7) messages. */
export class ESU_U01<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ESU_U01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ESU_U01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public options: ESU_U01Options = {},
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

/** Builds an HL7 ESU^U01 (HL7 v2.7) message. */
export function createESU_U01<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  options: ESU_U01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ESU_U01<TMSH, TEQU> {
  return new ESU_U01(header, equipmentDetail, options, encoding);
}
