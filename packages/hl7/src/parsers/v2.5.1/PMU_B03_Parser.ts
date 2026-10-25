/**
 * Parser for PMU^B03 messages (HL7 v2.5.1).
 *
 * Structure: MSH EVN STF
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { PMU_B03_STRUCTURE } from "../../structures/v2.5.1/PMU_B03.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { EVN } from "../../segments/v2.5.1/EVN.ts";
import { STF } from "../../segments/v2.5.1/STF.ts";

/** Structured result of parsing an HL7 PMU^B03 (HL7 v2.5.1) message. */
export interface ParsedPMU_B03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EVN segment. */
  event: EVN;
  /** The STF segment. */
  staff: STF;
}

/** The segment parsers of PMU^B03 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  STF: (s, e) => STF.parse(s, e),
};

/** Parser for HL7 PMU^B03 (HL7 v2.5.1) messages. */
export class PMU_B03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PMU_B03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = PMU_B03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedPMU_B03> {
    return parseStructure<ParsedPMU_B03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 PMU^B03 (HL7 v2.5.1) message string into a structured result. */
export function parsePMU_B03(messageString: string): Result<ParsedPMU_B03> {
  return new PMU_B03_Parser().parse(messageString);
}
