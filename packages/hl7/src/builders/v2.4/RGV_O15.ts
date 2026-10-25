/**
 * Builder for RGV^O15 messages (HL7 v2.4).
 *
 * Structure: MSH [{NTE}] [ PATIENT: PID [{NTE}] [{AL1}] [ PATIENT_VISIT: PV1 [PV2] ] ] { ORDER: ORC [ ORDER_DETAIL: RXO [ ORDER_DETAIL_SUPPLEMENT: {NTE} {RXR} [ COMPONENT: {RXC} [{NTE}] ] ] ] [ ENCODING: RXE {RXR} [{RXC}] ] { GIVE: RXG {RXR} [{RXC}] { OBSERVATION: [OBX] [{NTE}] } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RGV_O15_STRUCTURE } from "../../structures/v2.4/RGV_O15.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { NTE } from "../../segments/v2.4/NTE.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { AL1 } from "../../segments/v2.4/AL1.ts";
import type { PV1 } from "../../segments/v2.4/PV1.ts";
import type { PV2 } from "../../segments/v2.4/PV2.ts";
import type { ORC } from "../../segments/v2.4/ORC.ts";
import type { RXO } from "../../segments/v2.4/RXO.ts";
import type { RXR } from "../../segments/v2.4/RXR.ts";
import type { RXC } from "../../segments/v2.4/RXC.ts";
import type { RXE } from "../../segments/v2.4/RXE.ts";
import type { RXG } from "../../segments/v2.4/RXG.ts";
import type { OBX } from "../../segments/v2.4/OBX.ts";

/** The ORDER group of an RGV^O15 (HL7 v2.4) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  detail?: OrderDetail;
  /** The ENCODING group. */
  encoding?: Encoding;
  /** The GIVE groups. */
  gives: Give[];
}

/** The ORDER DETAIL group of an RGV^O15 (HL7 v2.4) message being built. */
export interface OrderDetail {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes?: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The NTE segments. */
  componentNotes?: NTE[];
}

/** The ENCODING group of an RGV^O15 (HL7 v2.4) message being built. */
export interface Encoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The GIVE group of an RGV^O15 (HL7 v2.4) message being built. */
export interface Give {
  /** The RXG segment. */
  give: RXG;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The OBSERVATION groups. */
  observations: ObservationGroup[];
}

/** The OBSERVATION group of an RGV^O15 (HL7 v2.4) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an RGV^O15 (HL7 v2.4) message. */
export interface RGV_O15Options {
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

/** Builder for HL7 RGV^O15 (HL7 v2.4) messages. */
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

/** Builds an HL7 RGV^O15 (HL7 v2.4) message. */
export function createRGV_O15<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: RGV_O15Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RGV_O15<TMSH> {
  return new RGV_O15(header, orders, options, encoding);
}
