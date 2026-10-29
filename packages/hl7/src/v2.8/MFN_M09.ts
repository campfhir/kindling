/**
 * Builder, parser and structure for MFN^M09 messages (HL7 v2.8).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_TEST_CATEGORICAL: MFE OM1 [{PRT}] [ MF_TEST_CAT_DETAIL: OM3 [{OM4}] ] }
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
import { PRT } from "./PRT.ts";
import { OM3 } from "./OM3.ts";
import { OM4 } from "./OM4.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MFN^M09 (HL7 v2.8), in order. */
export const MFN_M09_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_TEST_CATEGORICAL",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "OM1", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
      {
        name: "MF_TEST_CAT_DETAIL",
        required: false,
        repeating: false,
        segments: [
          { name: "OM3", required: true, repeating: false },
          { name: "OM4", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The MF TEST CATEGORICAL group of a parsed MFN^M09 (HL7 v2.8) message. */
export interface ParsedMfTestCategorical {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The MF TEST CAT DETAIL group. */
  mfTestCatDetail?: ParsedMfTestCatDetail;
}

/** The MF TEST CAT DETAIL group of a parsed MFN^M09 (HL7 v2.8) message. */
export interface ParsedMfTestCatDetail {
  /** The OM3 segment. */
  categoricalObservation: OM3;
  /** The OM4 segments. */
  specimenRequirements?: OM4[];
}

/** Structured result of parsing an HL7 MFN^M09 (HL7 v2.8) message. */
export interface ParsedMFN_M09 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF TEST CATEGORICAL groups. */
  mfTestCategoricals: ParsedMfTestCategorical[];
}

/** The segment parsers of MFN^M09 (HL7 v2.8). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  OM1: (s, e) => OM1.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  OM3: (s, e) => OM3.parse(s, e),
  OM4: (s, e) => OM4.parse(s, e),
};

/** Parser for HL7 MFN^M09 (HL7 v2.8) messages. */
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

/** Parses an HL7 MFN^M09 (HL7 v2.8) message string into a structured result. */
export function parseMFN_M09(messageString: string): Result<ParsedMFN_M09> {
  return new MFN_M09_Parser().parse(messageString);
}

/** The MF TEST CATEGORICAL group of an MFN^M09 (HL7 v2.8) message being built. */
export interface MfTestCategoricalGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The MF TEST CAT DETAIL group. */
  mfTestCatDetail?: MfTestCatDetailGroup;
}

/** The MF TEST CAT DETAIL group of an MFN^M09 (HL7 v2.8) message being built. */
export interface MfTestCatDetailGroup {
  /** The OM3 segment. */
  categoricalObservation: OM3;
  /** The OM4 segments. */
  specimenRequirements?: OM4[];
}

/** The optional segments and groups of an MFN^M09 (HL7 v2.8) message. */
export interface MFN_M09Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 MFN^M09 (HL7 v2.8) messages. */
export class MFN_M09<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M09";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M09_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public mfTestCategoricals: MfTestCategoricalGroup[],
    public options: MFN_M09Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, mfTestCategoricals: this.mfTestCategoricals };
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

/** Builds an HL7 MFN^M09 (HL7 v2.8) message. */
export function createMFN_M09<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  mfTestCategoricals: MfTestCategoricalGroup[],
  options: MFN_M09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M09<TMSH, TMFI> {
  return new MFN_M09(header, masterFile, mfTestCategoricals, options, encoding);
}
