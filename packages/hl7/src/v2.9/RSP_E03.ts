/**
 * Builder, parser and structure for RSP^E03 messages (HL7 v2.9).
 *
 * Structure: MSH [{SFT}] [{UAC}] MSA [{ERR}]  QUERY_ACK_IPR: QAK QPD [{IPR}] 
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
import { IPR } from "./IPR.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RSP^E03 (HL7 v2.9), in order. */
export const RSP_E03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  {
    name: "QUERY_ACK_IPR",
    required: true,
    repeating: false,
    segments: [
      { name: "QAK", required: true, repeating: false },
      { name: "QPD", required: true, repeating: false },
      { name: "IPR", required: false, repeating: true },
    ],
  },
];

/** The QUERY ACK IPR group of a parsed RSP^E03 (HL7 v2.9) message. */
export interface ParsedQueryAckIpr {
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The IPR segments. */
  iprList?: IPR[];
}

/** Structured result of parsing an HL7 RSP^E03 (HL7 v2.9) message. */
export interface ParsedRSP_E03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The QUERY ACK IPR group. */
  queryAckIpr: ParsedQueryAckIpr;
}

/** The segment parsers of RSP^E03 (HL7 v2.9). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  IPR: (s, e) => IPR.parse(s, e),
};

/** Parser for HL7 RSP^E03 (HL7 v2.9) messages. */
export class RSP_E03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_E03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RSP_E03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRSP_E03> {
    return parseStructure<ParsedRSP_E03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RSP^E03 (HL7 v2.9) message string into a structured result. */
export function parseRSP_E03(messageString: string): Result<ParsedRSP_E03> {
  return new RSP_E03_Parser().parse(messageString);
}

/** The QUERY ACK IPR group of an RSP^E03 (HL7 v2.9) message being built. */
export interface QueryAckIprGroup {
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The IPR segments. */
  iprList?: IPR[];
}

/** The optional segments and groups of an RSP^E03 (HL7 v2.9) message. */
export interface RSP_E03Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The ERR segments. */
  errors?: ERR[];
}

/** Builder for HL7 RSP^E03 (HL7 v2.9) messages. */
export class RSP_E03<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_E03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RSP_E03_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAckIpr: QueryAckIprGroup,
    public options: RSP_E03Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAckIpr: this.queryAckIpr };
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

/** Builds an HL7 RSP^E03 (HL7 v2.9) message. */
export function createRSP_E03<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAckIpr: QueryAckIprGroup,
  options: RSP_E03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RSP_E03<TMSH, TMSA> {
  return new RSP_E03(header, acknowledgment, queryAckIpr, options, encoding);
}
