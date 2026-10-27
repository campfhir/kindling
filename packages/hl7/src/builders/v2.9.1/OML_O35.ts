/**
 * Builder for OML^O35 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [ OCCUPATIONAL_DATA_FOR_HEALTH: [{OH1}] [{OH2}] [OH3] [{OH4}] ] [{NTE}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] [{OH2}] [OH3] }] [{ARV}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { SPECIMEN: SPM [{NTE}] [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] { SPECIMEN_CONTAINER: SAC [{NTE}] { ORDER: ORC [{NTE}] [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [ OBSERVATION_REQUEST: OBR [TCD] [{NTE}] [{PRT}] [{DG1}] [{REL}] [{ OBSERVATION: OBX [{PRT}] [TCD] [{NTE}] }] [IPC] [SGH] [{ PRIOR_RESULT: [ PATIENT_PRIOR: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ARV}] ] [ PATIENT_VISIT_PRIOR: PV1 [PV2] [{PRT}] ] [{AL1}] { ORDER_PRIOR: ORC [{PRT}] OBR [{NTE}] [{ OBSERVATION_PARTICIPATION: PRT [{DEV}] }] [{ TIMING_PRIOR: TQ1 [{TQ2}] }] { OBSERVATION_PRIOR: OBX [{PRT}] [{NTE}] } } }] [SGT] ] [{FT1}] [{CTI}] [BLG] } } } [{ DEVICE: DEV [{OBX}] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { OML_O35_STRUCTURE } from "../../structures/v2.9.1/OML_O35.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { ARV } from "../../segments/v2.9.1/ARV.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { NTE } from "../../segments/v2.9.1/NTE.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PD1 } from "../../segments/v2.9.1/PD1.ts";
import type { GSP } from "../../segments/v2.9.1/GSP.ts";
import type { GSR } from "../../segments/v2.9.1/GSR.ts";
import type { GSC } from "../../segments/v2.9.1/GSC.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { OH1 } from "../../segments/v2.9.1/OH1.ts";
import type { OH2 } from "../../segments/v2.9.1/OH2.ts";
import type { OH3 } from "../../segments/v2.9.1/OH3.ts";
import type { OH4 } from "../../segments/v2.9.1/OH4.ts";
import type { NK1 } from "../../segments/v2.9.1/NK1.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import type { PV2 } from "../../segments/v2.9.1/PV2.ts";
import type { IN1 } from "../../segments/v2.9.1/IN1.ts";
import type { IN2 } from "../../segments/v2.9.1/IN2.ts";
import type { IN3 } from "../../segments/v2.9.1/IN3.ts";
import type { GT1 } from "../../segments/v2.9.1/GT1.ts";
import type { AL1 } from "../../segments/v2.9.1/AL1.ts";
import type { SPM } from "../../segments/v2.9.1/SPM.ts";
import type { OBX } from "../../segments/v2.9.1/OBX.ts";
import type { SAC } from "../../segments/v2.9.1/SAC.ts";
import type { ORC } from "../../segments/v2.9.1/ORC.ts";
import type { TQ1 } from "../../segments/v2.9.1/TQ1.ts";
import type { TQ2 } from "../../segments/v2.9.1/TQ2.ts";
import type { OBR } from "../../segments/v2.9.1/OBR.ts";
import type { TCD } from "../../segments/v2.9.1/TCD.ts";
import type { DG1 } from "../../segments/v2.9.1/DG1.ts";
import type { REL } from "../../segments/v2.9.1/REL.ts";
import type { IPC } from "../../segments/v2.9.1/IPC.ts";
import type { SGH } from "../../segments/v2.9.1/SGH.ts";
import type { DEV } from "../../segments/v2.9.1/DEV.ts";
import type { SGT } from "../../segments/v2.9.1/SGT.ts";
import type { FT1 } from "../../segments/v2.9.1/FT1.ts";
import type { CTI } from "../../segments/v2.9.1/CTI.ts";
import type { BLG } from "../../segments/v2.9.1/BLG.ts";

/** The PATIENT group of an OML^O35 (HL7 v2.9.1) message being built. */
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
  /** The NTE segments. */
  notes?: NTE[];
  /** The NEXT OF KIN groups. */
  nextOfKins?: NextOfKinGroup[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The PATIENT VISIT group. */
  patientVisit?: PatientVisitGroup;
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The GT1 segment. */
  guarantor?: GT1;
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** The OCCUPATIONAL DATA FOR HEALTH group of an OML^O35 (HL7 v2.9.1) message being built. */
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

/** The NEXT OF KIN group of an OML^O35 (HL7 v2.9.1) message being built. */
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

/** The PATIENT VISIT group of an OML^O35 (HL7 v2.9.1) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The INSURANCE group of an OML^O35 (HL7 v2.9.1) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The SPECIMEN group of an OML^O35 (HL7 v2.9.1) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The NTE segments. */
  notes?: NTE[];
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: SpecimenObservationGroup[];
  /** The SPECIMEN CONTAINER groups. */
  specimenContainers: SpecimenContainerGroup[];
}

