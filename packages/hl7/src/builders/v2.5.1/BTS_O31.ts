/**
 * Builder for BTS^O31 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] ] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] BPO [{NTE}] [{ PRODUCT_STATUS: BTX [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { BTS_O31_STRUCTURE } from "../../structures/v2.5.1/BTS_O31.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { SFT } from "../../segments/v2.5.1/SFT.ts";
import type { NTE } from "../../segments/v2.5.1/NTE.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import type { PD1 } from "../../segments/v2.5.1/PD1.ts";
import type { PV1 } from "../../segments/v2.5.1/PV1.ts";
import type { PV2 } from "../../segments/v2.5.1/PV2.ts";
import type { ORC } from "../../segments/v2.5.1/ORC.ts";
import type { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import type { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import type { BPO } from "../../segments/v2.5.1/BPO.ts";
import type { BTX } from "../../segments/v2.5.1/BTX.ts";

/** The PATIENT group of an BTS^O31 (HL7 v2.5.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT VISIT group. */
  patientVisit?: PatientVisitGroup;
}

/** The PATIENT VISIT group of an BTS^O31 (HL7 v2.5.1) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The ORDER group of an BTS^O31 (HL7 v2.5.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The BPO segment. */
  bloodProductOrder: BPO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRODUCT STATUS groups. */
  productStatus?: ProductStatusGroup[];
}

/** The TIMING group of an BTS^O31 (HL7 v2.5.1) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The PRODUCT STATUS group of an BTS^O31 (HL7 v2.5.1) message being built. */
export interface ProductStatusGroup {
  /** The BTX segment. */
  bloodProductTransfusion: BTX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an BTS^O31 (HL7 v2.5.1) message. */
export interface BTS_O31Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: PatientGroup;
}

/** Builder for HL7 BTS^O31 (HL7 v2.5.1) messages. */
export class BTS_O31<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BTS_O31";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = BTS_O31_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: OrderGroup[],
    public options: BTS_O31Options = {},
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

/** Builds an HL7 BTS^O31 (HL7 v2.5.1) message. */
export function createBTS_O31<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: BTS_O31Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BTS_O31<TMSH> {
  return new BTS_O31(header, orders, options, encoding);
}
