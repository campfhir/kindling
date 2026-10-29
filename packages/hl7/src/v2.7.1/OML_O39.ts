/**
 * Builder, parser and structure for OML^O39 messages (HL7 v2.7.1).
 *
 * Structure: MSH [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [PD1] [{PRT}] [{NTE}] [{NK1}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [ OBSERVATION_REQUEST: OBR [TCD] [{NTE}] [{PRT}] [CTD] [{DG1}] [{ OBSERVATION: OBX [{PRT}] [TCD] [{NTE}] }] [{ SPECIMEN_SHIPMENT: SHP [{ SHIPMENT_OBSERVATION: OBX [{PRT}] }] { PACKAGE: PAC [{ SPECIMEN_IN_PACKAGE: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{ SPECIMEN_CONTAINER_IN_PACKAGE: SAC [{ CONTAINER_OBSERVATION: OBX [{PRT}] }] }] }] } }] ] [{FT1}] [{CTI}] [BLG] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { NTE } from "./NTE.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { PRT } from "./PRT.ts";
import { NK1 } from "./NK1.ts";
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
import { TCD } from "./TCD.ts";
import { CTD } from "./CTD.ts";
import { DG1 } from "./DG1.ts";
import { OBX } from "./OBX.ts";
import { SHP } from "./SHP.ts";
import { PAC } from "./PAC.ts";
import { SPM } from "./SPM.ts";
import { SAC } from "./SAC.ts";
import { FT1 } from "./FT1.ts";
import { CTI } from "./CTI.ts";
import { BLG } from "./BLG.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of OML^O39 (HL7 v2.7.1), in order. */
export const OML_O39_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
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
      { name: "PRT", required: false, repeating: true },
      { name: "NTE", required: false, repeating: true },
      { name: "NK1", required: false, repeating: true },
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
      {
        name: "OBSERVATION_REQUEST",
        required: false,
        repeating: false,
        segments: [
          { name: "OBR", required: true, repeating: false },
          { name: "TCD", required: false, repeating: false },
          { name: "NTE", required: false, repeating: true },
          { name: "PRT", required: false, repeating: true },
          { name: "CTD", required: false, repeating: false },
          { name: "DG1", required: false, repeating: true },
          {
            name: "OBSERVATION",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
              { name: "TCD", required: false, repeating: false },
              { name: "NTE", required: false, repeating: true },
            ],
          },
          {
            name: "SPECIMEN_SHIPMENT",
            required: false,
            repeating: true,
            segments: [
              { name: "SHP", required: true, repeating: false },
              {
                name: "SHIPMENT_OBSERVATION",
                required: false,
                repeating: true,
                segments: [
                  { name: "OBX", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                ],
              },
              {
                name: "PACKAGE",
                required: true,
                repeating: true,
                segments: [
                  { name: "PAC", required: true, repeating: false },
                  {
                    name: "SPECIMEN_IN_PACKAGE",
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
                        name: "SPECIMEN_CONTAINER_IN_PACKAGE",
                        required: false,
                        repeating: true,
                        segments: [
                          { name: "SAC", required: true, repeating: false },
                          {
                            name: "CONTAINER_OBSERVATION",
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
                ],
              },
            ],
          },
        ],
      },
      { name: "FT1", required: false, repeating: true },
      { name: "CTI", required: false, repeating: true },
      { name: "BLG", required: false, repeating: false },
    ],
  },
];

/** The PATIENT group of a parsed OML^O39 (HL7 v2.7.1) message. */
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

/** The PATIENT VISIT group of a parsed OML^O39 (HL7 v2.7.1) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The INSURANCE group of a parsed OML^O39 (HL7 v2.7.1) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER group of a parsed OML^O39 (HL7 v2.7.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
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

/** The TIMING group of a parsed OML^O39 (HL7 v2.7.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION REQUEST group of a parsed OML^O39 (HL7 v2.7.1) message. */
export interface ParsedObservationRequest {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The CTD segment. */
  contact?: CTD;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The SPECIMEN SHIPMENT groups. */
  specimenShipments?: ParsedSpecimenShipment[];
}

/** The OBSERVATION group of a parsed OML^O39 (HL7 v2.7.1) message. */
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

/** The SPECIMEN SHIPMENT group of a parsed OML^O39 (HL7 v2.7.1) message. */
export interface ParsedSpecimenShipment {
  /** The SHP segment. */
  shp: SHP;
  /** The SHIPMENT OBSERVATION groups. */
  shipmentObservations?: ParsedShipmentObservation[];
  /** The PACKAGE groups. */
  packages: ParsedPackage[];
}

/** The SHIPMENT OBSERVATION group of a parsed OML^O39 (HL7 v2.7.1) message. */
export interface ParsedShipmentObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PACKAGE group of a parsed OML^O39 (HL7 v2.7.1) message. */
export interface ParsedPackage {
  /** The PAC segment. */
  pac: PAC;
  /** The SPECIMEN IN PACKAGE groups. */
  specimenInPackages?: ParsedSpecimenInPackage[];
}

