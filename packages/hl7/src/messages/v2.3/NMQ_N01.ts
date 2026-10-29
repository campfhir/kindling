/**
 * Builder, parser and structure for NMQ^N01 messages (HL7 v2.3).
 *
 * Structure: MSH [ QRY_WITH_DETAIL: QRD [QRF] ] { CLOCK_AND_STATISTICS: [NCK] [NST] [NSC] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { QRD } from "../../segments/v2.3/QRD.ts";
import { QRF } from "../../segments/v2.3/QRF.ts";
import { NCK } from "../../segments/v2.3/NCK.ts";
import { NST } from "../../segments/v2.3/NST.ts";
import { NSC } from "../../segments/v2.3/NSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of NMQ^N01 (HL7 v2.3), in order. */
export const NMQ_N01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  {
    name: "QRY_WITH_DETAIL",
    required: false,
    repeating: false,
    inline: true,
    segments: [
      { name: "QRD", required: true, repeating: false },
      { name: "QRF", required: false, repeating: false },
    ],
  },
  {
    name: "CLOCK_AND_STATISTICS",
    required: true,
    repeating: true,
    as: "clockAndStatistics",
    segments: [
      { name: "NCK", required: false, repeating: false },
      { name: "NST", required: false, repeating: false },
      { name: "NSC", required: false, repeating: false },
    ],
  },
];

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

/** The CLOCK AND STATISTICS group of an NMQ^N01 (HL7 v2.3) message being built. */
export interface ClockAndStatistics {
  /** The NCK segment. */
  systemClock?: NCK;
  /** The NST segment. */
  applicationStatistics?: NST;
  /** The NSC segment. */
  applicationStatus?: NSC;
}

/** The optional segments and groups of an NMQ^N01 (HL7 v2.3) message. */
export interface NMQ_N01Options {
  /** The QRD segment. */
  query?: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
}

/** Builder for HL7 NMQ^N01 (HL7 v2.3) messages. */
export class NMQ_N01<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "NMQ_N01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = NMQ_N01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public clockAndStatistics: ClockAndStatistics[],
    public options: NMQ_N01Options = {},
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

/** Builds an HL7 NMQ^N01 (HL7 v2.3) message. */
export function createNMQ_N01<TMSH extends MSH = MSH>(
  header: TMSH,
  clockAndStatistics: ClockAndStatistics[],
  options: NMQ_N01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): NMQ_N01<TMSH> {
  return new NMQ_N01(header, clockAndStatistics, options, encoding);
}
