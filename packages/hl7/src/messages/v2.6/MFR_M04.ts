/**
 * Builder, parser and structure for MFR^M04 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] [QAK] QRD [QRF] MFI { MF_QUERY: MFE CDM [{PRC}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { ERR } from "../../segments/v2.6/ERR.ts";
import { QAK } from "../../segments/v2.6/QAK.ts";
import { QRD } from "../../segments/v2.6/QRD.ts";
import { QRF } from "../../segments/v2.6/QRF.ts";
import { MFI } from "../../segments/v2.6/MFI.ts";
import { MFE } from "../../segments/v2.6/MFE.ts";
import { CDM } from "../../segments/v2.6/CDM.ts";
import { PRC } from "../../segments/v2.6/PRC.ts";
import { DSC } from "../../segments/v2.6/DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of MFR^M04 (HL7 v2.6), in order. */
export const MFR_M04_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "QAK", required: false, repeating: false },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_QUERY",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "CDM", required: true, repeating: false },
      { name: "PRC", required: false, repeating: true },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The MF QUERY group of a parsed MFR^M04 (HL7 v2.6) message. */
export interface ParsedMfQuery {
  /** The MFE segment. */
  entry: MFE;
  /** The CDM segment. */
  chargeDescription: CDM;
  /** The PRC segments. */
  prices?: PRC[];
}

/** Structured result of parsing an HL7 MFR^M04 (HL7 v2.6) message. */
export interface ParsedMFR_M04 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF QUERY groups. */
  mfQuerys: ParsedMfQuery[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of MFR^M04 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  CDM: (s, e) => CDM.parse(s, e),
  PRC: (s, e) => PRC.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 MFR^M04 (HL7 v2.6) messages. */
export class MFR_M04_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFR_M04";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFR_M04_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFR_M04> {
    return parseStructure<ParsedMFR_M04>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFR^M04 (HL7 v2.6) message string into a structured result. */
export function parseMFR_M04(messageString: string): Result<ParsedMFR_M04> {
  return new MFR_M04_Parser().parse(messageString);
}

/** The MF QUERY group of an MFR^M04 (HL7 v2.6) message being built. */
export interface MfQueryGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The CDM segment. */
  chargeDescription: CDM;
  /** The PRC segments. */
  prices?: PRC[];
}

/** The optional segments and groups of an MFR^M04 (HL7 v2.6) message. */
export interface MFR_M04Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ERR segments. */
  errors?: ERR[];
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 MFR^M04 (HL7 v2.6) messages. */
export class MFR_M04<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFR_M04";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFR_M04_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public masterFile: TMFI,
    public mfQuerys: MfQueryGroup[],
    public options: MFR_M04Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query, masterFile: this.masterFile, mfQuerys: this.mfQuerys };
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

/** Builds an HL7 MFR^M04 (HL7 v2.6) message. */
export function createMFR_M04<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  masterFile: TMFI,
  mfQuerys: MfQueryGroup[],
  options: MFR_M04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFR_M04<TMSH, TMSA, TQRD, TMFI> {
  return new MFR_M04(header, acknowledgment, query, masterFile, mfQuerys, options, encoding);
}
