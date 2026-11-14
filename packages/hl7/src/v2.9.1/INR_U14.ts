/**
 * Builder, parser and structure for INR^U14 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EQU [{INV}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeMessage, verifyStructure, type StructureInput, type EncodeOptions } from "../types/structure.ts";
import type { ParsedHL7MessageOf } from "../dispatch.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { EQU } from "./EQU.ts";
import { INV } from "./INV.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of INR^U14 (HL7 v2.9.1), in order. */
export const INR_U14_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EQU", required: true, repeating: false },
  { name: "INV", required: false, repeating: true },
];

/** Structured result of parsing an HL7 INR^U14 (HL7 v2.9.1) message. */
export interface ParsedINR_U14 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The INV segments. */
  inventoryDetails?: INV[];
}

/**
 * An HL7 INR^U14 (HL7 v2.9.1) message as the root `parse()` returns it. Narrow a parsed
 * message to it with `isMessage<DispatchedINR_U14>(message, "2.9.1", "INR_U14")` of `@campfhir/hl7/parse`.
 */
export type DispatchedINR_U14 = ParsedHL7MessageOf<"2.9.1", "INR_U14", ParsedINR_U14>;

/** The segment parsers of INR^U14 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EQU: (s, e) => EQU.parse(s, e),
  INV: (s, e) => INV.parse(s, e),
};

/** Parser for HL7 INR^U14 (HL7 v2.9.1) messages. */
export class INR_U14_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "INR_U14";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = INR_U14_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedINR_U14> {
    return parseStructure<ParsedINR_U14>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 INR^U14 (HL7 v2.9.1) message string into a structured result. */
export function parseINR_U14(messageString: string): Result<ParsedINR_U14> {
  return new INR_U14_Parser().parse(messageString);
}

/** The optional segments and groups of an INR^U14 (HL7 v2.9.1) message. */
export interface INR_U14Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The INV segments. */
  inventoryDetails?: INV[];
}

/** Builder for HL7 INR^U14 (HL7 v2.9.1) messages. */
export class INR_U14<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "INR_U14";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = INR_U14_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public options: INR_U14Options = {},
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

  /**
   * Encodes this message to its HL7 wire string, every segment ending with `\r`. Pass
   * `{ mllp: true }` to frame it for MLLP as `<VT>message<FS><CR>`.
   */
  encode(options?: EncodeOptions): string {
    const verification = this.verify();
    if (!verification.valid) {
      throw new Error(`Cannot encode invalid ${this.messageName} message:\n${verification.errors.join("\n")}`);
    }
    return encodeMessage(this.structure, this.toInput(), this.encoding, options);
  }
}

/** Builds an HL7 INR^U14 (HL7 v2.9.1) message. */
export function createINR_U14<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  options: INR_U14Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): INR_U14<TMSH, TEQU> {
  return new INR_U14(header, equipmentDetail, options, encoding);
}
