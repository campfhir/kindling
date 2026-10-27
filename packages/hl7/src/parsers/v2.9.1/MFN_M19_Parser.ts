/**
 * Parser for MFN^M19 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { CONTRACT_RECORD: MFE CTR [{NTE}] { MATERIAL_ITEM_RECORD: ITM { PURCHASING_VENDOR: VND [{ PACKAGING: PKG }] } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFN_M19_STRUCTURE } from "../../structures/v2.9.1/MFN_M19.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { MFI } from "../../segments/v2.9.1/MFI.ts";
import { MFE } from "../../segments/v2.9.1/MFE.ts";
import { CTR } from "../../segments/v2.9.1/CTR.ts";
import { NTE } from "../../segments/v2.9.1/NTE.ts";
import { ITM } from "../../segments/v2.9.1/ITM.ts";
import { VND } from "../../segments/v2.9.1/VND.ts";
import { PKG } from "../../segments/v2.9.1/PKG.ts";

/** The CONTRACT RECORD group of a parsed MFN^M19 (HL7 v2.9.1) message. */
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

/** The MATERIAL ITEM RECORD group of a parsed MFN^M19 (HL7 v2.9.1) message. */
export interface ParsedMaterialItemRecord {
  /** The ITM segment. */
  itm: ITM;
  /** The PURCHASING VENDOR groups. */
  purchasingVendors: ParsedPurchasingVendor[];
}

/** The PURCHASING VENDOR group of a parsed MFN^M19 (HL7 v2.9.1) message. */
export interface ParsedPurchasingVendor {
  /** The VND segment. */
  vnd: VND;
  /** The PACKAGING groups. */
  packagings?: ParsedPackaging[];
}

/** The PACKAGING group of a parsed MFN^M19 (HL7 v2.9.1) message. */
export interface ParsedPackaging {
  /** The PKG segment. */
  pkg: PKG;
}

/** Structured result of parsing an HL7 MFN^M19 (HL7 v2.9.1) message. */
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

/** The segment parsers of MFN^M19 (HL7 v2.9.1). */
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

/** Parser for HL7 MFN^M19 (HL7 v2.9.1) messages. */
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

/** Parses an HL7 MFN^M19 (HL7 v2.9.1) message string into a structured result. */
export function parseMFN_M19(messageString: string): Result<ParsedMFN_M19> {
  return new MFN_M19_Parser().parse(messageString);
}
