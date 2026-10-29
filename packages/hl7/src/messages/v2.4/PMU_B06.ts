/**
 * Builder, parser and structure for PMU^B06 messages (HL7 v2.4).
 *
 * Structure: MSH EVN STF [{PRA}] [ORG]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { EVN } from "../../segments/v2.4/EVN.ts";
import { STF } from "../../segments/v2.4/STF.ts";
import { PRA } from "../../segments/v2.4/PRA.ts";
import { ORG } from "../../segments/v2.4/ORG.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of PMU^B06 (HL7 v2.4), in order. */
export const PMU_B06_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "STF", required: true, repeating: false },
  { name: "PRA", required: false, repeating: true },
  { name: "ORG", required: false, repeating: false },
];

/** Structured result of parsing an HL7 PMU^B06 (HL7 v2.4) message. */
export interface ParsedPMU_B06 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EVN segment. */
  event: EVN;
  /** The STF segment. */
  staff: STF;
  /** The PRA segments. */
  practitioners?: PRA[];
  /** The ORG segment. */
  organizationUnit?: ORG;
}

/** The segment parsers of PMU^B06 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  STF: (s, e) => STF.parse(s, e),
  PRA: (s, e) => PRA.parse(s, e),
  ORG: (s, e) => ORG.parse(s, e),
};

/** Parser for HL7 PMU^B06 (HL7 v2.4) messages. */
export class PMU_B06_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PMU_B06";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = PMU_B06_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedPMU_B06> {
    return parseStructure<ParsedPMU_B06>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 PMU^B06 (HL7 v2.4) message string into a structured result. */
export function parsePMU_B06(messageString: string): Result<ParsedPMU_B06> {
  return new PMU_B06_Parser().parse(messageString);
}

/** The optional segments and groups of an PMU^B06 (HL7 v2.4) message. */
export interface PMU_B06Options {
  /** The PRA segments. */
  practitioners?: PRA[];
  /** The ORG segment. */
  organizationUnit?: ORG;
}

/** Builder for HL7 PMU^B06 (HL7 v2.4) messages. */
export class PMU_B06<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PMU_B06";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = PMU_B06_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public staff: TSTF,
    public options: PMU_B06Options = {},
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

/** Builds an HL7 PMU^B06 (HL7 v2.4) message. */
export function createPMU_B06<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF>(
  header: TMSH,
  event: TEVN,
  staff: TSTF,
  options: PMU_B06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PMU_B06<TMSH, TEVN, TSTF> {
  return new PMU_B06(header, event, staff, options, encoding);
}
