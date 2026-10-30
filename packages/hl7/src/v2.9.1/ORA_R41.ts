/**
 * Builder, parser and structure for ORA^R41 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] [{PRT}]
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
import { MSA } from "./MSA.ts";
import { ERR } from "./ERR.ts";
import { PRT } from "./PRT.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ORA^R41 (HL7 v2.9.1), in order. */
export const ORA_R41_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "PRT", required: false, repeating: true },
];

/** Structured result of parsing an HL7 ORA^R41 (HL7 v2.9.1) message. */
export interface ParsedORA_R41 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The segment parsers of ORA^R41 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
};

/** Parser for HL7 ORA^R41 (HL7 v2.9.1) messages. */
export class ORA_R41_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORA_R41";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORA_R41_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORA_R41> {
    return parseStructure<ParsedORA_R41>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORA^R41 (HL7 v2.9.1) message string into a structured result. */
export function parseORA_R41(messageString: string): Result<ParsedORA_R41> {
  return new ORA_R41_Parser().parse(messageString);
}

/** The optional segments and groups of an ORA^R41 (HL7 v2.9.1) message. */
export interface ORA_R41Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ERR segments. */
  errors?: ERR[];
  /** The PRT segments. */
  prtList?: PRT[];
}

/** Builder for HL7 ORA^R41 (HL7 v2.9.1) messages. */
export class ORA_R41<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORA_R41";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORA_R41_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: ORA_R41Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment };
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

/** Builds an HL7 ORA^R41 (HL7 v2.9.1) message. */
export function createORA_R41<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: ORA_R41Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORA_R41<TMSH, TMSA> {
  return new ORA_R41(header, acknowledgment, options, encoding);
}
