/**
 * Builder for RPL^I02 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA { PROVIDER: PRD [{CTD}] } [{NTE}] [{DSP}] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RPL_I02_STRUCTURE } from "../../structures/v2.3.1/RPL_I02.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { MSA } from "../../segments/v2.3.1/MSA.ts";
import type { PRD } from "../../segments/v2.3.1/PRD.ts";
import type { CTD } from "../../segments/v2.3.1/CTD.ts";
import type { NTE } from "../../segments/v2.3.1/NTE.ts";
import type { DSP } from "../../segments/v2.3.1/DSP.ts";
import type { DSC } from "../../segments/v2.3.1/DSC.ts";

/** The PROVIDER group of an RPL^I02 (HL7 v2.3.1) message being built. */
export interface Provider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The optional segments and groups of an RPL^I02 (HL7 v2.3.1) message. */
export interface RPL_I02Options {
  /** The NTE segments. */
  notes?: NTE[];
  /** The DSP segments. */
  displayLines?: DSP[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RPL^I02 (HL7 v2.3.1) messages. */
export class RPL_I02<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RPL_I02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RPL_I02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public providers: Provider[],
    public options: RPL_I02Options = {},
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

/** Builds an HL7 RPL^I02 (HL7 v2.3.1) message. */
export function createRPL_I02<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  providers: Provider[],
  options: RPL_I02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RPL_I02<TMSH, TMSA> {
  return new RPL_I02(header, acknowledgment, providers, options, encoding);
}
