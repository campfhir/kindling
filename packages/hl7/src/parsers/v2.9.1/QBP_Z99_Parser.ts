/**
 * Parser for QBP^Z99 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] QPD [PID] [RDF] RCP [RDF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { QBP_Z99_STRUCTURE } from "../../structures/v2.9.1/QBP_Z99.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { QPD } from "../../segments/v2.9.1/QPD.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { RDF } from "../../segments/v2.9.1/RDF.ts";
import { RCP } from "../../segments/v2.9.1/RCP.ts";
import { DSC } from "../../segments/v2.9.1/DSC.ts";

/** Structured result of parsing an HL7 QBP^Z99 (HL7 v2.9.1) message. */
export interface ParsedQBP_Z99 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The PID segment. */
  patient?: PID;
  /** The RDF segment. */
  rowDefinition?: RDF;
  /** The RCP segment. */
  responseControl: RCP;
  /** The RDF segment. */
  rdf2?: RDF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of QBP^Z99 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  RDF: (s, e) => RDF.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 QBP^Z99 (HL7 v2.9.1) messages. */
export class QBP_Z99_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QBP_Z99";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QBP_Z99_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQBP_Z99> {
    return parseStructure<ParsedQBP_Z99>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QBP^Z99 (HL7 v2.9.1) message string into a structured result. */
export function parseQBP_Z99(messageString: string): Result<ParsedQBP_Z99> {
  return new QBP_Z99_Parser().parse(messageString);
}
