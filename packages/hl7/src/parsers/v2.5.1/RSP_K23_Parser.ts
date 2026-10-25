/**
 * Parser for RSP^K23 messages (HL7 v2.5.1).
 *
 * Structure: MSH MSA [ERR] QAK QPD [PID] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RSP_K23_STRUCTURE } from "../../structures/v2.5.1/RSP_K23.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { MSA } from "../../segments/v2.5.1/MSA.ts";
import { ERR } from "../../segments/v2.5.1/ERR.ts";
import { QAK } from "../../segments/v2.5.1/QAK.ts";
import { QPD } from "../../segments/v2.5.1/QPD.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { DSC } from "../../segments/v2.5.1/DSC.ts";

/** Structured result of parsing an HL7 RSP^K23 (HL7 v2.5.1) message. */
export interface ParsedRSP_K23 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The PID segment. */
  patient?: PID;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RSP^K23 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RSP^K23 (HL7 v2.5.1) messages. */
export class RSP_K23_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K23";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RSP_K23_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRSP_K23> {
    return parseStructure<ParsedRSP_K23>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RSP^K23 (HL7 v2.5.1) message string into a structured result. */
export function parseRSP_K23(messageString: string): Result<ParsedRSP_K23> {
  return new RSP_K23_Parser().parse(messageString);
}
