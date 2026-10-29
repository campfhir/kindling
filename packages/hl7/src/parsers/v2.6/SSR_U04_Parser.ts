/**
 * Parser for SSR^U04 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EQU { SPECIMEN_CONTAINER: SAC [{SPM}] } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { SSR_U04_STRUCTURE } from "../../structures/v2.6/SSR_U04.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { EQU } from "../../segments/v2.6/EQU.ts";
import { SAC } from "../../segments/v2.6/SAC.ts";
import { SPM } from "../../segments/v2.6/SPM.ts";
import { ROL } from "../../segments/v2.6/ROL.ts";

/** The SPECIMEN CONTAINER group of a parsed SSR^U04 (HL7 v2.6) message. */
export interface ParsedSpecimenContainer {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The SPM segments. */
  specimens?: SPM[];
}

/** Structured result of parsing an HL7 SSR^U04 (HL7 v2.6) message. */
export interface ParsedSSR_U04 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The SPECIMEN CONTAINER groups. */
  specimenContainers: ParsedSpecimenContainer[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of SSR^U04 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EQU: (s, e) => EQU.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 SSR^U04 (HL7 v2.6) messages. */
export class SSR_U04_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SSR_U04";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SSR_U04_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSSR_U04> {
    return parseStructure<ParsedSSR_U04>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SSR^U04 (HL7 v2.6) message string into a structured result. */
export function parseSSR_U04(messageString: string): Result<ParsedSSR_U04> {
  return new SSR_U04_Parser().parse(messageString);
}
