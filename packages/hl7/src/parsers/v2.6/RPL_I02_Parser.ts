/**
 * Parser for RPL^I02 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA { PROVIDER: PRD [{CTD}] } [{NTE}] [{DSP}] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RPL_I02_STRUCTURE } from "../../structures/v2.6/RPL_I02.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { PRD } from "../../segments/v2.6/PRD.ts";
import { CTD } from "../../segments/v2.6/CTD.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";
import { DSP } from "../../segments/v2.6/DSP.ts";
import { DSC } from "../../segments/v2.6/DSC.ts";

/** The PROVIDER group of a parsed RPL^I02 (HL7 v2.6) message. */
export interface ParsedProvider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** Structured result of parsing an HL7 RPL^I02 (HL7 v2.6) message. */
export interface ParsedRPL_I02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The PROVIDER groups. */
  providers: ParsedProvider[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The DSP segments. */
  displayLines?: DSP[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RPL^I02 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  DSP: (s, e) => DSP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RPL^I02 (HL7 v2.6) messages. */
export class RPL_I02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RPL_I02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RPL_I02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRPL_I02> {
    return parseStructure<ParsedRPL_I02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RPL^I02 (HL7 v2.6) message string into a structured result. */
export function parseRPL_I02(messageString: string): Result<ParsedRPL_I02> {
  return new RPL_I02_Parser().parse(messageString);
}
