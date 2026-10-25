/**
 * Builder for OUL^R21 messages (HL7 v2.4).
 *
 * Structure: MSH [NTE] [ PATIENT: PID [PD1] [{NTE}] ] [ VISIT: PV1 [PV2] ] { ORDER_OBSERVATION: [ CONTAINER: SAC [SID] [{OBX}] ] [ORC] OBR [{NTE}] { OBSERVATION: [OBX] [TCD] [{SID}] [{NTE}] } [{CTI}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { OUL_R21_STRUCTURE } from "../../structures/v2.4/OUL_R21.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { NTE } from "../../segments/v2.4/NTE.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { PD1 } from "../../segments/v2.4/PD1.ts";
import type { PV1 } from "../../segments/v2.4/PV1.ts";
import type { PV2 } from "../../segments/v2.4/PV2.ts";
import type { SAC } from "../../segments/v2.4/SAC.ts";
import type { SID } from "../../segments/v2.4/SID.ts";
import type { OBX } from "../../segments/v2.4/OBX.ts";
import type { ORC } from "../../segments/v2.4/ORC.ts";
import type { OBR } from "../../segments/v2.4/OBR.ts";
import type { TCD } from "../../segments/v2.4/TCD.ts";
import type { CTI } from "../../segments/v2.4/CTI.ts";
import type { DSC } from "../../segments/v2.4/DSC.ts";

/** The PATIENT group of an OUL^R21 (HL7 v2.4) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The VISIT group of an OUL^R21 (HL7 v2.4) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The ORDER OBSERVATION group of an OUL^R21 (HL7 v2.4) message being built. */
export interface OrderObservationGroup {
  /** The CONTAINER group. */
  container?: ContainerGroup;
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBSERVATION groups. */
  observations: ObservationGroup[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The CONTAINER group of an OUL^R21 (HL7 v2.4) message being built. */
export interface ContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The SID segment. */
  substanceIdentifier?: SID;
  /** The OBX segments. */
  observations?: OBX[];
}

/** The OBSERVATION group of an OUL^R21 (HL7 v2.4) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation?: OBX;
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The SID segments. */
  substanceIdentifiers?: SID[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an OUL^R21 (HL7 v2.4) message. */
export interface OUL_R21Options {
  /** The NTE segment. */
  note?: NTE;
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The VISIT group. */
  visit?: VisitGroup;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 OUL^R21 (HL7 v2.4) messages. */
export class OUL_R21<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OUL_R21";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OUL_R21_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orderObservations: OrderObservationGroup[],
    public options: OUL_R21Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, orderObservations: this.orderObservations };
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

/** Builds an HL7 OUL^R21 (HL7 v2.4) message. */
export function createOUL_R21<TMSH extends MSH = MSH>(
  header: TMSH,
  orderObservations: OrderObservationGroup[],
  options: OUL_R21Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OUL_R21<TMSH> {
  return new OUL_R21(header, orderObservations, options, encoding);
}
