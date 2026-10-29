/**
 * Builder for ORL^O34 messages (HL7 v2.7).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: PID [{PRT}] { SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{SAC}] [{ ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [ OBSERVATION_REQUEST: OBR [{PRT}] ] }] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ORL_O34_STRUCTURE } from "../../structures/v2.7/ORL_O34.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { MSA } from "../../segments/v2.7/MSA.ts";
import type { ERR } from "../../segments/v2.7/ERR.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { NTE } from "../../segments/v2.7/NTE.ts";
import type { PID } from "../../segments/v2.7/PID.ts";
import type { PRT } from "../../segments/v2.7/PRT.ts";
import type { SPM } from "../../segments/v2.7/SPM.ts";
import type { OBX } from "../../segments/v2.7/OBX.ts";
import type { SAC } from "../../segments/v2.7/SAC.ts";
import type { ORC } from "../../segments/v2.7/ORC.ts";
import type { TQ1 } from "../../segments/v2.7/TQ1.ts";
import type { TQ2 } from "../../segments/v2.7/TQ2.ts";
import type { OBR } from "../../segments/v2.7/OBR.ts";

/** The RESPONSE group of an ORL^O34 (HL7 v2.7) message being built. */
export interface ResponseGroup {
  /** The PID segment. */
  patient: PID;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The SPECIMEN groups. */
  specimens: SpecimenGroup[];
}

/** The SPECIMEN group of an ORL^O34 (HL7 v2.7) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: SpecimenObservationGroup[];
  /** The SAC segments. */
  specimenContainers?: SAC[];
  /** The ORDER groups. */
  orders?: OrderGroup[];
}

/** The SPECIMEN OBSERVATION group of an ORL^O34 (HL7 v2.7) message being built. */
export interface SpecimenObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER group of an ORL^O34 (HL7 v2.7) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The OBSERVATION REQUEST group. */
  observationRequest?: ObservationRequestGroup;
}

/** The TIMING group of an ORL^O34 (HL7 v2.7) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION REQUEST group of an ORL^O34 (HL7 v2.7) message being built. */
export interface ObservationRequestGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The optional segments and groups of an ORL^O34 (HL7 v2.7) message. */
export interface ORL_O34Options {
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

/** Builder for HL7 ORL^O34 (HL7 v2.7) messages. */
export class ORL_O34<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORL_O34";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORL_O34_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: ORL_O34Options = {},
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

/** Builds an HL7 ORL^O34 (HL7 v2.7) message. */
export function createORL_O34<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: ORL_O34Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORL_O34<TMSH, TMSA> {
  return new ORL_O34(header, acknowledgment, options, encoding);
}
