/**
 * Builder for OMP^O09 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { ORDER: ORC RXO [{NTE}] {RXR} [ COMPONENT: {RXC} [{NTE}] ] [{ OBSERVATION: OBX [{NTE}] }] [{FT1}] [BLG] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { OMP_O09_STRUCTURE } from "../../structures/v2.5.1/OMP_O09.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { NTE } from "../../segments/v2.5.1/NTE.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import type { PD1 } from "../../segments/v2.5.1/PD1.ts";
import type { PV1 } from "../../segments/v2.5.1/PV1.ts";
import type { PV2 } from "../../segments/v2.5.1/PV2.ts";
import type { IN1 } from "../../segments/v2.5.1/IN1.ts";
import type { IN2 } from "../../segments/v2.5.1/IN2.ts";
import type { IN3 } from "../../segments/v2.5.1/IN3.ts";
import type { GT1 } from "../../segments/v2.5.1/GT1.ts";
import type { AL1 } from "../../segments/v2.5.1/AL1.ts";
import type { ORC } from "../../segments/v2.5.1/ORC.ts";
import type { RXO } from "../../segments/v2.5.1/RXO.ts";
import type { RXR } from "../../segments/v2.5.1/RXR.ts";
import type { RXC } from "../../segments/v2.5.1/RXC.ts";
import type { OBX } from "../../segments/v2.5.1/OBX.ts";
import type { FT1 } from "../../segments/v2.5.1/FT1.ts";
import type { BLG } from "../../segments/v2.5.1/BLG.ts";

/** The PATIENT group of an OMP^O09 (HL7 v2.5.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT VISIT group. */
  patientVisit?: PatientVisitGroup;
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The GT1 segment. */
  guarantor?: GT1;
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** The PATIENT VISIT group of an OMP^O09 (HL7 v2.5.1) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The INSURANCE group of an OMP^O09 (HL7 v2.5.1) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER group of an OMP^O09 (HL7 v2.5.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The COMPONENT group. */
  component?: ComponentGroup;
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The FT1 segments. */
  transactions?: FT1[];
  /** The BLG segment. */
  billing?: BLG;
}

/** The COMPONENT group of an OMP^O09 (HL7 v2.5.1) message being built. */
export interface ComponentGroup {
  /** The RXC segments. */
  components: RXC[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The OBSERVATION group of an OMP^O09 (HL7 v2.5.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an OMP^O09 (HL7 v2.5.1) message. */
export interface OMP_O09Options {
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: PatientGroup;
}

/** Builder for HL7 OMP^O09 (HL7 v2.5.1) messages. */
export class OMP_O09<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OMP_O09";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OMP_O09_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: OrderGroup[],
    public options: OMP_O09Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, orders: this.orders };
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

/** Builds an HL7 OMP^O09 (HL7 v2.5.1) message. */
export function createOMP_O09<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: OMP_O09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OMP_O09<TMSH> {
  return new OMP_O09(header, orders, options, encoding);
}
