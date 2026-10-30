/**
 * Builder, parser and structure for RSP^K34 messages (HL7 v2.9).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] MSA [ERR] QAK QPD [ DONOR: PID [PD1] [{PRT}] [{ DONOR_OBSERVATIONS: OBX [{PRT}] }] [{NTE}] [{AL1}] [{ARV}] [ DONOR_REGISTRATION: PV1 [{PRT}] [{NTE}] ] ] [ DONATION: DON [{ DONOR_OBSERVATIONS: OBX [{PRT}] }] [{NTE}] ]
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
import { MSA } from "./MSA.ts";
import { ERR } from "./ERR.ts";
import { QAK } from "./QAK.ts";
import { QPD } from "./QPD.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { PRT } from "./PRT.ts";
import { OBX } from "./OBX.ts";
import { NTE } from "./NTE.ts";
import { AL1 } from "./AL1.ts";
import { PV1 } from "./PV1.ts";
import { DON } from "./DON.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RSP^K34 (HL7 v2.9), in order. */
export const RSP_K34_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: true, repeating: false },
  { name: "QPD", required: true, repeating: false },
  {
    name: "DONOR",
    required: false,
    repeating: false,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
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
      { name: "NTE", required: false, repeating: true },
      { name: "AL1", required: false, repeating: true },
      { name: "ARV", required: false, repeating: true },
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
    name: "DONATION",
    required: false,
    repeating: false,
    segments: [
      { name: "DON", required: true, repeating: false },
      {
        name: "DONOR_OBSERVATIONS",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
        ],
      },
      { name: "NTE", required: false, repeating: true },
    ],
  },
];

/** The DONOR group of a parsed RSP^K34 (HL7 v2.9) message. */
export interface ParsedDonor {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The DONOR OBSERVATIONS groups. */
  donorObservations?: ParsedDonorObservations1[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The DONOR REGISTRATION group. */
  donorRegistration?: ParsedDonorRegistration;
}

/** The DONOR OBSERVATIONS group of a parsed RSP^K34 (HL7 v2.9) message. */
export interface ParsedDonorObservations1 {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The DONOR REGISTRATION group of a parsed RSP^K34 (HL7 v2.9) message. */
export interface ParsedDonorRegistration {
  /** The PV1 segment. */
  visit: PV1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DONATION group of a parsed RSP^K34 (HL7 v2.9) message. */
export interface ParsedDonation {
  /** The DON segment. */
  don: DON;
  /** The DONOR OBSERVATIONS groups. */
  donorObservations?: ParsedDonorObservations2[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DONOR OBSERVATIONS group of a parsed RSP^K34 (HL7 v2.9) message. */
export interface ParsedDonorObservations2 {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** Structured result of parsing an HL7 RSP^K34 (HL7 v2.9) message. */
export interface ParsedRSP_K34 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The DONOR group. */
  donor?: ParsedDonor;
  /** The DONATION group. */
  donation?: ParsedDonation;
}

/** The segment parsers of RSP^K34 (HL7 v2.9). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  ARV: (s, e) => ARV.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  DON: (s, e) => DON.parse(s, e),
};

/** Parser for HL7 RSP^K34 (HL7 v2.9) messages. */
export class RSP_K34_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K34";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RSP_K34_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRSP_K34> {
    return parseStructure<ParsedRSP_K34>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RSP^K34 (HL7 v2.9) message string into a structured result. */
export function parseRSP_K34(messageString: string): Result<ParsedRSP_K34> {
  return new RSP_K34_Parser().parse(messageString);
}

/** The DONOR group of an RSP^K34 (HL7 v2.9) message being built. */
export interface DonorGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The DONOR OBSERVATIONS groups. */
  donorObservations?: DonorObservations1Group[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The DONOR REGISTRATION group. */
  donorRegistration?: DonorRegistrationGroup;
}

/** The DONOR OBSERVATIONS group of an RSP^K34 (HL7 v2.9) message being built. */
export interface DonorObservations1Group {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The DONOR REGISTRATION group of an RSP^K34 (HL7 v2.9) message being built. */
export interface DonorRegistrationGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DONATION group of an RSP^K34 (HL7 v2.9) message being built. */
export interface DonationGroup {
  /** The DON segment. */
  don: DON;
  /** The DONOR OBSERVATIONS groups. */
  donorObservations?: DonorObservations2Group[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DONOR OBSERVATIONS group of an RSP^K34 (HL7 v2.9) message being built. */
export interface DonorObservations2Group {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The optional segments and groups of an RSP^K34 (HL7 v2.9) message. */
export interface RSP_K34Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ERR segment. */
  error?: ERR;
  /** The DONOR group. */
  donor?: DonorGroup;
  /** The DONATION group. */
  donation?: DonationGroup;
}

/** Builder for HL7 RSP^K34 (HL7 v2.9) messages. */
export class RSP_K34<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K34";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RSP_K34_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public queryParameters: TQPD,
    public options: RSP_K34Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAcknowledgment: this.queryAcknowledgment, queryParameters: this.queryParameters };
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

/** Builds an HL7 RSP^K34 (HL7 v2.9) message. */
export function createRSP_K34<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  options: RSP_K34Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RSP_K34<TMSH, TMSA, TQAK, TQPD> {
  return new RSP_K34(header, acknowledgment, queryAcknowledgment, queryParameters, options, encoding);
}
