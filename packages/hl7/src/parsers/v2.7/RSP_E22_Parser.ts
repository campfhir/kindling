/**
 * Parser for RSP^E22 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [{UAC}] MSA [{ERR}]  QUERY_ACK: QAK QPD [ AUTHORIZATION_INFO: IVC PSG { PSL_ITEM_INFO: PSL } ] 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RSP_E22_STRUCTURE } from "../../structures/v2.7/RSP_E22.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { MSA } from "../../segments/v2.7/MSA.ts";
import { ERR } from "../../segments/v2.7/ERR.ts";
import { QAK } from "../../segments/v2.7/QAK.ts";
import { QPD } from "../../segments/v2.7/QPD.ts";
import { IVC } from "../../segments/v2.7/IVC.ts";
import { PSG } from "../../segments/v2.7/PSG.ts";
import { PSL } from "../../segments/v2.7/PSL.ts";

/** The QUERY ACK group of a parsed RSP^E22 (HL7 v2.7) message. */
export interface ParsedQueryAck {
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The AUTHORIZATION INFO group. */
  authorizationInfo?: ParsedAuthorizationInfo;
}

/** The AUTHORIZATION INFO group of a parsed RSP^E22 (HL7 v2.7) message. */
export interface ParsedAuthorizationInfo {
  /** The IVC segment. */
  ivc: IVC;
  /** The PSG segment. */
  psg: PSG;
  /** The PSL ITEM INFO groups. */
  pslItemInfos: ParsedPslItemInfo[];
}

/** The PSL ITEM INFO group of a parsed RSP^E22 (HL7 v2.7) message. */
export interface ParsedPslItemInfo {
  /** The PSL segment. */
  psl: PSL;
}

/** Structured result of parsing an HL7 RSP^E22 (HL7 v2.7) message. */
export interface ParsedRSP_E22 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The QUERY ACK group. */
  queryAck: ParsedQueryAck;
}

/** The segment parsers of RSP^E22 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  IVC: (s, e) => IVC.parse(s, e),
  PSG: (s, e) => PSG.parse(s, e),
  PSL: (s, e) => PSL.parse(s, e),
};

/** Parser for HL7 RSP^E22 (HL7 v2.7) messages. */
export class RSP_E22_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_E22";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RSP_E22_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRSP_E22> {
    return parseStructure<ParsedRSP_E22>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RSP^E22 (HL7 v2.7) message string into a structured result. */
export function parseRSP_E22(messageString: string): Result<ParsedRSP_E22> {
  return new RSP_E22_Parser().parse(messageString);
}
