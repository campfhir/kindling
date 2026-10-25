/**
 * Builder for MFN^M15 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MFI { MF_INV_ITEM: MFE IIM }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFN_M15_STRUCTURE } from "../../structures/v2.5.1/MFN_M15.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { SFT } from "../../segments/v2.5.1/SFT.ts";
import type { MFI } from "../../segments/v2.5.1/MFI.ts";
import type { MFE } from "../../segments/v2.5.1/MFE.ts";
import type { IIM } from "../../segments/v2.5.1/IIM.ts";

/** The MF INV ITEM group of an MFN^M15 (HL7 v2.5.1) message being built. */
export interface InventoryItemEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The IIM segment. */
  inventoryItem: IIM;
}

/** The optional segments and groups of an MFN^M15 (HL7 v2.5.1) message. */
export interface MFN_M15Options {
  /** The SFT segments. */
  software?: SFT[];
}

/** Builder for HL7 MFN^M15 (HL7 v2.5.1) messages. */
export class MFN_M15<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M15";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M15_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public entries: InventoryItemEntry[],
    public options: MFN_M15Options = {},
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

/** Builds an HL7 MFN^M15 (HL7 v2.5.1) message. */
export function createMFN_M15<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  entries: InventoryItemEntry[],
  options: MFN_M15Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M15<TMSH, TMFI> {
  return new MFN_M15(header, masterFile, entries, options, encoding);
}
