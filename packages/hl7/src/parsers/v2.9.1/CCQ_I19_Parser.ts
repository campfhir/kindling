/**
 * Parser for CCQ^I19 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] RF1 [{ PROVIDER_CONTACT: PRD [{CTD}] }] [{REL}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { CCQ_I19_STRUCTURE } from "../../structures/v2.9.1/CCQ_I19.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { RF1 } from "../../segments/v2.9.1/RF1.ts";
import { PRD } from "../../segments/v2.9.1/PRD.ts";
import { CTD } from "../../segments/v2.9.1/CTD.ts";
import { REL } from "../../segments/v2.9.1/REL.ts";

/** The PROVIDER CONTACT group of a parsed CCQ^I19 (HL7 v2.9.1) message. */
export interface ParsedProviderContact {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** Structured result of parsing an HL7 CCQ^I19 (HL7 v2.9.1) message. */
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

/** The segment parsers of CCQ^I19 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  RF1: (s, e) => RF1.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  REL: (s, e) => REL.parse(s, e),
};

/** Parser for HL7 CCQ^I19 (HL7 v2.9.1) messages. */
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

/** Parses an HL7 CCQ^I19 (HL7 v2.9.1) message string into a structured result. */
export function parseCCQ_I19(messageString: string): Result<ParsedCCQ_I19> {
  return new CCQ_I19_Parser().parse(messageString);
}
