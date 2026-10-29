/**
 * Builder, parser and structure for NMD^N02 messages (HL7 v2.3).
 *
 * Structure: MSH { CLOCK_AND_STATS_WITH_NOTES: [ CLOCK: NCK [{NTE}] ] [ APP_STATS: NST [{NTE}] ] [ APP_STATUS: NSC [{NTE}] ] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { NCK } from "./NCK.ts";
import { NTE } from "./NTE.ts";
import { NST } from "./NST.ts";
import { NSC } from "./NSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of NMD^N02 (HL7 v2.3), in order. */
export const NMD_N02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  {
    name: "CLOCK_AND_STATS_WITH_NOTES",
    required: true,
    repeating: true,
    as: "clockAndStatistics",
    segments: [
      {
        name: "CLOCK",
        required: false,
        repeating: false,
        inline: true,
        segments: [
          { name: "NCK", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true, as: "clockNotes" },
        ],
      },
      {
        name: "APP_STATS",
        required: false,
        repeating: false,
        inline: true,
        segments: [
          { name: "NST", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true, as: "statisticsNotes" },
        ],
      },
      {
        name: "APP_STATUS",
        required: false,
        repeating: false,
        inline: true,
        segments: [
          { name: "NSC", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true, as: "statusNotes" },
        ],
      },
    ],
  },
];

/** The CLOCK AND STATS WITH NOTES group of a parsed NMD^N02 (HL7 v2.3) message. */
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

/** Structured result of parsing an HL7 NMD^N02 (HL7 v2.3) message. */
export interface ParsedNMD_N02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The CLOCK AND STATS WITH NOTES groups. */
  clockAndStatistics: ParsedClockAndStatistics[];
}

/** The segment parsers of NMD^N02 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  NCK: (s, e) => NCK.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  NST: (s, e) => NST.parse(s, e),
  NSC: (s, e) => NSC.parse(s, e),
};

/** Parser for HL7 NMD^N02 (HL7 v2.3) messages. */
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

/** Parses an HL7 NMD^N02 (HL7 v2.3) message string into a structured result. */
export function parseNMD_N02(messageString: string): Result<ParsedNMD_N02> {
  return new NMD_N02_Parser().parse(messageString);
}

/** The CLOCK AND STATS WITH NOTES group of an NMD^N02 (HL7 v2.3) message being built. */
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

/** The optional segments and groups of an NMD^N02 (HL7 v2.3) message. The message has none. */
export type NMD_N02Options = Record<string, never>;

/** Builder for HL7 NMD^N02 (HL7 v2.3) messages. */
export class NMD_N02<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "NMD_N02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = NMD_N02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public clockAndStatistics: ClockAndStatistics[],
    public options: NMD_N02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, clockAndStatistics: this.clockAndStatistics };
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

/** Builds an HL7 NMD^N02 (HL7 v2.3) message. */
export function createNMD_N02<TMSH extends MSH = MSH>(
  header: TMSH,
  clockAndStatistics: ClockAndStatistics[],
  options: NMD_N02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): NMD_N02<TMSH> {
  return new NMD_N02(header, clockAndStatistics, options, encoding);
}
