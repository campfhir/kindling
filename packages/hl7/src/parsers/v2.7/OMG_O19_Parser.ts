/**
 * Parser for OMG^O19 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [PD1] [{PRT}] [{NTE}] [{NK1}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] OBR [{NTE}] [{PRT}] [CTD] [{DG1}] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] [{ SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{ CONTAINER: SAC [{ CONTAINER_OBSERVATION: OBX [{PRT}] }] }] }] [{ PRIOR_RESULT: [ PATIENT_PRIOR: PID [PD1] [{PRT}] ] [ PATIENT_VISIT_PRIOR: PV1 [PV2] [{PRT}] ] [{AL1}] { ORDER_PRIOR: ORC OBR [{ TIMING_PRIOR: TQ1 [{TQ2}] }] [{NTE}] [{PRT}] [CTD] { OBSERVATION_PRIOR: OBX [{PRT}] [{NTE}] } } }] [{FT1}] [{CTI}] [BLG] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { OMG_O19_STRUCTURE } from "../../structures/v2.7/OMG_O19.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { NTE } from "../../segments/v2.7/NTE.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { PD1 } from "../../segments/v2.7/PD1.ts";
import { PRT } from "../../segments/v2.7/PRT.ts";
import { NK1 } from "../../segments/v2.7/NK1.ts";
import { PV1 } from "../../segments/v2.7/PV1.ts";
import { PV2 } from "../../segments/v2.7/PV2.ts";
import { IN1 } from "../../segments/v2.7/IN1.ts";
import { IN2 } from "../../segments/v2.7/IN2.ts";
import { IN3 } from "../../segments/v2.7/IN3.ts";
import { GT1 } from "../../segments/v2.7/GT1.ts";
import { AL1 } from "../../segments/v2.7/AL1.ts";
import { ORC } from "../../segments/v2.7/ORC.ts";
import { TQ1 } from "../../segments/v2.7/TQ1.ts";
import { TQ2 } from "../../segments/v2.7/TQ2.ts";
import { OBR } from "../../segments/v2.7/OBR.ts";
import { CTD } from "../../segments/v2.7/CTD.ts";
import { DG1 } from "../../segments/v2.7/DG1.ts";
import { OBX } from "../../segments/v2.7/OBX.ts";
import { SPM } from "../../segments/v2.7/SPM.ts";
import { SAC } from "../../segments/v2.7/SAC.ts";
import { FT1 } from "../../segments/v2.7/FT1.ts";
import { CTI } from "../../segments/v2.7/CTI.ts";
import { BLG } from "../../segments/v2.7/BLG.ts";

/** The PATIENT group of a parsed OMG^O19 (HL7 v2.7) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
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

/** The PATIENT VISIT group of a parsed OMG^O19 (HL7 v2.7) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The INSURANCE group of a parsed OMG^O19 (HL7 v2.7) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER group of a parsed OMG^O19 (HL7 v2.7) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prt2?: PRT[];
  /** The CTD segment. */
  contact?: CTD;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The SPECIMEN groups. */
  specimens?: ParsedSpecimen[];
  /** The PRIOR RESULT groups. */
  priorResults?: ParsedPriorResult[];
  /** The FT1 segments. */
  transactions?: FT1[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
  /** The BLG segment. */
  billing?: BLG;
}

/** The TIMING group of a parsed OMG^O19 (HL7 v2.7) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of a parsed OMG^O19 (HL7 v2.7) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The SPECIMEN group of a parsed OMG^O19 (HL7 v2.7) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: ParsedSpecimenObservation[];
  /** The CONTAINER groups. */
  containers?: ParsedContainer[];
}

/** The SPECIMEN OBSERVATION group of a parsed OMG^O19 (HL7 v2.7) message. */
export interface ParsedSpecimenObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The CONTAINER group of a parsed OMG^O19 (HL7 v2.7) message. */
export interface ParsedContainer {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The CONTAINER OBSERVATION groups. */
  containerObservations?: ParsedContainerObservation[];
}

/** The CONTAINER OBSERVATION group of a parsed OMG^O19 (HL7 v2.7) message. */
export interface ParsedContainerObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PRIOR RESULT group of a parsed OMG^O19 (HL7 v2.7) message. */
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

/** The PATIENT PRIOR group of a parsed OMG^O19 (HL7 v2.7) message. */
export interface ParsedPatientPrior {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PATIENT VISIT PRIOR group of a parsed OMG^O19 (HL7 v2.7) message. */
export interface ParsedPatientVisitPrior {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER PRIOR group of a parsed OMG^O19 (HL7 v2.7) message. */
export interface ParsedOrderPrior {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The TIMING PRIOR groups. */
  timingPriors?: ParsedTimingPrior[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The CTD segment. */
  contact?: CTD;
  /** The OBSERVATION PRIOR groups. */
  observationPriors: ParsedObservationPrior[];
}

/** The TIMING PRIOR group of a parsed OMG^O19 (HL7 v2.7) message. */
export interface ParsedTimingPrior {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION PRIOR group of a parsed OMG^O19 (HL7 v2.7) message. */
export interface ParsedObservationPrior {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 OMG^O19 (HL7 v2.7) message. */
export interface ParsedOMG_O19 extends ParsedMessageBase {
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
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The segment parsers of OMG^O19 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  FT1: (s, e) => FT1.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  BLG: (s, e) => BLG.parse(s, e),
};

/** Parser for HL7 OMG^O19 (HL7 v2.7) messages. */
export class OMG_O19_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OMG_O19";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OMG_O19_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOMG_O19> {
    return parseStructure<ParsedOMG_O19>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OMG^O19 (HL7 v2.7) message string into a structured result. */
export function parseOMG_O19(messageString: string): Result<ParsedOMG_O19> {
  return new OMG_O19_Parser().parse(messageString);
}
