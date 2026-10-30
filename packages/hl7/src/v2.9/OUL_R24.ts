/**
 * Builder, parser and structure for OUL^R24 messages (HL7 v2.9).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [NTE] [ PATIENT: PID [PD1] [{PRT}] [{OH1}] [{OH2}] [OH3] [{OH4}] [{ARV}] [{NTE}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [ VISIT: PV1 [PV2] [{PRT}] ] ] [{NK1}] { ORDER: OBR [{PRT}] [ COMMON_ORDER: ORC [{PRT}] [ ORDER_DOCUMENT: OBX [{PRT}] TXA ] ] [{NTE}] [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] [{ SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{ CONTAINER: SAC [INV] }] }] [{ RESULT: OBX [{PRT}] [TCD] [{SID}] [{INV}] [{NTE}] }] [{CTI}] [{ DEVICE: DEV [{OBX}] }] } [DSC]
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
import { NTE } from "./NTE.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { PRT } from "./PRT.ts";
import { OH1 } from "./OH1.ts";
import { OH2 } from "./OH2.ts";
import { OH3 } from "./OH3.ts";
import { OH4 } from "./OH4.ts";
import { OBX } from "./OBX.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { NK1 } from "./NK1.ts";
import { OBR } from "./OBR.ts";
import { ORC } from "./ORC.ts";
import { TXA } from "./TXA.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { SPM } from "./SPM.ts";
import { SAC } from "./SAC.ts";
import { INV } from "./INV.ts";
import { TCD } from "./TCD.ts";
import { SID } from "./SID.ts";
import { CTI } from "./CTI.ts";
import { DEV } from "./DEV.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of OUL^R24 (HL7 v2.9), in order. */
export const OUL_R24_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "NTE", required: false, repeating: false },
  {
    name: "PATIENT",
    required: false,
    repeating: false,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "PRT", required: false, repeating: true },
      { name: "OH1", required: false, repeating: true },
      { name: "OH2", required: false, repeating: true },
      { name: "OH3", required: false, repeating: false },
      { name: "OH4", required: false, repeating: true },
      { name: "ARV", required: false, repeating: true },
      { name: "NTE", required: false, repeating: true },
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
    ],
  },
  { name: "NK1", required: false, repeating: true },
  {
    name: "ORDER",
    required: true,
    repeating: true,
    segments: [
      { name: "OBR", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
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
      { name: "NTE", required: false, repeating: true },
      { name: "PRT", required: false, repeating: true, as: "prt2" },
      {
        name: "TIMING_QTY",
        required: false,
        repeating: true,
        segments: [
          { name: "TQ1", required: true, repeating: false },
          { name: "TQ2", required: false, repeating: true },
        ],
      },
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
          {
            name: "CONTAINER",
            required: false,
            repeating: true,
            segments: [
              { name: "SAC", required: true, repeating: false },
              { name: "INV", required: false, repeating: false },
            ],
          },
        ],
      },
      {
        name: "RESULT",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "TCD", required: false, repeating: false },
          { name: "SID", required: false, repeating: true },
          { name: "INV", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      { name: "CTI", required: false, repeating: true },
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

/** The PATIENT group of a parsed OUL^R24 (HL7 v2.9) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
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

/** The PATIENT OBSERVATION group of a parsed OUL^R24 (HL7 v2.9) message. */
export interface ParsedPatientObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The VISIT group of a parsed OUL^R24 (HL7 v2.9) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER group of a parsed OUL^R24 (HL7 v2.9) message. */
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
  /** The SPECIMEN groups. */
  specimens?: ParsedSpecimen[];
  /** The RESULT groups. */
  results?: ParsedResult[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
  /** The DEVICE groups. */
  devices?: ParsedDevice[];
}

/** The COMMON ORDER group of a parsed OUL^R24 (HL7 v2.9) message. */
export interface ParsedCommonOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ORDER DOCUMENT group. */
  orderDocument?: ParsedOrderDocument;
}

/** The ORDER DOCUMENT group of a parsed OUL^R24 (HL7 v2.9) message. */
export interface ParsedOrderDocument {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TXA segment. */
  document: TXA;
}

/** The TIMING QTY group of a parsed OUL^R24 (HL7 v2.9) message. */
export interface ParsedTimingQty {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The SPECIMEN group of a parsed OUL^R24 (HL7 v2.9) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: ParsedSpecimenObservation[];
  /** The CONTAINER groups. */
  containers?: ParsedContainer[];
}

/** The SPECIMEN OBSERVATION group of a parsed OUL^R24 (HL7 v2.9) message. */
export interface ParsedSpecimenObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The CONTAINER group of a parsed OUL^R24 (HL7 v2.9) message. */
export interface ParsedContainer {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The INV segment. */
  inventoryDetail?: INV;
}

/** The RESULT group of a parsed OUL^R24 (HL7 v2.9) message. */
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

/** The DEVICE group of a parsed OUL^R24 (HL7 v2.9) message. */
export interface ParsedDevice {
  /** The DEV segment. */
  dev: DEV;
  /** The OBX segments. */
  observations?: OBX[];
}

/** Structured result of parsing an HL7 OUL^R24 (HL7 v2.9) message. */
export interface ParsedOUL_R24 extends ParsedMessageBase {
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
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The ORDER groups. */
  orders: ParsedOrder[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of OUL^R24 (HL7 v2.9). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  ARV: (s, e) => ARV.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  OH1: (s, e) => OH1.parse(s, e),
  OH2: (s, e) => OH2.parse(s, e),
  OH3: (s, e) => OH3.parse(s, e),
  OH4: (s, e) => OH4.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TXA: (s, e) => TXA.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  INV: (s, e) => INV.parse(s, e),
  TCD: (s, e) => TCD.parse(s, e),
  SID: (s, e) => SID.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  DEV: (s, e) => DEV.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 OUL^R24 (HL7 v2.9) messages. */
export class OUL_R24_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OUL_R24";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OUL_R24_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOUL_R24> {
    return parseStructure<ParsedOUL_R24>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OUL^R24 (HL7 v2.9) message string into a structured result. */
export function parseOUL_R24(messageString: string): Result<ParsedOUL_R24> {
  return new OUL_R24_Parser().parse(messageString);
}

/** The PATIENT group of an OUL^R24 (HL7 v2.9) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
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
  patientObservations?: PatientObservationGroup[];
  /** The VISIT group. */
  visit?: VisitGroup;
}

/** The PATIENT OBSERVATION group of an OUL^R24 (HL7 v2.9) message being built. */
export interface PatientObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The VISIT group of an OUL^R24 (HL7 v2.9) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER group of an OUL^R24 (HL7 v2.9) message being built. */
export interface OrderGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The COMMON ORDER group. */
  commonOrder?: CommonOrderGroup;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prt2?: PRT[];
  /** The TIMING QTY groups. */
  timingQtys?: TimingQtyGroup[];
  /** The SPECIMEN groups. */
  specimens?: SpecimenGroup[];
  /** The RESULT groups. */
  results?: ResultGroup[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
  /** The DEVICE groups. */
  devices?: DeviceGroup[];
}

/** The COMMON ORDER group of an OUL^R24 (HL7 v2.9) message being built. */
export interface CommonOrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ORDER DOCUMENT group. */
  orderDocument?: OrderDocumentGroup;
}

/** The ORDER DOCUMENT group of an OUL^R24 (HL7 v2.9) message being built. */
export interface OrderDocumentGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TXA segment. */
  document: TXA;
}

