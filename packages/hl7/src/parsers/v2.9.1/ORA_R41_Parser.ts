/**
 * Parser for ORA^R41 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] [{PRT}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ORA_R41_STRUCTURE } from "../../structures/v2.9.1/ORA_R41.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { MSA } from "../../segments/v2.9.1/MSA.ts";
import { ERR } from "../../segments/v2.9.1/ERR.ts";
import { PRT } from "../../segments/v2.9.1/PRT.ts";

/** Structured result of parsing an HL7 ORA^R41 (HL7 v2.9.1) message. */
export interface ParsedORA_R41 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The segment parsers of ORA^R41 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
};

/** Parser for HL7 ORA^R41 (HL7 v2.9.1) messages. */
export class ORA_R41_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORA_R41";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORA_R41_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORA_R41> {
    return parseStructure<ParsedORA_R41>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORA^R41 (HL7 v2.9.1) message string into a structured result. */
export function parseORA_R41(messageString: string): Result<ParsedORA_R41> {
  return new ORA_R41_Parser().parse(messageString);
}
