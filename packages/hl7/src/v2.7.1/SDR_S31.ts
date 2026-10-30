/**
 * Builder, parser and structure for SDR^S31 messages (HL7 v2.7.1).
 *
 * Structure: MSH [{SFT}] [UAC]  ANTI_MICROBIAL_DEVICE_DATA: SDD [{SCD}] 
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
import { SDD } from "./SDD.ts";
import { SCD } from "./SCD.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of SDR^S31 (HL7 v2.7.1), in order. */
export const SDR_S31_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  {
    name: "ANTI_MICROBIAL_DEVICE_DATA",
    required: true,
    repeating: false,
    segments: [
      { name: "SDD", required: true, repeating: false },
      { name: "SCD", required: false, repeating: true },
    ],
  },
];

/** The ANTI MICROBIAL DEVICE DATA group of a parsed SDR^S31 (HL7 v2.7.1) message. */
export interface ParsedAntiMicrobialDeviceData {
  /** The SDD segment. */
  sdd: SDD;
  /** The SCD segments. */
  scdList?: SCD[];
}

/** Structured result of parsing an HL7 SDR^S31 (HL7 v2.7.1) message. */
export interface ParsedSDR_S31 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ANTI MICROBIAL DEVICE DATA group. */
  antiMicrobialDeviceData: ParsedAntiMicrobialDeviceData;
}

/** The segment parsers of SDR^S31 (HL7 v2.7.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  SDD: (s, e) => SDD.parse(s, e),
  SCD: (s, e) => SCD.parse(s, e),
};

/** Parser for HL7 SDR^S31 (HL7 v2.7.1) messages. */
export class SDR_S31_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SDR_S31";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SDR_S31_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSDR_S31> {
    return parseStructure<ParsedSDR_S31>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SDR^S31 (HL7 v2.7.1) message string into a structured result. */
export function parseSDR_S31(messageString: string): Result<ParsedSDR_S31> {
  return new SDR_S31_Parser().parse(messageString);
}

/** The ANTI MICROBIAL DEVICE DATA group of an SDR^S31 (HL7 v2.7.1) message being built. */
export interface AntiMicrobialDeviceDataGroup {
  /** The SDD segment. */
  sdd: SDD;
  /** The SCD segments. */
  scdList?: SCD[];
}

/** The optional segments and groups of an SDR^S31 (HL7 v2.7.1) message. */
export interface SDR_S31Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 SDR^S31 (HL7 v2.7.1) messages. */
export class SDR_S31<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SDR_S31";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SDR_S31_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public antiMicrobialDeviceData: AntiMicrobialDeviceDataGroup,
    public options: SDR_S31Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, antiMicrobialDeviceData: this.antiMicrobialDeviceData };
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

/** Builds an HL7 SDR^S31 (HL7 v2.7.1) message. */
export function createSDR_S31<TMSH extends MSH = MSH>(
  header: TMSH,
  antiMicrobialDeviceData: AntiMicrobialDeviceDataGroup,
  options: SDR_S31Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SDR_S31<TMSH> {
  return new SDR_S31(header, antiMicrobialDeviceData, options, encoding);
}
