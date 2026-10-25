/**
 * Parser for TCR^U11 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EQU { TEST_CONFIGURATION: [SPM] {TCC} } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { TCR_U11_STRUCTURE } from "../../structures/v2.5/TCR_U11.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { EQU } from "../../segments/v2.5/EQU.ts";
import { SPM } from "../../segments/v2.5/SPM.ts";
import { TCC } from "../../segments/v2.5/TCC.ts";
import { ROL } from "../../segments/v2.5/ROL.ts";

/** The TEST CONFIGURATION group of a parsed TCR^U11 (HL7 v2.5) message. */
export interface ParsedTestConfiguration {
  /** The SPM segment. */
  specimen?: SPM;
  /** The TCC segments. */
  testCodeConfigurations: TCC[];
}

/** Structured result of parsing an HL7 TCR^U11 (HL7 v2.5) message. */
export interface ParsedTCR_U11 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The TEST CONFIGURATION groups. */
  testConfigurations: ParsedTestConfiguration[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of TCR^U11 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  EQU: (s, e) => EQU.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  TCC: (s, e) => TCC.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 TCR^U11 (HL7 v2.5) messages. */
export class TCR_U11_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "TCR_U11";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = TCR_U11_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedTCR_U11> {
    return parseStructure<ParsedTCR_U11>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 TCR^U11 (HL7 v2.5) message string into a structured result. */
export function parseTCR_U11(messageString: string): Result<ParsedTCR_U11> {
  return new TCR_U11_Parser().parse(messageString);
}
