/**
 * Builder for OML^O35 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [{NK1}] [ PATIENT_VISIT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { SPECIMEN: SPM [{OBX}] { SPECIMEN_CONTAINER: SAC { ORDER: ORC [{ TIIMING: TQ1 [{TQ2}] }] [ OBSERVATION_REQUEST: OBR [TCD] [{NTE}] [{ROL}] [{DG1}] [{ OBSERVATION: OBX [TCD] [{NTE}] }] [{ PRIOR_RESULT: [ PATIENT_PRIOR: PID [PD1] ] [ PATIENT_VISIT_PRIOR: PV1 [PV2] ] [{AL1}] { ORDER_PRIOR: [ORC] OBR [{NTE}] [{ROL}] [{ TIMING_PRIOR: TQ1 [{TQ2}] }] { OBSERVATION_PRIOR: OBX [{NTE}] } } }] ] [{FT1}] [{CTI}] [BLG] } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { OML_O35_STRUCTURE } from "../../structures/v2.6/OML_O35.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { PD1 } from "../../segments/v2.6/PD1.ts";
import type { NK1 } from "../../segments/v2.6/NK1.ts";
import type { PV1 } from "../../segments/v2.6/PV1.ts";
import type { PV2 } from "../../segments/v2.6/PV2.ts";
import type { IN1 } from "../../segments/v2.6/IN1.ts";
import type { IN2 } from "../../segments/v2.6/IN2.ts";
import type { IN3 } from "../../segments/v2.6/IN3.ts";
import type { GT1 } from "../../segments/v2.6/GT1.ts";
import type { AL1 } from "../../segments/v2.6/AL1.ts";
import type { SPM } from "../../segments/v2.6/SPM.ts";
import type { OBX } from "../../segments/v2.6/OBX.ts";
import type { SAC } from "../../segments/v2.6/SAC.ts";
import type { ORC } from "../../segments/v2.6/ORC.ts";
import type { TQ1 } from "../../segments/v2.6/TQ1.ts";
import type { TQ2 } from "../../segments/v2.6/TQ2.ts";
import type { OBR } from "../../segments/v2.6/OBR.ts";
import type { TCD } from "../../segments/v2.6/TCD.ts";
import type { ROL } from "../../segments/v2.6/ROL.ts";
import type { DG1 } from "../../segments/v2.6/DG1.ts";
import type { FT1 } from "../../segments/v2.6/FT1.ts";
import type { CTI } from "../../segments/v2.6/CTI.ts";
import type { BLG } from "../../segments/v2.6/BLG.ts";

/** The PATIENT group of an OML^O35 (HL7 v2.6) message being built. */
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

/** The PATIENT VISIT group of an OML^O35 (HL7 v2.6) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The INSURANCE group of an OML^O35 (HL7 v2.6) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The SPECIMEN group of an OML^O35 (HL7 v2.6) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The OBX segments. */
  observations?: OBX[];
  /** The SPECIMEN CONTAINER groups. */
  specimenContainers: SpecimenContainerGroup[];
}

/** The SPECIMEN CONTAINER group of an OML^O35 (HL7 v2.6) message being built. */
export interface SpecimenContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The ORDER group of an OML^O35 (HL7 v2.6) message being built. */
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

/** The TIIMING group of an OML^O35 (HL7 v2.6) message being built. */
export interface TiimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION REQUEST group of an OML^O35 (HL7 v2.6) message being built. */
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

/** The OBSERVATION group of an OML^O35 (HL7 v2.6) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PRIOR RESULT group of an OML^O35 (HL7 v2.6) message being built. */
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

/** The PATIENT PRIOR group of an OML^O35 (HL7 v2.6) message being built. */
export interface PatientPriorGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
}

/** The PATIENT VISIT PRIOR group of an OML^O35 (HL7 v2.6) message being built. */
export interface PatientVisitPriorGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The ORDER PRIOR group of an OML^O35 (HL7 v2.6) message being built. */
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

/** The TIMING PRIOR group of an OML^O35 (HL7 v2.6) message being built. */
export interface TimingPriorGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION PRIOR group of an OML^O35 (HL7 v2.6) message being built. */
export interface ObservationPriorGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an OML^O35 (HL7 v2.6) message. */
export interface OML_O35Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: PatientGroup;
}

/** Builder for HL7 OML^O35 (HL7 v2.6) messages. */
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

/** Builds an HL7 OML^O35 (HL7 v2.6) message. */
export function createOML_O35<TMSH extends MSH = MSH>(
  header: TMSH,
  specimens: SpecimenGroup[],
  options: OML_O35Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OML_O35<TMSH> {
  return new OML_O35(header, specimens, options, encoding);
}
