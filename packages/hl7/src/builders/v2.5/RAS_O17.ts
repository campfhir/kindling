/**
 * Builder for RAS^O17 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [{AL1}] [ PATIENT_VISIT: PV1 [PV2] ] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: RXO [ ORDER_DETAIL_SUPPLEMENT: {NTE} {RXR} [{ COMPONENT: RXC [{NTE}] }] ] ] [ ENCODING: RXE { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] ] { ADMINISTRATION: {RXA} RXR [{ OBSERVATION: OBX [{NTE}] }] } [{CTI}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RAS_O17_STRUCTURE } from "../../structures/v2.5/RAS_O17.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { NTE } from "../../segments/v2.5/NTE.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { PD1 } from "../../segments/v2.5/PD1.ts";
import type { AL1 } from "../../segments/v2.5/AL1.ts";
import type { PV1 } from "../../segments/v2.5/PV1.ts";
import type { PV2 } from "../../segments/v2.5/PV2.ts";
import type { ORC } from "../../segments/v2.5/ORC.ts";
import type { TQ1 } from "../../segments/v2.5/TQ1.ts";
import type { TQ2 } from "../../segments/v2.5/TQ2.ts";
import type { RXO } from "../../segments/v2.5/RXO.ts";
import type { RXR } from "../../segments/v2.5/RXR.ts";
import type { RXC } from "../../segments/v2.5/RXC.ts";
import type { RXE } from "../../segments/v2.5/RXE.ts";
import type { RXA } from "../../segments/v2.5/RXA.ts";
import type { OBX } from "../../segments/v2.5/OBX.ts";
import type { CTI } from "../../segments/v2.5/CTI.ts";

/** The ORDER group of an RAS^O17 (HL7 v2.5) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The ORDER DETAIL group. */
  detail?: OrderDetail;
  /** The ENCODING group. */
  encoding?: Encoding;
  /** The ADMINISTRATION groups. */
  administrations: Administration[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The TIMING group of an RAS^O17 (HL7 v2.5) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of an RAS^O17 (HL7 v2.5) message being built. */
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

/** The COMPONENT group of an RAS^O17 (HL7 v2.5) message being built. */
export interface Component {
  /** The RXC segment. */
  component: RXC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ENCODING group of an RAS^O17 (HL7 v2.5) message being built. */
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

/** The TIMING ENCODED group of an RAS^O17 (HL7 v2.5) message being built. */
export interface TimingEncodedGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ADMINISTRATION group of an RAS^O17 (HL7 v2.5) message being built. */
export interface Administration {
  /** The RXA segments. */
  administrations: RXA[];
  /** The RXR segment. */
  route: RXR;
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
}

/** The OBSERVATION group of an RAS^O17 (HL7 v2.5) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an RAS^O17 (HL7 v2.5) message. */
export interface RAS_O17Options {
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
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** Builder for HL7 RAS^O17 (HL7 v2.5) messages. */
export class RAS_O17<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RAS_O17";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RAS_O17_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: OrderGroup[],
    public options: RAS_O17Options = {},
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

/** Builds an HL7 RAS^O17 (HL7 v2.5) message. */
export function createRAS_O17<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: RAS_O17Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RAS_O17<TMSH> {
  return new RAS_O17(header, orders, options, encoding);
}
