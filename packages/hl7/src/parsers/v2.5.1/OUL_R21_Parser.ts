/**
 * Parser for OUL^R21 messages (HL7 v2.5.1).
 *
 * Structure: MSH [NTE] [ PATIENT: PID [PD1] [{NTE}] ] [ VISIT: PV1 [PV2] ] { ORDER_OBSERVATION: [ CONTAINER: SAC [SID] [{OBX}] ] [ORC] OBR [{NTE}] { OBSERVATION: [OBX] [TCD] [{SID}] [{NTE}] } [{CTI}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { OUL_R21_STRUCTURE } from "../../structures/v2.5.1/OUL_R21.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PD1 } from "../../segments/v2.5.1/PD1.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { PV2 } from "../../segments/v2.5.1/PV2.ts";
import { SAC } from "../../segments/v2.5.1/SAC.ts";
import { SID } from "../../segments/v2.5.1/SID.ts";
import { OBX } from "../../segments/v2.5.1/OBX.ts";
import { ORC } from "../../segments/v2.5.1/ORC.ts";
import { OBR } from "../../segments/v2.5.1/OBR.ts";
import { TCD } from "../../segments/v2.5.1/TCD.ts";
import { CTI } from "../../segments/v2.5.1/CTI.ts";
import { DSC } from "../../segments/v2.5.1/DSC.ts";

/** The PATIENT group of a parsed OUL^R21 (HL7 v2.5.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The VISIT group of a parsed OUL^R21 (HL7 v2.5.1) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The ORDER OBSERVATION group of a parsed OUL^R21 (HL7 v2.5.1) message. */
export interface ParsedOrderObservation {
  /** The CONTAINER group. */
  container?: ParsedContainer;
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBSERVATION groups. */
  observations: ParsedObservation[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The CONTAINER group of a parsed OUL^R21 (HL7 v2.5.1) message. */
export interface ParsedContainer {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The SID segment. */
  substanceIdentifier?: SID;
  /** The OBX segments. */
  observations?: OBX[];
}

/** The OBSERVATION group of a parsed OUL^R21 (HL7 v2.5.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation?: OBX;
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The SID segments. */
  substanceIdentifiers?: SID[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 OUL^R21 (HL7 v2.5.1) message. */
export interface ParsedOUL_R21 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The NTE segment. */
  note?: NTE;
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The VISIT group. */
  visit?: ParsedVisit;
  /** The ORDER OBSERVATION groups. */
  orderObservations: ParsedOrderObservation[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of OUL^R21 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  SID: (s, e) => SID.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  TCD: (s, e) => TCD.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 OUL^R21 (HL7 v2.5.1) messages. */
export class OUL_R21_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OUL_R21";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OUL_R21_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOUL_R21> {
    return parseStructure<ParsedOUL_R21>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OUL^R21 (HL7 v2.5.1) message string into a structured result. */
export function parseOUL_R21(messageString: string): Result<ParsedOUL_R21> {
  return new OUL_R21_Parser().parse(messageString);
}
