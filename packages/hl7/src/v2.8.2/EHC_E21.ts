/**
 * Builder, parser and structure for EHC^E21 messages (HL7 v2.8.2).
 *
 * Structure: MSH [{SFT}] [{UAC}]  AUTHORIZATION_REQUEST: IVC { PSL_ITEM_INFO: PSL [{NTE}] [AUT] } 
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
import { IVC } from "./IVC.ts";
import { PSL } from "./PSL.ts";
import { NTE } from "./NTE.ts";
import { AUT } from "./AUT.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of EHC^E21 (HL7 v2.8.2), in order. */
export const EHC_E21_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  {
    name: "AUTHORIZATION_REQUEST",
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
          { name: "NTE", required: false, repeating: true },
          { name: "AUT", required: false, repeating: false },
        ],
      },
    ],
  },
];

/** The AUTHORIZATION REQUEST group of a parsed EHC^E21 (HL7 v2.8.2) message. */
export interface ParsedAuthorizationRequest {
  /** The IVC segment. */
  ivc: IVC;
  /** The PSL ITEM INFO groups. */
  pslItemInfos: ParsedPslItemInfo[];
}

/** The PSL ITEM INFO group of a parsed EHC^E21 (HL7 v2.8.2) message. */
export interface ParsedPslItemInfo {
  /** The PSL segment. */
  psl: PSL;
  /** The NTE segments. */
  notes?: NTE[];
  /** The AUT segment. */
  authorization?: AUT;
}

/** Structured result of parsing an HL7 EHC^E21 (HL7 v2.8.2) message. */
export interface ParsedEHC_E21 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The AUTHORIZATION REQUEST group. */
  authorizationRequest: ParsedAuthorizationRequest;
}

/** The segment parsers of EHC^E21 (HL7 v2.8.2). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  IVC: (s, e) => IVC.parse(s, e),
  PSL: (s, e) => PSL.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  AUT: (s, e) => AUT.parse(s, e),
};

/** Parser for HL7 EHC^E21 (HL7 v2.8.2) messages. */
export class EHC_E21_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E21";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EHC_E21_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEHC_E21> {
    return parseStructure<ParsedEHC_E21>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EHC^E21 (HL7 v2.8.2) message string into a structured result. */
export function parseEHC_E21(messageString: string): Result<ParsedEHC_E21> {
  return new EHC_E21_Parser().parse(messageString);
}

/** The AUTHORIZATION REQUEST group of an EHC^E21 (HL7 v2.8.2) message being built. */
export interface AuthorizationRequestGroup {
  /** The IVC segment. */
  ivc: IVC;
  /** The PSL ITEM INFO groups. */
  pslItemInfos: PslItemInfoGroup[];
}

/** The PSL ITEM INFO group of an EHC^E21 (HL7 v2.8.2) message being built. */
export interface PslItemInfoGroup {
  /** The PSL segment. */
  psl: PSL;
  /** The NTE segments. */
  notes?: NTE[];
  /** The AUT segment. */
  authorization?: AUT;
}

/** The optional segments and groups of an EHC^E21 (HL7 v2.8.2) message. */
export interface EHC_E21Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
}

/** Builder for HL7 EHC^E21 (HL7 v2.8.2) messages. */
export class EHC_E21<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E21";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EHC_E21_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public authorizationRequest: AuthorizationRequestGroup,
    public options: EHC_E21Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, authorizationRequest: this.authorizationRequest };
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

/** Builds an HL7 EHC^E21 (HL7 v2.8.2) message. */
export function createEHC_E21<TMSH extends MSH = MSH>(
  header: TMSH,
  authorizationRequest: AuthorizationRequestGroup,
  options: EHC_E21Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EHC_E21<TMSH> {
  return new EHC_E21(header, authorizationRequest, options, encoding);
}
