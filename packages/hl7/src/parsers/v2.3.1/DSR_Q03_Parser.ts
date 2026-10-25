/**
 * Parser for DSR^Q03 messages (HL7 v2.3.1).
 *
 * Structure: MSH [MSA] [ERR] [QAK] QRD [QRF] {DSP} [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { DSR_Q03_STRUCTURE } from "../../structures/v2.3.1/DSR_Q03.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { MSA } from "../../segments/v2.3.1/MSA.ts";
import { ERR } from "../../segments/v2.3.1/ERR.ts";
import { QAK } from "../../segments/v2.3.1/QAK.ts";
import { QRD } from "../../segments/v2.3.1/QRD.ts";
import { QRF } from "../../segments/v2.3.1/QRF.ts";
import { DSP } from "../../segments/v2.3.1/DSP.ts";
import { DSC } from "../../segments/v2.3.1/DSC.ts";

/** Structured result of parsing an HL7 DSR^Q03 (HL7 v2.3.1) message. */
export interface ParsedDSR_Q03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment?: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSP segments. */
  displayLines: DSP[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of DSR^Q03 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  DSP: (s, e) => DSP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 DSR^Q03 (HL7 v2.3.1) messages. */
export class DSR_Q03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DSR_Q03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = DSR_Q03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedDSR_Q03> {
    return parseStructure<ParsedDSR_Q03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 DSR^Q03 (HL7 v2.3.1) message string into a structured result. */
export function parseDSR_Q03(messageString: string): Result<ParsedDSR_Q03> {
  return new DSR_Q03_Parser().parse(messageString);
}
