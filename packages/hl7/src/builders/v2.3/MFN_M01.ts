/**
 * Builder for MFN^M01 messages (HL7 v2.3).
 *
 * Structure: MSH MFI { MF: MFE }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFN_M01_STRUCTURE } from "../../structures/v2.3/MFN_M01.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { MFI } from "../../segments/v2.3/MFI.ts";
import type { MFE } from "../../segments/v2.3/MFE.ts";

/** The MF group of an MFN^M01 (HL7 v2.3) message being built. */
export interface Entry {
  /** The MFE segment. */
  entry: MFE;
}

/** The optional segments and groups of an MFN^M01 (HL7 v2.3) message. The message has none. */
export type MFN_M01Options = Record<string, never>;

/** Builder for HL7 MFN^M01 (HL7 v2.3) messages. */
export class MFN_M01<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public entries: Entry[],
    public options: MFN_M01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, entries: this.entries };
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

/** Builds an HL7 MFN^M01 (HL7 v2.3) message. */
export function createMFN_M01<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  entries: Entry[],
  options: MFN_M01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M01<TMSH, TMFI> {
  return new MFN_M01(header, masterFile, entries, options, encoding);
}
