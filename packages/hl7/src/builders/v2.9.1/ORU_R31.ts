/**
 * Builder for ORU^R31 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{OH1}] [{OH2}] [OH3] [{OH4}] [{ARV}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [ VISIT: PV1 [PV2] [{PRT}] ] ORC [{PRT}] OBR [{NTE}] [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { OBSERVATION: OBX [{PRT}] [{NTE}] } [{ DEVICE: DEV [{OBX}] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ORU_R31_STRUCTURE } from "../../structures/v2.9.1/ORU_R31.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { ARV } from "../../segments/v2.9.1/ARV.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
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
import type { OBX } from "../../segments/v2.9.1/OBX.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import type { PV2 } from "../../segments/v2.9.1/PV2.ts";
import type { ORC } from "../../segments/v2.9.1/ORC.ts";
import type { OBR } from "../../segments/v2.9.1/OBR.ts";
import type { NTE } from "../../segments/v2.9.1/NTE.ts";
import type { TQ1 } from "../../segments/v2.9.1/TQ1.ts";
import type { TQ2 } from "../../segments/v2.9.1/TQ2.ts";
import type { DEV } from "../../segments/v2.9.1/DEV.ts";

/** The PATIENT OBSERVATION group of an ORU^R31 (HL7 v2.9.1) message being built. */
export interface PatientObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The VISIT group of an ORU^R31 (HL7 v2.9.1) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The TIMING QTY group of an ORU^R31 (HL7 v2.9.1) message being built. */
export interface TimingQtyGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an ORU^R31 (HL7 v2.9.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DEVICE group of an ORU^R31 (HL7 v2.9.1) message being built. */
export interface DeviceGroup {
  /** The DEV segment. */
  dev: DEV;
  /** The OBX segments. */
  observations?: OBX[];
}

/** The optional segments and groups of an ORU^R31 (HL7 v2.9.1) message. */
export interface ORU_R31Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
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
  arv2?: ARV[];
  /** The PATIENT OBSERVATION groups. */
  patientObservations?: PatientObservationGroup[];
  /** The VISIT group. */
  visit?: VisitGroup;
  /** The PRT segments. */
  prt2?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prt3?: PRT[];
  /** The TIMING QTY groups. */
  timingQtys?: TimingQtyGroup[];
  /** The DEVICE groups. */
  devices?: DeviceGroup[];
}

/** Builder for HL7 ORU^R31 (HL7 v2.9.1) messages. */
export class ORU_R31<TMSH extends MSH = MSH, TPID extends PID = PID, TORC extends ORC = ORC, TOBR extends OBR = OBR> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORU_R31";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORU_R31_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public patient: TPID,
    public commonOrder: TORC,
    public observationRequest: TOBR,
    public observations: ObservationGroup[],
    public options: ORU_R31Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, patient: this.patient, commonOrder: this.commonOrder, observationRequest: this.observationRequest, observations: this.observations };
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

/** Builds an HL7 ORU^R31 (HL7 v2.9.1) message. */
export function createORU_R31<TMSH extends MSH = MSH, TPID extends PID = PID, TORC extends ORC = ORC, TOBR extends OBR = OBR>(
  header: TMSH,
  patient: TPID,
  commonOrder: TORC,
  observationRequest: TOBR,
  observations: ObservationGroup[],
  options: ORU_R31Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORU_R31<TMSH, TPID, TORC, TOBR> {
  return new ORU_R31(header, patient, commonOrder, observationRequest, observations, options, encoding);
}
