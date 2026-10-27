/**
 * Parser for DER^O44 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [ DONOR: PID [PD1] [{PRT}] [{ DONOR_OBSERVATIONS: OBX [{PRT}] }] [{NTE}] [{AL1}] [{ARV}] [ DONOR_REGISTRATION: PV1 [{PRT}] [{NTE}] ] ] { DONOR_ORDER: OBR [{PRT}] [{NTE}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { DER_O44_STRUCTURE } from "../../structures/v2.9.1/DER_O44.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { ARV } from "../../segments/v2.9.1/ARV.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { PD1 } from "../../segments/v2.9.1/PD1.ts";
import { PRT } from "../../segments/v2.9.1/PRT.ts";
import { OBX } from "../../segments/v2.9.1/OBX.ts";
import { NTE } from "../../segments/v2.9.1/NTE.ts";
import { AL1 } from "../../segments/v2.9.1/AL1.ts";
import { PV1 } from "../../segments/v2.9.1/PV1.ts";
import { OBR } from "../../segments/v2.9.1/OBR.ts";

/** The DONOR group of a parsed DER^O44 (HL7 v2.9.1) message. */
export interface ParsedDonor {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The DONOR OBSERVATIONS groups. */
  donorObservations?: ParsedDonorObservations[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The DONOR REGISTRATION group. */
  donorRegistration?: ParsedDonorRegistration;
}

/** The DONOR OBSERVATIONS group of a parsed DER^O44 (HL7 v2.9.1) message. */
export interface ParsedDonorObservations {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The DONOR REGISTRATION group of a parsed DER^O44 (HL7 v2.9.1) message. */
export interface ParsedDonorRegistration {
  /** The PV1 segment. */
  visit: PV1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DONOR ORDER group of a parsed DER^O44 (HL7 v2.9.1) message. */
export interface ParsedDonorOrder {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 DER^O44 (HL7 v2.9.1) message. */
export interface ParsedDER_O44 extends ParsedMessageBase {
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
  /** The DONOR ORDER groups. */
  donorOrders: ParsedDonorOrder[];
}

/** The segment parsers of DER^O44 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  ARV: (s, e) => ARV.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
};

/** Parser for HL7 DER^O44 (HL7 v2.9.1) messages. */
export class DER_O44_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DER_O44";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = DER_O44_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedDER_O44> {
    return parseStructure<ParsedDER_O44>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 DER^O44 (HL7 v2.9.1) message string into a structured result. */
export function parseDER_O44(messageString: string): Result<ParsedDER_O44> {
  return new DER_O44_Parser().parse(messageString);
}
