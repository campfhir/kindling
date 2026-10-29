/**
 * Builder, parser and structure for DBU^O42 messages (HL7 v2.8).
 *
 * Structure: MSH [{SFT}] [UAC] [ DONOR: PID [PD1] [{OBX}] [{NTE}] [{AL1}] [{ARV}] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { OBX } from "./OBX.ts";
import { NTE } from "./NTE.ts";
import { AL1 } from "./AL1.ts";
import { ARV } from "./ARV.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of DBU^O42 (HL7 v2.8), in order. */
export const DBU_O42_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  {
    name: "DONOR",
    required: false,
    repeating: false,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "OBX", required: false, repeating: true },
      { name: "NTE", required: false, repeating: true },
      { name: "AL1", required: false, repeating: true },
      { name: "ARV", required: false, repeating: true },
    ],
  },
];

/** The DONOR group of a parsed DBU^O42 (HL7 v2.8) message. */
export interface ParsedDonor {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The OBX segments. */
  observations?: OBX[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The ARV segments. */
  arvList?: ARV[];
}

/** Structured result of parsing an HL7 DBU^O42 (HL7 v2.8) message. */
export interface ParsedDBU_O42 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The DONOR group. */
  donor?: ParsedDonor;
}

/** The segment parsers of DBU^O42 (HL7 v2.8). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  ARV: (s, e) => ARV.parse(s, e),
};

/** Parser for HL7 DBU^O42 (HL7 v2.8) messages. */
export class DBU_O42_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DBU_O42";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = DBU_O42_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedDBU_O42> {
    return parseStructure<ParsedDBU_O42>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 DBU^O42 (HL7 v2.8) message string into a structured result. */
export function parseDBU_O42(messageString: string): Result<ParsedDBU_O42> {
  return new DBU_O42_Parser().parse(messageString);
}

/** The DONOR group of an DBU^O42 (HL7 v2.8) message being built. */
export interface DonorGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The OBX segments. */
  observations?: OBX[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The ARV segments. */
  arvList?: ARV[];
}

/** The optional segments and groups of an DBU^O42 (HL7 v2.8) message. */
export interface DBU_O42Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The DONOR group. */
  donor?: DonorGroup;
}

/** Builder for HL7 DBU^O42 (HL7 v2.8) messages. */
export class DBU_O42<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DBU_O42";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = DBU_O42_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public options: DBU_O42Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header };
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

/** Builds an HL7 DBU^O42 (HL7 v2.8) message. */
export function createDBU_O42<TMSH extends MSH = MSH>(
  header: TMSH,
  options: DBU_O42Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): DBU_O42<TMSH> {
  return new DBU_O42(header, options, encoding);
}
