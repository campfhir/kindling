/**
 * Parser for SUR^P09 messages (HL7 v2.3.1).
 *
 * Structure: MSH { FACILITY: FAC { PRODUCT: PSH PDC } PSH { FACILITY_DETAIL: FAC PDC NTE } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { SUR_P09_STRUCTURE } from "../../structures/v2.3.1/SUR_P09.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { FAC } from "../../segments/v2.3.1/FAC.ts";
import { PSH } from "../../segments/v2.3.1/PSH.ts";
import { PDC } from "../../segments/v2.3.1/PDC.ts";
import { NTE } from "../../segments/v2.3.1/NTE.ts";

/** The FACILITY group of a parsed SUR^P09 (HL7 v2.3.1) message. */
export interface ParsedFacility {
  /** The FAC segment. */
  facility: FAC;
  /** The PRODUCT groups. */
  products: ParsedProduct[];
  /** The PSH segment. */
  productSummary: PSH;
  /** The FACILITY DETAIL groups. */
  facilityDetails: ParsedFacilityDetail[];
}

/** The PRODUCT group of a parsed SUR^P09 (HL7 v2.3.1) message. */
export interface ParsedProduct {
  /** The PSH segment. */
  productSummary: PSH;
  /** The PDC segment. */
  productDetail: PDC;
}

/** The FACILITY DETAIL group of a parsed SUR^P09 (HL7 v2.3.1) message. */
export interface ParsedFacilityDetail {
  /** The FAC segment. */
  facility: FAC;
  /** The PDC segment. */
  productDetail: PDC;
  /** The NTE segment. */
  note: NTE;
}

/** Structured result of parsing an HL7 SUR^P09 (HL7 v2.3.1) message. */
export interface ParsedSUR_P09 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The FACILITY groups. */
  facilities: ParsedFacility[];
}

/** The segment parsers of SUR^P09 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  FAC: (s, e) => FAC.parse(s, e),
  PSH: (s, e) => PSH.parse(s, e),
  PDC: (s, e) => PDC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
};

/** Parser for HL7 SUR^P09 (HL7 v2.3.1) messages. */
export class SUR_P09_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SUR_P09";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SUR_P09_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSUR_P09> {
    return parseStructure<ParsedSUR_P09>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SUR^P09 (HL7 v2.3.1) message string into a structured result. */
export function parseSUR_P09(messageString: string): Result<ParsedSUR_P09> {
  return new SUR_P09_Parser().parse(messageString);
}
