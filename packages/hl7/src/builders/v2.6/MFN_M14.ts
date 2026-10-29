/**
 * Builder for MFN^M14 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MFI {MFE}
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFN_M14_STRUCTURE } from "../../structures/v2.6/MFN_M14.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { MFI } from "../../segments/v2.6/MFI.ts";
import type { MFE } from "../../segments/v2.6/MFE.ts";

/** The optional segments and groups of an MFN^M14 (HL7 v2.6) message. */
export interface MFN_M14Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 MFN^M14 (HL7 v2.6) messages. */
export class MFN_M14<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M14";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M14_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public entries: MFE[],
    public options: MFN_M14Options = {},
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

/** Builds an HL7 MFN^M14 (HL7 v2.6) message. */
export function createMFN_M14<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  entries: MFE[],
  options: MFN_M14Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M14<TMSH, TMFI> {
  return new MFN_M14(header, masterFile, entries, options, encoding);
}
