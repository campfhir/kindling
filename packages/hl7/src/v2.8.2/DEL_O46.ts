/**
 * Builder, parser and structure for DEL^O46 messages (HL7 v2.8.2).
 *
 * Structure: MSH [{SFT}] [UAC] [ DONOR: PID [PD1] [{OBX}] [{NTE}] [{AL1}] [{ARV}] [ DONOR_REGISTRATION: [PV1] [{NTE}] ] ] DON [{NTE}]
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
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { OBX } from "./OBX.ts";
import { NTE } from "./NTE.ts";
import { AL1 } from "./AL1.ts";
import { ARV } from "./ARV.ts";
import { PV1 } from "./PV1.ts";
import { DON } from "./DON.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of DEL^O46 (HL7 v2.8.2), in order. */
export const DEL_O46_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  {
    name: "DONOR",
    required: false,
    repeating: false,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "OBX", required: false, repeating: true },
      { name: "NTE", required: false, repeating: true },
      { name: "AL1", required: false, repeating: true },
      { name: "ARV", required: false, repeating: true },
      {
        name: "DONOR_REGISTRATION",
        required: false,
        repeating: false,
        segments: [
          { name: "PV1", required: false, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
  { name: "DON", required: true, repeating: false },
  { name: "NTE", required: false, repeating: true },
];

/** The DONOR group of a parsed DEL^O46 (HL7 v2.8.2) message. */
export interface ParsedDonor {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The OBX segments. */
  observations?: OBX[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The DONOR REGISTRATION group. */
  donorRegistration?: ParsedDonorRegistration;
}

/** The DONOR REGISTRATION group of a parsed DEL^O46 (HL7 v2.8.2) message. */
export interface ParsedDonorRegistration {
  /** The PV1 segment. */
  visit?: PV1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 DEL^O46 (HL7 v2.8.2) message. */
export interface ParsedDEL_O46 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The DONOR group. */
  donor?: ParsedDonor;
  /** The DON segment. */
  don: DON;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The segment parsers of DEL^O46 (HL7 v2.8.2). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  ARV: (s, e) => ARV.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  DON: (s, e) => DON.parse(s, e),
};

/** Parser for HL7 DEL^O46 (HL7 v2.8.2) messages. */
export class DEL_O46_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DEL_O46";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = DEL_O46_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedDEL_O46> {
    return parseStructure<ParsedDEL_O46>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 DEL^O46 (HL7 v2.8.2) message string into a structured result. */
export function parseDEL_O46(messageString: string): Result<ParsedDEL_O46> {
  return new DEL_O46_Parser().parse(messageString);
}

/** The DONOR group of an DEL^O46 (HL7 v2.8.2) message being built. */
export interface DonorGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The OBX segments. */
  observations?: OBX[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The DONOR REGISTRATION group. */
  donorRegistration?: DonorRegistrationGroup;
}

/** The DONOR REGISTRATION group of an DEL^O46 (HL7 v2.8.2) message being built. */
export interface DonorRegistrationGroup {
  /** The PV1 segment. */
  visit?: PV1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an DEL^O46 (HL7 v2.8.2) message. */
export interface DEL_O46Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The DONOR group. */
  donor?: DonorGroup;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Builder for HL7 DEL^O46 (HL7 v2.8.2) messages. */
export class DEL_O46<TMSH extends MSH = MSH, TDON extends DON = DON> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DEL_O46";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = DEL_O46_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public don: TDON,
    public options: DEL_O46Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, don: this.don };
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

/** Builds an HL7 DEL^O46 (HL7 v2.8.2) message. */
export function createDEL_O46<TMSH extends MSH = MSH, TDON extends DON = DON>(
  header: TMSH,
  don: TDON,
  options: DEL_O46Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): DEL_O46<TMSH, TDON> {
  return new DEL_O46(header, don, options, encoding);
}
