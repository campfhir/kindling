/**
 * Parser for OUL^R23 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [NTE] [ PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{OH1}] [{OH2}] [OH3] [{OH4}] [{ARV}] [{NTE}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [ VISIT: PV1 [PV2] [{PRT}] ] ] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] }] { SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] { CONTAINER: SAC [INV] { ORDER: OBR [{PRT}] [ COMMON_ORDER: ORC [{PRT}] [ ORDER_DOCUMENT: OBX [{PRT}] TXA ] ] [{NTE}] [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] [{ RESULT: OBX [{PRT}] [TCD] [{SID}] [{INV}] [{NTE}] }] [{CTI}] } } } [{ DEVICE: DEV [{OBX}] }] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { OUL_R23_STRUCTURE } from "../../structures/v2.9.1/OUL_R23.ts";
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
import { OBX } from "../../segments/v2.9.1/OBX.ts";
import { PV1 } from "../../segments/v2.9.1/PV1.ts";
import { PV2 } from "../../segments/v2.9.1/PV2.ts";
import { NK1 } from "../../segments/v2.9.1/NK1.ts";
import { SPM } from "../../segments/v2.9.1/SPM.ts";
import { SAC } from "../../segments/v2.9.1/SAC.ts";
import { INV } from "../../segments/v2.9.1/INV.ts";
import { OBR } from "../../segments/v2.9.1/OBR.ts";
import { ORC } from "../../segments/v2.9.1/ORC.ts";
import { TXA } from "../../segments/v2.9.1/TXA.ts";
import { TQ1 } from "../../segments/v2.9.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.9.1/TQ2.ts";
import { TCD } from "../../segments/v2.9.1/TCD.ts";
import { SID } from "../../segments/v2.9.1/SID.ts";
import { CTI } from "../../segments/v2.9.1/CTI.ts";
import { DEV } from "../../segments/v2.9.1/DEV.ts";
import { DSC } from "../../segments/v2.9.1/DSC.ts";

/** The PATIENT group of a parsed OUL^R23 (HL7 v2.9.1) message. */
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
  /** The OH1 segments. */
  oh1List?: OH1[];
  /** The OH2 segments. */
  oh2List?: OH2[];
  /** The OH3 segment. */
  oh3?: OH3;
  /** The OH4 segments. */
  oh4List?: OH4[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT OBSERVATION groups. */
  patientObservations?: ParsedPatientObservation[];
  /** The VISIT group. */
  visit?: ParsedVisit;
}

/** The PATIENT OBSERVATION group of a parsed OUL^R23 (HL7 v2.9.1) message. */
export interface ParsedPatientObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The VISIT group of a parsed OUL^R23 (HL7 v2.9.1) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The NEXT OF KIN group of a parsed OUL^R23 (HL7 v2.9.1) message. */
export interface ParsedNextOfKin {
  /** The NK1 segment. */
  nextOfKin: NK1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
}

/** The SPECIMEN group of a parsed OUL^R23 (HL7 v2.9.1) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: ParsedSpecimenObservation[];
  /** The CONTAINER groups. */
  containers: ParsedContainer[];
}

/** The SPECIMEN OBSERVATION group of a parsed OUL^R23 (HL7 v2.9.1) message. */
export interface ParsedSpecimenObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The CONTAINER group of a parsed OUL^R23 (HL7 v2.9.1) message. */
export interface ParsedContainer {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The INV segment. */
  inventoryDetail?: INV;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The ORDER group of a parsed OUL^R23 (HL7 v2.9.1) message. */
export interface ParsedOrder {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The COMMON ORDER group. */
  commonOrder?: ParsedCommonOrder;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prt2?: PRT[];
  /** The TIMING QTY groups. */
  timingQtys?: ParsedTimingQty[];
  /** The RESULT groups. */
  results?: ParsedResult[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The COMMON ORDER group of a parsed OUL^R23 (HL7 v2.9.1) message. */
export interface ParsedCommonOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ORDER DOCUMENT group. */
  orderDocument?: ParsedOrderDocument;
}

/** The ORDER DOCUMENT group of a parsed OUL^R23 (HL7 v2.9.1) message. */
export interface ParsedOrderDocument {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TXA segment. */
  document: TXA;
}

/** The TIMING QTY group of a parsed OUL^R23 (HL7 v2.9.1) message. */
export interface ParsedTimingQty {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The RESULT group of a parsed OUL^R23 (HL7 v2.9.1) message. */
export interface ParsedResult {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The SID segments. */
  substanceIdentifiers?: SID[];
  /** The INV segments. */
  inventoryDetails?: INV[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DEVICE group of a parsed OUL^R23 (HL7 v2.9.1) message. */
export interface ParsedDevice {
  /** The DEV segment. */
  dev: DEV;
  /** The OBX segments. */
  observations?: OBX[];
}

/** Structured result of parsing an HL7 OUL^R23 (HL7 v2.9.1) message. */
export interface ParsedOUL_R23 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segment. */
  note?: NTE;
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The NEXT OF KIN groups. */
  nextOfKins?: ParsedNextOfKin[];
  /** The SPECIMEN groups. */
  specimens: ParsedSpecimen[];
  /** The DEVICE groups. */
  devices?: ParsedDevice[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of OUL^R23 (HL7 v2.9.1). */
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
  OBX: (s, e) => OBX.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  INV: (s, e) => INV.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TXA: (s, e) => TXA.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  TCD: (s, e) => TCD.parse(s, e),
  SID: (s, e) => SID.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  DEV: (s, e) => DEV.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 OUL^R23 (HL7 v2.9.1) messages. */
export class OUL_R23_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OUL_R23";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OUL_R23_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOUL_R23> {
    return parseStructure<ParsedOUL_R23>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OUL^R23 (HL7 v2.9.1) message string into a structured result. */
export function parseOUL_R23(messageString: string): Result<ParsedOUL_R23> {
  return new OUL_R23_Parser().parse(messageString);
}
