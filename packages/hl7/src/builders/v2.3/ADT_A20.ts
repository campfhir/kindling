/**
 * Builder for ADT^A20 messages (HL7 v2.3).
 *
 * Structure: MSH EVN NPU
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ADT_A20_STRUCTURE } from "../../structures/v2.3/ADT_A20.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { EVN } from "../../segments/v2.3/EVN.ts";
import type { NPU } from "../../segments/v2.3/NPU.ts";

/** The optional segments and groups of an ADT^A20 (HL7 v2.3) message. The message has none. */
export type ADT_A20Options = Record<string, never>;

/** Builder for HL7 ADT^A20 (HL7 v2.3) messages. */
export class ADT_A20<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TNPU extends NPU = NPU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A20";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A20_STRUCTURE;

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public evn: TEVN,
    public npu: TNPU,
    public options: ADT_A20Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, msh: this.msh, evn: this.evn, npu: this.npu };
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

/** Builds an HL7 ADT^A20 (HL7 v2.3) message. */
export function createADT_A20<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TNPU extends NPU = NPU>(
  msh: TMSH,
  evn: TEVN,
  npu: TNPU,
  options: ADT_A20Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A20<TMSH, TEVN, TNPU> {
  return new ADT_A20(msh, evn, npu, options, encoding);
}