/** The SPECIMEN IN PACKAGE group of a parsed OML^O39 (HL7 v2.7.1) message. */
export interface ParsedSpecimenInPackage {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: ParsedSpecimenObservation[];
  /** The SPECIMEN CONTAINER IN PACKAGE groups. */
  specimenContainerInPackages?: ParsedSpecimenContainerInPackage[];
}

/** The SPECIMEN OBSERVATION group of a parsed OML^O39 (HL7 v2.7.1) message. */
export interface ParsedSpecimenObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The SPECIMEN CONTAINER IN PACKAGE group of a parsed OML^O39 (HL7 v2.7.1) message. */
export interface ParsedSpecimenContainerInPackage {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The CONTAINER OBSERVATION groups. */
  containerObservations?: ParsedContainerObservation[];
}

/** The CONTAINER OBSERVATION group of a parsed OML^O39 (HL7 v2.7.1) message. */
export interface ParsedContainerObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** Structured result of parsing an HL7 OML^O39 (HL7 v2.7.1) message. */
export interface ParsedOML_O39 extends ParsedMessageBase {
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

/** The segment parsers of OML^O39 (HL7 v2.7.1). */
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
  TCD: (s, e) => TCD.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  SHP: (s, e) => SHP.parse(s, e),
  PAC: (s, e) => PAC.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  FT1: (s, e) => FT1.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  BLG: (s, e) => BLG.parse(s, e),
};

/** Parser for HL7 OML^O39 (HL7 v2.7.1) messages. */
export class OML_O39_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OML_O39";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OML_O39_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOML_O39> {
    return parseStructure<ParsedOML_O39>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OML^O39 (HL7 v2.7.1) message string into a structured result. */
export function parseOML_O39(messageString: string): Result<ParsedOML_O39> {
  return new OML_O39_Parser().parse(messageString);
}

/** The PATIENT group of an OML^O39 (HL7 v2.7.1) message being built. */
export interface PatientGroup {
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
  patientVisit?: PatientVisitGroup;
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The GT1 segment. */
  guarantor?: GT1;
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** The PATIENT VISIT group of an OML^O39 (HL7 v2.7.1) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The INSURANCE group of an OML^O39 (HL7 v2.7.1) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER group of an OML^O39 (HL7 v2.7.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The OBSERVATION REQUEST group. */
  observationRequest?: ObservationRequestGroup;
  /** The FT1 segments. */
  transactions?: FT1[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
  /** The BLG segment. */
  billing?: BLG;
}

/** The TIMING group of an OML^O39 (HL7 v2.7.1) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION REQUEST group of an OML^O39 (HL7 v2.7.1) message being built. */
export interface ObservationRequestGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The CTD segment. */
  contact?: CTD;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The SPECIMEN SHIPMENT groups. */
  specimenShipments?: SpecimenShipmentGroup[];
}

/** The OBSERVATION group of an OML^O39 (HL7 v2.7.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The SPECIMEN SHIPMENT group of an OML^O39 (HL7 v2.7.1) message being built. */
export interface SpecimenShipmentGroup {
  /** The SHP segment. */
  shp: SHP;
  /** The SHIPMENT OBSERVATION groups. */
  shipmentObservations?: ShipmentObservationGroup[];
  /** The PACKAGE groups. */
  packages: PackageGroup[];
}

/** The SHIPMENT OBSERVATION group of an OML^O39 (HL7 v2.7.1) message being built. */
export interface ShipmentObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PACKAGE group of an OML^O39 (HL7 v2.7.1) message being built. */
export interface PackageGroup {
  /** The PAC segment. */
  pac: PAC;
  /** The SPECIMEN IN PACKAGE groups. */
  specimenInPackages?: SpecimenInPackageGroup[];
}

/** The SPECIMEN IN PACKAGE group of an OML^O39 (HL7 v2.7.1) message being built. */
export interface SpecimenInPackageGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: SpecimenObservationGroup[];
  /** The SPECIMEN CONTAINER IN PACKAGE groups. */
  specimenContainerInPackages?: SpecimenContainerInPackageGroup[];
}

/** The SPECIMEN OBSERVATION group of an OML^O39 (HL7 v2.7.1) message being built. */
export interface SpecimenObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The SPECIMEN CONTAINER IN PACKAGE group of an OML^O39 (HL7 v2.7.1) message being built. */
export interface SpecimenContainerInPackageGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The CONTAINER OBSERVATION groups. */
  containerObservations?: ContainerObservationGroup[];
}

/** The CONTAINER OBSERVATION group of an OML^O39 (HL7 v2.7.1) message being built. */
export interface ContainerObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The optional segments and groups of an OML^O39 (HL7 v2.7.1) message. */
export interface OML_O39Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: PatientGroup;
}

/** Builder for HL7 OML^O39 (HL7 v2.7.1) messages. */
export class OML_O39<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OML_O39";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OML_O39_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: OrderGroup[],
    public options: OML_O39Options = {},
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

/** Builds an HL7 OML^O39 (HL7 v2.7.1) message. */
export function createOML_O39<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: OML_O39Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OML_O39<TMSH> {
  return new OML_O39(header, orders, options, encoding);
}