/** The TIMING QTY group of an OUL^R24 (HL7 v2.9) message being built. */
export interface TimingQtyGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The SPECIMEN group of an OUL^R24 (HL7 v2.9) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: SpecimenObservationGroup[];
  /** The CONTAINER groups. */
  containers?: ContainerGroup[];
}

/** The SPECIMEN OBSERVATION group of an OUL^R24 (HL7 v2.9) message being built. */
export interface SpecimenObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The CONTAINER group of an OUL^R24 (HL7 v2.9) message being built. */
export interface ContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The INV segment. */
  inventoryDetail?: INV;
}

/** The RESULT group of an OUL^R24 (HL7 v2.9) message being built. */
export interface ResultGroup {
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

/** The DEVICE group of an OUL^R24 (HL7 v2.9) message being built. */
export interface DeviceGroup {
  /** The DEV segment. */
  dev: DEV;
  /** The OBX segments. */
  observations?: OBX[];
}

/** The optional segments and groups of an OUL^R24 (HL7 v2.9) message. */
export interface OUL_R24Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segment. */
  note?: NTE;
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 OUL^R24 (HL7 v2.9) messages. */
export class OUL_R24<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OUL_R24";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OUL_R24_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: OrderGroup[],
    public options: OUL_R24Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, orders: this.orders };
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

/** Builds an HL7 OUL^R24 (HL7 v2.9) message. */
export function createOUL_R24<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: OUL_R24Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OUL_R24<TMSH> {
  return new OUL_R24(header, orders, options, encoding);
}
