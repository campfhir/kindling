/**
 * Builder, parser and structure for PMU^B03 messages (HL7 v2.9).
 *
 * Structure: MSH [{SFT}] [UAC] EVN STF
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
import { STF } from "./STF.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of PMU^B03 (HL7 v2.9), in order. */
export const PMU_B03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "STF", required: true, repeating: false },
];

/** Structured result of parsing an HL7 PMU^B03 (HL7 v2.9) message. */
export interface ParsedPMU_B03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EVN segment. */
  event: EVN;
  /** The STF segment. */
  staff: STF;
}

/** The segment parsers of PMU^B03 (HL7 v2.9). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  STF: (s, e) => STF.parse(s, e),
};

/** Parser for HL7 PMU^B03 (HL7 v2.9) messages. */
export class PMU_B03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PMU_B03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = PMU_B03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedPMU_B03> {
    return parseStructure<ParsedPMU_B03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 PMU^B03 (HL7 v2.9) message string into a structured result. */
export function parsePMU_B03(messageString: string): Result<ParsedPMU_B03> {
  return new PMU_B03_Parser().parse(messageString);
}

/** The optional segments and groups of an PMU^B03 (HL7 v2.9) message. */
export interface PMU_B03Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 PMU^B03 (HL7 v2.9) messages. */
export class PMU_B03<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PMU_B03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = PMU_B03_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public staff: TSTF,
    public options: PMU_B03Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, staff: this.staff };
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

/** Builds an HL7 PMU^B03 (HL7 v2.9) message. */
export function createPMU_B03<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF>(
  header: TMSH,
  event: TEVN,
  staff: TSTF,
  options: PMU_B03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PMU_B03<TMSH, TEVN, TSTF> {
  return new PMU_B03(header, event, staff, options, encoding);
}
