/**
 * Parser for MFR^M02 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MSA [{ERR}] [QAK] QRD [QRF] MFI { MF_QUERY: MFE STF [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}] [{NTE}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFR_M02_STRUCTURE } from "../../structures/v2.5.1/MFR_M02.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { MSA } from "../../segments/v2.5.1/MSA.ts";
import { ERR } from "../../segments/v2.5.1/ERR.ts";
import { QAK } from "../../segments/v2.5.1/QAK.ts";
import { QRD } from "../../segments/v2.5.1/QRD.ts";
import { QRF } from "../../segments/v2.5.1/QRF.ts";
import { MFI } from "../../segments/v2.5.1/MFI.ts";
import { MFE } from "../../segments/v2.5.1/MFE.ts";
import { STF } from "../../segments/v2.5.1/STF.ts";
import { PRA } from "../../segments/v2.5.1/PRA.ts";
import { ORG } from "../../segments/v2.5.1/ORG.ts";
import { AFF } from "../../segments/v2.5.1/AFF.ts";
import { LAN } from "../../segments/v2.5.1/LAN.ts";
import { EDU } from "../../segments/v2.5.1/EDU.ts";
import { CER } from "../../segments/v2.5.1/CER.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { DSC } from "../../segments/v2.5.1/DSC.ts";

/** The MF QUERY group of a parsed MFR^M02 (HL7 v2.5.1) message. */
export interface ParsedStaffEntry {
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

/** Structured result of parsing an HL7 MFR^M02 (HL7 v2.5.1) message. */
export interface ParsedMFR_M02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
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
  entries: ParsedStaffEntry[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of MFR^M02 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
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
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 MFR^M02 (HL7 v2.5.1) messages. */
export class MFR_M02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFR_M02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFR_M02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFR_M02> {
    return parseStructure<ParsedMFR_M02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFR^M02 (HL7 v2.5.1) message string into a structured result. */
export function parseMFR_M02(messageString: string): Result<ParsedMFR_M02> {
  return new MFR_M02_Parser().parse(messageString);
}
