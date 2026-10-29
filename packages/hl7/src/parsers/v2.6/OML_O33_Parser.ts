/**
 * Parser for OML^O33 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [{NK1}] [ PATIENT_VISIT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { SPECIMEN: SPM [{OBX}] [{SAC}] { ORDER: ORC [{ TIIMING: TQ1 [{TQ2}] }] [ OBSERVATION_REQUEST: OBR [TCD] [{NTE}] [{ROL}] [{DG1}] [{ OBSERVATION: OBX [TCD] [{NTE}] }] [{ PRIOR_RESULT: [ PATIENT_PRIOR: PID [PD1] ] [ PATIENT_VISIT_PRIOR: PV1 [PV2] ] [{AL1}] { ORDER_PRIOR: [ORC] OBR [{NTE}] [{ROL}] [{ TIMING_PRIOR: TQ1 [{TQ2}] }] { OBSERVATION_PRIOR: OBX [{NTE}] } } }] ] [{FT1}] [{CTI}] [BLG] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { OML_O33_STRUCTURE } from "../../structures/v2.6/OML_O33.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { PD1 } from "../../segments/v2.6/PD1.ts";
import { NK1 } from "../../segments/v2.6/NK1.ts";
import { PV1 } from "../../segments/v2.6/PV1.ts";
import { PV2 } from "../../segments/v2.6/PV2.ts";
import { IN1 } from "../../segments/v2.6/IN1.ts";
import { IN2 } from "../../segments/v2.6/IN2.ts";
import { IN3 } from "../../segments/v2.6/IN3.ts";
import { GT1 } from "../../segments/v2.6/GT1.ts";
import { AL1 } from "../../segments/v2.6/AL1.ts";
import { SPM } from "../../segments/v2.6/SPM.ts";
import { OBX } from "../../segments/v2.6/OBX.ts";
import { SAC } from "../../segments/v2.6/SAC.ts";
import { ORC } from "../../segments/v2.6/ORC.ts";
import { TQ1 } from "../../segments/v2.6/TQ1.ts";
import { TQ2 } from "../../segments/v2.6/TQ2.ts";
import { OBR } from "../../segments/v2.6/OBR.ts";
import { TCD } from "../../segments/v2.6/TCD.ts";
import { ROL } from "../../segments/v2.6/ROL.ts";
import { DG1 } from "../../segments/v2.6/DG1.ts";
import { FT1 } from "../../segments/v2.6/FT1.ts";
import { CTI } from "../../segments/v2.6/CTI.ts";
import { BLG } from "../../segments/v2.6/BLG.ts";

/** The PATIENT group of a parsed OML^O33 (HL7 v2.6) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The PATIENT VISIT group. */
  patientVisit?: ParsedPatientVisit;
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The GT1 segment. */
  guarantor?: GT1;
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** The PATIENT VISIT group of a parsed OML^O33 (HL7 v2.6) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The INSURANCE group of a parsed OML^O33 (HL7 v2.6) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The SPECIMEN group of a parsed OML^O33 (HL7 v2.6) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The OBX segments. */
  observations?: OBX[];
  /** The SAC segments. */
  specimenContainers?: SAC[];
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The ORDER group of a parsed OML^O33 (HL7 v2.6) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIIMING groups. */
  tiimings?: ParsedTiiming[];
  /** The OBSERVATION REQUEST group. */
  observationRequest?: ParsedObservationRequest;
  /** The FT1 segments. */
  transactions?: FT1[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
  /** The BLG segment. */
  billing?: BLG;
}

/** The TIIMING group of a parsed OML^O33 (HL7 v2.6) message. */
export interface ParsedTiiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION REQUEST group of a parsed OML^O33 (HL7 v2.6) message. */
export interface ParsedObservationRequest {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The PRIOR RESULT groups. */
  priorResults?: ParsedPriorResult[];
}

/** The OBSERVATION group of a parsed OML^O33 (HL7 v2.6) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PRIOR RESULT group of a parsed OML^O33 (HL7 v2.6) message. */
export interface ParsedPriorResult {
  /** The PATIENT PRIOR group. */
  patientPrior?: ParsedPatientPrior;
  /** The PATIENT VISIT PRIOR group. */
  patientVisitPrior?: ParsedPatientVisitPrior;
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The ORDER PRIOR groups. */
  orderPriors: ParsedOrderPrior[];
}

/** The PATIENT PRIOR group of a parsed OML^O33 (HL7 v2.6) message. */
export interface ParsedPatientPrior {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
}

/** The PATIENT VISIT PRIOR group of a parsed OML^O33 (HL7 v2.6) message. */
export interface ParsedPatientVisitPrior {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The ORDER PRIOR group of a parsed OML^O33 (HL7 v2.6) message. */
export interface ParsedOrderPrior {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The TIMING PRIOR groups. */
  timingPriors?: ParsedTimingPrior[];
  /** The OBSERVATION PRIOR groups. */
  observationPriors: ParsedObservationPrior[];
}

/** The TIMING PRIOR group of a parsed OML^O33 (HL7 v2.6) message. */
export interface ParsedTimingPrior {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION PRIOR group of a parsed OML^O33 (HL7 v2.6) message. */
export interface ParsedObservationPrior {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 OML^O33 (HL7 v2.6) message. */
export interface ParsedOML_O33 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The SPECIMEN groups. */
  specimens: ParsedSpecimen[];
}

/** The segment parsers of OML^O33 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  TCD: (s, e) => TCD.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  FT1: (s, e) => FT1.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  BLG: (s, e) => BLG.parse(s, e),
};

/** Parser for HL7 OML^O33 (HL7 v2.6) messages. */
export class OML_O33_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OML_O33";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OML_O33_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOML_O33> {
    return parseStructure<ParsedOML_O33>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OML^O33 (HL7 v2.6) message string into a structured result. */
export function parseOML_O33(messageString: string): Result<ParsedOML_O33> {
  return new OML_O33_Parser().parse(messageString);
}
