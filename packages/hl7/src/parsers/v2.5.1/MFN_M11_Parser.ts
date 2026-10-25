/**
 * Parser for MFN^M11 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MFI { MF_TEST_CALCULATED: MFE OM1 [ MF_TEST_CALC_DETAIL: OM6 OM2 ] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFN_M11_STRUCTURE } from "../../structures/v2.5.1/MFN_M11.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { MFI } from "../../segments/v2.5.1/MFI.ts";
import { MFE } from "../../segments/v2.5.1/MFE.ts";
import { OM1 } from "../../segments/v2.5.1/OM1.ts";
import { OM6 } from "../../segments/v2.5.1/OM6.ts";
import { OM2 } from "../../segments/v2.5.1/OM2.ts";

/** The MF TEST CALCULATED group of a parsed MFN^M11 (HL7 v2.5.1) message. */
export interface ParsedCalculatedTestEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The OM6 segment. */
  calculatedObservation?: OM6;
  /** The OM2 segment. */
  numericObservation?: OM2;
}

/** Structured result of parsing an HL7 MFN^M11 (HL7 v2.5.1) message. */
export interface ParsedMFN_M11 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF TEST CALCULATED groups. */
  entries: ParsedCalculatedTestEntry[];
}

/** The segment parsers of MFN^M11 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  OM1: (s, e) => OM1.parse(s, e),
  OM6: (s, e) => OM6.parse(s, e),
  OM2: (s, e) => OM2.parse(s, e),
};

/** Parser for HL7 MFN^M11 (HL7 v2.5.1) messages. */
export class MFN_M11_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M11";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M11_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M11> {
    return parseStructure<ParsedMFN_M11>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M11 (HL7 v2.5.1) message string into a structured result. */
export function parseMFN_M11(messageString: string): Result<ParsedMFN_M11> {
  return new MFN_M11_Parser().parse(messageString);
}
