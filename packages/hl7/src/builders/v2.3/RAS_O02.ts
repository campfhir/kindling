/**
 * Builder for RAS^O02 messages (HL7 v2.3).
 *
 * Structure: MSH [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [{AL1}] [ PATIENT_VISIT: PV1 [PV2] ] ] { ORDER: ORC [ ORDER_DETAIL: RXO [ ORDER_DETAIL_SUPPLEMENT: {NTE} {RXR} [ COMPONENT: {RXC} [{NTE}] ] ] ] [ ENCODING: RXE {RXR} [{RXC}] ] {RXA} RXR [{ OBSERVATION: OBX [{NTE}] }] [{CTI}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RAS_O02_STRUCTURE } from "../../structures/v2.3/RAS_O02.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { NTE } from "../../segments/v2.3/NTE.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { PD1 } from "../../segments/v2.3/PD1.ts";
import type { AL1 } from "../../segments/v2.3/AL1.ts";
import type { PV1 } from "../../segments/v2.3/PV1.ts";
import type { PV2 } from "../../segments/v2.3/PV2.ts";
import type { ORC } from "../../segments/v2.3/ORC.ts";
import type { RXO } from "../../segments/v2.3/RXO.ts";
import type { RXR } from "../../segments/v2.3/RXR.ts";
import type { RXC } from "../../segments/v2.3/RXC.ts";
import type { RXE } from "../../segments/v2.3/RXE.ts";
import type { RXA } from "../../segments/v2.3/RXA.ts";
import type { OBX } from "../../segments/v2.3/OBX.ts";
import type { CTI } from "../../segments/v2.3/CTI.ts";

/** The ORDER group of an RAS^O02 (HL7 v2.3) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  detail?: OrderDetail;
  /** The ENCODING group. */
  encoding?: Encoding;
  /** The RXA segments. */
  administrations: RXA[];
  /** The RXR segment. */
  route: RXR;
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The ORDER DETAIL group of an RAS^O02 (HL7 v2.3) message being built. */
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

/** The ENCODING group of an RAS^O02 (HL7 v2.3) message being built. */
export interface Encoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The OBSERVATION group of an RAS^O02 (HL7 v2.3) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an RAS^O02 (HL7 v2.3) message. */
export interface RAS_O02Options {
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

/** Builder for HL7 RAS^O02 (HL7 v2.3) messages. */
export class RAS_O02<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RAS_O02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RAS_O02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: OrderGroup[],
    public options: RAS_O02Options = {},
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

/** Builds an HL7 RAS^O02 (HL7 v2.3) message. */
export function createRAS_O02<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: RAS_O02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RAS_O02<TMSH> {
  return new RAS_O02(header, orders, options, encoding);
}
