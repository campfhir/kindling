/**
 * Builder for OPR^O38 messages (HL7 v2.9.1).
 *
 * Structure: MSH MSA [{ARV}] [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: { ORDER: {NK1} [ PATIENT: PID [{PRT}] [{ARV}] ] [{ SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{SAC}] [{ OBSERVATION_REQUEST: ORC [{PRT}] OBR [{PRT}] }] [{ TIMING: TQ1 [{TQ2}] }] }] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { OPR_O38_STRUCTURE } from "../../structures/v2.9.1/OPR_O38.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { MSA } from "../../segments/v2.9.1/MSA.ts";
import type { ARV } from "../../segments/v2.9.1/ARV.ts";
import type { ERR } from "../../segments/v2.9.1/ERR.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { NTE } from "../../segments/v2.9.1/NTE.ts";
import type { NK1 } from "../../segments/v2.9.1/NK1.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { SPM } from "../../segments/v2.9.1/SPM.ts";
import type { OBX } from "../../segments/v2.9.1/OBX.ts";
import type { SAC } from "../../segments/v2.9.1/SAC.ts";
import type { ORC } from "../../segments/v2.9.1/ORC.ts";
import type { OBR } from "../../segments/v2.9.1/OBR.ts";
import type { TQ1 } from "../../segments/v2.9.1/TQ1.ts";
import type { TQ2 } from "../../segments/v2.9.1/TQ2.ts";

/** The RESPONSE group of an OPR^O38 (HL7 v2.9.1) message being built. */
export interface ResponseGroup {
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The ORDER group of an OPR^O38 (HL7 v2.9.1) message being built. */
export interface OrderGroup {
  /** The NK1 segments. */
  nextOfKin: NK1[];
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The SPECIMEN groups. */
  specimens?: SpecimenGroup[];
}

/** The PATIENT group of an OPR^O38 (HL7 v2.9.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ARV segments. */
  arvList?: ARV[];
}

/** The SPECIMEN group of an OPR^O38 (HL7 v2.9.1) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: SpecimenObservationGroup[];
  /** The SAC segments. */
  specimenContainers?: SAC[];
  /** The OBSERVATION REQUEST groups. */
  observationRequests?: ObservationRequestGroup[];
  /** The TIMING groups. */
  timings?: TimingGroup[];
}

/** The SPECIMEN OBSERVATION group of an OPR^O38 (HL7 v2.9.1) message being built. */
export interface SpecimenObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The OBSERVATION REQUEST group of an OPR^O38 (HL7 v2.9.1) message being built. */
export interface ObservationRequestGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prt2?: PRT[];
}

/** The TIMING group of an OPR^O38 (HL7 v2.9.1) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The optional segments and groups of an OPR^O38 (HL7 v2.9.1) message. */
export interface OPR_O38Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ResponseGroup;
}

/** Builder for HL7 OPR^O38 (HL7 v2.9.1) messages. */
export class OPR_O38<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OPR_O38";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OPR_O38_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: OPR_O38Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment };
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

/** Builds an HL7 OPR^O38 (HL7 v2.9.1) message. */
export function createOPR_O38<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: OPR_O38Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OPR_O38<TMSH, TMSA> {
  return new OPR_O38(header, acknowledgment, options, encoding);
}
