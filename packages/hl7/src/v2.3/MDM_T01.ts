/**
 * Builder, parser and structure for MDM^T01 messages (HL7 v2.3).
 *
 * Structure: MSH EVN PID PV1 TXA
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
import { PV1 } from "./PV1.ts";
import { TXA } from "./TXA.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MDM^T01 (HL7 v2.3), in order. */
export const MDM_T01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PV1", required: true, repeating: false },
  { name: "TXA", required: true, repeating: false },
];

/** Structured result of parsing an HL7 MDM^T01 (HL7 v2.3) message. */
export interface ParsedMDM_T01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit: PV1;
  /** The TXA segment. */
  document: TXA;
}

/** The segment parsers of MDM^T01 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  TXA: (s, e) => TXA.parse(s, e),
};

/** Parser for HL7 MDM^T01 (HL7 v2.3) messages. */
export class MDM_T01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MDM_T01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MDM_T01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMDM_T01> {
    return parseStructure<ParsedMDM_T01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MDM^T01 (HL7 v2.3) message string into a structured result. */
export function parseMDM_T01(messageString: string): Result<ParsedMDM_T01> {
  return new MDM_T01_Parser().parse(messageString);
}

/** The optional segments and groups of an MDM^T01 (HL7 v2.3) message. The message has none. */
export type MDM_T01Options = Record<string, never>;

/** Builder for HL7 MDM^T01 (HL7 v2.3) messages. */
export class MDM_T01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MDM_T01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MDM_T01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public visit: TPV1,
    public document: TTXA,
    public options: MDM_T01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, visit: this.visit, document: this.document };
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

/** Builds an HL7 MDM^T01 (HL7 v2.3) message. */
export function createMDM_T01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  document: TTXA,
  options: MDM_T01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MDM_T01<TMSH, TEVN, TPID, TPV1, TTXA> {
  return new MDM_T01(header, event, patient, visit, document, options, encoding);
}
