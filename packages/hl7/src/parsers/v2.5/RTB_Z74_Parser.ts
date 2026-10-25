/**
 * Parser for RTB^Z74 messages (HL7 v2.5).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] QAK QPD [ ROW_DEFINITION: RDF [{RDT}] ] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RTB_Z74_STRUCTURE } from "../../structures/v2.5/RTB_Z74.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { MSA } from "../../segments/v2.5/MSA.ts";
import { ERR } from "../../segments/v2.5/ERR.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { QAK } from "../../segments/v2.5/QAK.ts";
import { QPD } from "../../segments/v2.5/QPD.ts";
import { RDF } from "../../segments/v2.5/RDF.ts";
import { RDT } from "../../segments/v2.5/RDT.ts";
import { DSC } from "../../segments/v2.5/DSC.ts";

/** The ROW DEFINITION group of a parsed RTB^Z74 (HL7 v2.5) message. */
export interface ParsedRowDefinition {
  /** The RDF segment. */
  rowDefinition: RDF;
  /** The RDT segments. */
  rows?: RDT[];
}

/** Structured result of parsing an HL7 RTB^Z74 (HL7 v2.5) message. */
export interface ParsedRTB_Z74 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The ROW DEFINITION group. */
  rowDefinition?: ParsedRowDefinition;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RTB^Z74 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  RDF: (s, e) => RDF.parse(s, e),
  RDT: (s, e) => RDT.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RTB^Z74 (HL7 v2.5) messages. */
export class RTB_Z74_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RTB_Z74";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RTB_Z74_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRTB_Z74> {
    return parseStructure<ParsedRTB_Z74>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RTB^Z74 (HL7 v2.5) message string into a structured result. */
export function parseRTB_Z74(messageString: string): Result<ParsedRTB_Z74> {
  return new RTB_Z74_Parser().parse(messageString);
}
