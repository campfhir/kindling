/**
 * Builder for RGV^O15 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] [{NTE}] [ PATIENT: PID [{NTE}] [{AL1}] [ PATIENT_VISIT: PV1 [PV2] ] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: RXO [ ORDER_DETAIL_SUPPLEMENT: {NTE} {RXR} [{ COMPONENT: RXC [{NTE}] }] ] ] [ ENCODING: RXE { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] ] { GIVE: RXG { TIMING_GIVE: TQ1 [{TQ2}] } {RXR} [{RXC}] { OBSERVATION: [OBX] [{NTE}] } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RGV_O15_STRUCTURE } from "../../structures/v2.5.1/RGV_O15.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { SFT } from "../../segments/v2.5.1/SFT.ts";
import type { NTE } from "../../segments/v2.5.1/NTE.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import type { AL1 } from "../../segments/v2.5.1/AL1.ts";
import type { PV1 } from "../../segments/v2.5.1/PV1.ts";
import type { PV2 } from "../../segments/v2.5.1/PV2.ts";
import type { ORC } from "../../segments/v2.5.1/ORC.ts";
import type { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import type { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import type { RXO } from "../../segments/v2.5.1/RXO.ts";
import type { RXR } from "../../segments/v2.5.1/RXR.ts";
import type { RXC } from "../../segments/v2.5.1/RXC.ts";
import type { RXE } from "../../segments/v2.5.1/RXE.ts";
import type { RXG } from "../../segments/v2.5.1/RXG.ts";
import type { OBX } from "../../segments/v2.5.1/OBX.ts";

/** The ORDER group of an RGV^O15 (HL7 v2.5.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The ORDER DETAIL group. */
  detail?: OrderDetail;
  /** The ENCODING group. */
  encoding?: Encoding;
  /** The GIVE groups. */
  gives: Give[];
}

/** The TIMING group of an RGV^O15 (HL7 v2.5.1) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of an RGV^O15 (HL7 v2.5.1) message being built. */
export interface OrderDetail {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes?: RXR[];
  /** The COMPONENT groups. */
  components?: Component[];
}

/** The COMPONENT group of an RGV^O15 (HL7 v2.5.1) message being built. */
export interface Component {
  /** The RXC segment. */
  component: RXC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ENCODING group of an RGV^O15 (HL7 v2.5.1) message being built. */
export interface Encoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The TIMING ENCODED groups. */
  encodedTimings: TimingEncodedGroup[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING ENCODED group of an RGV^O15 (HL7 v2.5.1) message being built. */
export interface TimingEncodedGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The GIVE group of an RGV^O15 (HL7 v2.5.1) message being built. */
export interface Give {
  /** The RXG segment. */
  give: RXG;
  /** The TIMING GIVE groups. */
  giveTimings: TimingGiveGroup[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The OBSERVATION groups. */
  observations: ObservationGroup[];
}

/** The TIMING GIVE group of an RGV^O15 (HL7 v2.5.1) message being built. */
export interface TimingGiveGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an RGV^O15 (HL7 v2.5.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an RGV^O15 (HL7 v2.5.1) message. */
export interface RGV_O15Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** Builder for HL7 RGV^O15 (HL7 v2.5.1) messages. */
export class RGV_O15<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RGV_O15";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RGV_O15_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: OrderGroup[],
    public options: RGV_O15Options = {},
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

/** Builds an HL7 RGV^O15 (HL7 v2.5.1) message. */
export function createRGV_O15<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: RGV_O15Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RGV_O15<TMSH> {
  return new RGV_O15(header, orders, options, encoding);
}
