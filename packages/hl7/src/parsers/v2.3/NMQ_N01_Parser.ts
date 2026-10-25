/**
 * Parser for NMQ^N01 messages (HL7 v2.3).
 *
 * Structure: MSH [ QRY_WITH_DETAIL: QRD [QRF] ] { CLOCK_AND_STATISTICS: [NCK] [NST] [NSC] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { NMQ_N01_STRUCTURE } from "../../structures/v2.3/NMQ_N01.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { QRD } from "../../segments/v2.3/QRD.ts";
import { QRF } from "../../segments/v2.3/QRF.ts";
import { NCK } from "../../segments/v2.3/NCK.ts";
import { NST } from "../../segments/v2.3/NST.ts";
import { NSC } from "../../segments/v2.3/NSC.ts";

/** The CLOCK AND STATISTICS group of a parsed NMQ^N01 (HL7 v2.3) message. */
export interface ParsedClockAndStatistics {
  /** The NCK segment. */
  systemClock?: NCK;
  /** The NST segment. */
  applicationStatistics?: NST;
  /** The NSC segment. */
  applicationStatus?: NSC;
}

/** Structured result of parsing an HL7 NMQ^N01 (HL7 v2.3) message. */
export interface ParsedNMQ_N01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The QRD segment. */
  query?: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The CLOCK AND STATISTICS groups. */
  clockAndStatistics: ParsedClockAndStatistics[];
}

/** The segment parsers of NMQ^N01 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  NCK: (s, e) => NCK.parse(s, e),
  NST: (s, e) => NST.parse(s, e),
  NSC: (s, e) => NSC.parse(s, e),
};

/** Parser for HL7 NMQ^N01 (HL7 v2.3) messages. */
export class NMQ_N01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "NMQ_N01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = NMQ_N01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedNMQ_N01> {
    return parseStructure<ParsedNMQ_N01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 NMQ^N01 (HL7 v2.3) message string into a structured result. */
export function parseNMQ_N01(messageString: string): Result<ParsedNMQ_N01> {
  return new NMQ_N01_Parser().parse(messageString);
}
