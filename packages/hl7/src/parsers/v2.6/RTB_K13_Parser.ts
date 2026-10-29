/**
 * Parser for RTB^K13 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [ERR] QAK QPD [ ROW_DEFINITION: RDF [{RDT}] ] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RTB_K13_STRUCTURE } from "../../structures/v2.6/RTB_K13.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { ERR } from "../../segments/v2.6/ERR.ts";
import { QAK } from "../../segments/v2.6/QAK.ts";
import { QPD } from "../../segments/v2.6/QPD.ts";
import { RDF } from "../../segments/v2.6/RDF.ts";
import { RDT } from "../../segments/v2.6/RDT.ts";
import { DSC } from "../../segments/v2.6/DSC.ts";

/** The ROW DEFINITION group of a parsed RTB^K13 (HL7 v2.6) message. */
export interface ParsedRowDefinition {
  /** The RDF segment. */
  rowDefinition: RDF;
  /** The RDT segments. */
  rows?: RDT[];
}

/** Structured result of parsing an HL7 RTB^K13 (HL7 v2.6) message. */
export interface ParsedRTB_K13 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The ROW DEFINITION group. */
  rowDefinition?: ParsedRowDefinition;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RTB^K13 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  RDF: (s, e) => RDF.parse(s, e),
  RDT: (s, e) => RDT.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RTB^K13 (HL7 v2.6) messages. */
export class RTB_K13_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RTB_K13";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RTB_K13_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRTB_K13> {
    return parseStructure<ParsedRTB_K13>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RTB^K13 (HL7 v2.6) message string into a structured result. */
export function parseRTB_K13(messageString: string): Result<ParsedRTB_K13> {
  return new RTB_K13_Parser().parse(messageString);
}
