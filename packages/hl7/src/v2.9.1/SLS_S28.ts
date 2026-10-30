/**
 * Builder, parser and structure for SLS^S28 messages (HL7 v2.9.1).
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

/** The segments, choices and groups of SLS^S28 (HL7 v2.9.1), in order. */
export const SLS_S28_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "SLT", required: true, repeating: true },
];

/** Structured result of parsing an HL7 SLS^S28 (HL7 v2.9.1) message. */
export interface ParsedSLS_S28 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The SLT segments. */
  sltList: SLT[];
}

/** The segment parsers of SLS^S28 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  SLT: (s, e) => SLT.parse(s, e),
};

/** Parser for HL7 SLS^S28 (HL7 v2.9.1) messages. */
export class SLS_S28_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SLS_S28";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SLS_S28_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSLS_S28> {
    return parseStructure<ParsedSLS_S28>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SLS^S28 (HL7 v2.9.1) message string into a structured result. */
export function parseSLS_S28(messageString: string): Result<ParsedSLS_S28> {
  return new SLS_S28_Parser().parse(messageString);
}

/** The optional segments and groups of an SLS^S28 (HL7 v2.9.1) message. */
export interface SLS_S28Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 SLS^S28 (HL7 v2.9.1) messages. */
export class SLS_S28<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SLS_S28";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SLS_S28_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public sltList: SLT[],
    public options: SLS_S28Options = {},
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

/** Builds an HL7 SLS^S28 (HL7 v2.9.1) message. */
export function createSLS_S28<TMSH extends MSH = MSH>(
  header: TMSH,
  sltList: SLT[],
  options: SLS_S28Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SLS_S28<TMSH> {
  return new SLS_S28(header, sltList, options, encoding);
}
