/**
 * Parser for MFN^M05 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_LOCATION: MFE LOC [{LCH}] [{LRL}] { MF_LOC_DEPT: LDP [{LCH}] [{LCC}] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFN_M05_STRUCTURE } from "../../structures/v2.7/MFN_M05.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { MFI } from "../../segments/v2.7/MFI.ts";
import { MFE } from "../../segments/v2.7/MFE.ts";
import { LOC } from "../../segments/v2.7/LOC.ts";
import { LCH } from "../../segments/v2.7/LCH.ts";
import { LRL } from "../../segments/v2.7/LRL.ts";
import { LDP } from "../../segments/v2.7/LDP.ts";
import { LCC } from "../../segments/v2.7/LCC.ts";

/** The MF LOCATION group of a parsed MFN^M05 (HL7 v2.7) message. */
export interface ParsedMfLocation {
  /** The MFE segment. */
  entry: MFE;
  /** The LOC segment. */
  patientLocation: LOC;
  /** The LCH segments. */
  locationCharacteristics?: LCH[];
  /** The LRL segments. */
  locationRelationships?: LRL[];
  /** The MF LOC DEPT groups. */
  mfLocDepts: ParsedMfLocDept[];
}

/** The MF LOC DEPT group of a parsed MFN^M05 (HL7 v2.7) message. */
export interface ParsedMfLocDept {
  /** The LDP segment. */
  locationDepartment: LDP;
  /** The LCH segments. */
  locationCharacteristics?: LCH[];
  /** The LCC segments. */
  locationChargeCodes?: LCC[];
}

/** Structured result of parsing an HL7 MFN^M05 (HL7 v2.7) message. */
export interface ParsedMFN_M05 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF LOCATION groups. */
  mfLocations: ParsedMfLocation[];
}

/** The segment parsers of MFN^M05 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  LOC: (s, e) => LOC.parse(s, e),
  LCH: (s, e) => LCH.parse(s, e),
  LRL: (s, e) => LRL.parse(s, e),
  LDP: (s, e) => LDP.parse(s, e),
  LCC: (s, e) => LCC.parse(s, e),
};

/** Parser for HL7 MFN^M05 (HL7 v2.7) messages. */
export class MFN_M05_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M05";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M05_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M05> {
    return parseStructure<ParsedMFN_M05>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M05 (HL7 v2.7) message string into a structured result. */
export function parseMFN_M05(messageString: string): Result<ParsedMFN_M05> {
  return new MFN_M05_Parser().parse(messageString);
}