/** The SPECIMEN OBSERVATION group of an OML^O35 (HL7 v2.9.1) message being built. */
export interface SpecimenObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The SPECIMEN CONTAINER group of an OML^O35 (HL7 v2.9.1) message being built. */
export interface SpecimenContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The ORDER group of an OML^O35 (HL7 v2.9.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The NTE segments. */
  notes?: NTE[];
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

/** The TIMING group of an OML^O35 (HL7 v2.9.1) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION REQUEST group of an OML^O35 (HL7 v2.9.1) message being built. */
export interface ObservationRequestGroup {
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
  observations?: ObservationGroup[];
  /** The IPC segment. */
  imagingProcedureControl?: IPC;
  /** The SGH segment. */
  sgh?: SGH;
  /** The PRIOR RESULT groups. */
  priorResults?: PriorResultGroup[];
  /** The SGT segment. */
  sgt?: SGT;
}

/** The OBSERVATION group of an OML^O35 (HL7 v2.9.1) message being built. */
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

/** The PRIOR RESULT group of an OML^O35 (HL7 v2.9.1) message being built. */
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

/** The PATIENT PRIOR group of an OML^O35 (HL7 v2.9.1) message being built. */
export interface PatientPriorGroup {
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

/** The PATIENT VISIT PRIOR group of an OML^O35 (HL7 v2.9.1) message being built. */
export interface PatientVisitPriorGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER PRIOR group of an OML^O35 (HL7 v2.9.1) message being built. */
export interface OrderPriorGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBSERVATION PARTICIPATION groups. */
  observationParticipations?: ObservationParticipationGroup[];
  /** The TIMING PRIOR groups. */
  timingPriors?: TimingPriorGroup[];
  /** The OBSERVATION PRIOR groups. */
  observationPriors: ObservationPriorGroup[];
}

/** The OBSERVATION PARTICIPATION group of an OML^O35 (HL7 v2.9.1) message being built. */
export interface ObservationParticipationGroup {
  /** The PRT segment. */
  prt: PRT;
  /** The DEV segments. */
  devList?: DEV[];
}

/** The TIMING PRIOR group of an OML^O35 (HL7 v2.9.1) message being built. */
export interface TimingPriorGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION PRIOR group of an OML^O35 (HL7 v2.9.1) message being built. */
export interface ObservationPriorGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DEVICE group of an OML^O35 (HL7 v2.9.1) message being built. */
export interface DeviceGroup {
  /** The DEV segment. */
  dev: DEV;
  /** The OBX segments. */
  observations?: OBX[];
}

/** The optional segments and groups of an OML^O35 (HL7 v2.9.1) message. */
export interface OML_O35Options {
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

/** Builder for HL7 OML^O35 (HL7 v2.9.1) messages. */
export class OML_O35<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OML_O35";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OML_O35_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public specimens: SpecimenGroup[],
    public options: OML_O35Options = {},
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

/** Builds an HL7 OML^O35 (HL7 v2.9.1) message. */
export function createOML_O35<TMSH extends MSH = MSH>(
  header: TMSH,
  specimens: SpecimenGroup[],
  options: OML_O35Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OML_O35<TMSH> {
  return new OML_O35(header, specimens, options, encoding);
}
