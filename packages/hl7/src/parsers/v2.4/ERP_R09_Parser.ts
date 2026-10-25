/**
 * Parser for ERP^R09 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] QAK ERQ [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ERP_R09_STRUCTURE } from "../../structures/v2.4/ERP_R09.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { MSA } from "../../segments/v2.4/MSA.ts";
import { ERR } from "../../segments/v2.4/ERR.ts";
import { QAK } from "../../segments/v2.4/QAK.ts";
import { ERQ } from "../../segments/v2.4/ERQ.ts";
import { DSC } from "../../segments/v2.4/DSC.ts";

/** Structured result of parsing an HL7 ERP^R09 (HL7 v2.4) message. */
export interface ParsedERP_R09 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The ERQ segment. */
  eventReplayQuery: ERQ;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of ERP^R09 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  ERQ: (s, e) => ERQ.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 ERP^R09 (HL7 v2.4) messages. */
export class ERP_R09_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ERP_R09";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ERP_R09_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedERP_R09> {
    return parseStructure<ParsedERP_R09>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ERP^R09 (HL7 v2.4) message string into a structured result. */
export function parseERP_R09(messageString: string): Result<ParsedERP_R09> {
  return new ERP_R09_Parser().parse(messageString);
}
