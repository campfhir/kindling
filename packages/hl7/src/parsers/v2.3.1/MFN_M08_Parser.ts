/**
 * Parser for MFN^M08 messages (HL7 v2.3.1).
 *
 * Structure: MSH MFI { MF_TEST_NUMERIC: MFE OM1 [OM2] [OM3] [OM4] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFN_M08_STRUCTURE } from "../../structures/v2.3.1/MFN_M08.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { MFI } from "../../segments/v2.3.1/MFI.ts";
import { MFE } from "../../segments/v2.3.1/MFE.ts";
import { OM1 } from "../../segments/v2.3.1/OM1.ts";
import { OM2 } from "../../segments/v2.3.1/OM2.ts";
import { OM3 } from "../../segments/v2.3.1/OM3.ts";
import { OM4 } from "../../segments/v2.3.1/OM4.ts";

/** The MF TEST NUMERIC group of a parsed MFN^M08 (HL7 v2.3.1) message. */
export interface ParsedNumericTestEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The OM2 segment. */
  numericObservation?: OM2;
  /** The OM3 segment. */
  categoricalObservation?: OM3;
  /** The OM4 segment. */
  specimenRequirement?: OM4;
}

/** Structured result of parsing an HL7 MFN^M08 (HL7 v2.3.1) message. */
export interface ParsedMFN_M08 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF TEST NUMERIC groups. */
  entries: ParsedNumericTestEntry[];
}

/** The segment parsers of MFN^M08 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  OM1: (s, e) => OM1.parse(s, e),
  OM2: (s, e) => OM2.parse(s, e),
  OM3: (s, e) => OM3.parse(s, e),
  OM4: (s, e) => OM4.parse(s, e),
};

/** Parser for HL7 MFN^M08 (HL7 v2.3.1) messages. */
export class MFN_M08_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M08";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M08_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M08> {
    return parseStructure<ParsedMFN_M08>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M08 (HL7 v2.3.1) message string into a structured result. */
export function parseMFN_M08(messageString: string): Result<ParsedMFN_M08> {
  return new MFN_M08_Parser().parse(messageString);
}
