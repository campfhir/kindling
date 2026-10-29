/**
 * Builder, parser and structure for MFR^M05 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] QRD [QRF] MFI { MF_QUERY: MFE LOC [{LCH}] [{LRL}] { MF_LOC_DEPT: LDP [{LCH}] [{LCC}] } } [DSC]
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
import { QRD } from "./QRD.ts";
import { QRF } from "./QRF.ts";
import { MFI } from "./MFI.ts";
import { MFE } from "./MFE.ts";
import { LOC } from "./LOC.ts";
import { LCH } from "./LCH.ts";
import { LRL } from "./LRL.ts";
import { LDP } from "./LDP.ts";
import { LCC } from "./LCC.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MFR^M05 (HL7 v2.3), in order. */
export const MFR_M05_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_QUERY",
    required: true,
    repeating: true,
    as: "entries",
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "LOC", required: true, repeating: false },
      { name: "LCH", required: false, repeating: true },
      { name: "LRL", required: false, repeating: true },
      {
        name: "MF_LOC_DEPT",
        required: true,
        repeating: true,
        as: "departments",
        segments: [
          { name: "LDP", required: true, repeating: false },
          { name: "LCH", required: false, repeating: true },
          { name: "LCC", required: false, repeating: true },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The MF QUERY group of a parsed MFR^M05 (HL7 v2.3) message. */
export interface ParsedLocationEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The LOC segment. */
  patientLocation: LOC;
  /** The LCH segments. */
  locationCharacteristics?: LCH[];
  /** The LRL segments. */
  locationRelationships?: LRL[];
  /** The MF LOC DEPT groups. */
  departments: ParsedLocationDepartment[];
}

/** The MF LOC DEPT group of a parsed MFR^M05 (HL7 v2.3) message. */
export interface ParsedLocationDepartment {
  /** The LDP segment. */
  locationDepartment: LDP;
  /** The LCH segments. */
  locationCharacteristics?: LCH[];
  /** The LCC segments. */
  locationChargeCodes?: LCC[];
}

/** Structured result of parsing an HL7 MFR^M05 (HL7 v2.3) message. */
export interface ParsedMFR_M05 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF QUERY groups. */
  entries: ParsedLocationEntry[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of MFR^M05 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  LOC: (s, e) => LOC.parse(s, e),
  LCH: (s, e) => LCH.parse(s, e),
  LRL: (s, e) => LRL.parse(s, e),
  LDP: (s, e) => LDP.parse(s, e),
  LCC: (s, e) => LCC.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 MFR^M05 (HL7 v2.3) messages. */
export class MFR_M05_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFR_M05";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFR_M05_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFR_M05> {
    return parseStructure<ParsedMFR_M05>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFR^M05 (HL7 v2.3) message string into a structured result. */
export function parseMFR_M05(messageString: string): Result<ParsedMFR_M05> {
  return new MFR_M05_Parser().parse(messageString);
}

/** The MF QUERY group of an MFR^M05 (HL7 v2.3) message being built. */
export interface LocationEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The LOC segment. */
  patientLocation: LOC;
  /** The LCH segments. */
  locationCharacteristics?: LCH[];
  /** The LRL segments. */
  locationRelationships?: LRL[];
  /** The MF LOC DEPT groups. */
  departments: LocationDepartment[];
}

/** The MF LOC DEPT group of an MFR^M05 (HL7 v2.3) message being built. */
export interface LocationDepartment {
  /** The LDP segment. */
  locationDepartment: LDP;
  /** The LCH segments. */
  locationCharacteristics?: LCH[];
  /** The LCC segments. */
  locationChargeCodes?: LCC[];
}

/** The optional segments and groups of an MFR^M05 (HL7 v2.3) message. */
export interface MFR_M05Options {
  /** The ERR segment. */
  error?: ERR;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 MFR^M05 (HL7 v2.3) messages. */
export class MFR_M05<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFR_M05";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFR_M05_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public masterFile: TMFI,
    public entries: LocationEntry[],
    public options: MFR_M05Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query, masterFile: this.masterFile, entries: this.entries };
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

/** Builds an HL7 MFR^M05 (HL7 v2.3) message. */
export function createMFR_M05<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  masterFile: TMFI,
  entries: LocationEntry[],
  options: MFR_M05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFR_M05<TMSH, TMSA, TQRD, TMFI> {
  return new MFR_M05(header, acknowledgment, query, masterFile, entries, options, encoding);
}
