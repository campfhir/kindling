/**
 * Parser for RSP^E03 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}] MSA [{ERR}]  QUERY_ACK: QAK QPD [{ INVOICE_PROCESSING_RESULTS_INFO: IPR }] 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RSP_E03_STRUCTURE } from "../../structures/v2.6/RSP_E03.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { ERR } from "../../segments/v2.6/ERR.ts";
import { QAK } from "../../segments/v2.6/QAK.ts";
import { QPD } from "../../segments/v2.6/QPD.ts";
import { IPR } from "../../segments/v2.6/IPR.ts";

/** The QUERY ACK group of a parsed RSP^E03 (HL7 v2.6) message. */
export interface ParsedQueryAck {
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The INVOICE PROCESSING RESULTS INFO groups. */
  invoiceProcessingResultsInfos?: ParsedInvoiceProcessingResultsInfo[];
}

/** The INVOICE PROCESSING RESULTS INFO group of a parsed RSP^E03 (HL7 v2.6) message. */
export interface ParsedInvoiceProcessingResultsInfo {
  /** The IPR segment. */
  ipr: IPR;
}

/** Structured result of parsing an HL7 RSP^E03 (HL7 v2.6) message. */
export interface ParsedRSP_E03 extends ParsedMessageBase {
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

/** The segment parsers of RSP^E03 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  IPR: (s, e) => IPR.parse(s, e),
};

/** Parser for HL7 RSP^E03 (HL7 v2.6) messages. */
export class RSP_E03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_E03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RSP_E03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRSP_E03> {
    return parseStructure<ParsedRSP_E03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RSP^E03 (HL7 v2.6) message string into a structured result. */
export function parseRSP_E03(messageString: string): Result<ParsedRSP_E03> {
  return new RSP_E03_Parser().parse(messageString);
}
