/**
 * Builder, parser and structure for BAR^P06 messages (HL7 v2.3).
 *
 * Structure: MSH EVN { PATIENT: PID [PV1] }
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
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of BAR^P06 (HL7 v2.3), in order. */
export const BAR_P06_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  {
    name: "PATIENT",
    required: true,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PV1", required: false, repeating: false },
    ],
  },
];

/** The PATIENT group of a parsed BAR^P06 (HL7 v2.3) message. */
export interface ParsedBAREndPatient {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
}

/** Structured result of parsing an HL7 BAR^P06 (HL7 v2.3) message. */
export interface ParsedBAR_P06 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EVN segment. */
  event: EVN;
  /** The PATIENT groups. */
  patients: ParsedBAREndPatient[];
}

/** The segment parsers of BAR^P06 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
};

/** Parser for HL7 BAR^P06 (HL7 v2.3) messages. */
export class BAR_P06_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P06";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = BAR_P06_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBAR_P06> {
    return parseStructure<ParsedBAR_P06>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 BAR^P06 (HL7 v2.3) message string into a structured result. */
export function parseBAR_P06(messageString: string): Result<ParsedBAR_P06> {
  return new BAR_P06_Parser().parse(messageString);
}

/** The PATIENT group of an BAR^P06 (HL7 v2.3) message being built. */
export interface BAREndPatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
}

/** The optional segments and groups of an BAR^P06 (HL7 v2.3) message. The message has none. */
export type BAR_P06Options = Record<string, never>;

/** Builder for HL7 BAR^P06 (HL7 v2.3) messages. */
export class BAR_P06<TMSH extends MSH = MSH, TEVN extends EVN = EVN> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P06";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = BAR_P06_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patients: BAREndPatientGroup[],
    public options: BAR_P06Options = {},
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

/** Builds an HL7 BAR^P06 (HL7 v2.3) message. */
export function createBAR_P06<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: BAREndPatientGroup[],
  options: BAR_P06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BAR_P06<TMSH, TEVN> {
  return new BAR_P06(header, event, patients, options, encoding);
}
