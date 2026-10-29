/**
 * Builder, parser and structure for OPL^O37 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] [{NTE}] {PRT} [ GUARANTOR: GT1 [{NTE}] ] { ORDER: {NK1} [ PATIENT: PID [PD1] [{PRT}] [{ OBSERVATIONS_ON_PATIENT: OBX [{PRT}] }] [{ INSURANCE: IN1 [IN2] [IN3] }] [{AL1}] ] { SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{ CONTAINER: SAC [{ CONTAINER_OBSERVATION: OBX [{PRT}] }] }] { OBSERVATION_REQUEST: ORC OBR [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [TCD] [{DG1}] [{ ORDER_RELATED_OBSERVATION: OBX [{PRT}] }] } } [ PRIOR_RESULT: {NK1} [ PATIENT_PRIOR: PID [PD1] [{PRT}] ] [ PATIENT_VISIT_PRIOR: PV1 [PV2] [{PRT}] ] [AL1] { ORDER_PRIOR: OBR [ORC] [{PRT}] [ TIMING: TQ1 [{TQ2}] ] { OBSERVATION_RESULT_GROUP: OBX [{PRT}] } } ] [{FT1}] [{CTI}] [BLG] }
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
import { PRT } from "./PRT.ts";
import { GT1 } from "./GT1.ts";
import { NK1 } from "./NK1.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { OBX } from "./OBX.ts";
import { IN1 } from "./IN1.ts";
import { IN2 } from "./IN2.ts";
import { IN3 } from "./IN3.ts";
import { AL1 } from "./AL1.ts";
import { SPM } from "./SPM.ts";
import { SAC } from "./SAC.ts";
import { ORC } from "./ORC.ts";
import { OBR } from "./OBR.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { TCD } from "./TCD.ts";
import { DG1 } from "./DG1.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { FT1 } from "./FT1.ts";
import { CTI } from "./CTI.ts";
import { BLG } from "./BLG.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of OPL^O37 (HL7 v2.7), in order. */
export const OPL_O37_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "NTE", required: false, repeating: true },
  { name: "PRT", required: true, repeating: true },
  {
    name: "GUARANTOR",
    required: false,
    repeating: false,
    segments: [
      { name: "GT1", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
    ],
  },
  {
    name: "ORDER",
    required: true,
    repeating: true,
    segments: [
      { name: "NK1", required: true, repeating: true },
      {
        name: "PATIENT",
        required: false,
        repeating: false,
        segments: [
          { name: "PID", required: true, repeating: false },
          { name: "PD1", required: false, repeating: false },
          { name: "PRT", required: false, repeating: true },
          {
            name: "OBSERVATIONS_ON_PATIENT",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
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
          { name: "AL1", required: false, repeating: true },
        ],
      },
      {
        name: "SPECIMEN",
        required: true,
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
          {
            name: "OBSERVATION_REQUEST",
            required: true,
            repeating: true,
            segments: [
              { name: "ORC", required: true, repeating: false },
              { name: "OBR", required: true, repeating: false },
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
              { name: "TCD", required: false, repeating: false },
              { name: "DG1", required: false, repeating: true },
              {
                name: "ORDER_RELATED_OBSERVATION",
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
        name: "PRIOR_RESULT",
        required: false,
        repeating: false,
        segments: [
          { name: "NK1", required: true, repeating: true },
          {
            name: "PATIENT_PRIOR",
            required: false,
            repeating: false,
            segments: [
              { name: "PID", required: true, repeating: false },
              { name: "PD1", required: false, repeating: false },
              { name: "PRT", required: false, repeating: true },
            ],
          },
          {
            name: "PATIENT_VISIT_PRIOR",
            required: false,
            repeating: false,
            segments: [
              { name: "PV1", required: true, repeating: false },
              { name: "PV2", required: false, repeating: false },
              { name: "PRT", required: false, repeating: true },
            ],
          },
          { name: "AL1", required: false, repeating: false },
          {
            name: "ORDER_PRIOR",
            required: true,
            repeating: true,
            segments: [
              { name: "OBR", required: true, repeating: false },
              { name: "ORC", required: false, repeating: false },
              { name: "PRT", required: false, repeating: true },
              {
                name: "TIMING",
                required: false,
                repeating: false,
                segments: [
                  { name: "TQ1", required: true, repeating: false },
                  { name: "TQ2", required: false, repeating: true },
                ],
              },
              {
                name: "OBSERVATION_RESULT_GROUP",
                required: true,
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
      { name: "FT1", required: false, repeating: true },
      { name: "CTI", required: false, repeating: true },
      { name: "BLG", required: false, repeating: false },
    ],
  },
];

/** The GUARANTOR group of a parsed OPL^O37 (HL7 v2.7) message. */
export interface ParsedGuarantor {
  /** The GT1 segment. */
  guarantor: GT1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of a parsed OPL^O37 (HL7 v2.7) message. */
export interface ParsedOrder {
  /** The NK1 segments. */
  nextOfKin: NK1[];
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The SPECIMEN groups. */
  specimens: ParsedSpecimen[];
  /** The PRIOR RESULT group. */
  priorResult?: ParsedPriorResult;
  /** The FT1 segments. */
  transactions?: FT1[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
  /** The BLG segment. */
  billing?: BLG;
}

/** The PATIENT group of a parsed OPL^O37 (HL7 v2.7) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The OBSERVATIONS ON PATIENT groups. */
  observationsOnPatients?: ParsedObservationsOnPatient[];
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** The OBSERVATIONS ON PATIENT group of a parsed OPL^O37 (HL7 v2.7) message. */
export interface ParsedObservationsOnPatient {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The INSURANCE group of a parsed OPL^O37 (HL7 v2.7) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The SPECIMEN group of a parsed OPL^O37 (HL7 v2.7) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: ParsedSpecimenObservation[];
  /** The CONTAINER groups. */
  containers?: ParsedContainer[];
  /** The OBSERVATION REQUEST groups. */
  observationRequests: ParsedObservationRequest[];
}

/** The SPECIMEN OBSERVATION group of a parsed OPL^O37 (HL7 v2.7) message. */
export interface ParsedSpecimenObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The CONTAINER group of a parsed OPL^O37 (HL7 v2.7) message. */
export interface ParsedContainer {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The CONTAINER OBSERVATION groups. */
  containerObservations?: ParsedContainerObservation[];
}

/** The CONTAINER OBSERVATION group of a parsed OPL^O37 (HL7 v2.7) message. */
export interface ParsedContainerObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The OBSERVATION REQUEST group of a parsed OPL^O37 (HL7 v2.7) message. */
export interface ParsedObservationRequest {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: ParsedTiming1[];
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The ORDER RELATED OBSERVATION groups. */
  orderRelatedObservations?: ParsedOrderRelatedObservation[];
}

/** The TIMING group of a parsed OPL^O37 (HL7 v2.7) message. */
export interface ParsedTiming1 {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER RELATED OBSERVATION group of a parsed OPL^O37 (HL7 v2.7) message. */
export interface ParsedOrderRelatedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PRIOR RESULT group of a parsed OPL^O37 (HL7 v2.7) message. */
export interface ParsedPriorResult {
  /** The NK1 segments. */
  nextOfKin: NK1[];
  /** The PATIENT PRIOR group. */
  patientPrior?: ParsedPatientPrior;
  /** The PATIENT VISIT PRIOR group. */
  patientVisitPrior?: ParsedPatientVisitPrior;
  /** The AL1 segment. */
  allergy?: AL1;
  /** The ORDER PRIOR groups. */
  orderPriors: ParsedOrderPrior[];
}

/** The PATIENT PRIOR group of a parsed OPL^O37 (HL7 v2.7) message. */
export interface ParsedPatientPrior {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PATIENT VISIT PRIOR group of a parsed OPL^O37 (HL7 v2.7) message. */
export interface ParsedPatientVisitPrior {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER PRIOR group of a parsed OPL^O37 (HL7 v2.7) message. */
export interface ParsedOrderPrior {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING group. */
  timing?: ParsedTiming2;
  /** The OBSERVATION RESULT GROUP groups. */
  observationResultGroups: ParsedObservationResultGroup[];
}

/** The TIMING group of a parsed OPL^O37 (HL7 v2.7) message. */
export interface ParsedTiming2 {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION RESULT GROUP group of a parsed OPL^O37 (HL7 v2.7) message. */
export interface ParsedObservationResultGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** Structured result of parsing an HL7 OPL^O37 (HL7 v2.7) message. */
export interface ParsedOPL_O37 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prtList: PRT[];
  /** The GUARANTOR group. */
  guarantor?: ParsedGuarantor;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The segment parsers of OPL^O37 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  TCD: (s, e) => TCD.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  FT1: (s, e) => FT1.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  BLG: (s, e) => BLG.parse(s, e),
};

/** Parser for HL7 OPL^O37 (HL7 v2.7) messages. */
export class OPL_O37_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OPL_O37";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OPL_O37_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOPL_O37> {
    return parseStructure<ParsedOPL_O37>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OPL^O37 (HL7 v2.7) message string into a structured result. */
export function parseOPL_O37(messageString: string): Result<ParsedOPL_O37> {
  return new OPL_O37_Parser().parse(messageString);
}

/** The GUARANTOR group of an OPL^O37 (HL7 v2.7) message being built. */
export interface GuarantorGroup {
  /** The GT1 segment. */
  guarantor: GT1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of an OPL^O37 (HL7 v2.7) message being built. */
export interface OrderGroup {
  /** The NK1 segments. */
  nextOfKin: NK1[];
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The SPECIMEN groups. */
  specimens: SpecimenGroup[];
  /** The PRIOR RESULT group. */
  priorResult?: PriorResultGroup;
  /** The FT1 segments. */
  transactions?: FT1[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
  /** The BLG segment. */
  billing?: BLG;
}

/** The PATIENT group of an OPL^O37 (HL7 v2.7) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The OBSERVATIONS ON PATIENT groups. */
  observationsOnPatients?: ObservationsOnPatientGroup[];
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** The OBSERVATIONS ON PATIENT group of an OPL^O37 (HL7 v2.7) message being built. */
export interface ObservationsOnPatientGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The INSURANCE group of an OPL^O37 (HL7 v2.7) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The SPECIMEN group of an OPL^O37 (HL7 v2.7) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: SpecimenObservationGroup[];
  /** The CONTAINER groups. */
  containers?: ContainerGroup[];
  /** The OBSERVATION REQUEST groups. */
  observationRequests: ObservationRequestGroup[];
}

/** The SPECIMEN OBSERVATION group of an OPL^O37 (HL7 v2.7) message being built. */
export interface SpecimenObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The CONTAINER group of an OPL^O37 (HL7 v2.7) message being built. */
export interface ContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The CONTAINER OBSERVATION groups. */
  containerObservations?: ContainerObservationGroup[];
}

/** The CONTAINER OBSERVATION group of an OPL^O37 (HL7 v2.7) message being built. */
export interface ContainerObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The OBSERVATION REQUEST group of an OPL^O37 (HL7 v2.7) message being built. */
export interface ObservationRequestGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: Timing1Group[];
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The ORDER RELATED OBSERVATION groups. */
  orderRelatedObservations?: OrderRelatedObservationGroup[];
}

/** The TIMING group of an OPL^O37 (HL7 v2.7) message being built. */
export interface Timing1Group {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER RELATED OBSERVATION group of an OPL^O37 (HL7 v2.7) message being built. */
export interface OrderRelatedObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PRIOR RESULT group of an OPL^O37 (HL7 v2.7) message being built. */
export interface PriorResultGroup {
  /** The NK1 segments. */
  nextOfKin: NK1[];
  /** The PATIENT PRIOR group. */
  patientPrior?: PatientPriorGroup;
  /** The PATIENT VISIT PRIOR group. */
  patientVisitPrior?: PatientVisitPriorGroup;
  /** The AL1 segment. */
  allergy?: AL1;
  /** The ORDER PRIOR groups. */
  orderPriors: OrderPriorGroup[];
}

/** The PATIENT PRIOR group of an OPL^O37 (HL7 v2.7) message being built. */
export interface PatientPriorGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PATIENT VISIT PRIOR group of an OPL^O37 (HL7 v2.7) message being built. */
export interface PatientVisitPriorGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER PRIOR group of an OPL^O37 (HL7 v2.7) message being built. */
export interface OrderPriorGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING group. */
  timing?: Timing2Group;
  /** The OBSERVATION RESULT GROUP groups. */
  observationResultGroups: ObservationResultGroup[];
}

/** The TIMING group of an OPL^O37 (HL7 v2.7) message being built. */
export interface Timing2Group {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION RESULT GROUP group of an OPL^O37 (HL7 v2.7) message being built. */
export interface ObservationResultGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The optional segments and groups of an OPL^O37 (HL7 v2.7) message. */
export interface OPL_O37Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The GUARANTOR group. */
  guarantor?: GuarantorGroup;
}

/** Builder for HL7 OPL^O37 (HL7 v2.7) messages. */
export class OPL_O37<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OPL_O37";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OPL_O37_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public prtList: PRT[],
    public orders: OrderGroup[],
    public options: OPL_O37Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, prtList: this.prtList, orders: this.orders };
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

/** Builds an HL7 OPL^O37 (HL7 v2.7) message. */
export function createOPL_O37<TMSH extends MSH = MSH>(
  header: TMSH,
  prtList: PRT[],
  orders: OrderGroup[],
  options: OPL_O37Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OPL_O37<TMSH> {
  return new OPL_O37(header, prtList, orders, options, encoding);
}
