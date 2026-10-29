/**
 * Builder for OPU^R25 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] [NTE] PV1 [PV2] [{OBX}] [{NTE}] {ROL} { ACCESSION_DETAIL: {NK1} [ PATIENT: PID [PD1] [{ PATIENT_OBSERVATION: OBX [{NTE}] }] ] { SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{NTE}] }] [{ CONTAINER: SAC [INV] }] { ORDER: OBR [ORC] [{NTE}] [{ROL}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { RESULT: OBX [{NTE}] } } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { OPU_R25_STRUCTURE } from "../../structures/v2.6/OPU_R25.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { PV1 } from "../../segments/v2.6/PV1.ts";
import type { PV2 } from "../../segments/v2.6/PV2.ts";
import type { OBX } from "../../segments/v2.6/OBX.ts";
import type { ROL } from "../../segments/v2.6/ROL.ts";
import type { NK1 } from "../../segments/v2.6/NK1.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { PD1 } from "../../segments/v2.6/PD1.ts";
import type { SPM } from "../../segments/v2.6/SPM.ts";
import type { SAC } from "../../segments/v2.6/SAC.ts";
import type { INV } from "../../segments/v2.6/INV.ts";
import type { OBR } from "../../segments/v2.6/OBR.ts";
import type { ORC } from "../../segments/v2.6/ORC.ts";
import type { TQ1 } from "../../segments/v2.6/TQ1.ts";
import type { TQ2 } from "../../segments/v2.6/TQ2.ts";

/** The ACCESSION DETAIL group of an OPU^R25 (HL7 v2.6) message being built. */
export interface AccessionDetailGroup {
  /** The NK1 segments. */
  nextOfKin: NK1[];
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The SPECIMEN groups. */
  specimens: SpecimenGroup[];
}

/** The PATIENT group of an OPU^R25 (HL7 v2.6) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PATIENT OBSERVATION groups. */
  patientObservations?: PatientObservationGroup[];
}

/** The PATIENT OBSERVATION group of an OPU^R25 (HL7 v2.6) message being built. */
export interface PatientObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The SPECIMEN group of an OPU^R25 (HL7 v2.6) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: SpecimenObservationGroup[];
  /** The CONTAINER groups. */
  containers?: ContainerGroup[];
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The SPECIMEN OBSERVATION group of an OPU^R25 (HL7 v2.6) message being built. */
export interface SpecimenObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The CONTAINER group of an OPU^R25 (HL7 v2.6) message being built. */
export interface ContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The INV segment. */
  inventoryDetail?: INV;
}

/** The ORDER group of an OPU^R25 (HL7 v2.6) message being built. */
export interface OrderGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The TIMING QTY groups. */
  timingQtys?: TimingQtyGroup[];
  /** The RESULT groups. */
  results: ResultGroup[];
}

/** The TIMING QTY group of an OPU^R25 (HL7 v2.6) message being built. */
export interface TimingQtyGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The RESULT group of an OPU^R25 (HL7 v2.6) message being built. */
export interface ResultGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an OPU^R25 (HL7 v2.6) message. */
export interface OPU_R25Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segment. */
  note?: NTE;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The OBX segments. */
  observations?: OBX[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Builder for HL7 OPU^R25 (HL7 v2.6) messages. */
export class OPU_R25<TMSH extends MSH = MSH, TPV1 extends PV1 = PV1> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OPU_R25";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OPU_R25_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public visit: TPV1,
    public roles: ROL[],
    public accessionDetails: AccessionDetailGroup[],
    public options: OPU_R25Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, visit: this.visit, roles: this.roles, accessionDetails: this.accessionDetails };
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

/** Builds an HL7 OPU^R25 (HL7 v2.6) message. */
export function createOPU_R25<TMSH extends MSH = MSH, TPV1 extends PV1 = PV1>(
  header: TMSH,
  visit: TPV1,
  roles: ROL[],
  accessionDetails: AccessionDetailGroup[],
  options: OPU_R25Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OPU_R25<TMSH, TPV1> {
  return new OPU_R25(header, visit, roles, accessionDetails, options, encoding);
}
