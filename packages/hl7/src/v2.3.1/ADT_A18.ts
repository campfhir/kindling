/**
 * Builder, parser and structure for ADT^A18 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN PID [PD1] [MRG] PV1
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { EVN } from "./EVN.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { MRG } from "./MRG.ts";
import { PV1 } from "./PV1.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ADT^A18 (HL7 v2.3.1), in order. */
export const ADT_A18_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "MRG", required: false, repeating: false },
  { name: "PV1", required: true, repeating: false },
];

/** Structured result of parsing an HL7 ADT^A18 (HL7 v2.3.1) message. */
export interface ParsedADT_A18 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The MRG segment. */
  merge?: MRG;
  /** The PV1 segment. */
  visit: PV1;
}

/** The segment parsers of ADT^A18 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  MRG: (s, e) => MRG.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
};

/** Parser for HL7 ADT^A18 (HL7 v2.3.1) messages. */
export class ADT_A18_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A18";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A18_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A18> {
    return parseStructure<ParsedADT_A18>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A18 (HL7 v2.3.1) message string into a structured result. */
export function parseADT_A18(messageString: string): Result<ParsedADT_A18> {
  return new ADT_A18_Parser().parse(messageString);
}

/** The optional segments and groups of an ADT^A18 (HL7 v2.3.1) message. */
export interface ADT_A18Options {
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The MRG segment. */
  merge?: MRG;
}

/** Builder for HL7 ADT^A18 (HL7 v2.3.1) messages. */
export class ADT_A18<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A18";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A18_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public visit: TPV1,
    public options: ADT_A18Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, visit: this.visit };
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

/** Builds an HL7 ADT^A18 (HL7 v2.3.1) message. */
export function createADT_A18<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A18Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A18<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A18(header, event, patient, visit, options, encoding);
}
