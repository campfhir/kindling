/**
 * Parser for MFR^M05 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] [QAK] QRD [QRF] MFI { MF_QUERY: MFE LOC [{LCH}] [{LRL}] { LDP_GROUP: LDP [{LCH}] [{LCC}] } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFR_M05_STRUCTURE } from "../../structures/v2.6/MFR_M05.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { ERR } from "../../segments/v2.6/ERR.ts";
import { QAK } from "../../segments/v2.6/QAK.ts";
import { QRD } from "../../segments/v2.6/QRD.ts";
import { QRF } from "../../segments/v2.6/QRF.ts";
import { MFI } from "../../segments/v2.6/MFI.ts";
import { MFE } from "../../segments/v2.6/MFE.ts";
import { LOC } from "../../segments/v2.6/LOC.ts";
import { LCH } from "../../segments/v2.6/LCH.ts";
import { LRL } from "../../segments/v2.6/LRL.ts";
import { LDP } from "../../segments/v2.6/LDP.ts";
import { LCC } from "../../segments/v2.6/LCC.ts";
import { DSC } from "../../segments/v2.6/DSC.ts";

/** The MF QUERY group of a parsed MFR^M05 (HL7 v2.6) message. */
export interface ParsedMfQuery {
  /** The MFE segment. */
  entry: MFE;
  /** The LOC segment. */
  patientLocation: LOC;
  /** The LCH segments. */
  locationCharacteristics?: LCH[];
  /** The LRL segments. */
  locationRelationships?: LRL[];
  /** The LDP GROUP groups. */
  ldpGroups: ParsedLdpGroup[];
}

/** The LDP GROUP group of a parsed MFR^M05 (HL7 v2.6) message. */
export interface ParsedLdpGroup {
  /** The LDP segment. */
  locationDepartment: LDP;
  /** The LCH segments. */
  locationCharacteristics?: LCH[];
  /** The LCC segments. */
  locationChargeCodes?: LCC[];
}

/** Structured result of parsing an HL7 MFR^M05 (HL7 v2.6) message. */
export interface ParsedMFR_M05 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF QUERY groups. */
  mfQuerys: ParsedMfQuery[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of MFR^M05 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  LOC: (s, e) => LOC.parse(s, e),
  LCH: (s, e) => LCH.parse(s, e),
  LRL: (s, e) => LRL.parse(s, e),
  LDP: (s, e) => LDP.parse(s, e),
  LCC: (s, e) => LCC.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 MFR^M05 (HL7 v2.6) messages. */
export class MFR_M05_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFR_M05";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFR_M05_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFR_M05> {
    return parseStructure<ParsedMFR_M05>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFR^M05 (HL7 v2.6) message string into a structured result. */
export function parseMFR_M05(messageString: string): Result<ParsedMFR_M05> {
  return new MFR_M05_Parser().parse(messageString);
}
