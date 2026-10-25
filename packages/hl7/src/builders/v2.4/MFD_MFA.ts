/**
 * Builder for MFD^MFA messages (HL7 v2.4).
 *
 * Structure: MSH MFI [{MFA}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFD_MFA_STRUCTURE } from "../../structures/v2.4/MFD_MFA.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { MFI } from "../../segments/v2.4/MFI.ts";
import type { MFA } from "../../segments/v2.4/MFA.ts";

/** The optional segments and groups of an MFD^MFA (HL7 v2.4) message. */
export interface MFD_MFAOptions {
  /** The MFA segments. */
  entryAcknowledgments?: MFA[];
}

/** Builder for HL7 MFD^MFA (HL7 v2.4) messages. */
export class MFD_MFA<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFD_MFA";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFD_MFA_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public options: MFD_MFAOptions = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile };
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

/** Builds an HL7 MFD^MFA (HL7 v2.4) message. */
export function createMFD_MFA<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  options: MFD_MFAOptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFD_MFA<TMSH, TMFI> {
  return new MFD_MFA(header, masterFile, options, encoding);
}
