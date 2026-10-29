/**
 * Builder, parser and structure for NMR^N01 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] [QRD] { CLOCK_AND_STATS_WITH_NOTES_ALT: [NCK] [{NTE}] [NST] [{NTE}] [NSC] [{NTE}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { MSA } from "../../segments/v2.4/MSA.ts";
import { ERR } from "../../segments/v2.4/ERR.ts";
import { QRD } from "../../segments/v2.4/QRD.ts";
import { NCK } from "../../segments/v2.4/NCK.ts";
import { NTE } from "../../segments/v2.4/NTE.ts";
import { NST } from "../../segments/v2.4/NST.ts";
import { NSC } from "../../segments/v2.4/NSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of NMR^N01 (HL7 v2.4), in order. */
export const NMR_N01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QRD", required: false, repeating: false },
  {
    name: "CLOCK_AND_STATS_WITH_NOTES_ALT",
    required: true,
    repeating: true,
    as: "clockAndStatistics",
    segments: [
      { name: "NCK", required: false, repeating: false },
      { name: "NTE", required: false, repeating: true, as: "clockNotes" },
      { name: "NST", required: false, repeating: false },
      { name: "NTE", required: false, repeating: true, as: "statisticsNotes" },
      { name: "NSC", required: false, repeating: false },
      { name: "NTE", required: false, repeating: true, as: "statusNotes" },
    ],
  },
];

/** The CLOCK AND STATS WITH NOTES ALT group of a parsed NMR^N01 (HL7 v2.4) message. */
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

/** Structured result of parsing an HL7 NMR^N01 (HL7 v2.4) message. */
export interface ParsedNMR_N01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QRD segment. */
  query?: QRD;
  /** The CLOCK AND STATS WITH NOTES ALT groups. */
  clockAndStatistics: ParsedClockAndStatistics[];
}

/** The segment parsers of NMR^N01 (HL7 v2.4). */
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

/** Parser for HL7 NMR^N01 (HL7 v2.4) messages. */
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

/** Parses an HL7 NMR^N01 (HL7 v2.4) message string into a structured result. */
export function parseNMR_N01(messageString: string): Result<ParsedNMR_N01> {
  return new NMR_N01_Parser().parse(messageString);
}

/** The CLOCK AND STATS WITH NOTES ALT group of an NMR^N01 (HL7 v2.4) message being built. */
export interface ClockAndStatistics {
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

/** The optional segments and groups of an NMR^N01 (HL7 v2.4) message. */
export interface NMR_N01Options {
  /** The ERR segment. */
  error?: ERR;
  /** The QRD segment. */
  query?: QRD;
}

/** Builder for HL7 NMR^N01 (HL7 v2.4) messages. */
export class NMR_N01<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "NMR_N01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = NMR_N01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public clockAndStatistics: ClockAndStatistics[],
    public options: NMR_N01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, clockAndStatistics: this.clockAndStatistics };
  }

  /** Validates the message structure, returning a result. */
  verify(): { valid: boolean; errors: string[] } {
    const errors = verifyStructure(this.structure, this.toInput());
    return { valid: errors.length === 0, errors };
  }

  /** Encodes this message to its HL7 wire string. */
  encode(): string {
    const verification = this.verify();
    if (!verification.valid) {
      throw new Error(`Cannot encode invalid ${this.messageName} message:\n${verification.errors.join("\n")}`);
    }
    return encodeStructure(this.structure, this.toInput(), this.encoding);
  }
}

/** Builds an HL7 NMR^N01 (HL7 v2.4) message. */
export function createNMR_N01<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  clockAndStatistics: ClockAndStatistics[],
  options: NMR_N01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): NMR_N01<TMSH, TMSA> {
  return new NMR_N01(header, acknowledgment, clockAndStatistics, options, encoding);
}
