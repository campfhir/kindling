/**
 * Builder, parser and structure for MFN^M03 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] MFI { MF_TEST: MFE OM1 }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { MFI } from "../../segments/v2.6/MFI.ts";
import { MFE } from "../../segments/v2.6/MFE.ts";
import { OM1 } from "../../segments/v2.6/OM1.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of MFN^M03 (HL7 v2.6), in order. */
export const MFN_M03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_TEST",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "OM1", required: true, repeating: false },
    ],
  },
];

/** The MF TEST group of a parsed MFN^M03 (HL7 v2.6) message. */
export interface ParsedMfTest {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
}

/** Structured result of parsing an HL7 MFN^M03 (HL7 v2.6) message. */
export interface ParsedMFN_M03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF TEST groups. */
  mfTests: ParsedMfTest[];
}

/** The segment parsers of MFN^M03 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  OM1: (s, e) => OM1.parse(s, e),
};

/** Parser for HL7 MFN^M03 (HL7 v2.6) messages. */
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

/** Parses an HL7 MFN^M03 (HL7 v2.6) message string into a structured result. */
export function parseMFN_M03(messageString: string): Result<ParsedMFN_M03> {
  return new MFN_M03_Parser().parse(messageString);
}

/** The MF TEST group of an MFN^M03 (HL7 v2.6) message being built. */
export interface MfTestGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
}

/** The optional segments and groups of an MFN^M03 (HL7 v2.6) message. */
export interface MFN_M03Options {
  /** The SFT segments. */
  software?: SFT[];
}

/** Builder for HL7 MFN^M03 (HL7 v2.6) messages. */
export class MFN_M03<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M03_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public mfTests: MfTestGroup[],
    public options: MFN_M03Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, mfTests: this.mfTests };
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

/** Builds an HL7 MFN^M03 (HL7 v2.6) message. */
export function createMFN_M03<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  mfTests: MfTestGroup[],
  options: MFN_M03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M03<TMSH, TMFI> {
  return new MFN_M03(header, masterFile, mfTests, options, encoding);
}
