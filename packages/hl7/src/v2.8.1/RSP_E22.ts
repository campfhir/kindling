/**
 * Builder, parser and structure for RSP^E22 messages (HL7 v2.8.1).
 *
 * Structure: MSH [{SFT}] [{UAC}] MSA [{ERR}]  QUERY_ACK: QAK QPD [ AUTHORIZATION_INFO: IVC PSG { PSL_ITEM_INFO: PSL } ] 
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
import { IVC } from "./IVC.ts";
import { PSG } from "./PSG.ts";
import { PSL } from "./PSL.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RSP^E22 (HL7 v2.8.1), in order. */
export const RSP_E22_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  {
    name: "QUERY_ACK",
    required: true,
    repeating: false,
    segments: [
      { name: "QAK", required: true, repeating: false },
      { name: "QPD", required: true, repeating: false },
      {
        name: "AUTHORIZATION_INFO",
        required: false,
        repeating: false,
        segments: [
          { name: "IVC", required: true, repeating: false },
          { name: "PSG", required: true, repeating: false },
          {
            name: "PSL_ITEM_INFO",
            required: true,
            repeating: true,
            segments: [
              { name: "PSL", required: true, repeating: false },
            ],
          },
        ],
      },
    ],
  },
];

/** The QUERY ACK group of a parsed RSP^E22 (HL7 v2.8.1) message. */
export interface ParsedQueryAck {
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The AUTHORIZATION INFO group. */
  authorizationInfo?: ParsedAuthorizationInfo;
}

/** The AUTHORIZATION INFO group of a parsed RSP^E22 (HL7 v2.8.1) message. */
export interface ParsedAuthorizationInfo {
  /** The IVC segment. */
  ivc: IVC;
  /** The PSG segment. */
  psg: PSG;
  /** The PSL ITEM INFO groups. */
  pslItemInfos: ParsedPslItemInfo[];
}

/** The PSL ITEM INFO group of a parsed RSP^E22 (HL7 v2.8.1) message. */
export interface ParsedPslItemInfo {
  /** The PSL segment. */
  psl: PSL;
}

/** Structured result of parsing an HL7 RSP^E22 (HL7 v2.8.1) message. */
export interface ParsedRSP_E22 extends ParsedMessageBase {
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
  /** The QUERY ACK group. */
  queryAck: ParsedQueryAck;
}

/** The segment parsers of RSP^E22 (HL7 v2.8.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  IVC: (s, e) => IVC.parse(s, e),
  PSG: (s, e) => PSG.parse(s, e),
  PSL: (s, e) => PSL.parse(s, e),
};

/** Parser for HL7 RSP^E22 (HL7 v2.8.1) messages. */
export class RSP_E22_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_E22";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RSP_E22_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRSP_E22> {
    return parseStructure<ParsedRSP_E22>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RSP^E22 (HL7 v2.8.1) message string into a structured result. */
export function parseRSP_E22(messageString: string): Result<ParsedRSP_E22> {
  return new RSP_E22_Parser().parse(messageString);
}

/** The QUERY ACK group of an RSP^E22 (HL7 v2.8.1) message being built. */
export interface QueryAckGroup {
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The AUTHORIZATION INFO group. */
  authorizationInfo?: AuthorizationInfoGroup;
}

/** The AUTHORIZATION INFO group of an RSP^E22 (HL7 v2.8.1) message being built. */
export interface AuthorizationInfoGroup {
  /** The IVC segment. */
  ivc: IVC;
  /** The PSG segment. */
  psg: PSG;
  /** The PSL ITEM INFO groups. */
  pslItemInfos: PslItemInfoGroup[];
}

/** The PSL ITEM INFO group of an RSP^E22 (HL7 v2.8.1) message being built. */
export interface PslItemInfoGroup {
  /** The PSL segment. */
  psl: PSL;
}

/** The optional segments and groups of an RSP^E22 (HL7 v2.8.1) message. */
export interface RSP_E22Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The ERR segments. */
  errors?: ERR[];
}

/** Builder for HL7 RSP^E22 (HL7 v2.8.1) messages. */
export class RSP_E22<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_E22";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RSP_E22_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAck: QueryAckGroup,
    public options: RSP_E22Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAck: this.queryAck };
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

/** Builds an HL7 RSP^E22 (HL7 v2.8.1) message. */
export function createRSP_E22<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAck: QueryAckGroup,
  options: RSP_E22Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RSP_E22<TMSH, TMSA> {
  return new RSP_E22(header, acknowledgment, queryAck, options, encoding);
}
