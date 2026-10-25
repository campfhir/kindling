/**
 * Parser for EDR^R07 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] QAK {DSP} [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { EDR_R07_STRUCTURE } from "../../structures/v2.3/EDR_R07.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { ERR } from "../../segments/v2.3/ERR.ts";
import { QAK } from "../../segments/v2.3/QAK.ts";
import { DSP } from "../../segments/v2.3/DSP.ts";
import { DSC } from "../../segments/v2.3/DSC.ts";

/** Structured result of parsing an HL7 EDR^R07 (HL7 v2.3) message. */
export interface ParsedEDR_R07 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The DSP segments. */
  displayLines: DSP[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of EDR^R07 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  DSP: (s, e) => DSP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 EDR^R07 (HL7 v2.3) messages. */
export class EDR_R07_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EDR_R07";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EDR_R07_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEDR_R07> {
    return parseStructure<ParsedEDR_R07>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EDR^R07 (HL7 v2.3) message string into a structured result. */
export function parseEDR_R07(messageString: string): Result<ParsedEDR_R07> {
  return new EDR_R07_Parser().parse(messageString);
}
