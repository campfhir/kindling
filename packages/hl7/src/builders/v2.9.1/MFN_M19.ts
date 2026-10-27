/**
 * Builder for MFN^M19 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { CONTRACT_RECORD: MFE CTR [{NTE}] { MATERIAL_ITEM_RECORD: ITM { PURCHASING_VENDOR: VND [{ PACKAGING: PKG }] } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFN_M19_STRUCTURE } from "../../structures/v2.9.1/MFN_M19.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { MFI } from "../../segments/v2.9.1/MFI.ts";
import type { MFE } from "../../segments/v2.9.1/MFE.ts";
import type { CTR } from "../../segments/v2.9.1/CTR.ts";
import type { NTE } from "../../segments/v2.9.1/NTE.ts";
import type { ITM } from "../../segments/v2.9.1/ITM.ts";
import type { VND } from "../../segments/v2.9.1/VND.ts";
import type { PKG } from "../../segments/v2.9.1/PKG.ts";

/** The CONTRACT RECORD group of an MFN^M19 (HL7 v2.9.1) message being built. */
export interface ContractRecordGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The CTR segment. */
  ctr: CTR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The MATERIAL ITEM RECORD groups. */
  materialItemRecords: MaterialItemRecordGroup[];
}

/** The MATERIAL ITEM RECORD group of an MFN^M19 (HL7 v2.9.1) message being built. */
export interface MaterialItemRecordGroup {
  /** The ITM segment. */
  itm: ITM;
  /** The PURCHASING VENDOR groups. */
  purchasingVendors: PurchasingVendorGroup[];
}

/** The PURCHASING VENDOR group of an MFN^M19 (HL7 v2.9.1) message being built. */
export interface PurchasingVendorGroup {
  /** The VND segment. */
  vnd: VND;
  /** The PACKAGING groups. */
  packagings?: PackagingGroup[];
}

/** The PACKAGING group of an MFN^M19 (HL7 v2.9.1) message being built. */
export interface PackagingGroup {
  /** The PKG segment. */
  pkg: PKG;
}

/** The optional segments and groups of an MFN^M19 (HL7 v2.9.1) message. */
export interface MFN_M19Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 MFN^M19 (HL7 v2.9.1) messages. */
export class MFN_M19<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M19";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M19_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public contractRecords: ContractRecordGroup[],
    public options: MFN_M19Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, contractRecords: this.contractRecords };
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

/** Builds an HL7 MFN^M19 (HL7 v2.9.1) message. */
export function createMFN_M19<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  contractRecords: ContractRecordGroup[],
  options: MFN_M19Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M19<TMSH, TMFI> {
  return new MFN_M19(header, masterFile, contractRecords, options, encoding);
}
