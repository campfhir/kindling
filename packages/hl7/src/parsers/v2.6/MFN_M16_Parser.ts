/**
 * Parser for MFN^M16 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MATERIAL_ITEM_RECORD: MFE ITM [{NTE}] [{ STERILIZATION: STZ [{NTE}] }] [{ PURCHASING_VENDOR: VND [{ PACKAGING: PKG [{PCE}] }] }] [{ MATERIAL_LOCATION: IVT [{ILT}] [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFN_M16_STRUCTURE } from "../../structures/v2.6/MFN_M16.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { MFI } from "../../segments/v2.6/MFI.ts";
import { MFE } from "../../segments/v2.6/MFE.ts";
import { ITM } from "../../segments/v2.6/ITM.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";
import { STZ } from "../../segments/v2.6/STZ.ts";
import { VND } from "../../segments/v2.6/VND.ts";
import { PKG } from "../../segments/v2.6/PKG.ts";
import { PCE } from "../../segments/v2.6/PCE.ts";
import { IVT } from "../../segments/v2.6/IVT.ts";
import { ILT } from "../../segments/v2.6/ILT.ts";

/** The MATERIAL ITEM RECORD group of a parsed MFN^M16 (HL7 v2.6) message. */
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

/** The STERILIZATION group of a parsed MFN^M16 (HL7 v2.6) message. */
export interface ParsedSterilization {
  /** The STZ segment. */
  stz: STZ;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PURCHASING VENDOR group of a parsed MFN^M16 (HL7 v2.6) message. */
export interface ParsedPurchasingVendor {
  /** The VND segment. */
  vnd: VND;
  /** The PACKAGING groups. */
  packagings?: ParsedPackaging[];
}

/** The PACKAGING group of a parsed MFN^M16 (HL7 v2.6) message. */
export interface ParsedPackaging {
  /** The PKG segment. */
  pkg: PKG;
  /** The PCE segments. */
  pceList?: PCE[];
}

/** The MATERIAL LOCATION group of a parsed MFN^M16 (HL7 v2.6) message. */
export interface ParsedMaterialLocation {
  /** The IVT segment. */
  ivt: IVT;
  /** The ILT segments. */
  iltList?: ILT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 MFN^M16 (HL7 v2.6) message. */
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

/** The segment parsers of MFN^M16 (HL7 v2.6). */
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

/** Parser for HL7 MFN^M16 (HL7 v2.6) messages. */
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

/** Parses an HL7 MFN^M16 (HL7 v2.6) message string into a structured result. */
export function parseMFN_M16(messageString: string): Result<ParsedMFN_M16> {
  return new MFN_M16_Parser().parse(messageString);
}
