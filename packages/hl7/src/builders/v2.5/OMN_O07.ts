/**
 * Builder for OMN^O07 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] RQD [RQ1] [{NTE}] [{ OBSERVATION: OBX [{NTE}] }] [BLG] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { OMN_O07_STRUCTURE } from "../../structures/v2.5/OMN_O07.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { NTE } from "../../segments/v2.5/NTE.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { PD1 } from "../../segments/v2.5/PD1.ts";
import type { PV1 } from "../../segments/v2.5/PV1.ts";
import type { PV2 } from "../../segments/v2.5/PV2.ts";
import type { IN1 } from "../../segments/v2.5/IN1.ts";
import type { IN2 } from "../../segments/v2.5/IN2.ts";
import type { IN3 } from "../../segments/v2.5/IN3.ts";
import type { GT1 } from "../../segments/v2.5/GT1.ts";
import type { AL1 } from "../../segments/v2.5/AL1.ts";
import type { ORC } from "../../segments/v2.5/ORC.ts";
import type { TQ1 } from "../../segments/v2.5/TQ1.ts";
import type { TQ2 } from "../../segments/v2.5/TQ2.ts";
import type { RQD } from "../../segments/v2.5/RQD.ts";
import type { RQ1 } from "../../segments/v2.5/RQ1.ts";
import type { OBX } from "../../segments/v2.5/OBX.ts";
import type { BLG } from "../../segments/v2.5/BLG.ts";

/** The INSURANCE group of an OMN^O07 (HL7 v2.5) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER group of an OMN^O07 (HL7 v2.5) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The RQD segment. */
  requisition: RQD;
  /** The RQ1 segment. */
  requisitionSupplier?: RQ1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The BLG segment. */
  billing?: BLG;
}

/** The TIMING group of an OMN^O07 (HL7 v2.5) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an OMN^O07 (HL7 v2.5) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an OMN^O07 (HL7 v2.5) message. */
export interface OMN_O07Options {
  /** The SFT segments. */
  software?: SFT[];
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

/** Builder for HL7 OMN^O07 (HL7 v2.5) messages. */
export class OMN_O07<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OMN_O07";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OMN_O07_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: OrderGroup[],
    public options: OMN_O07Options = {},
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

/** Builds an HL7 OMN^O07 (HL7 v2.5) message. */
export function createOMN_O07<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: OMN_O07Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OMN_O07<TMSH> {
  return new OMN_O07(header, orders, options, encoding);
}
