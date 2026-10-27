/**
 * Builder for SLS^S28 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] {SLT}
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { SLS_S28_STRUCTURE } from "../../structures/v2.9.1/SLS_S28.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { SLT } from "../../segments/v2.9.1/SLT.ts";

/** The optional segments and groups of an SLS^S28 (HL7 v2.9.1) message. */
export interface SLS_S28Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 SLS^S28 (HL7 v2.9.1) messages. */
export class SLS_S28<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SLS_S28";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SLS_S28_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public sltList: SLT[],
    public options: SLS_S28Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, sltList: this.sltList };
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

/** Builds an HL7 SLS^S28 (HL7 v2.9.1) message. */
export function createSLS_S28<TMSH extends MSH = MSH>(
  header: TMSH,
  sltList: SLT[],
  options: SLS_S28Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SLS_S28<TMSH> {
  return new SLS_S28(header, sltList, options, encoding);
}
