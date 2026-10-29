/**
 * Parser for BAR^P06 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN { PATIENT: PID [PV1] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { BAR_P06_STRUCTURE } from "../../structures/v2.6/BAR_P06.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { EVN } from "../../segments/v2.6/EVN.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { PV1 } from "../../segments/v2.6/PV1.ts";

/** The PATIENT group of a parsed BAR^P06 (HL7 v2.6) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
}

/** Structured result of parsing an HL7 BAR^P06 (HL7 v2.6) message. */
export interface ParsedBAR_P06 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EVN segment. */
  event: EVN;
  /** The PATIENT groups. */
  patients: ParsedPatient[];
}

/** The segment parsers of BAR^P06 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
};

/** Parser for HL7 BAR^P06 (HL7 v2.6) messages. */
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

/** Parses an HL7 BAR^P06 (HL7 v2.6) message string into a structured result. */
export function parseBAR_P06(messageString: string): Result<ParsedBAR_P06> {
  return new BAR_P06_Parser().parse(messageString);
}
