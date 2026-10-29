/**
 * Builder for MFN^M16 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MATERIAL_ITEM_RECORD: MFE ITM [{NTE}] [{ STERILIZATION: STZ [{NTE}] }] [{ PURCHASING_VENDOR: VND [{ PACKAGING: PKG [{PCE}] }] }] [{ MATERIAL_LOCATION: IVT [{ILT}] [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFN_M16_STRUCTURE } from "../../structures/v2.7/MFN_M16.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { MFI } from "../../segments/v2.7/MFI.ts";
import type { MFE } from "../../segments/v2.7/MFE.ts";
import type { ITM } from "../../segments/v2.7/ITM.ts";
import type { NTE } from "../../segments/v2.7/NTE.ts";
import type { STZ } from "../../segments/v2.7/STZ.ts";
import type { VND } from "../../segments/v2.7/VND.ts";
import type { PKG } from "../../segments/v2.7/PKG.ts";
import type { PCE } from "../../segments/v2.7/PCE.ts";
import type { IVT } from "../../segments/v2.7/IVT.ts";
import type { ILT } from "../../segments/v2.7/ILT.ts";

/** The MATERIAL ITEM RECORD group of an MFN^M16 (HL7 v2.7) message being built. */
export interface MaterialItemRecordGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The ITM segment. */
  itm: ITM;
  /** The NTE segments. */
  notes?: NTE[];
  /** The STERILIZATION groups. */
  sterilizations?: SterilizationGroup[];
  /** The PURCHASING VENDOR groups. */
  purchasingVendors?: PurchasingVendorGroup[];
  /** The MATERIAL LOCATION groups. */
  materialLocations?: MaterialLocationGroup[];
}

/** The STERILIZATION group of an MFN^M16 (HL7 v2.7) message being built. */
export interface SterilizationGroup {
  /** The STZ segment. */
  stz: STZ;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PURCHASING VENDOR group of an MFN^M16 (HL7 v2.7) message being built. */
export interface PurchasingVendorGroup {
  /** The VND segment. */
  vnd: VND;
  /** The PACKAGING groups. */
  packagings?: PackagingGroup[];
}

/** The PACKAGING group of an MFN^M16 (HL7 v2.7) message being built. */
export interface PackagingGroup {
  /** The PKG segment. */
  pkg: PKG;
  /** The PCE segments. */
  pceList?: PCE[];
}

/** The MATERIAL LOCATION group of an MFN^M16 (HL7 v2.7) message being built. */
export interface MaterialLocationGroup {
  /** The IVT segment. */
  ivt: IVT;
  /** The ILT segments. */
  iltList?: ILT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an MFN^M16 (HL7 v2.7) message. */
export interface MFN_M16Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 MFN^M16 (HL7 v2.7) messages. */
export class MFN_M16<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M16";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M16_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public materialItemRecords: MaterialItemRecordGroup[],
    public options: MFN_M16Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, materialItemRecords: this.materialItemRecords };
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

/** Builds an HL7 MFN^M16 (HL7 v2.7) message. */
export function createMFN_M16<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  materialItemRecords: MaterialItemRecordGroup[],
  options: MFN_M16Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M16<TMSH, TMFI> {
  return new MFN_M16(header, masterFile, materialItemRecords, options, encoding);
}
