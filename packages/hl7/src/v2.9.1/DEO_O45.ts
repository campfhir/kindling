/**
 * Builder, parser and structure for DEO^O45 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [ DONOR: PID [{PRT}] [{ DONOR_OBSERVATIONS: OBX [{PRT}] }] [{ARV}] [{NTE}] [ DONOR_REGISTRATION: PV1 [{PRT}] [{NTE}] ] ] { DONATION_ORDER: OBR [{PRT}] [{NTE}] [{ DONATION_OBSERVATION: OBX [{PRT}] [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { ARV } from "./ARV.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { PID } from "./PID.ts";
import { PRT } from "./PRT.ts";
import { OBX } from "./OBX.ts";
import { NTE } from "./NTE.ts";
import { PV1 } from "./PV1.ts";
import { OBR } from "./OBR.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of DEO^O45 (HL7 v2.9.1), in order. */
export const DEO_O45_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  {
    name: "DONOR",
    required: false,
    repeating: false,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
      {
        name: "DONOR_OBSERVATIONS",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
        ],
      },
      { name: "ARV", required: false, repeating: true },
      { name: "NTE", required: false, repeating: true },
      {
        name: "DONOR_REGISTRATION",
        required: false,
        repeating: false,
        segments: [
          { name: "PV1", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
  {
    name: "DONATION_ORDER",
    required: true,
    repeating: true,
    segments: [
      { name: "OBR", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
      { name: "NTE", required: false, repeating: true },
      {
        name: "DONATION_OBSERVATION",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The DONOR group of a parsed DEO^O45 (HL7 v2.9.1) message. */
export interface ParsedDonor {
  /** The PID segment. */
  patient: PID;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The DONOR OBSERVATIONS groups. */
  donorObservations?: ParsedDonorObservations[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The DONOR REGISTRATION group. */
  donorRegistration?: ParsedDonorRegistration;
}

/** The DONOR OBSERVATIONS group of a parsed DEO^O45 (HL7 v2.9.1) message. */
export interface ParsedDonorObservations {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The DONOR REGISTRATION group of a parsed DEO^O45 (HL7 v2.9.1) message. */
export interface ParsedDonorRegistration {
  /** The PV1 segment. */
  visit: PV1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DONATION ORDER group of a parsed DEO^O45 (HL7 v2.9.1) message. */
export interface ParsedDonationOrder {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The DONATION OBSERVATION groups. */
  donationObservations?: ParsedDonationObservation[];
}

/** The DONATION OBSERVATION group of a parsed DEO^O45 (HL7 v2.9.1) message. */
export interface ParsedDonationObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 DEO^O45 (HL7 v2.9.1) message. */
export interface ParsedDEO_O45 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The DONOR group. */
  donor?: ParsedDonor;
  /** The DONATION ORDER groups. */
  donationOrders: ParsedDonationOrder[];
}

/** The segment parsers of DEO^O45 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  ARV: (s, e) => ARV.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
};

/** Parser for HL7 DEO^O45 (HL7 v2.9.1) messages. */
export class DEO_O45_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DEO_O45";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = DEO_O45_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedDEO_O45> {
    return parseStructure<ParsedDEO_O45>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 DEO^O45 (HL7 v2.9.1) message string into a structured result. */
export function parseDEO_O45(messageString: string): Result<ParsedDEO_O45> {
  return new DEO_O45_Parser().parse(messageString);
}

/** The DONOR group of an DEO^O45 (HL7 v2.9.1) message being built. */
export interface DonorGroup {
  /** The PID segment. */
  patient: PID;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The DONOR OBSERVATIONS groups. */
  donorObservations?: DonorObservationsGroup[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The DONOR REGISTRATION group. */
  donorRegistration?: DonorRegistrationGroup;
}

/** The DONOR OBSERVATIONS group of an DEO^O45 (HL7 v2.9.1) message being built. */
export interface DonorObservationsGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The DONOR REGISTRATION group of an DEO^O45 (HL7 v2.9.1) message being built. */
export interface DonorRegistrationGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DONATION ORDER group of an DEO^O45 (HL7 v2.9.1) message being built. */
export interface DonationOrderGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The DONATION OBSERVATION groups. */
  donationObservations?: DonationObservationGroup[];
}

/** The DONATION OBSERVATION group of an DEO^O45 (HL7 v2.9.1) message being built. */
export interface DonationObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an DEO^O45 (HL7 v2.9.1) message. */
export interface DEO_O45Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The DONOR group. */
  donor?: DonorGroup;
}

/** Builder for HL7 DEO^O45 (HL7 v2.9.1) messages. */
export class DEO_O45<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DEO_O45";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = DEO_O45_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public donationOrders: DonationOrderGroup[],
    public options: DEO_O45Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, donationOrders: this.donationOrders };
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

/** Builds an HL7 DEO^O45 (HL7 v2.9.1) message. */
export function createDEO_O45<TMSH extends MSH = MSH>(
  header: TMSH,
  donationOrders: DonationOrderGroup[],
  options: DEO_O45Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): DEO_O45<TMSH> {
  return new DEO_O45(header, donationOrders, options, encoding);
}
