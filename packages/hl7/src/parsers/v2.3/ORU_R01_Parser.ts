/**
 * Parser for ORU^R01 messages (HL7 v2.3).
 *
 * Structure: MSH { PATIENT_RESULT: [ PATIENT: PID [PD1] [{NK1}] [{NTE}] [ VISIT: PV1 [PV2] ] ] { ORDER_OBSERVATION: [ORC] OBR [{NTE}] [{ OBSERVATION: OBX [{NTE}] }] [{CTI}] } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ORU_R01_STRUCTURE } from "../../structures/v2.3/ORU_R01.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PD1 } from "../../segments/v2.3/PD1.ts";
import { NK1 } from "../../segments/v2.3/NK1.ts";
import { NTE } from "../../segments/v2.3/NTE.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { PV2 } from "../../segments/v2.3/PV2.ts";
import { ORC } from "../../segments/v2.3/ORC.ts";
import { OBR } from "../../segments/v2.3/OBR.ts";
import { OBX } from "../../segments/v2.3/OBX.ts";
import { CTI } from "../../segments/v2.3/CTI.ts";
import { DSC } from "../../segments/v2.3/DSC.ts";

/** The PATIENT RESULT group of a parsed ORU^R01 (HL7 v2.3) message. */
export interface ParsedPatientResult {
  /** The PID segment. */
  patient?: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ORDER OBSERVATION groups. */
  orderObservations: ParsedOrderObservation[];
}

/** The ORDER OBSERVATION group of a parsed ORU^R01 (HL7 v2.3) message. */
export interface ParsedOrderObservation {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The OBSERVATION group of a parsed ORU^R01 (HL7 v2.3) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 ORU^R01 (HL7 v2.3) message. */
export interface ParsedORU_R01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The PATIENT RESULT groups. */
  patientResults: ParsedPatientResult[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of ORU^R01 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 ORU^R01 (HL7 v2.3) messages. */
export class ORU_R01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORU_R01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORU_R01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORU_R01> {
    return parseStructure<ParsedORU_R01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORU^R01 (HL7 v2.3) message string into a structured result. */
export function parseORU_R01(messageString: string): Result<ParsedORU_R01> {
  return new ORU_R01_Parser().parse(messageString);
}
