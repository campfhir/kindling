/**
 * Builder, parser and structure for ADT^A20 messages (HL7 v2.7.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN NPU
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { EVN } from "./EVN.ts";
import { NPU } from "./NPU.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ADT^A20 (HL7 v2.7.1), in order. */
export const ADT_A20_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "NPU", required: true, repeating: false },
];

/** Structured result of parsing an HL7 ADT^A20 (HL7 v2.7.1) message. */
export interface ParsedADT_A20 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EVN segment. */
  event: EVN;
  /** The NPU segment. */
  bedStatus: NPU;
}

/** The segment parsers of ADT^A20 (HL7 v2.7.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  NPU: (s, e) => NPU.parse(s, e),
};

/** Parser for HL7 ADT^A20 (HL7 v2.7.1) messages. */
export class ADT_A20_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A20";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A20_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A20> {
    return parseStructure<ParsedADT_A20>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A20 (HL7 v2.7.1) message string into a structured result. */
export function parseADT_A20(messageString: string): Result<ParsedADT_A20> {
  return new ADT_A20_Parser().parse(messageString);
}

/** The optional segments and groups of an ADT^A20 (HL7 v2.7.1) message. */
export interface ADT_A20Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 ADT^A20 (HL7 v2.7.1) messages. */
export class ADT_A20<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TNPU extends NPU = NPU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A20";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A20_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public bedStatus: TNPU,
    public options: ADT_A20Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, bedStatus: this.bedStatus };
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

/** Builds an HL7 ADT^A20 (HL7 v2.7.1) message. */
export function createADT_A20<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TNPU extends NPU = NPU>(
  header: TMSH,
  event: TEVN,
  bedStatus: TNPU,
  options: ADT_A20Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A20<TMSH, TEVN, TNPU> {
  return new ADT_A20(header, event, bedStatus, options, encoding);
}
