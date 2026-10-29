/**
 * Builder, parser and structure for RTB^Z78 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA [ERR] QAK QPD [ ROW_DEFINITION: RDF [{RDT}] ] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { MSA } from "../../segments/v2.5/MSA.ts";
import { ERR } from "../../segments/v2.5/ERR.ts";
import { QAK } from "../../segments/v2.5/QAK.ts";
import { QPD } from "../../segments/v2.5/QPD.ts";
import { RDF } from "../../segments/v2.5/RDF.ts";
import { RDT } from "../../segments/v2.5/RDT.ts";
import { DSC } from "../../segments/v2.5/DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of RTB^Z78 (HL7 v2.5), in order. */
export const RTB_Z78_STRUCTURE: StructureItem[] = [
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

/** The ROW DEFINITION group of a parsed RTB^Z78 (HL7 v2.5) message. */
export interface ParsedRowDefinition {
  /** The RDF segment. */
  rowDefinition: RDF;
  /** The RDT segments. */
  rows?: RDT[];
}

/** Structured result of parsing an HL7 RTB^Z78 (HL7 v2.5) message. */
export interface ParsedRTB_Z78 extends ParsedMessageBase {
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

/** The segment parsers of RTB^Z78 (HL7 v2.5). */
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

/** Parser for HL7 RTB^Z78 (HL7 v2.5) messages. */
export class RTB_Z78_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RTB_Z78";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RTB_Z78_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRTB_Z78> {
    return parseStructure<ParsedRTB_Z78>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RTB^Z78 (HL7 v2.5) message string into a structured result. */
export function parseRTB_Z78(messageString: string): Result<ParsedRTB_Z78> {
  return new RTB_Z78_Parser().parse(messageString);
}

/** The ROW DEFINITION group of an RTB^Z78 (HL7 v2.5) message being built. */
export interface RowDefinitionGroup {
  /** The RDF segment. */
  rowDefinition: RDF;
  /** The RDT segments. */
  rows?: RDT[];
}

/** The optional segments and groups of an RTB^Z78 (HL7 v2.5) message. */
export interface RTB_Z78Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The ERR segment. */
  error?: ERR;
  /** The ROW DEFINITION group. */
  rowDefinition?: RowDefinitionGroup;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RTB^Z78 (HL7 v2.5) messages. */
export class RTB_Z78<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RTB_Z78";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RTB_Z78_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public queryParameters: TQPD,
    public options: RTB_Z78Options = {},
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

/** Builds an HL7 RTB^Z78 (HL7 v2.5) message. */
export function createRTB_Z78<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  options: RTB_Z78Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RTB_Z78<TMSH, TMSA, TQAK, TQPD> {
  return new RTB_Z78(header, acknowledgment, queryAcknowledgment, queryParameters, options, encoding);
}
