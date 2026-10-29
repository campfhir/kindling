/**
 * Builder, parser and structure for OML^O33 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [{NK1}] [ PATIENT_VISIT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { SPECIMEN: SPM [{OBX}] [{SAC}] { ORDER: ORC [{ TIIMING: TQ1 [{TQ2}] }] [ OBSERVATION_REQUEST: OBR [TCD] [{NTE}] [{ROL}] [{DG1}] [{ OBSERVATION: OBX [TCD] [{NTE}] }] [{ PRIOR_RESULT: [ PATIENT_PRIOR: PID [PD1] ] [ PATIENT_VISIT_PRIOR: PV1 [PV2] ] [{AL1}] { ORDER_PRIOR: [ORC] OBR [{NTE}] [{ROL}] [{ TIMING_PRIOR: TQ1 [{TQ2}] }] { OBSERVATION_PRIOR: OBX [{NTE}] } } }] ] [{FT1}] [{CTI}] [BLG] } }
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
import { NK1 } from "./NK1.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { IN1 } from "./IN1.ts";
import { IN2 } from "./IN2.ts";
import { IN3 } from "./IN3.ts";
import { GT1 } from "./GT1.ts";
import { AL1 } from "./AL1.ts";
import { SPM } from "./SPM.ts";
import { OBX } from "./OBX.ts";
import { SAC } from "./SAC.ts";
import { ORC } from "./ORC.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { OBR } from "./OBR.ts";
import { TCD } from "./TCD.ts";
import { ROL } from "./ROL.ts";
import { DG1 } from "./DG1.ts";
import { FT1 } from "./FT1.ts";
import { CTI } from "./CTI.ts";
import { BLG } from "./BLG.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of OML^O33 (HL7 v2.6), in order. */
export const OML_O33_STRUCTURE: StructureItem[] = [
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
      { name: "NTE", required: false, repeating: true },
      { name: "NK1", required: false, repeating: true },
      {
        name: "PATIENT_VISIT",
        required: false,
        repeating: false,
        segments: [
          { name: "PV1", required: true, repeating: false },
          { name: "PV2", required: false, repeating: false },
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
    name: "SPECIMEN",
    required: true,
    repeating: true,
    segments: [
      { name: "SPM", required: true, repeating: false },
      { name: "OBX", required: false, repeating: true },
      { name: "SAC", required: false, repeating: true },
      {
        name: "ORDER",
        required: true,
        repeating: true,
        segments: [
          { name: "ORC", required: true, repeating: false },
          {
            name: "TIIMING",
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
              { name: "ROL", required: false, repeating: true },
              { name: "DG1", required: false, repeating: true },
              {
                name: "OBSERVATION",
                required: false,
                repeating: true,
                segments: [
                  { name: "OBX", required: true, repeating: false },
                  { name: "TCD", required: false, repeating: false },
                  { name: "NTE", required: false, repeating: true },
                ],
              },
              {
                name: "PRIOR_RESULT",
                required: false,
                repeating: true,
                segments: [
                  {
                    name: "PATIENT_PRIOR",
                    required: false,
                    repeating: false,
                    segments: [
                      { name: "PID", required: true, repeating: false },
                      { name: "PD1", required: false, repeating: false },
                    ],
                  },
                  {
                    name: "PATIENT_VISIT_PRIOR",
                    required: false,
                    repeating: false,
                    segments: [
                      { name: "PV1", required: true, repeating: false },
                      { name: "PV2", required: false, repeating: false },
                    ],
                  },
                  { name: "AL1", required: false, repeating: true },
                  {
                    name: "ORDER_PRIOR",
                    required: true,
                    repeating: true,
                    segments: [
                      { name: "ORC", required: false, repeating: false },
                      { name: "OBR", required: true, repeating: false },
                      { name: "NTE", required: false, repeating: true },
                      { name: "ROL", required: false, repeating: true },
                      {
                        name: "TIMING_PRIOR",
                        required: false,
                        repeating: true,
                        segments: [
                          { name: "TQ1", required: true, repeating: false },
                          { name: "TQ2", required: false, repeating: true },
                        ],
                      },
                      {
                        name: "OBSERVATION_PRIOR",
                        required: true,
                        repeating: true,
                        segments: [
                          { name: "OBX", required: true, repeating: false },
                          { name: "NTE", required: false, repeating: true },
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
    ],
  },
];

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

/** The PATIENT group of an OML^O33 (HL7 v2.6) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
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

/** The PATIENT VISIT group of an OML^O33 (HL7 v2.6) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The INSURANCE group of an OML^O33 (HL7 v2.6) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The SPECIMEN group of an OML^O33 (HL7 v2.6) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The OBX segments. */
  observations?: OBX[];
  /** The SAC segments. */
  specimenContainers?: SAC[];
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The ORDER group of an OML^O33 (HL7 v2.6) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIIMING groups. */
  tiimings?: TiimingGroup[];
  /** The OBSERVATION REQUEST group. */
  observationRequest?: ObservationRequestGroup;
  /** The FT1 segments. */
  transactions?: FT1[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
  /** The BLG segment. */
  billing?: BLG;
}

/** The TIIMING group of an OML^O33 (HL7 v2.6) message being built. */
export interface TiimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION REQUEST group of an OML^O33 (HL7 v2.6) message being built. */
export interface ObservationRequestGroup {
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
  observations?: ObservationGroup[];
  /** The PRIOR RESULT groups. */
  priorResults?: PriorResultGroup[];
}

/** The OBSERVATION group of an OML^O33 (HL7 v2.6) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PRIOR RESULT group of an OML^O33 (HL7 v2.6) message being built. */
export interface PriorResultGroup {
  /** The PATIENT PRIOR group. */
  patientPrior?: PatientPriorGroup;
  /** The PATIENT VISIT PRIOR group. */
  patientVisitPrior?: PatientVisitPriorGroup;
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The ORDER PRIOR groups. */
  orderPriors: OrderPriorGroup[];
}

/** The PATIENT PRIOR group of an OML^O33 (HL7 v2.6) message being built. */
export interface PatientPriorGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
}

/** The PATIENT VISIT PRIOR group of an OML^O33 (HL7 v2.6) message being built. */
export interface PatientVisitPriorGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The ORDER PRIOR group of an OML^O33 (HL7 v2.6) message being built. */
export interface OrderPriorGroup {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The TIMING PRIOR groups. */
  timingPriors?: TimingPriorGroup[];
  /** The OBSERVATION PRIOR groups. */
  observationPriors: ObservationPriorGroup[];
}

/** The TIMING PRIOR group of an OML^O33 (HL7 v2.6) message being built. */
export interface TimingPriorGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION PRIOR group of an OML^O33 (HL7 v2.6) message being built. */
export interface ObservationPriorGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an OML^O33 (HL7 v2.6) message. */
export interface OML_O33Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: PatientGroup;
}

/** Builder for HL7 OML^O33 (HL7 v2.6) messages. */
export class OML_O33<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OML_O33";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OML_O33_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public specimens: SpecimenGroup[],
    public options: OML_O33Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, specimens: this.specimens };
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

/** Builds an HL7 OML^O33 (HL7 v2.6) message. */
export function createOML_O33<TMSH extends MSH = MSH>(
  header: TMSH,
  specimens: SpecimenGroup[],
  options: OML_O33Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OML_O33<TMSH> {
  return new OML_O33(header, specimens, options, encoding);
}
