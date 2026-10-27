/**
 * Parser for RSP^Z84 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [ERR] QAK QPD [ ROW_DEFINITION: RDF [{RDT}] ] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RSP_Z84_STRUCTURE } from "../../structures/v2.9.1/RSP_Z84.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { MSA } from "../../segments/v2.9.1/MSA.ts";
import { ERR } from "../../segments/v2.9.1/ERR.ts";
import { QAK } from "../../segments/v2.9.1/QAK.ts";
import { QPD } from "../../segments/v2.9.1/QPD.ts";
import { RDF } from "../../segments/v2.9.1/RDF.ts";
import { RDT } from "../../segments/v2.9.1/RDT.ts";
import { DSC } from "../../segments/v2.9.1/DSC.ts";

/** The ROW DEFINITION group of a parsed RSP^Z84 (HL7 v2.9.1) message. */
export interface ParsedRowDefinition {
  /** The RDF segment. */
  rowDefinition: RDF;
  /** The RDT segments. */
  rows?: RDT[];
}

/** Structured result of parsing an HL7 RSP^Z84 (HL7 v2.9.1) message. */
export interface ParsedRSP_Z84 extends ParsedMessageBase {
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

/** The segment parsers of RSP^Z84 (HL7 v2.9.1). */
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

/** Parser for HL7 RSP^Z84 (HL7 v2.9.1) messages. */
export class RSP_Z84_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_Z84";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RSP_Z84_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRSP_Z84> {
    return parseStructure<ParsedRSP_Z84>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RSP^Z84 (HL7 v2.9.1) message string into a structured result. */
export function parseRSP_Z84(messageString: string): Result<ParsedRSP_Z84> {
  return new RSP_Z84_Parser().parse(messageString);
}
