/**
 * Builder, parser and structure for MFN^M19 messages (HL7 v2.9).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { CONTRACT_RECORD: MFE CTR [{NTE}] { MATERIAL_ITEM_RECORD: ITM { PURCHASING_VENDOR: VND [{ PACKAGING: PKG }] } } }
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
import { CTR } from "./CTR.ts";
import { NTE } from "./NTE.ts";
import { ITM } from "./ITM.ts";
import { VND } from "./VND.ts";
import { PKG } from "./PKG.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MFN^M19 (HL7 v2.9), in order. */
export const MFN_M19_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "CONTRACT_RECORD",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "CTR", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      {
        name: "MATERIAL_ITEM_RECORD",
        required: true,
        repeating: true,
        segments: [
          { name: "ITM", required: true, repeating: false },
          {
            name: "PURCHASING_VENDOR",
            required: true,
            repeating: true,
            segments: [
              { name: "VND", required: true, repeating: false },
              {
                name: "PACKAGING",
                required: false,
                repeating: true,
                segments: [
                  { name: "PKG", required: true, repeating: false },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

/** The CONTRACT RECORD group of a parsed MFN^M19 (HL7 v2.9) message. */
export interface ParsedContractRecord {
  /** The MFE segment. */
  entry: MFE;
  /** The CTR segment. */
  ctr: CTR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The MATERIAL ITEM RECORD groups. */
  materialItemRecords: ParsedMaterialItemRecord[];
}

/** The MATERIAL ITEM RECORD group of a parsed MFN^M19 (HL7 v2.9) message. */
export interface ParsedMaterialItemRecord {
  /** The ITM segment. */
  itm: ITM;
  /** The PURCHASING VENDOR groups. */
  purchasingVendors: ParsedPurchasingVendor[];
}

/** The PURCHASING VENDOR group of a parsed MFN^M19 (HL7 v2.9) message. */
export interface ParsedPurchasingVendor {
  /** The VND segment. */
  vnd: VND;
  /** The PACKAGING groups. */
  packagings?: ParsedPackaging[];
}

/** The PACKAGING group of a parsed MFN^M19 (HL7 v2.9) message. */
export interface ParsedPackaging {
  /** The PKG segment. */
  pkg: PKG;
}

/** Structured result of parsing an HL7 MFN^M19 (HL7 v2.9) message. */
export interface ParsedMFN_M19 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MFI segment. */
  masterFile: MFI;
  /** The CONTRACT RECORD groups. */
  contractRecords: ParsedContractRecord[];
}

/** The segment parsers of MFN^M19 (HL7 v2.9). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  CTR: (s, e) => CTR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  ITM: (s, e) => ITM.parse(s, e),
  VND: (s, e) => VND.parse(s, e),
  PKG: (s, e) => PKG.parse(s, e),
};

/** Parser for HL7 MFN^M19 (HL7 v2.9) messages. */
export class MFN_M19_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M19";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M19_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M19> {
    return parseStructure<ParsedMFN_M19>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M19 (HL7 v2.9) message string into a structured result. */
export function parseMFN_M19(messageString: string): Result<ParsedMFN_M19> {
  return new MFN_M19_Parser().parse(messageString);
}

/** The CONTRACT RECORD group of an MFN^M19 (HL7 v2.9) message being built. */
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

/** The MATERIAL ITEM RECORD group of an MFN^M19 (HL7 v2.9) message being built. */
export interface MaterialItemRecordGroup {
  /** The ITM segment. */
  itm: ITM;
  /** The PURCHASING VENDOR groups. */
  purchasingVendors: PurchasingVendorGroup[];
}

/** The PURCHASING VENDOR group of an MFN^M19 (HL7 v2.9) message being built. */
export interface PurchasingVendorGroup {
  /** The VND segment. */
  vnd: VND;
  /** The PACKAGING groups. */
  packagings?: PackagingGroup[];
}

/** The PACKAGING group of an MFN^M19 (HL7 v2.9) message being built. */
export interface PackagingGroup {
  /** The PKG segment. */
  pkg: PKG;
}

/** The optional segments and groups of an MFN^M19 (HL7 v2.9) message. */
export interface MFN_M19Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 MFN^M19 (HL7 v2.9) messages. */
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

/** Builds an HL7 MFN^M19 (HL7 v2.9) message. */
export function createMFN_M19<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  contractRecords: ContractRecordGroup[],
  options: MFN_M19Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M19<TMSH, TMFI> {
  return new MFN_M19(header, masterFile, contractRecords, options, encoding);
}
