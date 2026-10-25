/**
 * Parser for PMU^B06 messages (HL7 v2.5.1).
 *
 * Structure: MSH EVN STF [{PRA}] [ORG]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { PMU_B06_STRUCTURE } from "../../structures/v2.5.1/PMU_B06.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { EVN } from "../../segments/v2.5.1/EVN.ts";
import { STF } from "../../segments/v2.5.1/STF.ts";
import { PRA } from "../../segments/v2.5.1/PRA.ts";
import { ORG } from "../../segments/v2.5.1/ORG.ts";

/** Structured result of parsing an HL7 PMU^B06 (HL7 v2.5.1) message. */
export interface ParsedPMU_B06 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EVN segment. */
  event: EVN;
  /** The STF segment. */
  staff: STF;
  /** The PRA segments. */
  practitioners?: PRA[];
  /** The ORG segment. */
  organizationUnit?: ORG;
}

/** The segment parsers of PMU^B06 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  STF: (s, e) => STF.parse(s, e),
  PRA: (s, e) => PRA.parse(s, e),
  ORG: (s, e) => ORG.parse(s, e),
};

/** Parser for HL7 PMU^B06 (HL7 v2.5.1) messages. */
export class PMU_B06_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PMU_B06";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = PMU_B06_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedPMU_B06> {
    return parseStructure<ParsedPMU_B06>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 PMU^B06 (HL7 v2.5.1) message string into a structured result. */
export function parsePMU_B06(messageString: string): Result<ParsedPMU_B06> {
  return new PMU_B06_Parser().parse(messageString);
}
