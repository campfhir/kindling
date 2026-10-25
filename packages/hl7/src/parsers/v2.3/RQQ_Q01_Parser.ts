/**
 * Parser for RQQ^Q01 messages (HL7 v2.3).
 *
 * Structure: MSH ERQ [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RQQ_Q01_STRUCTURE } from "../../structures/v2.3/RQQ_Q01.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { ERQ } from "../../segments/v2.3/ERQ.ts";
import { DSC } from "../../segments/v2.3/DSC.ts";

/** Structured result of parsing an HL7 RQQ^Q01 (HL7 v2.3) message. */
export interface ParsedRQQ_Q01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The ERQ segment. */
  eventReplayQuery: ERQ;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RQQ^Q01 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  ERQ: (s, e) => ERQ.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RQQ^Q01 (HL7 v2.3) messages. */
export class RQQ_Q01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RQQ_Q01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RQQ_Q01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRQQ_Q01> {
    return parseStructure<ParsedRQQ_Q01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RQQ^Q01 (HL7 v2.3) message string into a structured result. */
export function parseRQQ_Q01(messageString: string): Result<ParsedRQQ_Q01> {
  return new RQQ_Q01_Parser().parse(messageString);
}
