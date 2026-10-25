/**
 * Builder for OMD^O03 messages (HL7 v2.4).
 *
 * Structure: MSH [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { ORDER_DIET: ORC [ DIET: {ODS} [{NTE}] [{ OBSERVATION: OBX [{NTE}] }] ] } [{ ORDER_TRAY: ORC {ODT} [{NTE}] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { OMD_O03_STRUCTURE } from "../../structures/v2.4/OMD_O03.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { NTE } from "../../segments/v2.4/NTE.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { PD1 } from "../../segments/v2.4/PD1.ts";
import type { PV1 } from "../../segments/v2.4/PV1.ts";
import type { PV2 } from "../../segments/v2.4/PV2.ts";
import type { IN1 } from "../../segments/v2.4/IN1.ts";
import type { IN2 } from "../../segments/v2.4/IN2.ts";
import type { IN3 } from "../../segments/v2.4/IN3.ts";
import type { GT1 } from "../../segments/v2.4/GT1.ts";
import type { AL1 } from "../../segments/v2.4/AL1.ts";
import type { ORC } from "../../segments/v2.4/ORC.ts";
import type { ODS } from "../../segments/v2.4/ODS.ts";
import type { OBX } from "../../segments/v2.4/OBX.ts";
import type { ODT } from "../../segments/v2.4/ODT.ts";

/** The INSURANCE group of an OMD^O03 (HL7 v2.4) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER DIET group of an OMD^O03 (HL7 v2.4) message being built. */
export interface DietOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ODS segments. */
  diets?: ODS[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
}

/** The OBSERVATION group of an OMD^O03 (HL7 v2.4) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER TRAY group of an OMD^O03 (HL7 v2.4) message being built. */
export interface TrayOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ODT segments. */
  dietTrays: ODT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an OMD^O03 (HL7 v2.4) message. */
export interface OMD_O03Options {
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
  /** The ORDER TRAY groups. */
  trayOrders?: TrayOrder[];
}

/** Builder for HL7 OMD^O03 (HL7 v2.4) messages. */
export class OMD_O03<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OMD_O03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OMD_O03_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public dietOrders: DietOrder[],
    public options: OMD_O03Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, dietOrders: this.dietOrders };
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

/** Builds an HL7 OMD^O03 (HL7 v2.4) message. */
export function createOMD_O03<TMSH extends MSH = MSH>(
  header: TMSH,
  dietOrders: DietOrder[],
  options: OMD_O03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OMD_O03<TMSH> {
  return new OMD_O03(header, dietOrders, options, encoding);
}
