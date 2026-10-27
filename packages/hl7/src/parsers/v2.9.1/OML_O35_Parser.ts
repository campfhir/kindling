/**
 * Parser for OML^O35 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [ OCCUPATIONAL_DATA_FOR_HEALTH: [{OH1}] [{OH2}] [OH3] [{OH4}] ] [{NTE}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] [{OH2}] [OH3] }] [{ARV}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { SPECIMEN: SPM [{NTE}] [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] { SPECIMEN_CONTAINER: SAC [{NTE}] { ORDER: ORC [{NTE}] [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [ OBSERVATION_REQUEST: OBR [TCD] [{NTE}] [{PRT}] [{DG1}] [{REL}] [{ OBSERVATION: OBX [{PRT}] [TCD] [{NTE}] }] [IPC] [SGH] [{ PRIOR_RESULT: [ PATIENT_PRIOR: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ARV}] ] [ PATIENT_VISIT_PRIOR: PV1 [PV2] [{PRT}] ] [{AL1}] { ORDER_PRIOR: ORC [{PRT}] OBR [{NTE}] [{ OBSERVATION_PARTICIPATION: PRT [{DEV}] }] [{ TIMING_PRIOR: TQ1 [{TQ2}] }] { OBSERVATION_PRIOR: OBX [{PRT}] [{NTE}] } } }] [SGT] ] [{FT1}] [{CTI}] [BLG] } } } [{ DEVICE: DEV [{OBX}] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { OML_O35_STRUCTURE } from "../../structures/v2.9.1/OML_O35.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { ARV } from "../../segments/v2.9.1/ARV.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { NTE } from "../../segments/v2.9.1/NTE.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { PD1 } from "../../segments/v2.9.1/PD1.ts";
import { GSP } from "../../segments/v2.9.1/GSP.ts";
import { GSR } from "../../segments/v2.9.1/GSR.ts";
import { GSC } from "../../segments/v2.9.1/GSC.ts";
import { PRT } from "../../segments/v2.9.1/PRT.ts";
import { OH1 } from "../../segments/v2.9.1/OH1.ts";
import { OH2 } from "../../segments/v2.9.1/OH2.ts";
import { OH3 } from "../../segments/v2.9.1/OH3.ts";
import { OH4 } from "../../segments/v2.9.1/OH4.ts";
import { NK1 } from "../../segments/v2.9.1/NK1.ts";
import { PV1 } from "../../segments/v2.9.1/PV1.ts";
import { PV2 } from "../../segments/v2.9.1/PV2.ts";
import { IN1 } from "../../segments/v2.9.1/IN1.ts";
import { IN2 } from "../../segments/v2.9.1/IN2.ts";
import { IN3 } from "../../segments/v2.9.1/IN3.ts";
import { GT1 } from "../../segments/v2.9.1/GT1.ts";
import { AL1 } from "../../segments/v2.9.1/AL1.ts";
import { SPM } from "../../segments/v2.9.1/SPM.ts";
import { OBX } from "../../segments/v2.9.1/OBX.ts";
import { SAC } from "../../segments/v2.9.1/SAC.ts";
import { ORC } from "../../segments/v2.9.1/ORC.ts";
import { TQ1 } from "../../segments/v2.9.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.9.1/TQ2.ts";
import { OBR } from "../../segments/v2.9.1/OBR.ts";
import { TCD } from "../../segments/v2.9.1/TCD.ts";
import { DG1 } from "../../segments/v2.9.1/DG1.ts";
import { REL } from "../../segments/v2.9.1/REL.ts";
import { IPC } from "../../segments/v2.9.1/IPC.ts";
import { SGH } from "../../segments/v2.9.1/SGH.ts";
import { DEV } from "../../segments/v2.9.1/DEV.ts";
import { SGT } from "../../segments/v2.9.1/SGT.ts";
import { FT1 } from "../../segments/v2.9.1/FT1.ts";
import { CTI } from "../../segments/v2.9.1/CTI.ts";
import { BLG } from "../../segments/v2.9.1/BLG.ts";

/** The PATIENT group of a parsed OML^O35 (HL7 v2.9.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The OCCUPATIONAL DATA FOR HEALTH group. */
  occupationalDataForHealth?: ParsedOccupationalDataForHealth;
  /** The NTE segments. */
  notes?: NTE[];
  /** The NEXT OF KIN groups. */
  nextOfKins?: ParsedNextOfKin[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The PATIENT VISIT group. */
  patientVisit?: ParsedPatientVisit;
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The GT1 segment. */
  guarantor?: GT1;
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** The OCCUPATIONAL DATA FOR HEALTH group of a parsed OML^O35 (HL7 v2.9.1) message. */
export interface ParsedOccupationalDataForHealth {
  /** The OH1 segments. */
  oh1List?: OH1[];
  /** The OH2 segments. */
  oh2List?: OH2[];
  /** The OH3 segment. */
  oh3?: OH3;
  /** The OH4 segments. */
  oh4List?: OH4[];
}

/** The NEXT OF KIN group of a parsed OML^O35 (HL7 v2.9.1) message. */
export interface ParsedNextOfKin {
  /** The NK1 segment. */
  nextOfKin: NK1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The OH2 segments. */
  oh2List?: OH2[];
  /** The OH3 segment. */
  oh3?: OH3;
}

/** The PATIENT VISIT group of a parsed OML^O35 (HL7 v2.9.1) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The INSURANCE group of a parsed OML^O35 (HL7 v2.9.1) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The SPECIMEN group of a parsed OML^O35 (HL7 v2.9.1) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The NTE segments. */
  notes?: NTE[];
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: ParsedSpecimenObservation[];
  /** The SPECIMEN CONTAINER groups. */
  specimenContainers: ParsedSpecimenContainer[];
}

