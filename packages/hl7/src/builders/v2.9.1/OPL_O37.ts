/**
 * Builder for OPL^O37 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [{NTE}] {PRT} [ GUARANTOR: GT1 [{NTE}] ] { ORDER: {NK1} [ PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ARV}] [{ OBSERVATIONS_ON_PATIENT: OBX [{PRT}] }] [{ INSURANCE: IN1 [IN2] [IN3] }] [{AL1}] ] { SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{ CONTAINER: SAC [{ CONTAINER_OBSERVATION: OBX [{PRT}] }] }] { OBSERVATION_REQUEST: ORC [{PRT}] OBR [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [TCD] [{DG1}] [{ ORDER_RELATED_OBSERVATION: OBX [{PRT}] }] } } [SGH] [ PRIOR_RESULT: {NK1} [ PATIENT_PRIOR: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ARV}] ] [ PATIENT_VISIT_PRIOR: PV1 [PV2] [{PRT}] ] [AL1] { ORDER_PRIOR: OBR [ORC] [{ OBSERVATION_PARTICIPATION_PRIOR: PRT [{DEV}] }] [ TIMING: TQ1 [{TQ2}] ] { OBSERVATION_RESULT_GROUP: OBX [{PRT}] } } ] [SGT] [{FT1}] [{CTI}] [BLG] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { OPL_O37_STRUCTURE } from "../../structures/v2.9.1/OPL_O37.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { ARV } from "../../segments/v2.9.1/ARV.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { NTE } from "../../segments/v2.9.1/NTE.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { GT1 } from "../../segments/v2.9.1/GT1.ts";
import type { NK1 } from "../../segments/v2.9.1/NK1.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PD1 } from "../../segments/v2.9.1/PD1.ts";
import type { GSP } from "../../segments/v2.9.1/GSP.ts";
import type { GSR } from "../../segments/v2.9.1/GSR.ts";
import type { GSC } from "../../segments/v2.9.1/GSC.ts";
import type { OBX } from "../../segments/v2.9.1/OBX.ts";
import type { IN1 } from "../../segments/v2.9.1/IN1.ts";
import type { IN2 } from "../../segments/v2.9.1/IN2.ts";
import type { IN3 } from "../../segments/v2.9.1/IN3.ts";
import type { AL1 } from "../../segments/v2.9.1/AL1.ts";
import type { SPM } from "../../segments/v2.9.1/SPM.ts";
import type { SAC } from "../../segments/v2.9.1/SAC.ts";
import type { ORC } from "../../segments/v2.9.1/ORC.ts";
import type { OBR } from "../../segments/v2.9.1/OBR.ts";
import type { TQ1 } from "../../segments/v2.9.1/TQ1.ts";
import type { TQ2 } from "../../segments/v2.9.1/TQ2.ts";
import type { TCD } from "../../segments/v2.9.1/TCD.ts";
import type { DG1 } from "../../segments/v2.9.1/DG1.ts";
import type { SGH } from "../../segments/v2.9.1/SGH.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import type { PV2 } from "../../segments/v2.9.1/PV2.ts";
import type { DEV } from "../../segments/v2.9.1/DEV.ts";
import type { SGT } from "../../segments/v2.9.1/SGT.ts";
import type { FT1 } from "../../segments/v2.9.1/FT1.ts";
import type { CTI } from "../../segments/v2.9.1/CTI.ts";
import type { BLG } from "../../segments/v2.9.1/BLG.ts";

/** The GUARANTOR group of an OPL^O37 (HL7 v2.9.1) message being built. */
export interface GuarantorGroup {
  /** The GT1 segment. */
  guarantor: GT1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of an OPL^O37 (HL7 v2.9.1) message being built. */
export interface OrderGroup {
  /** The NK1 segments. */
  nextOfKin: NK1[];
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The SPECIMEN groups. */
  specimens: SpecimenGroup[];
  /** The SGH segment. */
  sgh?: SGH;
  /** The PRIOR RESULT group. */
  priorResult?: PriorResultGroup;
  /** The SGT segment. */
  sgt?: SGT;
  /** The FT1 segments. */
  transactions?: FT1[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
  /** The BLG segment. */
  billing?: BLG;
}

/** The PATIENT group of an OPL^O37 (HL7 v2.9.1) message being built. */
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
  /** The ARV segments. */
  arvList?: ARV[];
  /** The OBSERVATIONS ON PATIENT groups. */
  observationsOnPatients?: ObservationsOnPatientGroup[];
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** The OBSERVATIONS ON PATIENT group of an OPL^O37 (HL7 v2.9.1) message being built. */
export interface ObservationsOnPatientGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The INSURANCE group of an OPL^O37 (HL7 v2.9.1) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The SPECIMEN group of an OPL^O37 (HL7 v2.9.1) message being built. */
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

/** The SPECIMEN OBSERVATION group of an OPL^O37 (HL7 v2.9.1) message being built. */
export interface SpecimenObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The CONTAINER group of an OPL^O37 (HL7 v2.9.1) message being built. */
export interface ContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The CONTAINER OBSERVATION groups. */
  containerObservations?: ContainerObservationGroup[];
}

/** The CONTAINER OBSERVATION group of an OPL^O37 (HL7 v2.9.1) message being built. */
export interface ContainerObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The OBSERVATION REQUEST group of an OPL^O37 (HL7 v2.9.1) message being built. */
export interface ObservationRequestGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prt2?: PRT[];
  /** The TIMING groups. */
  timings?: Timing1Group[];
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The ORDER RELATED OBSERVATION groups. */
  orderRelatedObservations?: OrderRelatedObservationGroup[];
}

