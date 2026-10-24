/**
 * Parser for ACK messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA [{ERR}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ACK_STRUCTURE } from "../../structures/v2.5/ACK.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { MSA } from "../../segments/v2.5/MSA.ts";
import { ERR } from "../../segments/v2.5/ERR.ts";

/** Structured result of parsing an HL7 ACK (HL7 v2.5) message. */
export interface ParsedACK extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
}

/** The segment parsers of ACK (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
};

/** Parser for HL7 ACK (HL7 v2.5) messages. */
export class ACK_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ACK";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ACK_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedACK> {
    return parseStructure<ParsedACK>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ACK (HL7 v2.5) message string into a structured result. */
export function parseACK(messageString: string): Result<ParsedACK> {
  return new ACK_Parser().parse(messageString);
}
