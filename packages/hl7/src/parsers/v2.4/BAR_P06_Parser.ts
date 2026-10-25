/**
 * Parser for BAR^P06 messages (HL7 v2.4).
 *
 * Structure: MSH EVN { PATIENT: PID [PV1] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { BAR_P06_STRUCTURE } from "../../structures/v2.4/BAR_P06.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { EVN } from "../../segments/v2.4/EVN.ts";
import { PID } from "../../segments/v2.4/PID.ts";
import { PV1 } from "../../segments/v2.4/PV1.ts";

/** The PATIENT group of a parsed BAR^P06 (HL7 v2.4) message. */
export interface ParsedBAREndPatient {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
}

/** Structured result of parsing an HL7 BAR^P06 (HL7 v2.4) message. */
export interface ParsedBAR_P06 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EVN segment. */
  event: EVN;
  /** The PATIENT groups. */
  patients: ParsedBAREndPatient[];
}

/** The segment parsers of BAR^P06 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
};

/** Parser for HL7 BAR^P06 (HL7 v2.4) messages. */
export class BAR_P06_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P06";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = BAR_P06_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBAR_P06> {
    return parseStructure<ParsedBAR_P06>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 BAR^P06 (HL7 v2.4) message string into a structured result. */
export function parseBAR_P06(messageString: string): Result<ParsedBAR_P06> {
  return new BAR_P06_Parser().parse(messageString);
}
