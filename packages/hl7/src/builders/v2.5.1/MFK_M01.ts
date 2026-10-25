/**
 * Builder for MFK^M01 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MSA [{ERR}] MFI [{MFA}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFK_M01_STRUCTURE } from "../../structures/v2.5.1/MFK_M01.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { SFT } from "../../segments/v2.5.1/SFT.ts";
import type { MSA } from "../../segments/v2.5.1/MSA.ts";
import type { ERR } from "../../segments/v2.5.1/ERR.ts";
import type { MFI } from "../../segments/v2.5.1/MFI.ts";
import type { MFA } from "../../segments/v2.5.1/MFA.ts";

/** The optional segments and groups of an MFK^M01 (HL7 v2.5.1) message. */
export interface MFK_M01Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The ERR segments. */
  errors?: ERR[];
  /** The MFA segments. */
  entryAcknowledgments?: MFA[];
}

/** Builder for HL7 MFK^M01 (HL7 v2.5.1) messages. */
export class MFK_M01<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFK_M01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFK_M01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public masterFile: TMFI,
    public options: MFK_M01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, masterFile: this.masterFile };
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

/** Builds an HL7 MFK^M01 (HL7 v2.5.1) message. */
export function createMFK_M01<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  masterFile: TMFI,
  options: MFK_M01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFK_M01<TMSH, TMSA, TMFI> {
  return new MFK_M01(header, acknowledgment, masterFile, options, encoding);
}
