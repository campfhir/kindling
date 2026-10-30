/**
 * Builder, parser and structure for RDY^K15 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] QAK QPD [{DSP}] [DSC]
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
import { QAK } from "./QAK.ts";
import { QPD } from "./QPD.ts";
import { DSP } from "./DSP.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RDY^K15 (HL7 v2.9.1), in order. */
export const RDY_K15_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "QAK", required: true, repeating: false },
  { name: "QPD", required: true, repeating: false },
  { name: "DSP", required: false, repeating: true },
  { name: "DSC", required: false, repeating: false },
];

/** Structured result of parsing an HL7 RDY^K15 (HL7 v2.9.1) message. */
export interface ParsedRDY_K15 extends ParsedMessageBase {
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
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The DSP segments. */
  displayLines?: DSP[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RDY^K15 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  DSP: (s, e) => DSP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RDY^K15 (HL7 v2.9.1) messages. */
export class RDY_K15_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RDY_K15";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RDY_K15_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRDY_K15> {
    return parseStructure<ParsedRDY_K15>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RDY^K15 (HL7 v2.9.1) message string into a structured result. */
export function parseRDY_K15(messageString: string): Result<ParsedRDY_K15> {
  return new RDY_K15_Parser().parse(messageString);
}

/** The optional segments and groups of an RDY^K15 (HL7 v2.9.1) message. */
export interface RDY_K15Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ERR segments. */
  errors?: ERR[];
  /** The DSP segments. */
  displayLines?: DSP[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RDY^K15 (HL7 v2.9.1) messages. */
export class RDY_K15<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RDY_K15";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RDY_K15_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public queryParameters: TQPD,
    public options: RDY_K15Options = {},
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

/** Builds an HL7 RDY^K15 (HL7 v2.9.1) message. */
export function createRDY_K15<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  options: RDY_K15Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RDY_K15<TMSH, TMSA, TQAK, TQPD> {
  return new RDY_K15(header, acknowledgment, queryAcknowledgment, queryParameters, options, encoding);
}
