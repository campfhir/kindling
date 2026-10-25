/**
 * Builder for ORM^O01 messages (HL7 v2.3.1).
 *
 * Structure: MSH [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [{IN3}] }] [GT1] [{AL1}] ] { ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{DG1}] [{ OBSERVATION: OBX [{NTE}] }] ] [{CTI}] [BLG] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ORM_O01_STRUCTURE } from "../../structures/v2.3.1/ORM_O01.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { NTE } from "../../segments/v2.3.1/NTE.ts";
import type { PID } from "../../segments/v2.3.1/PID.ts";
import type { PD1 } from "../../segments/v2.3.1/PD1.ts";
import type { PV1 } from "../../segments/v2.3.1/PV1.ts";
import type { PV2 } from "../../segments/v2.3.1/PV2.ts";
import type { IN1 } from "../../segments/v2.3.1/IN1.ts";
import type { IN2 } from "../../segments/v2.3.1/IN2.ts";
import type { IN3 } from "../../segments/v2.3.1/IN3.ts";
import type { GT1 } from "../../segments/v2.3.1/GT1.ts";
import type { AL1 } from "../../segments/v2.3.1/AL1.ts";
import type { ORC } from "../../segments/v2.3.1/ORC.ts";
import type { OBR } from "../../segments/v2.3.1/OBR.ts";
import type { RQD } from "../../segments/v2.3.1/RQD.ts";
import type { RQ1 } from "../../segments/v2.3.1/RQ1.ts";
import type { RXO } from "../../segments/v2.3.1/RXO.ts";
import type { ODS } from "../../segments/v2.3.1/ODS.ts";
import type { ODT } from "../../segments/v2.3.1/ODT.ts";
import type { DG1 } from "../../segments/v2.3.1/DG1.ts";
import type { OBX } from "../../segments/v2.3.1/OBX.ts";
import type { CTI } from "../../segments/v2.3.1/CTI.ts";
import type { BLG } from "../../segments/v2.3.1/BLG.ts";

/** The INSURANCE group of an ORM^O01 (HL7 v2.3.1) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segments. */
  insuranceCertifications?: IN3[];
}

/** The ORDER group of an ORM^O01 (HL7 v2.3.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  detail?: OrderDetailGroup;
  /** The CTI segments. */
  clinicalTrials?: CTI[];
  /** The BLG segment. */
  billing?: BLG;
}

/** The ORDER DETAIL group of an ORM^O01 (HL7 v2.3.1) message being built. */
export interface OrderDetailGroup {
  /** One of OBR, RQD, RQ1, RXO, ODS, ODT. */
  segment: OBR | RQD | RQ1 | RXO | ODS | ODT;
  /** The NTE segments. */
  notes?: NTE[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
}

/** The OBSERVATION group of an ORM^O01 (HL7 v2.3.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an ORM^O01 (HL7 v2.3.1) message. */
export interface ORM_O01Options {
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The GT1 segment. */
  guarantor?: GT1;
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** Builder for HL7 ORM^O01 (HL7 v2.3.1) messages. */
export class ORM_O01<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORM_O01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORM_O01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: OrderGroup[],
    public options: ORM_O01Options = {},
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

/** Builds an HL7 ORM^O01 (HL7 v2.3.1) message. */
export function createORM_O01<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: ORM_O01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORM_O01<TMSH> {
  return new ORM_O01(header, orders, options, encoding);
}
