/**
 * Builder, parser and structure for MFK^M03 messages (HL7 v2.2).
 *
 * Structure: MSH MSA [ERR] MFI [{MFA}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { ERR } from "./ERR.ts";
import { MFI } from "./MFI.ts";
import { MFA } from "./MFA.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MFK^M03 (HL7 v2.2), in order. */
export const MFK_M03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  { name: "MFA", required: false, repeating: true },
];

/** Structured result of parsing an HL7 MFK^M03 (HL7 v2.2) message. */
export interface ParsedMFK_M03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MFA segments. */
  entryAcknowledgments?: MFA[];
}

/** The segment parsers of MFK^M03 (HL7 v2.2). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFA: (s, e) => MFA.parse(s, e),
};

/** Parser for HL7 MFK^M03 (HL7 v2.2) messages. */
export class MFK_M03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFK_M03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFK_M03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFK_M03> {
    return parseStructure<ParsedMFK_M03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFK^M03 (HL7 v2.2) message string into a structured result. */
export function parseMFK_M03(messageString: string): Result<ParsedMFK_M03> {
  return new MFK_M03_Parser().parse(messageString);
}

/** The optional segments and groups of an MFK^M03 (HL7 v2.2) message. */
export interface MFK_M03Options {
  /** The ERR segment. */
  error?: ERR;
  /** The MFA segments. */
  entryAcknowledgments?: MFA[];
}

/** Builder for HL7 MFK^M03 (HL7 v2.2) messages. */
export class MFK_M03<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFK_M03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFK_M03_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public masterFile: TMFI,
    public options: MFK_M03Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, masterFile: this.masterFile };
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

/** Builds an HL7 MFK^M03 (HL7 v2.2) message. */
export function createMFK_M03<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  masterFile: TMFI,
  options: MFK_M03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFK_M03<TMSH, TMSA, TMFI> {
  return new MFK_M03(header, acknowledgment, masterFile, options, encoding);
}
