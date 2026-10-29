/**
 * Builder for OPL^O37 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] [{NTE}] {ROL} [ GUARANTOR: GT1 [{NTE}] ] { ORDER: {NK1} [ PATIENT: PID [PD1] [{OBX}] [{ INSURANCE: IN1 [IN2] [IN3] }] [{AL1}] ] { SPECIMEN: SPM [{OBX}] [{ CONTAINER: SAC [{OBX}] }] { OBSERVATION_REQUEST: ORC OBR [{ROL}] [{ TIMING: TQ1 [{TQ2}] }] [TCD] [{DG1}] [{OBX}] } } [ PRIOR_RESULT: {NK1} [ PATIENT_PRIOR: PID [PD1] ] [ PATIENT_VISIT_PRIOR: PV1 [PV2] ] [AL1] { ORDER_PRIOR: OBR [ORC] [{ROL}] [ TIMING: TQ1 [{TQ2}] ] {OBX} } ] [{FT1}] [{CTI}] [BLG] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { OPL_O37_STRUCTURE } from "../../structures/v2.6/OPL_O37.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { ROL } from "../../segments/v2.6/ROL.ts";
import type { GT1 } from "../../segments/v2.6/GT1.ts";
import type { NK1 } from "../../segments/v2.6/NK1.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { PD1 } from "../../segments/v2.6/PD1.ts";
import type { OBX } from "../../segments/v2.6/OBX.ts";
import type { IN1 } from "../../segments/v2.6/IN1.ts";
import type { IN2 } from "../../segments/v2.6/IN2.ts";
import type { IN3 } from "../../segments/v2.6/IN3.ts";
import type { AL1 } from "../../segments/v2.6/AL1.ts";
import type { SPM } from "../../segments/v2.6/SPM.ts";
import type { SAC } from "../../segments/v2.6/SAC.ts";
import type { ORC } from "../../segments/v2.6/ORC.ts";
import type { OBR } from "../../segments/v2.6/OBR.ts";
import type { TQ1 } from "../../segments/v2.6/TQ1.ts";
import type { TQ2 } from "../../segments/v2.6/TQ2.ts";
import type { TCD } from "../../segments/v2.6/TCD.ts";
import type { DG1 } from "../../segments/v2.6/DG1.ts";
import type { PV1 } from "../../segments/v2.6/PV1.ts";
import type { PV2 } from "../../segments/v2.6/PV2.ts";
import type { FT1 } from "../../segments/v2.6/FT1.ts";
import type { CTI } from "../../segments/v2.6/CTI.ts";
import type { BLG } from "../../segments/v2.6/BLG.ts";

/** The GUARANTOR group of an OPL^O37 (HL7 v2.6) message being built. */
export interface GuarantorGroup {
  /** The GT1 segment. */
  guarantor: GT1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of an OPL^O37 (HL7 v2.6) message being built. */
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

/** The PATIENT group of an OPL^O37 (HL7 v2.6) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The OBX segments. */
  observations?: OBX[];
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** The INSURANCE group of an OPL^O37 (HL7 v2.6) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The SPECIMEN group of an OPL^O37 (HL7 v2.6) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The OBX segments. */
  observations?: OBX[];
  /** The CONTAINER groups. */
  containers?: ContainerGroup[];
  /** The OBSERVATION REQUEST groups. */
  observationRequests: ObservationRequestGroup[];
}

/** The CONTAINER group of an OPL^O37 (HL7 v2.6) message being built. */
export interface ContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The OBX segments. */
  observations?: OBX[];
}

/** The OBSERVATION REQUEST group of an OPL^O37 (HL7 v2.6) message being built. */
export interface ObservationRequestGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The ROL segments. */
  roles?: ROL[];
  /** The TIMING groups. */
  timings?: Timing1Group[];
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The OBX segments. */
  observations?: OBX[];
}

/** The TIMING group of an OPL^O37 (HL7 v2.6) message being built. */
export interface Timing1Group {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The PRIOR RESULT group of an OPL^O37 (HL7 v2.6) message being built. */
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

/** The PATIENT PRIOR group of an OPL^O37 (HL7 v2.6) message being built. */
export interface PatientPriorGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
}

/** The PATIENT VISIT PRIOR group of an OPL^O37 (HL7 v2.6) message being built. */
export interface PatientVisitPriorGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The ORDER PRIOR group of an OPL^O37 (HL7 v2.6) message being built. */
export interface OrderPriorGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The ROL segments. */
  roles?: ROL[];
  /** The TIMING group. */
  timing?: Timing2Group;
  /** The OBX segments. */
  observations: OBX[];
}

/** The TIMING group of an OPL^O37 (HL7 v2.6) message being built. */
export interface Timing2Group {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The optional segments and groups of an OPL^O37 (HL7 v2.6) message. */
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

/** Builder for HL7 OPL^O37 (HL7 v2.6) messages. */
export class OPL_O37<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OPL_O37";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OPL_O37_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public roles: ROL[],
    public orders: OrderGroup[],
    public options: OPL_O37Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, roles: this.roles, orders: this.orders };
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

/** Builds an HL7 OPL^O37 (HL7 v2.6) message. */
export function createOPL_O37<TMSH extends MSH = MSH>(
  header: TMSH,
  roles: ROL[],
  orders: OrderGroup[],
  options: OPL_O37Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OPL_O37<TMSH> {
  return new OPL_O37(header, roles, orders, options, encoding);
}
