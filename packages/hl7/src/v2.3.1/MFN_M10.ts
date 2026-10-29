/**
 * Builder, parser and structure for MFN^M10 messages (HL7 v2.3.1).
 *
 * Structure: MSH MFI { MF_TEST_BATTERIES: MFE OM1 [ MF_TEST_BATT_DETAIL: OM5 [{OM4}] ] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { MFI } from "./MFI.ts";
import { MFE } from "./MFE.ts";
import { OM1 } from "./OM1.ts";
import { OM5 } from "./OM5.ts";
import { OM4 } from "./OM4.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MFN^M10 (HL7 v2.3.1), in order. */
export const MFN_M10_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_TEST_BATTERIES",
    required: true,
    repeating: true,
    as: "entries",
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "OM1", required: true, repeating: false },
      {
        name: "MF_TEST_BATT_DETAIL",
        required: false,
        repeating: false,
        inline: true,
        segments: [
          { name: "OM5", required: true, repeating: false },
          { name: "OM4", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The MF TEST BATTERIES group of a parsed MFN^M10 (HL7 v2.3.1) message. */
export interface ParsedBatteryEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The OM5 segment. */
  observationBattery?: OM5;
  /** The OM4 segments. */
  specimenRequirements?: OM4[];
}

/** Structured result of parsing an HL7 MFN^M10 (HL7 v2.3.1) message. */
export interface ParsedMFN_M10 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF TEST BATTERIES groups. */
  entries: ParsedBatteryEntry[];
}

/** The segment parsers of MFN^M10 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  OM1: (s, e) => OM1.parse(s, e),
  OM5: (s, e) => OM5.parse(s, e),
  OM4: (s, e) => OM4.parse(s, e),
};

/** Parser for HL7 MFN^M10 (HL7 v2.3.1) messages. */
export class MFN_M10_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M10";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M10_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M10> {
    return parseStructure<ParsedMFN_M10>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M10 (HL7 v2.3.1) message string into a structured result. */
export function parseMFN_M10(messageString: string): Result<ParsedMFN_M10> {
  return new MFN_M10_Parser().parse(messageString);
}

/** The MF TEST BATTERIES group of an MFN^M10 (HL7 v2.3.1) message being built. */
export interface BatteryEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The OM5 segment. */
  observationBattery?: OM5;
  /** The OM4 segments. */
  specimenRequirements?: OM4[];
}

/** The optional segments and groups of an MFN^M10 (HL7 v2.3.1) message. The message has none. */
export type MFN_M10Options = Record<string, never>;

/** Builder for HL7 MFN^M10 (HL7 v2.3.1) messages. */
export class MFN_M10<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M10";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M10_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public entries: BatteryEntry[],
    public options: MFN_M10Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, entries: this.entries };
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

/** Builds an HL7 MFN^M10 (HL7 v2.3.1) message. */
export function createMFN_M10<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  entries: BatteryEntry[],
  options: MFN_M10Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M10<TMSH, TMFI> {
  return new MFN_M10(header, masterFile, entries, options, encoding);
}
