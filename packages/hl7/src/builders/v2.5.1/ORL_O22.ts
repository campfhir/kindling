/**
 * Builder for ORL^O22 messages (HL7 v2.5.1).
 *
 * Structure: MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID { GENERAL_ORDER: [ CONTAINER: SAC [{OBX}] ] [{ ORDER: ORC [ OBSERVATION_REQUEST: OBR [{SAC}] ] }] } ] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ORL_O22_STRUCTURE } from "../../structures/v2.5.1/ORL_O22.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { MSA } from "../../segments/v2.5.1/MSA.ts";
import type { ERR } from "../../segments/v2.5.1/ERR.ts";
import type { NTE } from "../../segments/v2.5.1/NTE.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import type { SAC } from "../../segments/v2.5.1/SAC.ts";
import type { OBX } from "../../segments/v2.5.1/OBX.ts";
import type { ORC } from "../../segments/v2.5.1/ORC.ts";
import type { OBR } from "../../segments/v2.5.1/OBR.ts";

/** The RESPONSE group of an ORL^O22 (HL7 v2.5.1) message being built. */
export interface ResponseGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
}

/** The PATIENT group of an ORL^O22 (HL7 v2.5.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The GENERAL ORDER groups. */
  generalOrders: GeneralOrderGroup[];
}

/** The GENERAL ORDER group of an ORL^O22 (HL7 v2.5.1) message being built. */
export interface GeneralOrderGroup {
  /** The CONTAINER group. */
  container?: ContainerGroup;
  /** The ORDER groups. */
  orders?: OrderGroup[];
}

/** The CONTAINER group of an ORL^O22 (HL7 v2.5.1) message being built. */
export interface ContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The OBX segments. */
  observations?: OBX[];
}

/** The ORDER group of an ORL^O22 (HL7 v2.5.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The OBSERVATION REQUEST group. */
  observationRequest?: ObservationRequestGroup;
}

/** The OBSERVATION REQUEST group of an ORL^O22 (HL7 v2.5.1) message being built. */
export interface ObservationRequestGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The SAC segments. */
  specimenContainers?: SAC[];
}

/** The optional segments and groups of an ORL^O22 (HL7 v2.5.1) message. */
export interface ORL_O22Options {
  /** The ERR segment. */
  error?: ERR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ResponseGroup;
}

/** Builder for HL7 ORL^O22 (HL7 v2.5.1) messages. */
export class ORL_O22<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORL_O22";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORL_O22_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: ORL_O22Options = {},
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

/** Builds an HL7 ORL^O22 (HL7 v2.5.1) message. */
export function createORL_O22<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: ORL_O22Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORL_O22<TMSH, TMSA> {
  return new ORL_O22(header, acknowledgment, options, encoding);
}
