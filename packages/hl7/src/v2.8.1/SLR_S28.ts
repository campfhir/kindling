/**
 * Builder, parser and structure for SLR^S28 messages (HL7 v2.8.1).
 *
 * Structure: MSH [{SFT}] [UAC] {SLT}
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
import { SLT } from "./SLT.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of SLR^S28 (HL7 v2.8.1), in order. */
export const SLR_S28_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "SLT", required: true, repeating: true },
];

/** Structured result of parsing an HL7 SLR^S28 (HL7 v2.8.1) message. */
export interface ParsedSLR_S28 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The SLT segments. */
  sltList: SLT[];
}

/** The segment parsers of SLR^S28 (HL7 v2.8.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  SLT: (s, e) => SLT.parse(s, e),
};

/** Parser for HL7 SLR^S28 (HL7 v2.8.1) messages. */
export class SLR_S28_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SLR_S28";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SLR_S28_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSLR_S28> {
    return parseStructure<ParsedSLR_S28>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SLR^S28 (HL7 v2.8.1) message string into a structured result. */
export function parseSLR_S28(messageString: string): Result<ParsedSLR_S28> {
  return new SLR_S28_Parser().parse(messageString);
}

/** The optional segments and groups of an SLR^S28 (HL7 v2.8.1) message. */
export interface SLR_S28Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 SLR^S28 (HL7 v2.8.1) messages. */
export class SLR_S28<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SLR_S28";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SLR_S28_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public sltList: SLT[],
    public options: SLR_S28Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, sltList: this.sltList };
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

/** Builds an HL7 SLR^S28 (HL7 v2.8.1) message. */
export function createSLR_S28<TMSH extends MSH = MSH>(
  header: TMSH,
  sltList: SLT[],
  options: SLR_S28Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SLR_S28<TMSH> {
  return new SLR_S28(header, sltList, options, encoding);
}
