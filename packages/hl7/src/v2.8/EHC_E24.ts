/**
 * Builder, parser and structure for EHC^E24 messages (HL7 v2.8).
 *
 * Structure: MSH [{SFT}] [{UAC}] MSA [{ERR}]  AUTHORIZATION_RESPONSE_INFO: IVC { PSL_ITEM_INFO: PSL [AUT] [{ADJ}] } 
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
import { IVC } from "./IVC.ts";
import { PSL } from "./PSL.ts";
import { AUT } from "./AUT.ts";
import { ADJ } from "./ADJ.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of EHC^E24 (HL7 v2.8), in order. */
export const EHC_E24_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  {
    name: "AUTHORIZATION_RESPONSE_INFO",
    required: true,
    repeating: false,
    segments: [
      { name: "IVC", required: true, repeating: false },
      {
        name: "PSL_ITEM_INFO",
        required: true,
        repeating: true,
        segments: [
          { name: "PSL", required: true, repeating: false },
          { name: "AUT", required: false, repeating: false },
          { name: "ADJ", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The AUTHORIZATION RESPONSE INFO group of a parsed EHC^E24 (HL7 v2.8) message. */
export interface ParsedAuthorizationResponseInfo {
  /** The IVC segment. */
  ivc: IVC;
  /** The PSL ITEM INFO groups. */
  pslItemInfos: ParsedPslItemInfo[];
}

/** The PSL ITEM INFO group of a parsed EHC^E24 (HL7 v2.8) message. */
export interface ParsedPslItemInfo {
  /** The PSL segment. */
  psl: PSL;
  /** The AUT segment. */
  authorization?: AUT;
  /** The ADJ segments. */
  adjList?: ADJ[];
}

/** Structured result of parsing an HL7 EHC^E24 (HL7 v2.8) message. */
export interface ParsedEHC_E24 extends ParsedMessageBase {
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
  /** The AUTHORIZATION RESPONSE INFO group. */
  authorizationResponseInfo: ParsedAuthorizationResponseInfo;
}

/** The segment parsers of EHC^E24 (HL7 v2.8). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  IVC: (s, e) => IVC.parse(s, e),
  PSL: (s, e) => PSL.parse(s, e),
  AUT: (s, e) => AUT.parse(s, e),
  ADJ: (s, e) => ADJ.parse(s, e),
};

/** Parser for HL7 EHC^E24 (HL7 v2.8) messages. */
export class EHC_E24_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E24";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EHC_E24_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEHC_E24> {
    return parseStructure<ParsedEHC_E24>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EHC^E24 (HL7 v2.8) message string into a structured result. */
export function parseEHC_E24(messageString: string): Result<ParsedEHC_E24> {
  return new EHC_E24_Parser().parse(messageString);
}

/** The AUTHORIZATION RESPONSE INFO group of an EHC^E24 (HL7 v2.8) message being built. */
export interface AuthorizationResponseInfoGroup {
  /** The IVC segment. */
  ivc: IVC;
  /** The PSL ITEM INFO groups. */
  pslItemInfos: PslItemInfoGroup[];
}

/** The PSL ITEM INFO group of an EHC^E24 (HL7 v2.8) message being built. */
export interface PslItemInfoGroup {
  /** The PSL segment. */
  psl: PSL;
  /** The AUT segment. */
  authorization?: AUT;
  /** The ADJ segments. */
  adjList?: ADJ[];
}

/** The optional segments and groups of an EHC^E24 (HL7 v2.8) message. */
export interface EHC_E24Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The ERR segments. */
  errors?: ERR[];
}

/** Builder for HL7 EHC^E24 (HL7 v2.8) messages. */
export class EHC_E24<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E24";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EHC_E24_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public authorizationResponseInfo: AuthorizationResponseInfoGroup,
    public options: EHC_E24Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, authorizationResponseInfo: this.authorizationResponseInfo };
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

/** Builds an HL7 EHC^E24 (HL7 v2.8) message. */
export function createEHC_E24<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  authorizationResponseInfo: AuthorizationResponseInfoGroup,
  options: EHC_E24Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EHC_E24<TMSH, TMSA> {
  return new EHC_E24(header, acknowledgment, authorizationResponseInfo, options, encoding);
}