/** The TIMING group of an OPL^O37 (HL7 v2.9.1) message being built. */
export interface Timing1Group {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER RELATED OBSERVATION group of an OPL^O37 (HL7 v2.9.1) message being built. */
export interface OrderRelatedObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PRIOR RESULT group of an OPL^O37 (HL7 v2.9.1) message being built. */
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

/** The PATIENT PRIOR group of an OPL^O37 (HL7 v2.9.1) message being built. */
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

/** The PATIENT VISIT PRIOR group of an OPL^O37 (HL7 v2.9.1) message being built. */
export interface PatientVisitPriorGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER PRIOR group of an OPL^O37 (HL7 v2.9.1) message being built. */
export interface OrderPriorGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBSERVATION PARTICIPATION PRIOR groups. */
  observationParticipationPriors?: ObservationParticipationPriorGroup[];
  /** The TIMING group. */
  timing?: Timing2Group;
  /** The OBSERVATION RESULT GROUP groups. */
  observationResultGroups: ObservationResultGroup[];
}

/** The OBSERVATION PARTICIPATION PRIOR group of an OPL^O37 (HL7 v2.9.1) message being built. */
export interface ObservationParticipationPriorGroup {
  /** The PRT segment. */
  prt: PRT;
  /** The DEV segments. */
  devList?: DEV[];
}

/** The TIMING group of an OPL^O37 (HL7 v2.9.1) message being built. */
export interface Timing2Group {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION RESULT GROUP group of an OPL^O37 (HL7 v2.9.1) message being built. */
export interface ObservationResultGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The optional segments and groups of an OPL^O37 (HL7 v2.9.1) message. */
export interface OPL_O37Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The GUARANTOR group. */
  guarantor?: GuarantorGroup;
}

/** Builder for HL7 OPL^O37 (HL7 v2.9.1) messages. */
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

/** Builds an HL7 OPL^O37 (HL7 v2.9.1) message. */
export function createOPL_O37<TMSH extends MSH = MSH>(
  header: TMSH,
  prtList: PRT[],
  orders: OrderGroup[],
  options: OPL_O37Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OPL_O37<TMSH> {
  return new OPL_O37(header, prtList, orders, options, encoding);
}
