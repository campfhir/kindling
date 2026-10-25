/**
 * Builder for MFN^M04 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MFI { MF_CDM: MFE CDM [{PRC}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFN_M04_STRUCTURE } from "../../structures/v2.5/MFN_M04.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { MFI } from "../../segments/v2.5/MFI.ts";
import type { MFE } from "../../segments/v2.5/MFE.ts";
import type { CDM } from "../../segments/v2.5/CDM.ts";
import type { PRC } from "../../segments/v2.5/PRC.ts";

/** The MF CDM group of an MFN^M04 (HL7 v2.5) message being built. */
export interface ChargeDescriptionEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The CDM segment. */
  chargeDescription: CDM;
  /** The PRC segments. */
  prices?: PRC[];
}

/** The optional segments and groups of an MFN^M04 (HL7 v2.5) message. */
export interface MFN_M04Options {
  /** The SFT segments. */
  software?: SFT[];
}

/** Builder for HL7 MFN^M04 (HL7 v2.5) messages. */
export class MFN_M04<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M04";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M04_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public entries: ChargeDescriptionEntry[],
    public options: MFN_M04Options = {},
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

/** Builds an HL7 MFN^M04 (HL7 v2.5) message. */
export function createMFN_M04<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  entries: ChargeDescriptionEntry[],
  options: MFN_M04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M04<TMSH, TMFI> {
  return new MFN_M04(header, masterFile, entries, options, encoding);
}
