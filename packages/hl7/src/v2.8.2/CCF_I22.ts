/**
 * Builder, parser and structure for CCF^I22 messages (HL7 v2.8.2).
 *
 * Structure: MSH [{SFT}] [UAC] PID
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
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of CCF^I22 (HL7 v2.8.2), in order. */
export const CCF_I22_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "PID", required: true, repeating: false },
];

/** Structured result of parsing an HL7 CCF^I22 (HL7 v2.8.2) message. */
export interface ParsedCCF_I22 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PID segment. */
  patient: PID;
}

/** The segment parsers of CCF^I22 (HL7 v2.8.2). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
};

/** Parser for HL7 CCF^I22 (HL7 v2.8.2) messages. */
export class CCF_I22_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "CCF_I22";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = CCF_I22_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedCCF_I22> {
    return parseStructure<ParsedCCF_I22>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 CCF^I22 (HL7 v2.8.2) message string into a structured result. */
export function parseCCF_I22(messageString: string): Result<ParsedCCF_I22> {
  return new CCF_I22_Parser().parse(messageString);
}

/** The optional segments and groups of an CCF^I22 (HL7 v2.8.2) message. */
export interface CCF_I22Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 CCF^I22 (HL7 v2.8.2) messages. */
export class CCF_I22<TMSH extends MSH = MSH, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "CCF_I22";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = CCF_I22_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public patient: TPID,
    public options: CCF_I22Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, patient: this.patient };
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

/** Builds an HL7 CCF^I22 (HL7 v2.8.2) message. */
export function createCCF_I22<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  patient: TPID,
  options: CCF_I22Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CCF_I22<TMSH, TPID> {
  return new CCF_I22(header, patient, options, encoding);
}
