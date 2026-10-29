/**
 * Builder, parser and structure for MFD^MFA messages (HL7 v2.3.1).
 *
 * Structure: MSH MFI [{MFA}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { MFI } from "../../segments/v2.3.1/MFI.ts";
import { MFA } from "../../segments/v2.3.1/MFA.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of MFD^MFA (HL7 v2.3.1), in order. */
export const MFD_MFA_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MFI", required: true, repeating: false },
  { name: "MFA", required: false, repeating: true },
];

/** Structured result of parsing an HL7 MFD^MFA (HL7 v2.3.1) message. */
export interface ParsedMFD_MFA extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MFA segments. */
  entryAcknowledgments?: MFA[];
}

/** The segment parsers of MFD^MFA (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MFI: (s, e) => MFI.parse(s, e),
  MFA: (s, e) => MFA.parse(s, e),
};

/** Parser for HL7 MFD^MFA (HL7 v2.3.1) messages. */
export class MFD_MFA_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFD_MFA";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFD_MFA_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFD_MFA> {
    return parseStructure<ParsedMFD_MFA>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFD^MFA (HL7 v2.3.1) message string into a structured result. */
export function parseMFD_MFA(messageString: string): Result<ParsedMFD_MFA> {
  return new MFD_MFA_Parser().parse(messageString);
}

/** The optional segments and groups of an MFD^MFA (HL7 v2.3.1) message. */
export interface MFD_MFAOptions {
  /** The MFA segments. */
  entryAcknowledgments?: MFA[];
}

/** Builder for HL7 MFD^MFA (HL7 v2.3.1) messages. */
export class MFD_MFA<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFD_MFA";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFD_MFA_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public options: MFD_MFAOptions = {},
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

  /** Encodes this message to its HL7 wire string. */
  encode(): string {
    const verification = this.verify();
    if (!verification.valid) {
      throw new Error(`Cannot encode invalid ${this.messageName} message:\n${verification.errors.join("\n")}`);
    }
    return encodeStructure(this.structure, this.toInput(), this.encoding);
  }
}

/** Builds an HL7 MFD^MFA (HL7 v2.3.1) message. */
export function createMFD_MFA<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  options: MFD_MFAOptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFD_MFA<TMSH, TMFI> {
  return new MFD_MFA(header, masterFile, options, encoding);
}
