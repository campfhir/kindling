/**
 * Builder, parser and structure for BRT^O32 messages (HL7 v2.5.1).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [{NTE}] [ RESPONSE: [PID] [{ ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [BPO] [{BTX}] }] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { MSA } from "../../segments/v2.5.1/MSA.ts";
import { ERR } from "../../segments/v2.5.1/ERR.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { ORC } from "../../segments/v2.5.1/ORC.ts";
import { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import { BPO } from "../../segments/v2.5.1/BPO.ts";
import { BTX } from "../../segments/v2.5.1/BTX.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of BRT^O32 (HL7 v2.5.1), in order. */
export const BRT_O32_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "NTE", required: false, repeating: true },
  {
    name: "RESPONSE",
    required: false,
    repeating: false,
    segments: [
      { name: "PID", required: false, repeating: false },
      {
        name: "ORDER",
        required: false,
        repeating: true,
        segments: [
          { name: "ORC", required: true, repeating: false },
          {
            name: "TIMING",
            required: false,
            repeating: true,
            segments: [
              { name: "TQ1", required: true, repeating: false },
              { name: "TQ2", required: false, repeating: true },
            ],
          },
          { name: "BPO", required: false, repeating: false },
          { name: "BTX", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The RESPONSE group of a parsed BRT^O32 (HL7 v2.5.1) message. */
export interface ParsedResponse {
  /** The PID segment. */
  patient?: PID;
  /** The ORDER groups. */
  orders?: ParsedOrder[];
}

/** The ORDER group of a parsed BRT^O32 (HL7 v2.5.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The BPO segment. */
  bloodProductOrder?: BPO;
  /** The BTX segments. */
  bloodProductTransfusions?: BTX[];
}

/** The TIMING group of a parsed BRT^O32 (HL7 v2.5.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** Structured result of parsing an HL7 BRT^O32 (HL7 v2.5.1) message. */
export interface ParsedBRT_O32 extends ParsedMessageBase {
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
  /** The RESPONSE group. */
  response?: ParsedResponse;
}

/** The segment parsers of BRT^O32 (HL7 v2.5.1). */
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
  BPO: (s, e) => BPO.parse(s, e),
  BTX: (s, e) => BTX.parse(s, e),
};

/** Parser for HL7 BRT^O32 (HL7 v2.5.1) messages. */
export class BRT_O32_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BRT_O32";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = BRT_O32_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBRT_O32> {
    return parseStructure<ParsedBRT_O32>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 BRT^O32 (HL7 v2.5.1) message string into a structured result. */
export function parseBRT_O32(messageString: string): Result<ParsedBRT_O32> {
  return new BRT_O32_Parser().parse(messageString);
}

/** The RESPONSE group of an BRT^O32 (HL7 v2.5.1) message being built. */
export interface ResponseGroup {
  /** The PID segment. */
  patient?: PID;
  /** The ORDER groups. */
  orders?: OrderGroup[];
}

/** The ORDER group of an BRT^O32 (HL7 v2.5.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The BPO segment. */
  bloodProductOrder?: BPO;
  /** The BTX segments. */
  bloodProductTransfusions?: BTX[];
}

/** The TIMING group of an BRT^O32 (HL7 v2.5.1) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The optional segments and groups of an BRT^O32 (HL7 v2.5.1) message. */
export interface BRT_O32Options {
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ResponseGroup;
}

/** Builder for HL7 BRT^O32 (HL7 v2.5.1) messages. */
export class BRT_O32<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BRT_O32";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = BRT_O32_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: BRT_O32Options = {},
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

/** Builds an HL7 BRT^O32 (HL7 v2.5.1) message. */
export function createBRT_O32<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: BRT_O32Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BRT_O32<TMSH, TMSA> {
  return new BRT_O32(header, acknowledgment, options, encoding);
}
