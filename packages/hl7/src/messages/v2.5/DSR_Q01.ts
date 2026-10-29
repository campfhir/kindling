/**
 * Builder, parser and structure for DSR^Q01 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA [ERR] [QAK] QRD [QRF] {DSP} [DSC]
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
import { QRD } from "../../segments/v2.5/QRD.ts";
import { QRF } from "../../segments/v2.5/QRF.ts";
import { DSP } from "../../segments/v2.5/DSP.ts";
import { DSC } from "../../segments/v2.5/DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of DSR^Q01 (HL7 v2.5), in order. */
export const DSR_Q01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: false, repeating: false },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
  { name: "DSP", required: true, repeating: true },
  { name: "DSC", required: false, repeating: false },
];

/** Structured result of parsing an HL7 DSR^Q01 (HL7 v2.5) message. */
export interface ParsedDSR_Q01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSP segments. */
  displayLines: DSP[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of DSR^Q01 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  DSP: (s, e) => DSP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 DSR^Q01 (HL7 v2.5) messages. */
export class DSR_Q01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DSR_Q01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = DSR_Q01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedDSR_Q01> {
    return parseStructure<ParsedDSR_Q01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 DSR^Q01 (HL7 v2.5) message string into a structured result. */
export function parseDSR_Q01(messageString: string): Result<ParsedDSR_Q01> {
  return new DSR_Q01_Parser().parse(messageString);
}

/** The optional segments and groups of an DSR^Q01 (HL7 v2.5) message. */
export interface DSR_Q01Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 DSR^Q01 (HL7 v2.5) messages. */
export class DSR_Q01<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DSR_Q01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = DSR_Q01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public displayLines: DSP[],
    public options: DSR_Q01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query, displayLines: this.displayLines };
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

/** Builds an HL7 DSR^Q01 (HL7 v2.5) message. */
export function createDSR_Q01<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  displayLines: DSP[],
  options: DSR_Q01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): DSR_Q01<TMSH, TMSA, TQRD> {
  return new DSR_Q01(header, acknowledgment, query, displayLines, options, encoding);
}
