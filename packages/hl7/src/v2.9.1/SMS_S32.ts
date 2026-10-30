/**
 * Builder, parser and structure for SMS^S32 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC]  ANTI_MICROBIAL_DEVICE_CYCLE_DATA: SDD [{SCD}] 
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

/** The segments, choices and groups of SMS^S32 (HL7 v2.9.1), in order. */
export const SMS_S32_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  {
    name: "ANTI_MICROBIAL_DEVICE_CYCLE_DATA",
    required: true,
    repeating: false,
    segments: [
      { name: "SDD", required: true, repeating: false },
      { name: "SCD", required: false, repeating: true },
    ],
  },
];

/** The ANTI MICROBIAL DEVICE CYCLE DATA group of a parsed SMS^S32 (HL7 v2.9.1) message. */
export interface ParsedAntiMicrobialDeviceCycleData {
  /** The SDD segment. */
  sdd: SDD;
  /** The SCD segments. */
  scdList?: SCD[];
}

/** Structured result of parsing an HL7 SMS^S32 (HL7 v2.9.1) message. */
export interface ParsedSMS_S32 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ANTI MICROBIAL DEVICE CYCLE DATA group. */
  antiMicrobialDeviceCycleData: ParsedAntiMicrobialDeviceCycleData;
}

/** The segment parsers of SMS^S32 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  SDD: (s, e) => SDD.parse(s, e),
  SCD: (s, e) => SCD.parse(s, e),
};

/** Parser for HL7 SMS^S32 (HL7 v2.9.1) messages. */
export class SMS_S32_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SMS_S32";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SMS_S32_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSMS_S32> {
    return parseStructure<ParsedSMS_S32>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SMS^S32 (HL7 v2.9.1) message string into a structured result. */
export function parseSMS_S32(messageString: string): Result<ParsedSMS_S32> {
  return new SMS_S32_Parser().parse(messageString);
}

/** The ANTI MICROBIAL DEVICE CYCLE DATA group of an SMS^S32 (HL7 v2.9.1) message being built. */
export interface AntiMicrobialDeviceCycleDataGroup {
  /** The SDD segment. */
  sdd: SDD;
  /** The SCD segments. */
  scdList?: SCD[];
}

/** The optional segments and groups of an SMS^S32 (HL7 v2.9.1) message. */
export interface SMS_S32Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 SMS^S32 (HL7 v2.9.1) messages. */
export class SMS_S32<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SMS_S32";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SMS_S32_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public antiMicrobialDeviceCycleData: AntiMicrobialDeviceCycleDataGroup,
    public options: SMS_S32Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, antiMicrobialDeviceCycleData: this.antiMicrobialDeviceCycleData };
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

/** Builds an HL7 SMS^S32 (HL7 v2.9.1) message. */
export function createSMS_S32<TMSH extends MSH = MSH>(
  header: TMSH,
  antiMicrobialDeviceCycleData: AntiMicrobialDeviceCycleDataGroup,
  options: SMS_S32Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SMS_S32<TMSH> {
  return new SMS_S32(header, antiMicrobialDeviceCycleData, options, encoding);
}
