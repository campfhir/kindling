/**
 * Builder, parser and structure for NMD^N01 messages (HL7 v2.2).
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

/** The segments, choices and groups of NMD^N01 (HL7 v2.2), in order. */
export const NMD_N01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  {
    name: "CLOCK_AND_STATS_WITH_NOTES",
    required: true,
    repeating: true,
    segments: [
      {
        name: "CLOCK",
        required: false,
        repeating: false,
        segments: [
          { name: "NCK", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "APP_STATS",
        required: false,
        repeating: false,
        segments: [
          { name: "NST", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "APP_STATUS",
        required: false,
        repeating: false,
        segments: [
          { name: "NSC", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The CLOCK AND STATS WITH NOTES group of a parsed NMD^N01 (HL7 v2.2) message. */
export interface ParsedClockAndStatsWithNotes {
  /** The CLOCK group. */
  clock?: ParsedClock;
  /** The APP STATS group. */
  appStats?: ParsedAppStats;
  /** The APP STATUS group. */
  appStatus?: ParsedAppStatus;
}

/** The CLOCK group of a parsed NMD^N01 (HL7 v2.2) message. */
export interface ParsedClock {
  /** The NCK segment. */
  systemClock: NCK;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The APP STATS group of a parsed NMD^N01 (HL7 v2.2) message. */
export interface ParsedAppStats {
  /** The NST segment. */
  applicationStatistics: NST;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The APP STATUS group of a parsed NMD^N01 (HL7 v2.2) message. */
export interface ParsedAppStatus {
  /** The NSC segment. */
  applicationStatus: NSC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 NMD^N01 (HL7 v2.2) message. */
export interface ParsedNMD_N01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The CLOCK AND STATS WITH NOTES groups. */
  clockAndStatsWithNotes: ParsedClockAndStatsWithNotes[];
}

/** The segment parsers of NMD^N01 (HL7 v2.2). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  NCK: (s, e) => NCK.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  NST: (s, e) => NST.parse(s, e),
  NSC: (s, e) => NSC.parse(s, e),
};

/** Parser for HL7 NMD^N01 (HL7 v2.2) messages. */
export class NMD_N01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "NMD_N01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = NMD_N01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedNMD_N01> {
    return parseStructure<ParsedNMD_N01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 NMD^N01 (HL7 v2.2) message string into a structured result. */
export function parseNMD_N01(messageString: string): Result<ParsedNMD_N01> {
  return new NMD_N01_Parser().parse(messageString);
}

/** The CLOCK AND STATS WITH NOTES group of an NMD^N01 (HL7 v2.2) message being built. */
export interface ClockAndStatsWithNotesGroup {
  /** The CLOCK group. */
  clock?: ClockGroup;
  /** The APP STATS group. */
  appStats?: AppStatsGroup;
  /** The APP STATUS group. */
  appStatus?: AppStatusGroup;
}

/** The CLOCK group of an NMD^N01 (HL7 v2.2) message being built. */
export interface ClockGroup {
  /** The NCK segment. */
  systemClock: NCK;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The APP STATS group of an NMD^N01 (HL7 v2.2) message being built. */
export interface AppStatsGroup {
  /** The NST segment. */
  applicationStatistics: NST;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The APP STATUS group of an NMD^N01 (HL7 v2.2) message being built. */
export interface AppStatusGroup {
  /** The NSC segment. */
  applicationStatus: NSC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an NMD^N01 (HL7 v2.2) message. The message has none. */
export type NMD_N01Options = Record<string, never>;

/** Builder for HL7 NMD^N01 (HL7 v2.2) messages. */
export class NMD_N01<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "NMD_N01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = NMD_N01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public clockAndStatsWithNotes: ClockAndStatsWithNotesGroup[],
    public options: NMD_N01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, clockAndStatsWithNotes: this.clockAndStatsWithNotes };
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

/** Builds an HL7 NMD^N01 (HL7 v2.2) message. */
export function createNMD_N01<TMSH extends MSH = MSH>(
  header: TMSH,
  clockAndStatsWithNotes: ClockAndStatsWithNotesGroup[],
  options: NMD_N01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): NMD_N01<TMSH> {
  return new NMD_N01(header, clockAndStatsWithNotes, options, encoding);
}
