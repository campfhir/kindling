/**
 * Parser for MFN^M15 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MFI { MF_INV_ITEM: MFE IIM }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFN_M15_STRUCTURE } from "../../structures/v2.5/MFN_M15.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { MFI } from "../../segments/v2.5/MFI.ts";
import { MFE } from "../../segments/v2.5/MFE.ts";
import { IIM } from "../../segments/v2.5/IIM.ts";

/** The MF INV ITEM group of a parsed MFN^M15 (HL7 v2.5) message. */
export interface ParsedInventoryItemEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The IIM segment. */
  inventoryItem: IIM;
}

/** Structured result of parsing an HL7 MFN^M15 (HL7 v2.5) message. */
export interface ParsedMFN_M15 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF INV ITEM groups. */
  entries: ParsedInventoryItemEntry[];
}

/** The segment parsers of MFN^M15 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  IIM: (s, e) => IIM.parse(s, e),
};

/** Parser for HL7 MFN^M15 (HL7 v2.5) messages. */
export class MFN_M15_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M15";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M15_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M15> {
    return parseStructure<ParsedMFN_M15>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M15 (HL7 v2.5) message string into a structured result. */
export function parseMFN_M15(messageString: string): Result<ParsedMFN_M15> {
  return new MFN_M15_Parser().parse(messageString);
}
