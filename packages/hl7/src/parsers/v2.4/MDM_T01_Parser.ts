/**
 * Parser for MDM^T01 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID PV1 TXA
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MDM_T01_STRUCTURE } from "../../structures/v2.4/MDM_T01.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { EVN } from "../../segments/v2.4/EVN.ts";
import { PID } from "../../segments/v2.4/PID.ts";
import { PV1 } from "../../segments/v2.4/PV1.ts";
import { TXA } from "../../segments/v2.4/TXA.ts";

/** Structured result of parsing an HL7 MDM^T01 (HL7 v2.4) message. */
export interface ParsedMDM_T01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit: PV1;
  /** The TXA segment. */
  document: TXA;
}

/** The segment parsers of MDM^T01 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  TXA: (s, e) => TXA.parse(s, e),
};

/** Parser for HL7 MDM^T01 (HL7 v2.4) messages. */
export class MDM_T01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MDM_T01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MDM_T01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMDM_T01> {
    return parseStructure<ParsedMDM_T01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MDM^T01 (HL7 v2.4) message string into a structured result. */
export function parseMDM_T01(messageString: string): Result<ParsedMDM_T01> {
  return new MDM_T01_Parser().parse(messageString);
}
