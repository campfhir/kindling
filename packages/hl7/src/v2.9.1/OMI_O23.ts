/**
 * Builder, parser and structure for OMI^O23 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [ OCCUPATIONAL_DATA_FOR_HEALTH: [{OH1}] [{OH2}] [OH3] [{OH4}] ] [{ARV}] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] OBR [{NTE}] [{PRT}] [CTD] [{DG1}] [REL] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] {IPC} } [{ DEVICE: DEV [{OBX}] }]
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
import { GSP } from "./GSP.ts";
import { GSR } from "./GSR.ts";
import { GSC } from "./GSC.ts";
import { PRT } from "./PRT.ts";
import { OH1 } from "./OH1.ts";
import { OH2 } from "./OH2.ts";
import { OH3 } from "./OH3.ts";
import { OH4 } from "./OH4.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { IN1 } from "./IN1.ts";
import { IN2 } from "./IN2.ts";
import { IN3 } from "./IN3.ts";
import { GT1 } from "./GT1.ts";
import { AL1 } from "./AL1.ts";
import { ORC } from "./ORC.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { OBR } from "./OBR.ts";
import { CTD } from "./CTD.ts";
import { DG1 } from "./DG1.ts";
import { REL } from "./REL.ts";
import { OBX } from "./OBX.ts";
import { IPC } from "./IPC.ts";
import { DEV } from "./DEV.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of OMI^O23 (HL7 v2.9.1), in order. */
export const OMI_O23_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "NTE", required: false, repeating: true },
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
      {
        name: "OCCUPATIONAL_DATA_FOR_HEALTH",
        required: false,
        repeating: false,
        segments: [
          { name: "OH1", required: false, repeating: true },
          { name: "OH2", required: false, repeating: true },
          { name: "OH3", required: false, repeating: false },
          { name: "OH4", required: false, repeating: true },
        ],
      },
      { name: "ARV", required: false, repeating: true },
      { name: "NTE", required: false, repeating: true },
      {
        name: "PATIENT_VISIT",
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
      { name: "GT1", required: false, repeating: false },
      { name: "AL1", required: false, repeating: true },
    ],
  },
  {
    name: "ORDER",
    required: true,
    repeating: true,
    segments: [
      { name: "ORC", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
      {
        name: "TIMING",
        required: false,
        repeating: true,
        segments: [
          { name: "TQ1", required: true, repeating: false },
          { name: "TQ2", required: false, repeating: true },
        ],
      },
      { name: "OBR", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      { name: "PRT", required: false, repeating: true, as: "prt2" },
      { name: "CTD", required: false, repeating: false },
      { name: "DG1", required: false, repeating: true },
      { name: "REL", required: false, repeating: false },
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
      { name: "IPC", required: true, repeating: true },
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
];

/** The PATIENT group of a parsed OMI^O23 (HL7 v2.9.1) message. */
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
  /** The ARV segments. */
  arvList?: ARV[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT VISIT group. */
  patientVisit?: ParsedPatientVisit;
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The GT1 segment. */
  guarantor?: GT1;
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** The OCCUPATIONAL DATA FOR HEALTH group of a parsed OMI^O23 (HL7 v2.9.1) message. */
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

/** The PATIENT VISIT group of a parsed OMI^O23 (HL7 v2.9.1) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The INSURANCE group of a parsed OMI^O23 (HL7 v2.9.1) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER group of a parsed OMI^O23 (HL7 v2.9.1) message. */
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
  /** The REL segment. */
  rel?: REL;
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The IPC segments. */
  imagingProcedureControls: IPC[];
}

/** The TIMING group of a parsed OMI^O23 (HL7 v2.9.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of a parsed OMI^O23 (HL7 v2.9.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DEVICE group of a parsed OMI^O23 (HL7 v2.9.1) message. */
export interface ParsedDevice {
  /** The DEV segment. */
  dev: DEV;
  /** The OBX segments. */
  observations?: OBX[];
}

/** Structured result of parsing an HL7 OMI^O23 (HL7 v2.9.1) message. */
export interface ParsedOMI_O23 extends ParsedMessageBase {
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
  /** The ORDER groups. */
  orders: ParsedOrder[];
  /** The DEVICE groups. */
  devices?: ParsedDevice[];
}

/** The segment parsers of OMI^O23 (HL7 v2.9.1). */
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
  REL: (s, e) => REL.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  IPC: (s, e) => IPC.parse(s, e),
  DEV: (s, e) => DEV.parse(s, e),
};

/** Parser for HL7 OMI^O23 (HL7 v2.9.1) messages. */
export class OMI_O23_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OMI_O23";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OMI_O23_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOMI_O23> {
    return parseStructure<ParsedOMI_O23>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OMI^O23 (HL7 v2.9.1) message string into a structured result. */
export function parseOMI_O23(messageString: string): Result<ParsedOMI_O23> {
  return new OMI_O23_Parser().parse(messageString);
}

/** The PATIENT group of an OMI^O23 (HL7 v2.9.1) message being built. */
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
  /** The OCCUPATIONAL DATA FOR HEALTH group. */
  occupationalDataForHealth?: OccupationalDataForHealthGroup;
  /** The ARV segments. */
  arvList?: ARV[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT VISIT group. */
  patientVisit?: PatientVisitGroup;
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The GT1 segment. */
  guarantor?: GT1;
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** The OCCUPATIONAL DATA FOR HEALTH group of an OMI^O23 (HL7 v2.9.1) message being built. */
export interface OccupationalDataForHealthGroup {
  /** The OH1 segments. */
  oh1List?: OH1[];
  /** The OH2 segments. */
  oh2List?: OH2[];
  /** The OH3 segment. */
  oh3?: OH3;
  /** The OH4 segments. */
  oh4List?: OH4[];
}

/** The PATIENT VISIT group of an OMI^O23 (HL7 v2.9.1) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The INSURANCE group of an OMI^O23 (HL7 v2.9.1) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER group of an OMI^O23 (HL7 v2.9.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: TimingGroup[];
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
  /** The REL segment. */
  rel?: REL;
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The IPC segments. */
  imagingProcedureControls: IPC[];
}

/** The TIMING group of an OMI^O23 (HL7 v2.9.1) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an OMI^O23 (HL7 v2.9.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DEVICE group of an OMI^O23 (HL7 v2.9.1) message being built. */
export interface DeviceGroup {
  /** The DEV segment. */
  dev: DEV;
  /** The OBX segments. */
  observations?: OBX[];
}

/** The optional segments and groups of an OMI^O23 (HL7 v2.9.1) message. */
export interface OMI_O23Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The DEVICE groups. */
  devices?: DeviceGroup[];
}

/** Builder for HL7 OMI^O23 (HL7 v2.9.1) messages. */
export class OMI_O23<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OMI_O23";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OMI_O23_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: OrderGroup[],
    public options: OMI_O23Options = {},
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

/** Builds an HL7 OMI^O23 (HL7 v2.9.1) message. */
export function createOMI_O23<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: OMI_O23Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OMI_O23<TMSH> {
  return new OMI_O23(header, orders, options, encoding);
}
