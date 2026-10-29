/**
 * Parser for RSP^K25 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] QAK QPD RCP { STAFF: STF [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RSP_K25_STRUCTURE } from "../../structures/v2.6/RSP_K25.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { ERR } from "../../segments/v2.6/ERR.ts";
import { QAK } from "../../segments/v2.6/QAK.ts";
import { QPD } from "../../segments/v2.6/QPD.ts";
import { RCP } from "../../segments/v2.6/RCP.ts";
import { STF } from "../../segments/v2.6/STF.ts";
import { PRA } from "../../segments/v2.6/PRA.ts";
import { ORG } from "../../segments/v2.6/ORG.ts";
import { AFF } from "../../segments/v2.6/AFF.ts";
import { LAN } from "../../segments/v2.6/LAN.ts";
import { EDU } from "../../segments/v2.6/EDU.ts";
import { CER } from "../../segments/v2.6/CER.ts";
import { DSC } from "../../segments/v2.6/DSC.ts";

/** The STAFF group of a parsed RSP^K25 (HL7 v2.6) message. */
export interface ParsedStaff {
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
}

/** Structured result of parsing an HL7 RSP^K25 (HL7 v2.6) message. */
export interface ParsedRSP_K25 extends ParsedMessageBase {
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
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The RCP segment. */
  responseControl: RCP;
  /** The STAFF groups. */
  staffs: ParsedStaff[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RSP^K25 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
  STF: (s, e) => STF.parse(s, e),
  PRA: (s, e) => PRA.parse(s, e),
  ORG: (s, e) => ORG.parse(s, e),
  AFF: (s, e) => AFF.parse(s, e),
  LAN: (s, e) => LAN.parse(s, e),
  EDU: (s, e) => EDU.parse(s, e),
  CER: (s, e) => CER.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RSP^K25 (HL7 v2.6) messages. */
export class RSP_K25_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K25";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RSP_K25_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRSP_K25> {
    return parseStructure<ParsedRSP_K25>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RSP^K25 (HL7 v2.6) message string into a structured result. */
export function parseRSP_K25(messageString: string): Result<ParsedRSP_K25> {
  return new RSP_K25_Parser().parse(messageString);
}
