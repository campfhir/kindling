/**
 * Parser for NMR^N01 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [{ERR}] [QRD] { CLOCK_AND_STATS_WITH_NOTES_ALT: [NCK] [{NTE}] [NST] [{NTE}] [NSC] [{NTE}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { NMR_N01_STRUCTURE } from "../../structures/v2.3/NMR_N01.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { ERR } from "../../segments/v2.3/ERR.ts";
import { QRD } from "../../segments/v2.3/QRD.ts";
import { NCK } from "../../segments/v2.3/NCK.ts";
import { NTE } from "../../segments/v2.3/NTE.ts";
import { NST } from "../../segments/v2.3/NST.ts";
import { NSC } from "../../segments/v2.3/NSC.ts";

/** The CLOCK AND STATS WITH NOTES ALT group of a parsed NMR^N01 (HL7 v2.3) message. */
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

/** Structured result of parsing an HL7 NMR^N01 (HL7 v2.3) message. */
export interface ParsedNMR_N01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The QRD segment. */
  query?: QRD;
  /** The CLOCK AND STATS WITH NOTES ALT groups. */
  clockAndStatistics: ParsedClockAndStatistics[];
}

/** The segment parsers of NMR^N01 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  NCK: (s, e) => NCK.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  NST: (s, e) => NST.parse(s, e),
  NSC: (s, e) => NSC.parse(s, e),
};

/** Parser for HL7 NMR^N01 (HL7 v2.3) messages. */
export class NMR_N01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "NMR_N01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = NMR_N01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedNMR_N01> {
    return parseStructure<ParsedNMR_N01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 NMR^N01 (HL7 v2.3) message string into a structured result. */
export function parseNMR_N01(messageString: string): Result<ParsedNMR_N01> {
  return new NMR_N01_Parser().parse(messageString);
}
