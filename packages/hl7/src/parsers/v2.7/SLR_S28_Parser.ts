/**
 * Parser for SLR^S28 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] {SLT}
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { SLR_S28_STRUCTURE } from "../../structures/v2.7/SLR_S28.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { SLT } from "../../segments/v2.7/SLT.ts";

/** Structured result of parsing an HL7 SLR^S28 (HL7 v2.7) message. */
export interface ParsedSLR_S28 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The SLT segments. */
  sltList: SLT[];
}

/** The segment parsers of SLR^S28 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  SLT: (s, e) => SLT.parse(s, e),
};

/** Parser for HL7 SLR^S28 (HL7 v2.7) messages. */
export class SLR_S28_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SLR_S28";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SLR_S28_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSLR_S28> {
    return parseStructure<ParsedSLR_S28>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SLR^S28 (HL7 v2.7) message string into a structured result. */
export function parseSLR_S28(messageString: string): Result<ParsedSLR_S28> {
  return new SLR_S28_Parser().parse(messageString);
}
