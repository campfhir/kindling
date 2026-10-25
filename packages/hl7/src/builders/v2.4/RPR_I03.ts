/**
 * Builder for RPR^I03 messages (HL7 v2.4).
 *
 * Structure: MSH MSA { PROVIDER: PRD [{CTD}] } [{PID}] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RPR_I03_STRUCTURE } from "../../structures/v2.4/RPR_I03.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { MSA } from "../../segments/v2.4/MSA.ts";
import type { PRD } from "../../segments/v2.4/PRD.ts";
import type { CTD } from "../../segments/v2.4/CTD.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { NTE } from "../../segments/v2.4/NTE.ts";

/** The PROVIDER group of an RPR^I03 (HL7 v2.4) message being built. */
export interface Provider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The optional segments and groups of an RPR^I03 (HL7 v2.4) message. */
export interface RPR_I03Options {
  /** The PID segments. */
  patients?: PID[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Builder for HL7 RPR^I03 (HL7 v2.4) messages. */
export class RPR_I03<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RPR_I03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RPR_I03_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public providers: Provider[],
    public options: RPR_I03Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, providers: this.providers };
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

/** Builds an HL7 RPR^I03 (HL7 v2.4) message. */
export function createRPR_I03<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  providers: Provider[],
  options: RPR_I03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RPR_I03<TMSH, TMSA> {
  return new RPR_I03(header, acknowledgment, providers, options, encoding);
}
