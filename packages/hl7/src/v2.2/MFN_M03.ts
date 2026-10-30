/**
 * Builder, parser and structure for MFN^M03 messages (HL7 v2.2).
 *
 * Structure: MSH MFI {MFE}
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { MFI } from "./MFI.ts";
import { MFE } from "./MFE.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MFN^M03 (HL7 v2.2), in order. */
export const MFN_M03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MFI", required: true, repeating: false },
  { name: "MFE", required: true, repeating: true },
];

/** Structured result of parsing an HL7 MFN^M03 (HL7 v2.2) message. */
export interface ParsedMFN_M03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MFE segments. */
  entries: MFE[];
}

/** The segment parsers of MFN^M03 (HL7 v2.2). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
};

/** Parser for HL7 MFN^M03 (HL7 v2.2) messages. */
export class MFN_M03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M03> {
    return parseStructure<ParsedMFN_M03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M03 (HL7 v2.2) message string into a structured result. */
export function parseMFN_M03(messageString: string): Result<ParsedMFN_M03> {
  return new MFN_M03_Parser().parse(messageString);
}

/** The optional segments and groups of an MFN^M03 (HL7 v2.2) message. The message has none. */
export type MFN_M03Options = Record<string, never>;

/** Builder for HL7 MFN^M03 (HL7 v2.2) messages. */
export class MFN_M03<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M03_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public entries: MFE[],
    public options: MFN_M03Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, entries: this.entries };
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

/** Builds an HL7 MFN^M03 (HL7 v2.2) message. */
export function createMFN_M03<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  entries: MFE[],
  options: MFN_M03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M03<TMSH, TMFI> {
  return new MFN_M03(header, masterFile, entries, options, encoding);
}
