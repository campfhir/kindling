/**
 * Builder for ORD^O04 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER_DIET: ORC [{ODS}] [{NTE}] } [{ ORDER_TRAY: ORC [{ODT}] [{NTE}] }] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ORD_O04_STRUCTURE } from "../../structures/v2.4/ORD_O04.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { MSA } from "../../segments/v2.4/MSA.ts";
import type { ERR } from "../../segments/v2.4/ERR.ts";
import type { NTE } from "../../segments/v2.4/NTE.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { ORC } from "../../segments/v2.4/ORC.ts";
import type { ODS } from "../../segments/v2.4/ODS.ts";
import type { ODT } from "../../segments/v2.4/ODT.ts";

/** The ORDER DIET group of an ORD^O04 (HL7 v2.4) message being built. */
export interface DietOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ODS segments. */
  diets?: ODS[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER TRAY group of an ORD^O04 (HL7 v2.4) message being built. */
export interface TrayOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ODT segments. */
  dietTrays?: ODT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an ORD^O04 (HL7 v2.4) message. */
export interface ORD_O04Options {
  /** The ERR segment. */
  error?: ERR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER DIET groups. */
  dietOrders?: DietOrder[];
  /** The ORDER TRAY groups. */
  trayOrders?: TrayOrder[];
}

/** Builder for HL7 ORD^O04 (HL7 v2.4) messages. */
export class ORD_O04<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORD_O04";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORD_O04_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: ORD_O04Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment };
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

/** Builds an HL7 ORD^O04 (HL7 v2.4) message. */
export function createORD_O04<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: ORD_O04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORD_O04<TMSH, TMSA> {
  return new ORD_O04(header, acknowledgment, options, encoding);
}
