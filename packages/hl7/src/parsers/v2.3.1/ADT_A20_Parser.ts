/**
 * Parser for ADT^A20 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN NPU
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ADT_A20_STRUCTURE } from "../../structures/v2.3.1/ADT_A20.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { EVN } from "../../segments/v2.3.1/EVN.ts";
import { NPU } from "../../segments/v2.3.1/NPU.ts";

/** Structured result of parsing an HL7 ADT^A20 (HL7 v2.3.1) message. */
export interface ParsedADT_A20 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EVN segment. */
  event: EVN;
  /** The NPU segment. */
  bedStatus: NPU;
}

/** The segment parsers of ADT^A20 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  NPU: (s, e) => NPU.parse(s, e),
};

/** Parser for HL7 ADT^A20 (HL7 v2.3.1) messages. */
export class ADT_A20_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A20";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A20_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A20> {
    return parseStructure<ParsedADT_A20>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A20 (HL7 v2.3.1) message string into a structured result. */
export function parseADT_A20(messageString: string): Result<ParsedADT_A20> {
  return new ADT_A20_Parser().parse(messageString);
}
