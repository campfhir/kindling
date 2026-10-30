/**
 * Builder, parser and structure for DFT^P03 messages (HL7 v2.2).
 *
 * Structure: MSH EVN PID [PV1] [PV2] [{OBX}] {FT1}
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
import { PV2 } from "./PV2.ts";
import { OBX } from "./OBX.ts";
import { FT1 } from "./FT1.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of DFT^P03 (HL7 v2.2), in order. */
export const DFT_P03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PV1", required: false, repeating: false },
  { name: "PV2", required: false, repeating: false },
  { name: "OBX", required: false, repeating: true },
  { name: "FT1", required: true, repeating: true },
];

/** Structured result of parsing an HL7 DFT^P03 (HL7 v2.2) message. */
export interface ParsedDFT_P03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The OBX segments. */
  observations?: OBX[];
  /** The FT1 segments. */
  transactions: FT1[];
}

/** The segment parsers of DFT^P03 (HL7 v2.2). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  FT1: (s, e) => FT1.parse(s, e),
};

/** Parser for HL7 DFT^P03 (HL7 v2.2) messages. */
export class DFT_P03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DFT_P03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = DFT_P03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedDFT_P03> {
    return parseStructure<ParsedDFT_P03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 DFT^P03 (HL7 v2.2) message string into a structured result. */
export function parseDFT_P03(messageString: string): Result<ParsedDFT_P03> {
  return new DFT_P03_Parser().parse(messageString);
}

/** The optional segments and groups of an DFT^P03 (HL7 v2.2) message. */
export interface DFT_P03Options {
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The OBX segments. */
  observations?: OBX[];
}

/** Builder for HL7 DFT^P03 (HL7 v2.2) messages. */
export class DFT_P03<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DFT_P03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = DFT_P03_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public transactions: FT1[],
    public options: DFT_P03Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, transactions: this.transactions };
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

/** Builds an HL7 DFT^P03 (HL7 v2.2) message. */
export function createDFT_P03<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  transactions: FT1[],
  options: DFT_P03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): DFT_P03<TMSH, TEVN, TPID> {
  return new DFT_P03(header, event, patient, transactions, options, encoding);
}
