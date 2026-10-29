/**
 * Parser for MFN^M02 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_STAFF: MFE STF [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}] [{NTE}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFN_M02_STRUCTURE } from "../../structures/v2.7/MFN_M02.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { MFI } from "../../segments/v2.7/MFI.ts";
import { MFE } from "../../segments/v2.7/MFE.ts";
import { STF } from "../../segments/v2.7/STF.ts";
import { PRA } from "../../segments/v2.7/PRA.ts";
import { ORG } from "../../segments/v2.7/ORG.ts";
import { AFF } from "../../segments/v2.7/AFF.ts";
import { LAN } from "../../segments/v2.7/LAN.ts";
import { EDU } from "../../segments/v2.7/EDU.ts";
import { CER } from "../../segments/v2.7/CER.ts";
import { NTE } from "../../segments/v2.7/NTE.ts";

/** The MF STAFF group of a parsed MFN^M02 (HL7 v2.7) message. */
export interface ParsedMfStaff {
  /** The MFE segment. */
  entry: MFE;
  /** The STF segment. */
  staff: STF;
  /** The PRA segments. */
  practitioners?: PRA[];
  /** The ORG segments. */
  organizationUnits?: ORG[];
  /** The AFF segments. */
  affiliations?: AFF[];
  /** The LAN segments. */
  languages?: LAN[];
  /** The EDU segments. */
  educations?: EDU[];
  /** The CER segments. */
  certificates?: CER[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 MFN^M02 (HL7 v2.7) message. */
export interface ParsedMFN_M02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF STAFF groups. */
  mfStaffs: ParsedMfStaff[];
}

/** The segment parsers of MFN^M02 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  STF: (s, e) => STF.parse(s, e),
  PRA: (s, e) => PRA.parse(s, e),
  ORG: (s, e) => ORG.parse(s, e),
  AFF: (s, e) => AFF.parse(s, e),
  LAN: (s, e) => LAN.parse(s, e),
  EDU: (s, e) => EDU.parse(s, e),
  CER: (s, e) => CER.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
};

/** Parser for HL7 MFN^M02 (HL7 v2.7) messages. */
export class MFN_M02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M02> {
    return parseStructure<ParsedMFN_M02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M02 (HL7 v2.7) message string into a structured result. */
export function parseMFN_M02(messageString: string): Result<ParsedMFN_M02> {
  return new MFN_M02_Parser().parse(messageString);
}
