/**
 * Builder, parser and structure for MFN^M09 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MFI { MF_TEST_CATEGORICAL: MFE OM1 [ MF_TEST_CAT_DETAIL: OM3 [{OM4}] ] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { MFI } from "../../segments/v2.5.1/MFI.ts";
import { MFE } from "../../segments/v2.5.1/MFE.ts";
import { OM1 } from "../../segments/v2.5.1/OM1.ts";
import { OM3 } from "../../segments/v2.5.1/OM3.ts";
import { OM4 } from "../../segments/v2.5.1/OM4.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of MFN^M09 (HL7 v2.5.1), in order. */
export const MFN_M09_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_TEST_CATEGORICAL",
    required: true,
    repeating: true,
    as: "entries",
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "OM1", required: true, repeating: false },
      {
        name: "MF_TEST_CAT_DETAIL",
        required: false,
        repeating: false,
        inline: true,
        segments: [
          { name: "OM3", required: true, repeating: false },
          { name: "OM4", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The MF TEST CATEGORICAL group of a parsed MFN^M09 (HL7 v2.5.1) message. */
export interface ParsedCategoricalTestEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The OM3 segment. */
  categoricalObservation?: OM3;
  /** The OM4 segments. */
  specimenRequirements?: OM4[];
}

/** Structured result of parsing an HL7 MFN^M09 (HL7 v2.5.1) message. */
export interface ParsedMFN_M09 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF TEST CATEGORICAL groups. */
  entries: ParsedCategoricalTestEntry[];
}

/** The segment parsers of MFN^M09 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  OM1: (s, e) => OM1.parse(s, e),
  OM3: (s, e) => OM3.parse(s, e),
  OM4: (s, e) => OM4.parse(s, e),
};

/** Parser for HL7 MFN^M09 (HL7 v2.5.1) messages. */
export class MFN_M09_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M09";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M09_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M09> {
    return parseStructure<ParsedMFN_M09>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M09 (HL7 v2.5.1) message string into a structured result. */
export function parseMFN_M09(messageString: string): Result<ParsedMFN_M09> {
  return new MFN_M09_Parser().parse(messageString);
}

/** The MF TEST CATEGORICAL group of an MFN^M09 (HL7 v2.5.1) message being built. */
export interface CategoricalTestEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The OM3 segment. */
  categoricalObservation?: OM3;
  /** The OM4 segments. */
  specimenRequirements?: OM4[];
}

/** The optional segments and groups of an MFN^M09 (HL7 v2.5.1) message. */
export interface MFN_M09Options {
  /** The SFT segments. */
  software?: SFT[];
}

/** Builder for HL7 MFN^M09 (HL7 v2.5.1) messages. */
export class MFN_M09<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M09";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M09_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public entries: CategoricalTestEntry[],
    public options: MFN_M09Options = {},
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

/** Builds an HL7 MFN^M09 (HL7 v2.5.1) message. */
export function createMFN_M09<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  entries: CategoricalTestEntry[],
  options: MFN_M09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M09<TMSH, TMFI> {
  return new MFN_M09(header, masterFile, entries, options, encoding);
}
