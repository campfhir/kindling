/**
 * Builder for MFN^M12 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MFI { MF_OBS_ATTRIBUTES: MFE OM1 [OM7] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFN_M12_STRUCTURE } from "../../structures/v2.5/MFN_M12.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { MFI } from "../../segments/v2.5/MFI.ts";
import type { MFE } from "../../segments/v2.5/MFE.ts";
import type { OM1 } from "../../segments/v2.5/OM1.ts";
import type { OM7 } from "../../segments/v2.5/OM7.ts";

/** The MF OBS ATTRIBUTES group of an MFN^M12 (HL7 v2.5) message being built. */
export interface AdditionalAttributesEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The OM7 segment. */
  additionalAttributes?: OM7;
}

/** The optional segments and groups of an MFN^M12 (HL7 v2.5) message. */
export interface MFN_M12Options {
  /** The SFT segments. */
  software?: SFT[];
}

/** Builder for HL7 MFN^M12 (HL7 v2.5) messages. */
export class MFN_M12<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M12";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M12_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public entries: AdditionalAttributesEntry[],
    public options: MFN_M12Options = {},
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

/** Builds an HL7 MFN^M12 (HL7 v2.5) message. */
export function createMFN_M12<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  entries: AdditionalAttributesEntry[],
  options: MFN_M12Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M12<TMSH, TMFI> {
  return new MFN_M12(header, masterFile, entries, options, encoding);
}
