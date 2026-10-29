/**
 * Builder, parser and structure for ADT^A60 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN PID [PV1] [PV2] [{IAM}]
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
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { PV2 } from "../../segments/v2.5/PV2.ts";
import { IAM } from "../../segments/v2.5/IAM.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of ADT^A60 (HL7 v2.5), in order. */
export const ADT_A60_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PV1", required: false, repeating: false },
  { name: "PV2", required: false, repeating: false },
  { name: "IAM", required: false, repeating: true },
];

/** Structured result of parsing an HL7 ADT^A60 (HL7 v2.5) message. */
export interface ParsedADT_A60 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The IAM segments. */
  adverseReactions?: IAM[];
}

/** The segment parsers of ADT^A60 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  IAM: (s, e) => IAM.parse(s, e),
};

/** Parser for HL7 ADT^A60 (HL7 v2.5) messages. */
export class ADT_A60_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A60";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A60_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A60> {
    return parseStructure<ParsedADT_A60>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A60 (HL7 v2.5) message string into a structured result. */
export function parseADT_A60(messageString: string): Result<ParsedADT_A60> {
  return new ADT_A60_Parser().parse(messageString);
}

/** The optional segments and groups of an ADT^A60 (HL7 v2.5) message. */
export interface ADT_A60Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The IAM segments. */
  adverseReactions?: IAM[];
}

/** Builder for HL7 ADT^A60 (HL7 v2.5) messages. */
export class ADT_A60<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A60";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A60_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public options: ADT_A60Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient };
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

/** Builds an HL7 ADT^A60 (HL7 v2.5) message. */
export function createADT_A60<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  options: ADT_A60Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A60<TMSH, TEVN, TPID> {
  return new ADT_A60(header, event, patient, options, encoding);
}
