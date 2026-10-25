/**
 * Parser for QBP^Z77 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] QPD PID RCP [RDF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { QBP_Z77_STRUCTURE } from "../../structures/v2.5.1/QBP_Z77.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { QPD } from "../../segments/v2.5.1/QPD.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { RCP } from "../../segments/v2.5.1/RCP.ts";
import { RDF } from "../../segments/v2.5.1/RDF.ts";
import { DSC } from "../../segments/v2.5.1/DSC.ts";

/** Structured result of parsing an HL7 QBP^Z77 (HL7 v2.5.1) message. */
export interface ParsedQBP_Z77 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The QPD segment. */
  queryParameters: QPD;
  /** The PID segment. */
  patient: PID;
  /** The RCP segment. */
  responseControl: RCP;
  /** The RDF segment. */
  rowDefinition?: RDF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of QBP^Z77 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
  RDF: (s, e) => RDF.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 QBP^Z77 (HL7 v2.5.1) messages. */
export class QBP_Z77_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QBP_Z77";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QBP_Z77_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQBP_Z77> {
    return parseStructure<ParsedQBP_Z77>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QBP^Z77 (HL7 v2.5.1) message string into a structured result. */
export function parseQBP_Z77(messageString: string): Result<ParsedQBP_Z77> {
  return new QBP_Z77_Parser().parse(messageString);
}
