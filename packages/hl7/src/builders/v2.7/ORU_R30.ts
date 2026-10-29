/**
 * Builder for ORU^R30 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] PID [PD1] [{PRT}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [ VISIT: PV1 [PV2] [{PRT}] ] ORC OBR [{NTE}] [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { OBSERVATION: OBX [{PRT}] [{NTE}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ORU_R30_STRUCTURE } from "../../structures/v2.7/ORU_R30.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { PID } from "../../segments/v2.7/PID.ts";
import type { PD1 } from "../../segments/v2.7/PD1.ts";
import type { PRT } from "../../segments/v2.7/PRT.ts";
import type { OBX } from "../../segments/v2.7/OBX.ts";
import type { PV1 } from "../../segments/v2.7/PV1.ts";
import type { PV2 } from "../../segments/v2.7/PV2.ts";
import type { ORC } from "../../segments/v2.7/ORC.ts";
import type { OBR } from "../../segments/v2.7/OBR.ts";
import type { NTE } from "../../segments/v2.7/NTE.ts";
import type { TQ1 } from "../../segments/v2.7/TQ1.ts";
import type { TQ2 } from "../../segments/v2.7/TQ2.ts";

/** The PATIENT OBSERVATION group of an ORU^R30 (HL7 v2.7) message being built. */
export interface PatientObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The VISIT group of an ORU^R30 (HL7 v2.7) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The TIMING QTY group of an ORU^R30 (HL7 v2.7) message being built. */
export interface TimingQtyGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an ORU^R30 (HL7 v2.7) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an ORU^R30 (HL7 v2.7) message. */
export interface ORU_R30Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The PATIENT OBSERVATION groups. */
  patientObservations?: PatientObservationGroup[];
  /** The VISIT group. */
  visit?: VisitGroup;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prt2?: PRT[];
  /** The TIMING QTY groups. */
  timingQtys?: TimingQtyGroup[];
}

/** Builder for HL7 ORU^R30 (HL7 v2.7) messages. */
export class ORU_R30<TMSH extends MSH = MSH, TPID extends PID = PID, TORC extends ORC = ORC, TOBR extends OBR = OBR> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORU_R30";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORU_R30_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public patient: TPID,
    public commonOrder: TORC,
    public observationRequest: TOBR,
    public observations: ObservationGroup[],
    public options: ORU_R30Options = {},
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

/** Builds an HL7 ORU^R30 (HL7 v2.7) message. */
export function createORU_R30<TMSH extends MSH = MSH, TPID extends PID = PID, TORC extends ORC = ORC, TOBR extends OBR = OBR>(
  header: TMSH,
  patient: TPID,
  commonOrder: TORC,
  observationRequest: TOBR,
  observations: ObservationGroup[],
  options: ORU_R30Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORU_R30<TMSH, TPID, TORC, TOBR> {
  return new ORU_R30(header, patient, commonOrder, observationRequest, observations, options, encoding);
}