/** The SPECIMEN OBSERVATION group of a parsed OML^O35 (HL7 v2.9.1) message. */
export interface ParsedSpecimenObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The SPECIMEN CONTAINER group of a parsed OML^O35 (HL7 v2.9.1) message. */
export interface ParsedSpecimenContainer {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The ORDER group of a parsed OML^O35 (HL7 v2.9.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The OBSERVATION REQUEST group. */
  observationRequest?: ParsedObservationRequest;
  /** The FT1 segments. */
  transactions?: FT1[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
  /** The BLG segment. */
  billing?: BLG;
}

/** The TIMING group of a parsed OML^O35 (HL7 v2.9.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION REQUEST group of a parsed OML^O35 (HL7 v2.9.1) message. */
export interface ParsedObservationRequest {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The REL segments. */
  relList?: REL[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The IPC segment. */
  imagingProcedureControl?: IPC;
  /** The SGH segment. */
  sgh?: SGH;
  /** The PRIOR RESULT groups. */
  priorResults?: ParsedPriorResult[];
  /** The SGT segment. */
  sgt?: SGT;
}

/** The OBSERVATION group of a parsed OML^O35 (HL7 v2.9.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PRIOR RESULT group of a parsed OML^O35 (HL7 v2.9.1) message. */
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

/** The PATIENT PRIOR group of a parsed OML^O35 (HL7 v2.9.1) message. */
export interface ParsedPatientPrior {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ARV segments. */
  arvList?: ARV[];
}

/** The PATIENT VISIT PRIOR group of a parsed OML^O35 (HL7 v2.9.1) message. */
export interface ParsedPatientVisitPrior {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER PRIOR group of a parsed OML^O35 (HL7 v2.9.1) message. */
export interface ParsedOrderPrior {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBSERVATION PARTICIPATION groups. */
  observationParticipations?: ParsedObservationParticipation[];
  /** The TIMING PRIOR groups. */
  timingPriors?: ParsedTimingPrior[];
  /** The OBSERVATION PRIOR groups. */
  observationPriors: ParsedObservationPrior[];
}

/** The OBSERVATION PARTICIPATION group of a parsed OML^O35 (HL7 v2.9.1) message. */
export interface ParsedObservationParticipation {
  /** The PRT segment. */
  prt: PRT;
  /** The DEV segments. */
  devList?: DEV[];
}

/** The TIMING PRIOR group of a parsed OML^O35 (HL7 v2.9.1) message. */
export interface ParsedTimingPrior {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION PRIOR group of a parsed OML^O35 (HL7 v2.9.1) message. */
export interface ParsedObservationPrior {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DEVICE group of a parsed OML^O35 (HL7 v2.9.1) message. */
export interface ParsedDevice {
  /** The DEV segment. */
  dev: DEV;
  /** The OBX segments. */
  observations?: OBX[];
}

/** Structured result of parsing an HL7 OML^O35 (HL7 v2.9.1) message. */
export interface ParsedOML_O35 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The ARV segments. */
  arvList?: ARV[];
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
  /** The DEVICE groups. */
  devices?: ParsedDevice[];
}

/** The segment parsers of OML^O35 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  ARV: (s, e) => ARV.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  GSP: (s, e) => GSP.parse(s, e),
  GSR: (s, e) => GSR.parse(s, e),
  GSC: (s, e) => GSC.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  OH1: (s, e) => OH1.parse(s, e),
  OH2: (s, e) => OH2.parse(s, e),
  OH3: (s, e) => OH3.parse(s, e),
  OH4: (s, e) => OH4.parse(s, e),
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
  DG1: (s, e) => DG1.parse(s, e),
  REL: (s, e) => REL.parse(s, e),
  IPC: (s, e) => IPC.parse(s, e),
  SGH: (s, e) => SGH.parse(s, e),
  DEV: (s, e) => DEV.parse(s, e),
  SGT: (s, e) => SGT.parse(s, e),
  FT1: (s, e) => FT1.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  BLG: (s, e) => BLG.parse(s, e),
};

/** Parser for HL7 OML^O35 (HL7 v2.9.1) messages. */
export class OML_O35_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OML_O35";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OML_O35_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOML_O35> {
    return parseStructure<ParsedOML_O35>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OML^O35 (HL7 v2.9.1) message string into a structured result. */
export function parseOML_O35(messageString: string): Result<ParsedOML_O35> {
  return new OML_O35_Parser().parse(messageString);
}
