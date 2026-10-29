/**
 * Builder for RDS^O13 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [{AL1}] [ PATIENT_VISIT: PV1 [PV2] ] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: RXO [ ORDER_DETAIL_SUPPLEMENT: {NTE} {RXR} [{ COMPONENT: RXC [{NTE}] }] ] ] [ ENCODING: RXE [{NTE}] { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] ] RXD [{NTE}] {RXR} [{RXC}] [{ OBSERVATION: OBX [{NTE}] }] [{FT1}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RDS_O13_STRUCTURE } from "../../structures/v2.6/RDS_O13.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { PD1 } from "../../segments/v2.6/PD1.ts";
import type { AL1 } from "../../segments/v2.6/AL1.ts";
import type { PV1 } from "../../segments/v2.6/PV1.ts";
import type { PV2 } from "../../segments/v2.6/PV2.ts";
import type { ORC } from "../../segments/v2.6/ORC.ts";
import type { TQ1 } from "../../segments/v2.6/TQ1.ts";
import type { TQ2 } from "../../segments/v2.6/TQ2.ts";
import type { RXO } from "../../segments/v2.6/RXO.ts";
import type { RXR } from "../../segments/v2.6/RXR.ts";
import type { RXC } from "../../segments/v2.6/RXC.ts";
import type { RXE } from "../../segments/v2.6/RXE.ts";
import type { RXD } from "../../segments/v2.6/RXD.ts";
import type { OBX } from "../../segments/v2.6/OBX.ts";
import type { FT1 } from "../../segments/v2.6/FT1.ts";

/** The PATIENT group of an RDS^O13 (HL7 v2.6) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PATIENT VISIT group. */
  patientVisit?: PatientVisitGroup;
}

/** The PATIENT VISIT group of an RDS^O13 (HL7 v2.6) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The ORDER group of an RDS^O13 (HL7 v2.6) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The ORDER DETAIL group. */
  orderDetail?: OrderDetailGroup;
  /** The ENCODING group. */
  encoding?: EncodingGroup;
  /** The RXD segment. */
  dispense: RXD;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The FT1 segments. */
  transactions?: FT1[];
}

/** The TIMING group of an RDS^O13 (HL7 v2.6) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of an RDS^O13 (HL7 v2.6) message being built. */
export interface OrderDetailGroup {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The ORDER DETAIL SUPPLEMENT group. */
  orderDetailSupplement?: OrderDetailSupplementGroup;
}

/** The ORDER DETAIL SUPPLEMENT group of an RDS^O13 (HL7 v2.6) message being built. */
export interface OrderDetailSupplementGroup {
  /** The NTE segments. */
  notes: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The COMPONENT groups. */
  components?: ComponentGroup[];
}

/** The COMPONENT group of an RDS^O13 (HL7 v2.6) message being built. */
export interface ComponentGroup {
  /** The RXC segment. */
  component: RXC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ENCODING group of an RDS^O13 (HL7 v2.6) message being built. */
export interface EncodingGroup {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING ENCODED groups. */
  timingEncodeds: TimingEncodedGroup[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING ENCODED group of an RDS^O13 (HL7 v2.6) message being built. */
export interface TimingEncodedGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an RDS^O13 (HL7 v2.6) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an RDS^O13 (HL7 v2.6) message. */
export interface RDS_O13Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: PatientGroup;
}

/** Builder for HL7 RDS^O13 (HL7 v2.6) messages. */
export class RDS_O13<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RDS_O13";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RDS_O13_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: OrderGroup[],
    public options: RDS_O13Options = {},
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

/** Builds an HL7 RDS^O13 (HL7 v2.6) message. */
export function createRDS_O13<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: RDS_O13Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RDS_O13<TMSH> {
  return new RDS_O13(header, orders, options, encoding);
}
