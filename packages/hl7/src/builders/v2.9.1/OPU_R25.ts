/**
 * Builder for OPU^R25 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [NTE] PV1 [PV2] [{PRT}] [{ PATIENT_VISIT_OBSERVATION: OBX [{NTE}] [{PRT}] }] { ACCESSION_DETAIL: { NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] } [ PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{OH1}] [{OH2}] [OH3] [{OH4}] [{ARV}] [{ PATIENT_OBSERVATION: OBX [{PRT}] [{NTE}] }] ] { SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] [{NTE}] }] [{ CONTAINER: SAC [INV] }] { ORDER: OBR [{PRT}] [ COMMON_ORDER: ORC [{PRT}] ] [{NTE}] [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { RESULT: OBX [{PRT}] [{NTE}] } } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { OPU_R25_STRUCTURE } from "../../structures/v2.9.1/OPU_R25.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { ARV } from "../../segments/v2.9.1/ARV.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { NTE } from "../../segments/v2.9.1/NTE.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import type { PV2 } from "../../segments/v2.9.1/PV2.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { OBX } from "../../segments/v2.9.1/OBX.ts";
import type { NK1 } from "../../segments/v2.9.1/NK1.ts";
import type { GSP } from "../../segments/v2.9.1/GSP.ts";
import type { GSR } from "../../segments/v2.9.1/GSR.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PD1 } from "../../segments/v2.9.1/PD1.ts";
import type { GSC } from "../../segments/v2.9.1/GSC.ts";
import type { OH1 } from "../../segments/v2.9.1/OH1.ts";
import type { OH2 } from "../../segments/v2.9.1/OH2.ts";
import type { OH3 } from "../../segments/v2.9.1/OH3.ts";
import type { OH4 } from "../../segments/v2.9.1/OH4.ts";
import type { SPM } from "../../segments/v2.9.1/SPM.ts";
import type { SAC } from "../../segments/v2.9.1/SAC.ts";
import type { INV } from "../../segments/v2.9.1/INV.ts";
import type { OBR } from "../../segments/v2.9.1/OBR.ts";
import type { ORC } from "../../segments/v2.9.1/ORC.ts";
import type { TQ1 } from "../../segments/v2.9.1/TQ1.ts";
import type { TQ2 } from "../../segments/v2.9.1/TQ2.ts";

/** The PATIENT VISIT OBSERVATION group of an OPU^R25 (HL7 v2.9.1) message being built. */
export interface PatientVisitObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ACCESSION DETAIL group of an OPU^R25 (HL7 v2.9.1) message being built. */
export interface AccessionDetailGroup {
  /** The NEXT OF KIN groups. */
  nextOfKins: NextOfKinGroup[];
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The SPECIMEN groups. */
  specimens: SpecimenGroup[];
}

/** The NEXT OF KIN group of an OPU^R25 (HL7 v2.9.1) message being built. */
export interface NextOfKinGroup {
  /** The NK1 segment. */
  nextOfKin: NK1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
}

/** The PATIENT group of an OPU^R25 (HL7 v2.9.1) message being built. */
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
  /** The PATIENT OBSERVATION groups. */
  patientObservations?: PatientObservationGroup[];
}

/** The PATIENT OBSERVATION group of an OPU^R25 (HL7 v2.9.1) message being built. */
export interface PatientObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The SPECIMEN group of an OPU^R25 (HL7 v2.9.1) message being built. */
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

/** The SPECIMEN OBSERVATION group of an OPU^R25 (HL7 v2.9.1) message being built. */
export interface SpecimenObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The CONTAINER group of an OPU^R25 (HL7 v2.9.1) message being built. */
export interface ContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The INV segment. */
  inventoryDetail?: INV;
}

/** The ORDER group of an OPU^R25 (HL7 v2.9.1) message being built. */
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
  /** The RESULT groups. */
  results: ResultGroup[];
}

/** The COMMON ORDER group of an OPU^R25 (HL7 v2.9.1) message being built. */
export interface CommonOrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The TIMING QTY group of an OPU^R25 (HL7 v2.9.1) message being built. */
export interface TimingQtyGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The RESULT group of an OPU^R25 (HL7 v2.9.1) message being built. */
export interface ResultGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an OPU^R25 (HL7 v2.9.1) message. */
export interface OPU_R25Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segment. */
  note?: NTE;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The PATIENT VISIT OBSERVATION groups. */
  patientVisitObservations?: PatientVisitObservationGroup[];
}

/** Builder for HL7 OPU^R25 (HL7 v2.9.1) messages. */
export class OPU_R25<TMSH extends MSH = MSH, TPV1 extends PV1 = PV1> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OPU_R25";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OPU_R25_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public visit: TPV1,
    public accessionDetails: AccessionDetailGroup[],
    public options: OPU_R25Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, visit: this.visit, accessionDetails: this.accessionDetails };
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

/** Builds an HL7 OPU^R25 (HL7 v2.9.1) message. */
export function createOPU_R25<TMSH extends MSH = MSH, TPV1 extends PV1 = PV1>(
  header: TMSH,
  visit: TPV1,
  accessionDetails: AccessionDetailGroup[],
  options: OPU_R25Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OPU_R25<TMSH, TPV1> {
  return new OPU_R25(header, visit, accessionDetails, options, encoding);
}
