/**
 * Builder, parser and structure for ERP^R09 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA [ERR] QAK ERQ [DSC]
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
import { ERQ } from "./ERQ.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ERP^R09 (HL7 v2.5), in order. */
export const ERP_R09_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: true, repeating: false },
  { name: "ERQ", required: true, repeating: false },
  { name: "DSC", required: false, repeating: false },
];

/** Structured result of parsing an HL7 ERP^R09 (HL7 v2.5) message. */
export interface ParsedERP_R09 extends ParsedMessageBase {
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
  /** The ERQ segment. */
  eventReplayQuery: ERQ;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of ERP^R09 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  ERQ: (s, e) => ERQ.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 ERP^R09 (HL7 v2.5) messages. */
export class ERP_R09_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ERP_R09";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ERP_R09_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedERP_R09> {
    return parseStructure<ParsedERP_R09>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ERP^R09 (HL7 v2.5) message string into a structured result. */
export function parseERP_R09(messageString: string): Result<ParsedERP_R09> {
  return new ERP_R09_Parser().parse(messageString);
}

/** The optional segments and groups of an ERP^R09 (HL7 v2.5) message. */
export interface ERP_R09Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The ERR segment. */
  error?: ERR;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 ERP^R09 (HL7 v2.5) messages. */
export class ERP_R09<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TERQ extends ERQ = ERQ> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ERP_R09";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ERP_R09_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public eventReplayQuery: TERQ,
    public options: ERP_R09Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAcknowledgment: this.queryAcknowledgment, eventReplayQuery: this.eventReplayQuery };
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

/** Builds an HL7 ERP^R09 (HL7 v2.5) message. */
export function createERP_R09<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TERQ extends ERQ = ERQ>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  eventReplayQuery: TERQ,
  options: ERP_R09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ERP_R09<TMSH, TMSA, TQAK, TERQ> {
  return new ERP_R09(header, acknowledgment, queryAcknowledgment, eventReplayQuery, options, encoding);
}
