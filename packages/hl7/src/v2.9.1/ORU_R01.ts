/**
 * Builder, parser and structure for ORU^R01 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] { PATIENT_RESULT: [ PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{OH1}] [{OH2}] [OH3] [{OH4}] [{NTE}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] [{OH2}] [OH3] }] [{ARV}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [ VISIT: PV1 [PV2] [{PRT}] ] [{ INSURANCE: IN1 [IN2] [IN3] }] ] { ORDER_OBSERVATION: [ COMMON_ORDER: ORC [{PRT}] [ ORDER_DOCUMENT: OBX [{PRT}] TXA ] ] OBR [{NTE}] [{ OBSERVATION_PARTICIPATION: PRT [{DEV}] }] [{ TIMING_QTY: TQ1 [{TQ2}] }] [CTD] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] [{FT1}] [{CTI}] [{ SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] }] } [{ DEVICE: DEV [{OBX}] }] } [DSC]
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
import { PD1 } from "./PD1.ts";
import { GSP } from "./GSP.ts";
import { GSR } from "./GSR.ts";
import { GSC } from "./GSC.ts";
import { PRT } from "./PRT.ts";
import { OH1 } from "./OH1.ts";
import { OH2 } from "./OH2.ts";
import { OH3 } from "./OH3.ts";
import { OH4 } from "./OH4.ts";
import { NTE } from "./NTE.ts";
import { NK1 } from "./NK1.ts";
import { OBX } from "./OBX.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { IN1 } from "./IN1.ts";
import { IN2 } from "./IN2.ts";
import { IN3 } from "./IN3.ts";
import { ORC } from "./ORC.ts";
import { TXA } from "./TXA.ts";
import { OBR } from "./OBR.ts";
import { DEV } from "./DEV.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { CTD } from "./CTD.ts";
import { FT1 } from "./FT1.ts";
import { CTI } from "./CTI.ts";
import { SPM } from "./SPM.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ORU^R01 (HL7 v2.9.1), in order. */
export const ORU_R01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  {
    name: "PATIENT_RESULT",
    required: true,
    repeating: true,
    segments: [
      {
        name: "PATIENT",
        required: false,
        repeating: false,
        segments: [
          { name: "PID", required: true, repeating: false },
          { name: "PD1", required: false, repeating: false },
          { name: "GSP", required: false, repeating: true },
          { name: "GSR", required: false, repeating: true },
          { name: "GSC", required: false, repeating: true },
          { name: "PRT", required: false, repeating: true },
          { name: "OH1", required: false, repeating: true },
          { name: "OH2", required: false, repeating: true },
          { name: "OH3", required: false, repeating: false },
          { name: "OH4", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
          {
            name: "NEXT_OF_KIN",
            required: false,
            repeating: true,
            segments: [
              { name: "NK1", required: true, repeating: false },
              { name: "GSP", required: false, repeating: true },
              { name: "GSR", required: false, repeating: true },
              { name: "OH2", required: false, repeating: true },
              { name: "OH3", required: false, repeating: false },
            ],
          },
          { name: "ARV", required: false, repeating: true },
          {
            name: "PATIENT_OBSERVATION",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
            ],
          },
          {
            name: "VISIT",
            required: false,
            repeating: false,
            segments: [
              { name: "PV1", required: true, repeating: false },
              { name: "PV2", required: false, repeating: false },
              { name: "PRT", required: false, repeating: true },
            ],
          },
          {
            name: "INSURANCE",
            required: false,
            repeating: true,
            segments: [
              { name: "IN1", required: true, repeating: false },
              { name: "IN2", required: false, repeating: false },
              { name: "IN3", required: false, repeating: false },
            ],
          },
        ],
      },
      {
        name: "ORDER_OBSERVATION",
        required: true,
        repeating: true,
        segments: [
          {
            name: "COMMON_ORDER",
            required: false,
            repeating: false,
            segments: [
              { name: "ORC", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
              {
                name: "ORDER_DOCUMENT",
                required: false,
                repeating: false,
                segments: [
                  { name: "OBX", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                  { name: "TXA", required: true, repeating: false },
                ],
              },
            ],
          },
          { name: "OBR", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
          {
            name: "OBSERVATION_PARTICIPATION",
            required: false,
            repeating: true,
            segments: [
              { name: "PRT", required: true, repeating: false },
              { name: "DEV", required: false, repeating: true },
            ],
          },
          {
            name: "TIMING_QTY",
            required: false,
            repeating: true,
            segments: [
              { name: "TQ1", required: true, repeating: false },
              { name: "TQ2", required: false, repeating: true },
            ],
          },
          { name: "CTD", required: false, repeating: false },
          {
            name: "OBSERVATION",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
              { name: "NTE", required: false, repeating: true },
            ],
          },
          { name: "FT1", required: false, repeating: true },
          { name: "CTI", required: false, repeating: true },
          {
            name: "SPECIMEN",
            required: false,
            repeating: true,
            segments: [
              { name: "SPM", required: true, repeating: false },
              {
                name: "SPECIMEN_OBSERVATION",
                required: false,
                repeating: true,
                segments: [
                  { name: "OBX", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "DEVICE",
        required: false,
        repeating: true,
        segments: [
          { name: "DEV", required: true, repeating: false },
          { name: "OBX", required: false, repeating: true },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The PATIENT RESULT group of a parsed ORU^R01 (HL7 v2.9.1) message. */
export interface ParsedPatientResult {
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER OBSERVATION groups. */
  orderObservations: ParsedOrderObservation[];
  /** The DEVICE groups. */
  devices?: ParsedDevice[];
}

/** The PATIENT group of a parsed ORU^R01 (HL7 v2.9.1) message. */
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
  /** The NTE segments. */
  notes?: NTE[];
  /** The NEXT OF KIN groups. */
  nextOfKins?: ParsedNextOfKin[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The PATIENT OBSERVATION groups. */
  patientObservations?: ParsedPatientObservation[];
  /** The VISIT group. */
  visit?: ParsedVisit;
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
}

/** The NEXT OF KIN group of a parsed ORU^R01 (HL7 v2.9.1) message. */
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

/** The PATIENT OBSERVATION group of a parsed ORU^R01 (HL7 v2.9.1) message. */
export interface ParsedPatientObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The VISIT group of a parsed ORU^R01 (HL7 v2.9.1) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The INSURANCE group of a parsed ORU^R01 (HL7 v2.9.1) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER OBSERVATION group of a parsed ORU^R01 (HL7 v2.9.1) message. */
export interface ParsedOrderObservation {
  /** The COMMON ORDER group. */
  commonOrder?: ParsedCommonOrder;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBSERVATION PARTICIPATION groups. */
  observationParticipations?: ParsedObservationParticipation[];
  /** The TIMING QTY groups. */
  timingQtys?: ParsedTimingQty[];
  /** The CTD segment. */
  contact?: CTD;
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The FT1 segments. */
  transactions?: FT1[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
  /** The SPECIMEN groups. */
  specimens?: ParsedSpecimen[];
}

/** The COMMON ORDER group of a parsed ORU^R01 (HL7 v2.9.1) message. */
export interface ParsedCommonOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ORDER DOCUMENT group. */
  orderDocument?: ParsedOrderDocument;
}

/** The ORDER DOCUMENT group of a parsed ORU^R01 (HL7 v2.9.1) message. */
export interface ParsedOrderDocument {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TXA segment. */
  document: TXA;
}

/** The OBSERVATION PARTICIPATION group of a parsed ORU^R01 (HL7 v2.9.1) message. */
export interface ParsedObservationParticipation {
  /** The PRT segment. */
  prt: PRT;
  /** The DEV segments. */
  devList?: DEV[];
}

/** The TIMING QTY group of a parsed ORU^R01 (HL7 v2.9.1) message. */
export interface ParsedTimingQty {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of a parsed ORU^R01 (HL7 v2.9.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The SPECIMEN group of a parsed ORU^R01 (HL7 v2.9.1) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: ParsedSpecimenObservation[];
}

/** The SPECIMEN OBSERVATION group of a parsed ORU^R01 (HL7 v2.9.1) message. */
export interface ParsedSpecimenObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The DEVICE group of a parsed ORU^R01 (HL7 v2.9.1) message. */
export interface ParsedDevice {
  /** The DEV segment. */
  dev: DEV;
  /** The OBX segments. */
  observations?: OBX[];
}

/** Structured result of parsing an HL7 ORU^R01 (HL7 v2.9.1) message. */
export interface ParsedORU_R01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PATIENT RESULT groups. */
  patientResults: ParsedPatientResult[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of ORU^R01 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  ARV: (s, e) => ARV.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
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
  NTE: (s, e) => NTE.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TXA: (s, e) => TXA.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  DEV: (s, e) => DEV.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  FT1: (s, e) => FT1.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 ORU^R01 (HL7 v2.9.1) messages. */
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

/** Parses an HL7 ORU^R01 (HL7 v2.9.1) message string into a structured result. */
export function parseORU_R01(messageString: string): Result<ParsedORU_R01> {
  return new ORU_R01_Parser().parse(messageString);
}

/** The PATIENT RESULT group of an ORU^R01 (HL7 v2.9.1) message being built. */
export interface PatientResultGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The ORDER OBSERVATION groups. */
  orderObservations: OrderObservationGroup[];
  /** The DEVICE groups. */
  devices?: DeviceGroup[];
}

/** The PATIENT group of an ORU^R01 (HL7 v2.9.1) message being built. */
export interface PatientGroup {
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
  /** The NTE segments. */
  notes?: NTE[];
  /** The NEXT OF KIN groups. */
  nextOfKins?: NextOfKinGroup[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The PATIENT OBSERVATION groups. */
  patientObservations?: PatientObservationGroup[];
  /** The VISIT group. */
  visit?: VisitGroup;
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
}

/** The NEXT OF KIN group of an ORU^R01 (HL7 v2.9.1) message being built. */
export interface NextOfKinGroup {
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

/** The PATIENT OBSERVATION group of an ORU^R01 (HL7 v2.9.1) message being built. */
export interface PatientObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The VISIT group of an ORU^R01 (HL7 v2.9.1) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The INSURANCE group of an ORU^R01 (HL7 v2.9.1) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER OBSERVATION group of an ORU^R01 (HL7 v2.9.1) message being built. */
export interface OrderObservationGroup {
  /** The COMMON ORDER group. */
  commonOrder?: CommonOrderGroup;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBSERVATION PARTICIPATION groups. */
  observationParticipations?: ObservationParticipationGroup[];
  /** The TIMING QTY groups. */
  timingQtys?: TimingQtyGroup[];
  /** The CTD segment. */
  contact?: CTD;
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The FT1 segments. */
  transactions?: FT1[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
  /** The SPECIMEN groups. */
  specimens?: SpecimenGroup[];
}

/** The COMMON ORDER group of an ORU^R01 (HL7 v2.9.1) message being built. */
export interface CommonOrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ORDER DOCUMENT group. */
  orderDocument?: OrderDocumentGroup;
}

/** The ORDER DOCUMENT group of an ORU^R01 (HL7 v2.9.1) message being built. */
export interface OrderDocumentGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TXA segment. */
  document: TXA;
}

/** The OBSERVATION PARTICIPATION group of an ORU^R01 (HL7 v2.9.1) message being built. */
export interface ObservationParticipationGroup {
  /** The PRT segment. */
  prt: PRT;
  /** The DEV segments. */
  devList?: DEV[];
}

/** The TIMING QTY group of an ORU^R01 (HL7 v2.9.1) message being built. */
export interface TimingQtyGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an ORU^R01 (HL7 v2.9.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The SPECIMEN group of an ORU^R01 (HL7 v2.9.1) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: SpecimenObservationGroup[];
}

/** The SPECIMEN OBSERVATION group of an ORU^R01 (HL7 v2.9.1) message being built. */
export interface SpecimenObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The DEVICE group of an ORU^R01 (HL7 v2.9.1) message being built. */
export interface DeviceGroup {
  /** The DEV segment. */
  dev: DEV;
  /** The OBX segments. */
  observations?: OBX[];
}

/** The optional segments and groups of an ORU^R01 (HL7 v2.9.1) message. */
export interface ORU_R01Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 ORU^R01 (HL7 v2.9.1) messages. */
export class ORU_R01<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORU_R01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORU_R01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public patientResults: PatientResultGroup[],
    public options: ORU_R01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, patientResults: this.patientResults };
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

/** Builds an HL7 ORU^R01 (HL7 v2.9.1) message. */
export function createORU_R01<TMSH extends MSH = MSH>(
  header: TMSH,
  patientResults: PatientResultGroup[],
  options: ORU_R01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORU_R01<TMSH> {
  return new ORU_R01(header, patientResults, options, encoding);
}
