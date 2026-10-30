/**
 * Builder, parser and structure for QBP^Z99 messages (HL7 v2.8.2).
 *
 * Structure: MSH [{SFT}] [UAC] QPD [PID] [RDF] RCP [RDF] [DSC]
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
import { QPD } from "./QPD.ts";
import { PID } from "./PID.ts";
import { RDF } from "./RDF.ts";
import { RCP } from "./RCP.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of QBP^Z99 (HL7 v2.8.2), in order. */
export const QBP_Z99_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "QPD", required: true, repeating: false },
  { name: "PID", required: false, repeating: false },
  { name: "RDF", required: false, repeating: false },
  { name: "RCP", required: true, repeating: false },
  { name: "RDF", required: false, repeating: false, as: "rdf2" },
  { name: "DSC", required: false, repeating: false },
];

/** Structured result of parsing an HL7 QBP^Z99 (HL7 v2.8.2) message. */
export interface ParsedQBP_Z99 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The PID segment. */
  patient?: PID;
  /** The RDF segment. */
  rowDefinition?: RDF;
  /** The RCP segment. */
  responseControl: RCP;
  /** The RDF segment. */
  rdf2?: RDF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of QBP^Z99 (HL7 v2.8.2). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  RDF: (s, e) => RDF.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 QBP^Z99 (HL7 v2.8.2) messages. */
export class QBP_Z99_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QBP_Z99";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QBP_Z99_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQBP_Z99> {
    return parseStructure<ParsedQBP_Z99>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QBP^Z99 (HL7 v2.8.2) message string into a structured result. */
export function parseQBP_Z99(messageString: string): Result<ParsedQBP_Z99> {
  return new QBP_Z99_Parser().parse(messageString);
}

/** The optional segments and groups of an QBP^Z99 (HL7 v2.8.2) message. */
export interface QBP_Z99Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PID segment. */
  patient?: PID;
  /** The RDF segment. */
  rowDefinition?: RDF;
  /** The RDF segment. */
  rdf2?: RDF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 QBP^Z99 (HL7 v2.8.2) messages. */
export class QBP_Z99<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QBP_Z99";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QBP_Z99_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public queryParameters: TQPD,
    public responseControl: TRCP,
    public options: QBP_Z99Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, queryParameters: this.queryParameters, responseControl: this.responseControl };
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

/** Builds an HL7 QBP^Z99 (HL7 v2.8.2) message. */
export function createQBP_Z99<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  queryParameters: TQPD,
  responseControl: TRCP,
  options: QBP_Z99Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QBP_Z99<TMSH, TQPD, TRCP> {
  return new QBP_Z99(header, queryParameters, responseControl, options, encoding);
}
