/**
 * Builder, parser and structure for OSQ^Q06 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] QRD [QRF] [DSC]
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
import { QRD } from "./QRD.ts";
import { QRF } from "./QRF.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of OSQ^Q06 (HL7 v2.6), in order. */
export const OSQ_Q06_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
  { name: "DSC", required: false, repeating: false },
];

/** Structured result of parsing an HL7 OSQ^Q06 (HL7 v2.6) message. */
export interface ParsedOSQ_Q06 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of OSQ^Q06 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 OSQ^Q06 (HL7 v2.6) messages. */
export class OSQ_Q06_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OSQ_Q06";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OSQ_Q06_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOSQ_Q06> {
    return parseStructure<ParsedOSQ_Q06>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OSQ^Q06 (HL7 v2.6) message string into a structured result. */
export function parseOSQ_Q06(messageString: string): Result<ParsedOSQ_Q06> {
  return new OSQ_Q06_Parser().parse(messageString);
}

/** The optional segments and groups of an OSQ^Q06 (HL7 v2.6) message. */
export interface OSQ_Q06Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 OSQ^Q06 (HL7 v2.6) messages. */
export class OSQ_Q06<TMSH extends MSH = MSH, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OSQ_Q06";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OSQ_Q06_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public query: TQRD,
    public options: OSQ_Q06Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, query: this.query };
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

/** Builds an HL7 OSQ^Q06 (HL7 v2.6) message. */
export function createOSQ_Q06<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: OSQ_Q06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OSQ_Q06<TMSH, TQRD> {
  return new OSQ_Q06(header, query, options, encoding);
}
