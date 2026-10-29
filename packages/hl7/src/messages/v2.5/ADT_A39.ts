/**
 * Builder, parser and structure for ADT^A39 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN { PATIENT: PID [PD1] MRG [PV1] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { EVN } from "../../segments/v2.5/EVN.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { PD1 } from "../../segments/v2.5/PD1.ts";
import { MRG } from "../../segments/v2.5/MRG.ts";
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of ADT^A39 (HL7 v2.5), in order. */
export const ADT_A39_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EVN", required: true, repeating: false },
  {
    name: "PATIENT",
    required: true,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "MRG", required: true, repeating: false },
      { name: "PV1", required: false, repeating: false },
    ],
  },
];

/** The PATIENT group of a parsed ADT^A39 (HL7 v2.5) message. */
export interface ParsedMergePatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The MRG segment. */
  merge: MRG;
  /** The PV1 segment. */
  visit?: PV1;
}

/** Structured result of parsing an HL7 ADT^A39 (HL7 v2.5) message. */
export interface ParsedADT_A39 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The EVN segment. */
  event: EVN;
  /** The PATIENT groups. */
  patients: ParsedMergePatient[];
}

/** The segment parsers of ADT^A39 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  MRG: (s, e) => MRG.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
};

/** Parser for HL7 ADT^A39 (HL7 v2.5) messages. */
export class ADT_A39_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A39";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A39_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A39> {
    return parseStructure<ParsedADT_A39>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A39 (HL7 v2.5) message string into a structured result. */
export function parseADT_A39(messageString: string): Result<ParsedADT_A39> {
  return new ADT_A39_Parser().parse(messageString);
}

/** The PATIENT group of an ADT^A39 (HL7 v2.5) message being built. */
export interface MergePatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The MRG segment. */
  merge: MRG;
  /** The PV1 segment. */
  visit?: PV1;
}

/** The optional segments and groups of an ADT^A39 (HL7 v2.5) message. */
export interface ADT_A39Options {
  /** The SFT segments. */
  software?: SFT[];
}

/** Builder for HL7 ADT^A39 (HL7 v2.5) messages. */
export class ADT_A39<TMSH extends MSH = MSH, TEVN extends EVN = EVN> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A39";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A39_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patients: MergePatient[],
    public options: ADT_A39Options = {},
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

/** Builds an HL7 ADT^A39 (HL7 v2.5) message. */
export function createADT_A39<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: MergePatient[],
  options: ADT_A39Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A39<TMSH, TEVN> {
  return new ADT_A39(header, event, patients, options, encoding);
}
