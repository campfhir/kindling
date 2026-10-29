/**
 * Builder, parser and structure for ADT^A24 messages (HL7 v2.3).
 *
 * Structure: MSH EVN { PATIENT: PID [PD1] [PV1] [{DB1}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { EVN } from "../../segments/v2.3/EVN.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PD1 } from "../../segments/v2.3/PD1.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { DB1 } from "../../segments/v2.3/DB1.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of ADT^A24 (HL7 v2.3), in order. */
export const ADT_A24_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  {
    name: "PATIENT",
    required: true,
    repeating: true,
    minOccurrences: 2,
    maxOccurrences: 2,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "PV1", required: false, repeating: false },
      { name: "DB1", required: false, repeating: true },
    ],
  },
];

/** The PATIENT group of a parsed ADT^A24 (HL7 v2.3) message. */
export interface ParsedLinkedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PV1 segment. */
  visit?: PV1;
  /** The DB1 segments. */
  disabilities?: DB1[];
}

/** Structured result of parsing an HL7 ADT^A24 (HL7 v2.3) message. */
export interface ParsedADT_A24 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EVN segment. */
  event: EVN;
  /** The PATIENT groups. */
  patients: ParsedLinkedPatient[];
}

/** The segment parsers of ADT^A24 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  DB1: (s, e) => DB1.parse(s, e),
};

/** Parser for HL7 ADT^A24 (HL7 v2.3) messages. */
export class ADT_A24_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A24";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A24_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A24> {
    return parseStructure<ParsedADT_A24>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A24 (HL7 v2.3) message string into a structured result. */
export function parseADT_A24(messageString: string): Result<ParsedADT_A24> {
  return new ADT_A24_Parser().parse(messageString);
}

/** The PATIENT group of an ADT^A24 (HL7 v2.3) message being built. */
export interface LinkedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PV1 segment. */
  visit?: PV1;
  /** The DB1 segments. */
  disabilities?: DB1[];
}

/** The optional segments and groups of an ADT^A24 (HL7 v2.3) message. The message has none. */
export type ADT_A24Options = Record<string, never>;

/** Builder for HL7 ADT^A24 (HL7 v2.3) messages. */
export class ADT_A24<TMSH extends MSH = MSH, TEVN extends EVN = EVN> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A24";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A24_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patients: LinkedPatient[],
    public options: ADT_A24Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patients: this.patients };
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

/** Builds an HL7 ADT^A24 (HL7 v2.3) message. */
export function createADT_A24<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: LinkedPatient[],
  options: ADT_A24Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A24<TMSH, TEVN> {
  return new ADT_A24(header, event, patients, options, encoding);
}
