/**
 * Builder, parser and structure for RRG^O16 messages (HL7 v2.5.1).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ GIVE: RXG { TIMING_GIVE: TQ1 [{TQ2}] } {RXR} [{RXC}] ] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { ERR } from "./ERR.ts";
import { SFT } from "./SFT.ts";
import { NTE } from "./NTE.ts";
import { PID } from "./PID.ts";
import { ORC } from "./ORC.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { RXG } from "./RXG.ts";
import { RXR } from "./RXR.ts";
import { RXC } from "./RXC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RRG^O16 (HL7 v2.5.1), in order. */
export const RRG_O16_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "NTE", required: false, repeating: true },
  {
    name: "RESPONSE",
    required: false,
    repeating: false,
    inline: true,
    segments: [
      {
        name: "PATIENT",
        required: false,
        repeating: false,
        inline: true,
        segments: [
          { name: "PID", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true, as: "patientNotes" },
        ],
      },
      {
        name: "ORDER",
        required: true,
        repeating: true,
        segments: [
          { name: "ORC", required: true, repeating: false },
          {
            name: "TIMING",
            required: false,
            repeating: true,
            as: "timings",
            segments: [
              { name: "TQ1", required: true, repeating: false },
              { name: "TQ2", required: false, repeating: true },
            ],
          },
          {
            name: "GIVE",
            required: false,
            repeating: false,
            inline: true,
            segments: [
              { name: "RXG", required: true, repeating: false },
              {
                name: "TIMING_GIVE",
                required: true,
                repeating: true,
                as: "giveTimings",
                segments: [
                  { name: "TQ1", required: true, repeating: false },
                  { name: "TQ2", required: false, repeating: true },
                ],
              },
              { name: "RXR", required: true, repeating: true },
              { name: "RXC", required: false, repeating: true },
            ],
          },
        ],
      },
    ],
  },
];

/** The ORDER group of a parsed RRG^O16 (HL7 v2.5.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The RXG segment. */
  give?: RXG;
  /** The TIMING GIVE groups. */
  giveTimings?: ParsedTimingGive[];
  /** The RXR segments. */
  routes?: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING group of a parsed RRG^O16 (HL7 v2.5.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The TIMING GIVE group of a parsed RRG^O16 (HL7 v2.5.1) message. */
export interface ParsedTimingGive {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** Structured result of parsing an HL7 RRG^O16 (HL7 v2.5.1) message. */
export interface ParsedRRG_O16 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders?: ParsedOrder[];
}

/** The segment parsers of RRG^O16 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  RXG: (s, e) => RXG.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
};

/** Parser for HL7 RRG^O16 (HL7 v2.5.1) messages. */
export class RRG_O16_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RRG_O16";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RRG_O16_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRRG_O16> {
    return parseStructure<ParsedRRG_O16>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RRG^O16 (HL7 v2.5.1) message string into a structured result. */
export function parseRRG_O16(messageString: string): Result<ParsedRRG_O16> {
  return new RRG_O16_Parser().parse(messageString);
}

/** The ORDER group of an RRG^O16 (HL7 v2.5.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The RXG segment. */
  give?: RXG;
  /** The TIMING GIVE groups. */
  giveTimings?: TimingGiveGroup[];
  /** The RXR segments. */
  routes?: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING group of an RRG^O16 (HL7 v2.5.1) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The TIMING GIVE group of an RRG^O16 (HL7 v2.5.1) message being built. */
export interface TimingGiveGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The optional segments and groups of an RRG^O16 (HL7 v2.5.1) message. */
export interface RRG_O16Options {
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders?: OrderGroup[];
}

/** Builder for HL7 RRG^O16 (HL7 v2.5.1) messages. */
export class RRG_O16<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RRG_O16";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RRG_O16_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: RRG_O16Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment };
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

/** Builds an HL7 RRG^O16 (HL7 v2.5.1) message. */
export function createRRG_O16<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: RRG_O16Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RRG_O16<TMSH, TMSA> {
  return new RRG_O16(header, acknowledgment, options, encoding);
}
