/**
 * Parser for RSP^K34 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] MSA [ERR] QAK QPD [ DONOR: PID [PD1] [{PRT}] [{ DONOR_OBSERVATIONS: OBX [{PRT}] }] [{NTE}] [{AL1}] [{ARV}] [ DONOR_REGISTRATION: PV1 [{PRT}] [{NTE}] ] ] [ DONATION: DON [{ DONOR_OBSERVATIONS: OBX [{PRT}] }] [{NTE}] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RSP_K34_STRUCTURE } from "../../structures/v2.9.1/RSP_K34.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { ARV } from "../../segments/v2.9.1/ARV.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { MSA } from "../../segments/v2.9.1/MSA.ts";
import { ERR } from "../../segments/v2.9.1/ERR.ts";
import { QAK } from "../../segments/v2.9.1/QAK.ts";
import { QPD } from "../../segments/v2.9.1/QPD.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { PD1 } from "../../segments/v2.9.1/PD1.ts";
import { PRT } from "../../segments/v2.9.1/PRT.ts";
import { OBX } from "../../segments/v2.9.1/OBX.ts";
import { NTE } from "../../segments/v2.9.1/NTE.ts";
import { AL1 } from "../../segments/v2.9.1/AL1.ts";
import { PV1 } from "../../segments/v2.9.1/PV1.ts";
import { DON } from "../../segments/v2.9.1/DON.ts";

/** The DONOR group of a parsed RSP^K34 (HL7 v2.9.1) message. */
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

/** The DONOR OBSERVATIONS group of a parsed RSP^K34 (HL7 v2.9.1) message. */
export interface ParsedDonorObservations1 {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The DONOR REGISTRATION group of a parsed RSP^K34 (HL7 v2.9.1) message. */
export interface ParsedDonorRegistration {
  /** The PV1 segment. */
  visit: PV1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DONATION group of a parsed RSP^K34 (HL7 v2.9.1) message. */
export interface ParsedDonation {
  /** The DON segment. */
  don: DON;
  /** The DONOR OBSERVATIONS groups. */
  donorObservations?: ParsedDonorObservations2[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DONOR OBSERVATIONS group of a parsed RSP^K34 (HL7 v2.9.1) message. */
export interface ParsedDonorObservations2 {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** Structured result of parsing an HL7 RSP^K34 (HL7 v2.9.1) message. */
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

/** The segment parsers of RSP^K34 (HL7 v2.9.1). */
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

/** Parser for HL7 RSP^K34 (HL7 v2.9.1) messages. */
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

/** Parses an HL7 RSP^K34 (HL7 v2.9.1) message string into a structured result. */
export function parseRSP_K34(messageString: string): Result<ParsedRSP_K34> {
  return new RSP_K34_Parser().parse(messageString);
}
