/**
 * Builder for ORN^O02 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC RQD [RQ1] [{NTE}] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ORN_O02_STRUCTURE } from "../../structures/v2.3/ORN_O02.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { MSA } from "../../segments/v2.3/MSA.ts";
import type { ERR } from "../../segments/v2.3/ERR.ts";
import type { NTE } from "../../segments/v2.3/NTE.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { ORC } from "../../segments/v2.3/ORC.ts";
import type { RQD } from "../../segments/v2.3/RQD.ts";
import type { RQ1 } from "../../segments/v2.3/RQ1.ts";

/** The ORDER group of an ORN^O02 (HL7 v2.3) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The RQD segment. */
  requisition: RQD;
  /** The RQ1 segment. */
  requisitionSupplier?: RQ1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an ORN^O02 (HL7 v2.3) message. */
export interface ORN_O02Options {
  /** The ERR segment. */
  error?: ERR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders?: OrderGroup[];
}

/** Builder for HL7 ORN^O02 (HL7 v2.3) messages. */
export class ORN_O02<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORN_O02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORN_O02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: ORN_O02Options = {},
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

/** Builds an HL7 ORN^O02 (HL7 v2.3) message. */
export function createORN_O02<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: ORN_O02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORN_O02<TMSH, TMSA> {
  return new ORN_O02(header, acknowledgment, options, encoding);
}
