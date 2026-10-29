/**
 * Builder, parser and structure for MFN^M05 messages (HL7 v2.7.1).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_LOCATION: MFE LOC [{LCH}] [{LRL}] { MF_LOC_DEPT: LDP [{LCH}] [{LCC}] } }
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
import { LOC } from "./LOC.ts";
import { LCH } from "./LCH.ts";
import { LRL } from "./LRL.ts";
import { LDP } from "./LDP.ts";
import { LCC } from "./LCC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MFN^M05 (HL7 v2.7.1), in order. */
export const MFN_M05_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_LOCATION",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "LOC", required: true, repeating: false },
      { name: "LCH", required: false, repeating: true },
      { name: "LRL", required: false, repeating: true },
      {
        name: "MF_LOC_DEPT",
        required: true,
        repeating: true,
        segments: [
          { name: "LDP", required: true, repeating: false },
          { name: "LCH", required: false, repeating: true },
          { name: "LCC", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The MF LOCATION group of a parsed MFN^M05 (HL7 v2.7.1) message. */
export interface ParsedMfLocation {
  /** The MFE segment. */
  entry: MFE;
  /** The LOC segment. */
  patientLocation: LOC;
  /** The LCH segments. */
  locationCharacteristics?: LCH[];
  /** The LRL segments. */
  locationRelationships?: LRL[];
  /** The MF LOC DEPT groups. */
  mfLocDepts: ParsedMfLocDept[];
}

/** The MF LOC DEPT group of a parsed MFN^M05 (HL7 v2.7.1) message. */
export interface ParsedMfLocDept {
  /** The LDP segment. */
  locationDepartment: LDP;
  /** The LCH segments. */
  locationCharacteristics?: LCH[];
  /** The LCC segments. */
  locationChargeCodes?: LCC[];
}

/** Structured result of parsing an HL7 MFN^M05 (HL7 v2.7.1) message. */
export interface ParsedMFN_M05 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF LOCATION groups. */
  mfLocations: ParsedMfLocation[];
}

/** The segment parsers of MFN^M05 (HL7 v2.7.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  LOC: (s, e) => LOC.parse(s, e),
  LCH: (s, e) => LCH.parse(s, e),
  LRL: (s, e) => LRL.parse(s, e),
  LDP: (s, e) => LDP.parse(s, e),
  LCC: (s, e) => LCC.parse(s, e),
};

/** Parser for HL7 MFN^M05 (HL7 v2.7.1) messages. */
export class MFN_M05_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M05";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M05_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M05> {
    return parseStructure<ParsedMFN_M05>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M05 (HL7 v2.7.1) message string into a structured result. */
export function parseMFN_M05(messageString: string): Result<ParsedMFN_M05> {
  return new MFN_M05_Parser().parse(messageString);
}

/** The MF LOCATION group of an MFN^M05 (HL7 v2.7.1) message being built. */
export interface MfLocationGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The LOC segment. */
  patientLocation: LOC;
  /** The LCH segments. */
  locationCharacteristics?: LCH[];
  /** The LRL segments. */
  locationRelationships?: LRL[];
  /** The MF LOC DEPT groups. */
  mfLocDepts: MfLocDeptGroup[];
}

/** The MF LOC DEPT group of an MFN^M05 (HL7 v2.7.1) message being built. */
export interface MfLocDeptGroup {
  /** The LDP segment. */
  locationDepartment: LDP;
  /** The LCH segments. */
  locationCharacteristics?: LCH[];
  /** The LCC segments. */
  locationChargeCodes?: LCC[];
}

/** The optional segments and groups of an MFN^M05 (HL7 v2.7.1) message. */
export interface MFN_M05Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 MFN^M05 (HL7 v2.7.1) messages. */
export class MFN_M05<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M05";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M05_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public mfLocations: MfLocationGroup[],
    public options: MFN_M05Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, mfLocations: this.mfLocations };
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

/** Builds an HL7 MFN^M05 (HL7 v2.7.1) message. */
export function createMFN_M05<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  mfLocations: MfLocationGroup[],
  options: MFN_M05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M05<TMSH, TMFI> {
  return new MFN_M05(header, masterFile, mfLocations, options, encoding);
}
