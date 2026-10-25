/**
 * Parser for RSP^K24 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MSA [ERR] QAK QPD [ QUERY_RESPONSE: PID ] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RSP_K24_STRUCTURE } from "../../structures/v2.5.1/RSP_K24.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { MSA } from "../../segments/v2.5.1/MSA.ts";
import { ERR } from "../../segments/v2.5.1/ERR.ts";
import { QAK } from "../../segments/v2.5.1/QAK.ts";
import { QPD } from "../../segments/v2.5.1/QPD.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { DSC } from "../../segments/v2.5.1/DSC.ts";

/** The QUERY RESPONSE group of a parsed RSP^K24 (HL7 v2.5.1) message. */
export interface ParsedQueryResponse {
  /** The PID segment. */
  patient: PID;
}

/** Structured result of parsing an HL7 RSP^K24 (HL7 v2.5.1) message. */
export interface ParsedRSP_K24 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The QUERY RESPONSE group. */
  queryResponse?: ParsedQueryResponse;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RSP^K24 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RSP^K24 (HL7 v2.5.1) messages. */
export class RSP_K24_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K24";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RSP_K24_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRSP_K24> {
    return parseStructure<ParsedRSP_K24>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RSP^K24 (HL7 v2.5.1) message string into a structured result. */
export function parseRSP_K24(messageString: string): Result<ParsedRSP_K24> {
  return new RSP_K24_Parser().parse(messageString);
}
