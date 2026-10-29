/**
 * Builder, parser and structure for MFN^M11 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_TEST_CALCULATED: MFE OM1 [ MF_TEST_CALC_DETAIL: OM6 OM2 ] }
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
import { OM6 } from "./OM6.ts";
import { OM2 } from "./OM2.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MFN^M11 (HL7 v2.6), in order. */
export const MFN_M11_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_TEST_CALCULATED",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "OM1", required: true, repeating: false },
      {
        name: "MF_TEST_CALC_DETAIL",
        required: false,
        repeating: false,
        segments: [
          { name: "OM6", required: true, repeating: false },
          { name: "OM2", required: true, repeating: false },
        ],
      },
    ],
  },
];

/** The MF TEST CALCULATED group of a parsed MFN^M11 (HL7 v2.6) message. */
export interface ParsedMfTestCalculated {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The MF TEST CALC DETAIL group. */
  mfTestCalcDetail?: ParsedMfTestCalcDetail;
}

/** The MF TEST CALC DETAIL group of a parsed MFN^M11 (HL7 v2.6) message. */
export interface ParsedMfTestCalcDetail {
  /** The OM6 segment. */
  calculatedObservation: OM6;
  /** The OM2 segment. */
  numericObservation: OM2;
}

/** Structured result of parsing an HL7 MFN^M11 (HL7 v2.6) message. */
export interface ParsedMFN_M11 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF TEST CALCULATED groups. */
  mfTestCalculateds: ParsedMfTestCalculated[];
}

/** The segment parsers of MFN^M11 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  OM1: (s, e) => OM1.parse(s, e),
  OM6: (s, e) => OM6.parse(s, e),
  OM2: (s, e) => OM2.parse(s, e),
};

/** Parser for HL7 MFN^M11 (HL7 v2.6) messages. */
export class MFN_M11_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M11";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M11_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M11> {
    return parseStructure<ParsedMFN_M11>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M11 (HL7 v2.6) message string into a structured result. */
export function parseMFN_M11(messageString: string): Result<ParsedMFN_M11> {
  return new MFN_M11_Parser().parse(messageString);
}

/** The MF TEST CALCULATED group of an MFN^M11 (HL7 v2.6) message being built. */
export interface MfTestCalculatedGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The MF TEST CALC DETAIL group. */
  mfTestCalcDetail?: MfTestCalcDetailGroup;
}

/** The MF TEST CALC DETAIL group of an MFN^M11 (HL7 v2.6) message being built. */
export interface MfTestCalcDetailGroup {
  /** The OM6 segment. */
  calculatedObservation: OM6;
  /** The OM2 segment. */
  numericObservation: OM2;
}

/** The optional segments and groups of an MFN^M11 (HL7 v2.6) message. */
export interface MFN_M11Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 MFN^M11 (HL7 v2.6) messages. */
export class MFN_M11<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M11";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M11_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public mfTestCalculateds: MfTestCalculatedGroup[],
    public options: MFN_M11Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, mfTestCalculateds: this.mfTestCalculateds };
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

/** Builds an HL7 MFN^M11 (HL7 v2.6) message. */
export function createMFN_M11<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  mfTestCalculateds: MfTestCalculatedGroup[],
  options: MFN_M11Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M11<TMSH, TMFI> {
  return new MFN_M11(header, masterFile, mfTestCalculateds, options, encoding);
}
