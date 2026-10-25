/**
 * Builder for VXR^V03 messages (HL7 v2.3).
 *
 * Structure: MSH MSA QRD [QRF] PID [PD1] [{NK1}] [ PATIENT_VISIT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [{ ORDER: [ORC] RXA [RXR] [{ OBSERVATION: OBX [{NTE}] }] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { VXR_V03_STRUCTURE } from "../../structures/v2.3/VXR_V03.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { MSA } from "../../segments/v2.3/MSA.ts";
import type { QRD } from "../../segments/v2.3/QRD.ts";
import type { QRF } from "../../segments/v2.3/QRF.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { PD1 } from "../../segments/v2.3/PD1.ts";
import type { NK1 } from "../../segments/v2.3/NK1.ts";
import type { PV1 } from "../../segments/v2.3/PV1.ts";
import type { PV2 } from "../../segments/v2.3/PV2.ts";
import type { IN1 } from "../../segments/v2.3/IN1.ts";
import type { IN2 } from "../../segments/v2.3/IN2.ts";
import type { IN3 } from "../../segments/v2.3/IN3.ts";
import type { ORC } from "../../segments/v2.3/ORC.ts";
import type { RXA } from "../../segments/v2.3/RXA.ts";
import type { RXR } from "../../segments/v2.3/RXR.ts";
import type { OBX } from "../../segments/v2.3/OBX.ts";
import type { NTE } from "../../segments/v2.3/NTE.ts";

/** The INSURANCE group of an VXR^V03 (HL7 v2.3) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER group of an VXR^V03 (HL7 v2.3) message being built. */
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

/** The OBSERVATION group of an VXR^V03 (HL7 v2.3) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an VXR^V03 (HL7 v2.3) message. */
export interface VXR_V03Options {
  /** The QRF segment. */
  queryFilter?: QRF;
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

/** Builder for HL7 VXR^V03 (HL7 v2.3) messages. */
export class VXR_V03<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "VXR_V03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = VXR_V03_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public patient: TPID,
    public options: VXR_V03Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query, patient: this.patient };
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

/** Builds an HL7 VXR^V03 (HL7 v2.3) message. */
export function createVXR_V03<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TPID extends PID = PID>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  patient: TPID,
  options: VXR_V03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): VXR_V03<TMSH, TMSA, TQRD, TPID> {
  return new VXR_V03(header, acknowledgment, query, patient, options, encoding);
}
