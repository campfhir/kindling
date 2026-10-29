/**
 * Builder, parser and structure for BAR^P02 messages (HL7 v2.3).
 *
 * Structure: MSH EVN { PATIENT: PID [PD1] [PV1] [{DB1}] }
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
import { PV1 } from "./PV1.ts";
import { DB1 } from "./DB1.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of BAR^P02 (HL7 v2.3), in order. */
export const BAR_P02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  {
    name: "PATIENT",
    required: true,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "PV1", required: false, repeating: false },
      { name: "DB1", required: false, repeating: true },
    ],
  },
];

/** The PATIENT group of a parsed BAR^P02 (HL7 v2.3) message. */
export interface ParsedBARPurgePatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PV1 segment. */
  visit?: PV1;
  /** The DB1 segments. */
  disabilities?: DB1[];
}

/** Structured result of parsing an HL7 BAR^P02 (HL7 v2.3) message. */
export interface ParsedBAR_P02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EVN segment. */
  event: EVN;
  /** The PATIENT groups. */
  patients: ParsedBARPurgePatient[];
}

/** The segment parsers of BAR^P02 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  DB1: (s, e) => DB1.parse(s, e),
};

/** Parser for HL7 BAR^P02 (HL7 v2.3) messages. */
export class BAR_P02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = BAR_P02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBAR_P02> {
    return parseStructure<ParsedBAR_P02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 BAR^P02 (HL7 v2.3) message string into a structured result. */
export function parseBAR_P02(messageString: string): Result<ParsedBAR_P02> {
  return new BAR_P02_Parser().parse(messageString);
}

/** The PATIENT group of an BAR^P02 (HL7 v2.3) message being built. */
export interface BARPurgePatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PV1 segment. */
  visit?: PV1;
  /** The DB1 segments. */
  disabilities?: DB1[];
}

/** The optional segments and groups of an BAR^P02 (HL7 v2.3) message. The message has none. */
export type BAR_P02Options = Record<string, never>;

/** Builder for HL7 BAR^P02 (HL7 v2.3) messages. */
export class BAR_P02<TMSH extends MSH = MSH, TEVN extends EVN = EVN> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = BAR_P02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patients: BARPurgePatientGroup[],
    public options: BAR_P02Options = {},
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

/** Builds an HL7 BAR^P02 (HL7 v2.3) message. */
export function createBAR_P02<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: BARPurgePatientGroup[],
  options: BAR_P02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BAR_P02<TMSH, TEVN> {
  return new BAR_P02(header, event, patients, options, encoding);
}
