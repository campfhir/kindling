/**
 * Builder, parser and structure for STC^S33 messages (HL7 v2.9).
 *
 * Structure: MSH [{SFT}] [UAC] {SCP}
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
import { SCP } from "./SCP.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of STC^S33 (HL7 v2.9), in order. */
export const STC_S33_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "SCP", required: true, repeating: true },
];

/** Structured result of parsing an HL7 STC^S33 (HL7 v2.9) message. */
export interface ParsedSTC_S33 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The SCP segments. */
  scpList: SCP[];
}

/** The segment parsers of STC^S33 (HL7 v2.9). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  SCP: (s, e) => SCP.parse(s, e),
};

/** Parser for HL7 STC^S33 (HL7 v2.9) messages. */
export class STC_S33_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "STC_S33";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = STC_S33_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSTC_S33> {
    return parseStructure<ParsedSTC_S33>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 STC^S33 (HL7 v2.9) message string into a structured result. */
export function parseSTC_S33(messageString: string): Result<ParsedSTC_S33> {
  return new STC_S33_Parser().parse(messageString);
}

/** The optional segments and groups of an STC^S33 (HL7 v2.9) message. */
export interface STC_S33Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 STC^S33 (HL7 v2.9) messages. */
export class STC_S33<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "STC_S33";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = STC_S33_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public scpList: SCP[],
    public options: STC_S33Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, scpList: this.scpList };
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

/** Builds an HL7 STC^S33 (HL7 v2.9) message. */
export function createSTC_S33<TMSH extends MSH = MSH>(
  header: TMSH,
  scpList: SCP[],
  options: STC_S33Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): STC_S33<TMSH> {
  return new STC_S33(header, scpList, options, encoding);
}
