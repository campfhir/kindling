/**
 * Parser for RPR^I03 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA { PROVIDER: PRD [{CTD}] } [{PID}] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RPR_I03_STRUCTURE } from "../../structures/v2.6/RPR_I03.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { PRD } from "../../segments/v2.6/PRD.ts";
import { CTD } from "../../segments/v2.6/CTD.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";

/** The PROVIDER group of a parsed RPR^I03 (HL7 v2.6) message. */
export interface ParsedProvider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** Structured result of parsing an HL7 RPR^I03 (HL7 v2.6) message. */
export interface ParsedRPR_I03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The PROVIDER groups. */
  providers: ParsedProvider[];
  /** The PID segments. */
  patients?: PID[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The segment parsers of RPR^I03 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
};

/** Parser for HL7 RPR^I03 (HL7 v2.6) messages. */
export class RPR_I03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RPR_I03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RPR_I03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRPR_I03> {
    return parseStructure<ParsedRPR_I03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RPR^I03 (HL7 v2.6) message string into a structured result. */
export function parseRPR_I03(messageString: string): Result<ParsedRPR_I03> {
  return new RPR_I03_Parser().parse(messageString);
}
