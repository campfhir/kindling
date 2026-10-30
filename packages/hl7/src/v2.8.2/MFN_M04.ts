/**
 * Builder, parser and structure for MFN^M04 messages (HL7 v2.8.2).
 *
 * Structure: MSH [{SFT}] [UAC] MFI [{NTE}] { MF_CDM: MFE [{NTE}] CDM [{NTE}] [{PRC}] }
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
import { NTE } from "./NTE.ts";
import { MFE } from "./MFE.ts";
import { CDM } from "./CDM.ts";
import { PRC } from "./PRC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MFN^M04 (HL7 v2.8.2), in order. */
export const MFN_M04_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  { name: "NTE", required: false, repeating: true },
  {
    name: "MF_CDM",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      { name: "CDM", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true, as: "nte2" },
      { name: "PRC", required: false, repeating: true },
    ],
  },
];

/** The MF CDM group of a parsed MFN^M04 (HL7 v2.8.2) message. */
export interface ParsedMfCdm {
  /** The MFE segment. */
  entry: MFE;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CDM segment. */
  chargeDescription: CDM;
  /** The NTE segments. */
  nte2?: NTE[];
  /** The PRC segments. */
  prices?: PRC[];
}

/** Structured result of parsing an HL7 MFN^M04 (HL7 v2.8.2) message. */
export interface ParsedMFN_M04 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MFI segment. */
  masterFile: MFI;
  /** The NTE segments. */
  notes?: NTE[];
  /** The MF CDM groups. */
  mfCdms: ParsedMfCdm[];
}

/** The segment parsers of MFN^M04 (HL7 v2.8.2). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  CDM: (s, e) => CDM.parse(s, e),
  PRC: (s, e) => PRC.parse(s, e),
};

/** Parser for HL7 MFN^M04 (HL7 v2.8.2) messages. */
export class MFN_M04_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M04";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M04_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M04> {
    return parseStructure<ParsedMFN_M04>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M04 (HL7 v2.8.2) message string into a structured result. */
export function parseMFN_M04(messageString: string): Result<ParsedMFN_M04> {
  return new MFN_M04_Parser().parse(messageString);
}

/** The MF CDM group of an MFN^M04 (HL7 v2.8.2) message being built. */
export interface MfCdmGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CDM segment. */
  chargeDescription: CDM;
  /** The NTE segments. */
  nte2?: NTE[];
  /** The PRC segments. */
  prices?: PRC[];
}

/** The optional segments and groups of an MFN^M04 (HL7 v2.8.2) message. */
export interface MFN_M04Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Builder for HL7 MFN^M04 (HL7 v2.8.2) messages. */
export class MFN_M04<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M04";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M04_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public mfCdms: MfCdmGroup[],
    public options: MFN_M04Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, mfCdms: this.mfCdms };
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

/** Builds an HL7 MFN^M04 (HL7 v2.8.2) message. */
export function createMFN_M04<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  mfCdms: MfCdmGroup[],
  options: MFN_M04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M04<TMSH, TMFI> {
  return new MFN_M04(header, masterFile, mfCdms, options, encoding);
}
