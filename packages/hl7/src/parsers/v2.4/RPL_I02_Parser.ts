/**
 * Parser for RPL^I02 messages (HL7 v2.4).
 *
 * Structure: MSH MSA { PROVIDER: PRD [{CTD}] } [{NTE}] [{DSP}] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RPL_I02_STRUCTURE } from "../../structures/v2.4/RPL_I02.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { MSA } from "../../segments/v2.4/MSA.ts";
import { PRD } from "../../segments/v2.4/PRD.ts";
import { CTD } from "../../segments/v2.4/CTD.ts";
import { NTE } from "../../segments/v2.4/NTE.ts";
import { DSP } from "../../segments/v2.4/DSP.ts";
import { DSC } from "../../segments/v2.4/DSC.ts";

/** The PROVIDER group of a parsed RPL^I02 (HL7 v2.4) message. */
export interface ParsedProvider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** Structured result of parsing an HL7 RPL^I02 (HL7 v2.4) message. */
export interface ParsedRPL_I02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
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

/** The segment parsers of RPL^I02 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  DSP: (s, e) => DSP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RPL^I02 (HL7 v2.4) messages. */
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

/** Parses an HL7 RPL^I02 (HL7 v2.4) message string into a structured result. */
export function parseRPL_I02(messageString: string): Result<ParsedRPL_I02> {
  return new RPL_I02_Parser().parse(messageString);
}
