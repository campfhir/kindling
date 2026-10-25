/**
 * Parser for DOC^T12 messages (HL7 v2.5.1).
 *
 * Structure: MSH MSA [ERR] [QAK] QRD { RESULT: [EVN] PID PV1 TXA [{OBX}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { DOC_T12_STRUCTURE } from "../../structures/v2.5.1/DOC_T12.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { MSA } from "../../segments/v2.5.1/MSA.ts";
import { ERR } from "../../segments/v2.5.1/ERR.ts";
import { QAK } from "../../segments/v2.5.1/QAK.ts";
import { QRD } from "../../segments/v2.5.1/QRD.ts";
import { EVN } from "../../segments/v2.5.1/EVN.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { TXA } from "../../segments/v2.5.1/TXA.ts";
import { OBX } from "../../segments/v2.5.1/OBX.ts";
import { DSC } from "../../segments/v2.5.1/DSC.ts";

/** The RESULT group of a parsed DOC^T12 (HL7 v2.5.1) message. */
export interface ParsedResult {
  /** The EVN segment. */
  event?: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit: PV1;
  /** The TXA segment. */
  document: TXA;
  /** The OBX segments. */
  observations?: OBX[];
}

/** Structured result of parsing an HL7 DOC^T12 (HL7 v2.5.1) message. */
export interface ParsedDOC_T12 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The QRD segment. */
  query: QRD;
  /** The RESULT groups. */
  results: ParsedResult[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of DOC^T12 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  TXA: (s, e) => TXA.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 DOC^T12 (HL7 v2.5.1) messages. */
export class DOC_T12_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DOC_T12";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = DOC_T12_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedDOC_T12> {
    return parseStructure<ParsedDOC_T12>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 DOC^T12 (HL7 v2.5.1) message string into a structured result. */
export function parseDOC_T12(messageString: string): Result<ParsedDOC_T12> {
  return new DOC_T12_Parser().parse(messageString);
}
