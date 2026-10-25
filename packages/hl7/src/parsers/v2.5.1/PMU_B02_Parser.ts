/**
 * Parser for PMU^B02 messages (HL7 v2.5.1).
 *
 * Structure: MSH EVN STF [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { PMU_B02_STRUCTURE } from "../../structures/v2.5.1/PMU_B02.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { EVN } from "../../segments/v2.5.1/EVN.ts";
import { STF } from "../../segments/v2.5.1/STF.ts";
import { PRA } from "../../segments/v2.5.1/PRA.ts";
import { ORG } from "../../segments/v2.5.1/ORG.ts";
import { AFF } from "../../segments/v2.5.1/AFF.ts";
import { LAN } from "../../segments/v2.5.1/LAN.ts";
import { EDU } from "../../segments/v2.5.1/EDU.ts";

/** Structured result of parsing an HL7 PMU^B02 (HL7 v2.5.1) message. */
export interface ParsedPMU_B02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EVN segment. */
  event: EVN;
  /** The STF segment. */
  staff: STF;
  /** The PRA segments. */
  practitioners?: PRA[];
  /** The ORG segments. */
  organizationUnits?: ORG[];
  /** The AFF segments. */
  affiliations?: AFF[];
  /** The LAN segments. */
  languages?: LAN[];
  /** The EDU segments. */
  educations?: EDU[];
}

/** The segment parsers of PMU^B02 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  STF: (s, e) => STF.parse(s, e),
  PRA: (s, e) => PRA.parse(s, e),
  ORG: (s, e) => ORG.parse(s, e),
  AFF: (s, e) => AFF.parse(s, e),
  LAN: (s, e) => LAN.parse(s, e),
  EDU: (s, e) => EDU.parse(s, e),
};

/** Parser for HL7 PMU^B02 (HL7 v2.5.1) messages. */
export class PMU_B02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PMU_B02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = PMU_B02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedPMU_B02> {
    return parseStructure<ParsedPMU_B02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 PMU^B02 (HL7 v2.5.1) message string into a structured result. */
export function parsePMU_B02(messageString: string): Result<ParsedPMU_B02> {
  return new PMU_B02_Parser().parse(messageString);
}
