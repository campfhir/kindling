/**
 * Builder, parser and structure for MFD^M02 messages (HL7 v2.2).
 *
 * Structure: MSH MFI [{MFA}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeMessage, verifyStructure, type StructureInput, type EncodeOptions } from "../types/structure.ts";
import type { ParsedHL7MessageOf } from "../dispatch.ts";
import { MSH } from "./MSH.ts";
import { MFI } from "./MFI.ts";
import { MFA } from "./MFA.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MFD^M02 (HL7 v2.2), in order. */
export const MFD_M02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MFI", required: true, repeating: false },
  { name: "MFA", required: false, repeating: true },
];

/** Structured result of parsing an HL7 MFD^M02 (HL7 v2.2) message. */
export interface ParsedMFD_M02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MFA segments. */
  entryAcknowledgments?: MFA[];
}

/**
 * An HL7 MFD^M02 (HL7 v2.2) message as the root `parse()` returns it. Narrow a parsed
 * message to it with `isMessage<DispatchedMFD_M02>(message, "2.2", "MFD_M02")` of `@campfhir/hl7/parse`.
 */
export type DispatchedMFD_M02 = ParsedHL7MessageOf<"2.2", "MFD_M02", ParsedMFD_M02>;

/** The segment parsers of MFD^M02 (HL7 v2.2). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MFI: (s, e) => MFI.parse(s, e),
  MFA: (s, e) => MFA.parse(s, e),
};

/** Parser for HL7 MFD^M02 (HL7 v2.2) messages. */
export class MFD_M02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFD_M02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFD_M02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFD_M02> {
    return parseStructure<ParsedMFD_M02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFD^M02 (HL7 v2.2) message string into a structured result. */
export function parseMFD_M02(messageString: string): Result<ParsedMFD_M02> {
  return new MFD_M02_Parser().parse(messageString);
}

/** The optional segments and groups of an MFD^M02 (HL7 v2.2) message. */
export interface MFD_M02Options {
  /** The MFA segments. */
  entryAcknowledgments?: MFA[];
}

/** Builder for HL7 MFD^M02 (HL7 v2.2) messages. */
export class MFD_M02<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFD_M02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFD_M02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public options: MFD_M02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile };
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

/** Builds an HL7 MFD^M02 (HL7 v2.2) message. */
export function createMFD_M02<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  options: MFD_M02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFD_M02<TMSH, TMFI> {
  return new MFD_M02(header, masterFile, options, encoding);
}
