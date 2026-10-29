/**
 * Parser for STC^S33 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] {SCP}
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { STC_S33_STRUCTURE } from "../../structures/v2.6/STC_S33.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { SCP } from "../../segments/v2.6/SCP.ts";

/** Structured result of parsing an HL7 STC^S33 (HL7 v2.6) message. */
export interface ParsedSTC_S33 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The SCP segments. */
  scpList: SCP[];
}

/** The segment parsers of STC^S33 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  SCP: (s, e) => SCP.parse(s, e),
};

/** Parser for HL7 STC^S33 (HL7 v2.6) messages. */
export class STC_S33_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "STC_S33";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = STC_S33_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSTC_S33> {
    return parseStructure<ParsedSTC_S33>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 STC^S33 (HL7 v2.6) message string into a structured result. */
export function parseSTC_S33(messageString: string): Result<ParsedSTC_S33> {
  return new STC_S33_Parser().parse(messageString);
}
