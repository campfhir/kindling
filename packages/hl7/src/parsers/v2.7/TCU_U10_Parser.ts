/**
 * Parser for TCU^U10 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EQU { TEST_CONFIGURATION: [SPM] {TCC} } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { TCU_U10_STRUCTURE } from "../../structures/v2.7/TCU_U10.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { EQU } from "../../segments/v2.7/EQU.ts";
import { SPM } from "../../segments/v2.7/SPM.ts";
import { TCC } from "../../segments/v2.7/TCC.ts";
import { ROL } from "../../segments/v2.7/ROL.ts";

/** The TEST CONFIGURATION group of a parsed TCU^U10 (HL7 v2.7) message. */
export interface ParsedTestConfiguration {
  /** The SPM segment. */
  specimen?: SPM;
  /** The TCC segments. */
  testCodeConfigurations: TCC[];
}

/** Structured result of parsing an HL7 TCU^U10 (HL7 v2.7) message. */
export interface ParsedTCU_U10 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The TEST CONFIGURATION groups. */
  testConfigurations: ParsedTestConfiguration[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of TCU^U10 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EQU: (s, e) => EQU.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  TCC: (s, e) => TCC.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 TCU^U10 (HL7 v2.7) messages. */
export class TCU_U10_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "TCU_U10";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = TCU_U10_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedTCU_U10> {
    return parseStructure<ParsedTCU_U10>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 TCU^U10 (HL7 v2.7) message string into a structured result. */
export function parseTCU_U10(messageString: string): Result<ParsedTCU_U10> {
  return new TCU_U10_Parser().parse(messageString);
}
