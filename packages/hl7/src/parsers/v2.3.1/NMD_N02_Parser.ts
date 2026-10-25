/**
 * Parser for NMD^N02 messages (HL7 v2.3.1).
 *
 * Structure: MSH { CLOCK_AND_STATS_WITH_NOTES: [ CLOCK: NCK [{NTE}] ] [ APP_STATS: NST [{NTE}] ] [ APP_STATUS: NSC [{NTE}] ] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { NMD_N02_STRUCTURE } from "../../structures/v2.3.1/NMD_N02.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { NCK } from "../../segments/v2.3.1/NCK.ts";
import { NTE } from "../../segments/v2.3.1/NTE.ts";
import { NST } from "../../segments/v2.3.1/NST.ts";
import { NSC } from "../../segments/v2.3.1/NSC.ts";

/** The CLOCK AND STATS WITH NOTES group of a parsed NMD^N02 (HL7 v2.3.1) message. */
export interface ParsedClockAndStatistics {
  /** The NCK segment. */
  systemClock?: NCK;
  /** The NTE segments. */
  clockNotes?: NTE[];
  /** The NST segment. */
  applicationStatistics?: NST;
  /** The NTE segments. */
  statisticsNotes?: NTE[];
  /** The NSC segment. */
  applicationStatus?: NSC;
  /** The NTE segments. */
  statusNotes?: NTE[];
}

/** Structured result of parsing an HL7 NMD^N02 (HL7 v2.3.1) message. */
export interface ParsedNMD_N02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The CLOCK AND STATS WITH NOTES groups. */
  clockAndStatistics: ParsedClockAndStatistics[];
}

/** The segment parsers of NMD^N02 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  NCK: (s, e) => NCK.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  NST: (s, e) => NST.parse(s, e),
  NSC: (s, e) => NSC.parse(s, e),
};

/** Parser for HL7 NMD^N02 (HL7 v2.3.1) messages. */
export class NMD_N02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "NMD_N02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = NMD_N02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedNMD_N02> {
    return parseStructure<ParsedNMD_N02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 NMD^N02 (HL7 v2.3.1) message string into a structured result. */
export function parseNMD_N02(messageString: string): Result<ParsedNMD_N02> {
  return new NMD_N02_Parser().parse(messageString);
}
