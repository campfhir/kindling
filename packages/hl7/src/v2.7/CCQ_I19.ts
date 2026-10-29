/**
 * Builder, parser and structure for CCQ^I19 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] RF1 [{ PROVIDER_CONTACT: PRD [{CTD}] }] [{REL}]
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
import { RF1 } from "./RF1.ts";
import { PRD } from "./PRD.ts";
import { CTD } from "./CTD.ts";
import { REL } from "./REL.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of CCQ^I19 (HL7 v2.7), in order. */
export const CCQ_I19_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "RF1", required: true, repeating: false },
  {
    name: "PROVIDER_CONTACT",
    required: false,
    repeating: true,
    segments: [
      { name: "PRD", required: true, repeating: false },
      { name: "CTD", required: false, repeating: true },
    ],
  },
  { name: "REL", required: false, repeating: true },
];

/** The PROVIDER CONTACT group of a parsed CCQ^I19 (HL7 v2.7) message. */
export interface ParsedProviderContact {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** Structured result of parsing an HL7 CCQ^I19 (HL7 v2.7) message. */
export interface ParsedCCQ_I19 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The RF1 segment. */
  referral: RF1;
  /** The PROVIDER CONTACT groups. */
  providerContacts?: ParsedProviderContact[];
  /** The REL segments. */
  relList?: REL[];
}

/** The segment parsers of CCQ^I19 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  RF1: (s, e) => RF1.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  REL: (s, e) => REL.parse(s, e),
};

/** Parser for HL7 CCQ^I19 (HL7 v2.7) messages. */
export class CCQ_I19_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "CCQ_I19";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = CCQ_I19_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedCCQ_I19> {
    return parseStructure<ParsedCCQ_I19>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 CCQ^I19 (HL7 v2.7) message string into a structured result. */
export function parseCCQ_I19(messageString: string): Result<ParsedCCQ_I19> {
  return new CCQ_I19_Parser().parse(messageString);
}

/** The PROVIDER CONTACT group of an CCQ^I19 (HL7 v2.7) message being built. */
export interface ProviderContactGroup {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The optional segments and groups of an CCQ^I19 (HL7 v2.7) message. */
export interface CCQ_I19Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PROVIDER CONTACT groups. */
  providerContacts?: ProviderContactGroup[];
  /** The REL segments. */
  relList?: REL[];
}

/** Builder for HL7 CCQ^I19 (HL7 v2.7) messages. */
export class CCQ_I19<TMSH extends MSH = MSH, TRF1 extends RF1 = RF1> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "CCQ_I19";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = CCQ_I19_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public referral: TRF1,
    public options: CCQ_I19Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, referral: this.referral };
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

/** Builds an HL7 CCQ^I19 (HL7 v2.7) message. */
export function createCCQ_I19<TMSH extends MSH = MSH, TRF1 extends RF1 = RF1>(
  header: TMSH,
  referral: TRF1,
  options: CCQ_I19Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CCQ_I19<TMSH, TRF1> {
  return new CCQ_I19(header, referral, options, encoding);
}
