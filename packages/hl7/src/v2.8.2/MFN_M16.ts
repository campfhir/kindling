/**
 * Builder, parser and structure for MFN^M16 messages (HL7 v2.8.2).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MATERIAL_ITEM_RECORD: MFE ITM [{NTE}] [{ STERILIZATION: STZ [{NTE}] }] [{ PURCHASING_VENDOR: VND [{ PACKAGING: PKG [{PCE}] }] }] [{ MATERIAL_LOCATION: IVT [{ILT}] [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { MFI } from "./MFI.ts";
import { MFE } from "./MFE.ts";
import { ITM } from "./ITM.ts";
import { NTE } from "./NTE.ts";
import { STZ } from "./STZ.ts";
import { VND } from "./VND.ts";
import { PKG } from "./PKG.ts";
import { PCE } from "./PCE.ts";
import { IVT } from "./IVT.ts";
import { ILT } from "./ILT.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MFN^M16 (HL7 v2.8.2), in order. */
export const MFN_M16_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MATERIAL_ITEM_RECORD",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "ITM", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      {
        name: "STERILIZATION",
        required: false,
        repeating: true,
        segments: [
          { name: "STZ", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "PURCHASING_VENDOR",
        required: false,
        repeating: true,
        segments: [
          { name: "VND", required: true, repeating: false },
          {
            name: "PACKAGING",
            required: false,
            repeating: true,
            segments: [
              { name: "PKG", required: true, repeating: false },
              { name: "PCE", required: false, repeating: true },
            ],
          },
        ],
      },
      {
        name: "MATERIAL_LOCATION",
        required: false,
        repeating: true,
        segments: [
          { name: "IVT", required: true, repeating: false },
          { name: "ILT", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The MATERIAL ITEM RECORD group of a parsed MFN^M16 (HL7 v2.8.2) message. */
export interface ParsedMaterialItemRecord {
  /** The MFE segment. */
  entry: MFE;
  /** The ITM segment. */
  itm: ITM;
  /** The NTE segments. */
  notes?: NTE[];
  /** The STERILIZATION groups. */
  sterilizations?: ParsedSterilization[];
  /** The PURCHASING VENDOR groups. */
  purchasingVendors?: ParsedPurchasingVendor[];
  /** The MATERIAL LOCATION groups. */
  materialLocations?: ParsedMaterialLocation[];
}

/** The STERILIZATION group of a parsed MFN^M16 (HL7 v2.8.2) message. */
export interface ParsedSterilization {
  /** The STZ segment. */
  stz: STZ;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PURCHASING VENDOR group of a parsed MFN^M16 (HL7 v2.8.2) message. */
export interface ParsedPurchasingVendor {
  /** The VND segment. */
  vnd: VND;
  /** The PACKAGING groups. */
  packagings?: ParsedPackaging[];
}

/** The PACKAGING group of a parsed MFN^M16 (HL7 v2.8.2) message. */
export interface ParsedPackaging {
  /** The PKG segment. */
  pkg: PKG;
  /** The PCE segments. */
  pceList?: PCE[];
}

/** The MATERIAL LOCATION group of a parsed MFN^M16 (HL7 v2.8.2) message. */
export interface ParsedMaterialLocation {
  /** The IVT segment. */
  ivt: IVT;
  /** The ILT segments. */
  iltList?: ILT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 MFN^M16 (HL7 v2.8.2) message. */
export interface ParsedMFN_M16 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MATERIAL ITEM RECORD groups. */
  materialItemRecords: ParsedMaterialItemRecord[];
}

/** The segment parsers of MFN^M16 (HL7 v2.8.2). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  ITM: (s, e) => ITM.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  STZ: (s, e) => STZ.parse(s, e),
  VND: (s, e) => VND.parse(s, e),
  PKG: (s, e) => PKG.parse(s, e),
  PCE: (s, e) => PCE.parse(s, e),
  IVT: (s, e) => IVT.parse(s, e),
  ILT: (s, e) => ILT.parse(s, e),
};

/** Parser for HL7 MFN^M16 (HL7 v2.8.2) messages. */
export class MFN_M16_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M16";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M16_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M16> {
    return parseStructure<ParsedMFN_M16>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M16 (HL7 v2.8.2) message string into a structured result. */
export function parseMFN_M16(messageString: string): Result<ParsedMFN_M16> {
  return new MFN_M16_Parser().parse(messageString);
}

/** The MATERIAL ITEM RECORD group of an MFN^M16 (HL7 v2.8.2) message being built. */
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

/** The STERILIZATION group of an MFN^M16 (HL7 v2.8.2) message being built. */
export interface SterilizationGroup {
  /** The STZ segment. */
  stz: STZ;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PURCHASING VENDOR group of an MFN^M16 (HL7 v2.8.2) message being built. */
export interface PurchasingVendorGroup {
  /** The VND segment. */
  vnd: VND;
  /** The PACKAGING groups. */
  packagings?: PackagingGroup[];
}

/** The PACKAGING group of an MFN^M16 (HL7 v2.8.2) message being built. */
export interface PackagingGroup {
  /** The PKG segment. */
  pkg: PKG;
  /** The PCE segments. */
  pceList?: PCE[];
}

/** The MATERIAL LOCATION group of an MFN^M16 (HL7 v2.8.2) message being built. */
export interface MaterialLocationGroup {
  /** The IVT segment. */
  ivt: IVT;
  /** The ILT segments. */
  iltList?: ILT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an MFN^M16 (HL7 v2.8.2) message. */
export interface MFN_M16Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 MFN^M16 (HL7 v2.8.2) messages. */
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

/** Builds an HL7 MFN^M16 (HL7 v2.8.2) message. */
export function createMFN_M16<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  materialItemRecords: MaterialItemRecordGroup[],
  options: MFN_M16Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M16<TMSH, TMFI> {
  return new MFN_M16(header, masterFile, materialItemRecords, options, encoding);
}
