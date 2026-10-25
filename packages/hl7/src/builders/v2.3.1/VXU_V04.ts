/**
 * Builder for VXU^V04 messages (HL7 v2.3.1).
 *
 * Structure: MSH PID [PD1] [{NK1}] [ PATIENT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [{ ORDER: [ORC] RXA [RXR] [{ OBSERVATION: OBX [{NTE}] }] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { VXU_V04_STRUCTURE } from "../../structures/v2.3.1/VXU_V04.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { PID } from "../../segments/v2.3.1/PID.ts";
import type { PD1 } from "../../segments/v2.3.1/PD1.ts";
import type { NK1 } from "../../segments/v2.3.1/NK1.ts";
import type { PV1 } from "../../segments/v2.3.1/PV1.ts";
import type { PV2 } from "../../segments/v2.3.1/PV2.ts";
import type { IN1 } from "../../segments/v2.3.1/IN1.ts";
import type { IN2 } from "../../segments/v2.3.1/IN2.ts";
import type { IN3 } from "../../segments/v2.3.1/IN3.ts";
import type { ORC } from "../../segments/v2.3.1/ORC.ts";
import type { RXA } from "../../segments/v2.3.1/RXA.ts";
import type { RXR } from "../../segments/v2.3.1/RXR.ts";
import type { OBX } from "../../segments/v2.3.1/OBX.ts";
import type { NTE } from "../../segments/v2.3.1/NTE.ts";

/** The INSURANCE group of an VXU^V04 (HL7 v2.3.1) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER group of an VXU^V04 (HL7 v2.3.1) message being built. */
export interface VaccinationGroup {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segment. */
  route?: RXR;
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
}

/** The OBSERVATION group of an VXU^V04 (HL7 v2.3.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an VXU^V04 (HL7 v2.3.1) message. */
export interface VXU_V04Options {
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The ORDER groups. */
  orders?: VaccinationGroup[];
}

/** Builder for HL7 VXU^V04 (HL7 v2.3.1) messages. */
export class VXU_V04<TMSH extends MSH = MSH, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "VXU_V04";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = VXU_V04_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public patient: TPID,
    public options: VXU_V04Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, patient: this.patient };
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

/** Builds an HL7 VXU^V04 (HL7 v2.3.1) message. */
export function createVXU_V04<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  patient: TPID,
  options: VXU_V04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): VXU_V04<TMSH, TPID> {
  return new VXU_V04(header, patient, options, encoding);
}
