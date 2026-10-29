/**
 * Builder, parser and structure for RTB^Z96 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MSA [ERR] QAK QPD [ ROW_DEFINITION: RDF [{RDT}] ] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { MSA } from "./MSA.ts";
import { ERR } from "./ERR.ts";
import { QAK } from "./QAK.ts";
import { QPD } from "./QPD.ts";
import { RDF } from "./RDF.ts";
import { RDT } from "./RDT.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RTB^Z96 (HL7 v2.5.1), in order. */
export const RTB_Z96_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: true, repeating: false },
  { name: "QPD", required: true, repeating: false },
  {
    name: "ROW_DEFINITION",
    required: false,
    repeating: false,
    segments: [
      { name: "RDF", required: true, repeating: false },
      { name: "RDT", required: false, repeating: true },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The ROW DEFINITION group of a parsed RTB^Z96 (HL7 v2.5.1) message. */
export interface ParsedRowDefinition {
  /** The RDF segment. */
  rowDefinition: RDF;
  /** The RDT segments. */
  rows?: RDT[];
}

/** Structured result of parsing an HL7 RTB^Z96 (HL7 v2.5.1) message. */
export interface ParsedRTB_Z96 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The ROW DEFINITION group. */
  rowDefinition?: ParsedRowDefinition;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RTB^Z96 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  RDF: (s, e) => RDF.parse(s, e),
  RDT: (s, e) => RDT.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RTB^Z96 (HL7 v2.5.1) messages. */
export class RTB_Z96_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RTB_Z96";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RTB_Z96_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRTB_Z96> {
    return parseStructure<ParsedRTB_Z96>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RTB^Z96 (HL7 v2.5.1) message string into a structured result. */
export function parseRTB_Z96(messageString: string): Result<ParsedRTB_Z96> {
  return new RTB_Z96_Parser().parse(messageString);
}

/** The ROW DEFINITION group of an RTB^Z96 (HL7 v2.5.1) message being built. */
export interface RowDefinitionGroup {
  /** The RDF segment. */
  rowDefinition: RDF;
  /** The RDT segments. */
  rows?: RDT[];
}

/** The optional segments and groups of an RTB^Z96 (HL7 v2.5.1) message. */
export interface RTB_Z96Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The ERR segment. */
  error?: ERR;
  /** The ROW DEFINITION group. */
  rowDefinition?: RowDefinitionGroup;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RTB^Z96 (HL7 v2.5.1) messages. */
export class RTB_Z96<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RTB_Z96";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RTB_Z96_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public queryParameters: TQPD,
    public options: RTB_Z96Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAcknowledgment: this.queryAcknowledgment, queryParameters: this.queryParameters };
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

/** Builds an HL7 RTB^Z96 (HL7 v2.5.1) message. */
export function createRTB_Z96<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  options: RTB_Z96Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RTB_Z96<TMSH, TMSA, TQAK, TQPD> {
  return new RTB_Z96(header, acknowledgment, queryAcknowledgment, queryParameters, options, encoding);
}
