/**
 * Builder, parser and structure for MFN^M08 messages (HL7 v2.7.1).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_TEST_NUMERIC: MFE OM1 [OM2] [OM3] [OM4] }
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
import { MFI } from "./MFI.ts";
import { MFE } from "./MFE.ts";
import { OM1 } from "./OM1.ts";
import { OM2 } from "./OM2.ts";
import { OM3 } from "./OM3.ts";
import { OM4 } from "./OM4.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MFN^M08 (HL7 v2.7.1), in order. */
export const MFN_M08_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_TEST_NUMERIC",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "OM1", required: true, repeating: false },
      { name: "OM2", required: false, repeating: false },
      { name: "OM3", required: false, repeating: false },
      { name: "OM4", required: false, repeating: false },
    ],
  },
];

/** The MF TEST NUMERIC group of a parsed MFN^M08 (HL7 v2.7.1) message. */
export interface ParsedMfTestNumeric {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The OM2 segment. */
  numericObservation?: OM2;
  /** The OM3 segment. */
  categoricalObservation?: OM3;
  /** The OM4 segment. */
  specimenRequirement?: OM4;
}

/** Structured result of parsing an HL7 MFN^M08 (HL7 v2.7.1) message. */
export interface ParsedMFN_M08 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF TEST NUMERIC groups. */
  mfTestNumerics: ParsedMfTestNumeric[];
}

/** The segment parsers of MFN^M08 (HL7 v2.7.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  OM1: (s, e) => OM1.parse(s, e),
  OM2: (s, e) => OM2.parse(s, e),
  OM3: (s, e) => OM3.parse(s, e),
  OM4: (s, e) => OM4.parse(s, e),
};

/** Parser for HL7 MFN^M08 (HL7 v2.7.1) messages. */
export class MFN_M08_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M08";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M08_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M08> {
    return parseStructure<ParsedMFN_M08>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M08 (HL7 v2.7.1) message string into a structured result. */
export function parseMFN_M08(messageString: string): Result<ParsedMFN_M08> {
  return new MFN_M08_Parser().parse(messageString);
}

/** The MF TEST NUMERIC group of an MFN^M08 (HL7 v2.7.1) message being built. */
export interface MfTestNumericGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The OM2 segment. */
  numericObservation?: OM2;
  /** The OM3 segment. */
  categoricalObservation?: OM3;
  /** The OM4 segment. */
  specimenRequirement?: OM4;
}

/** The optional segments and groups of an MFN^M08 (HL7 v2.7.1) message. */
export interface MFN_M08Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 MFN^M08 (HL7 v2.7.1) messages. */
export class MFN_M08<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M08";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M08_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public mfTestNumerics: MfTestNumericGroup[],
    public options: MFN_M08Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, mfTestNumerics: this.mfTestNumerics };
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

/** Builds an HL7 MFN^M08 (HL7 v2.7.1) message. */
export function createMFN_M08<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  mfTestNumerics: MfTestNumericGroup[],
  options: MFN_M08Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M08<TMSH, TMFI> {
  return new MFN_M08(header, masterFile, mfTestNumerics, options, encoding);
}
