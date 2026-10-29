/**
 * Builder, parser and structure for PMU^B02 messages (HL7 v2.4).
 *
 * Structure: MSH EVN STF [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { EVN } from "./EVN.ts";
import { STF } from "./STF.ts";
import { PRA } from "./PRA.ts";
import { ORG } from "./ORG.ts";
import { AFF } from "./AFF.ts";
import { LAN } from "./LAN.ts";
import { EDU } from "./EDU.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of PMU^B02 (HL7 v2.4), in order. */
export const PMU_B02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "STF", required: true, repeating: false },
  { name: "PRA", required: false, repeating: true },
  { name: "ORG", required: false, repeating: true },
  { name: "AFF", required: false, repeating: true },
  { name: "LAN", required: false, repeating: true },
  { name: "EDU", required: false, repeating: true },
];

/** Structured result of parsing an HL7 PMU^B02 (HL7 v2.4) message. */
export interface ParsedPMU_B02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EVN segment. */
  event: EVN;
  /** The STF segment. */
  staff: STF;
  /** The PRA segments. */
  practitioners?: PRA[];
  /** The ORG segments. */
  organizationUnits?: ORG[];
  /** The AFF segments. */
  affiliations?: AFF[];
  /** The LAN segments. */
  languages?: LAN[];
  /** The EDU segments. */
  educations?: EDU[];
}

/** The segment parsers of PMU^B02 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  STF: (s, e) => STF.parse(s, e),
  PRA: (s, e) => PRA.parse(s, e),
  ORG: (s, e) => ORG.parse(s, e),
  AFF: (s, e) => AFF.parse(s, e),
  LAN: (s, e) => LAN.parse(s, e),
  EDU: (s, e) => EDU.parse(s, e),
};

/** Parser for HL7 PMU^B02 (HL7 v2.4) messages. */
export class PMU_B02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PMU_B02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = PMU_B02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedPMU_B02> {
    return parseStructure<ParsedPMU_B02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 PMU^B02 (HL7 v2.4) message string into a structured result. */
export function parsePMU_B02(messageString: string): Result<ParsedPMU_B02> {
  return new PMU_B02_Parser().parse(messageString);
}

/** The optional segments and groups of an PMU^B02 (HL7 v2.4) message. */
export interface PMU_B02Options {
  /** The PRA segments. */
  practitioners?: PRA[];
  /** The ORG segments. */
  organizationUnits?: ORG[];
  /** The AFF segments. */
  affiliations?: AFF[];
  /** The LAN segments. */
  languages?: LAN[];
  /** The EDU segments. */
  educations?: EDU[];
}

/** Builder for HL7 PMU^B02 (HL7 v2.4) messages. */
export class PMU_B02<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PMU_B02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = PMU_B02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public staff: TSTF,
    public options: PMU_B02Options = {},
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

/** Builds an HL7 PMU^B02 (HL7 v2.4) message. */
export function createPMU_B02<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF>(
  header: TMSH,
  event: TEVN,
  staff: TSTF,
  options: PMU_B02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PMU_B02<TMSH, TEVN, TSTF> {
  return new PMU_B02(header, event, staff, options, encoding);
}
