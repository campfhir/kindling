/**
 * Parser for BAR^P02 messages (HL7 v2.3).
 *
 * Structure: MSH EVN { PATIENT: PID [PD1] [PV1] [{DB1}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { BAR_P02_STRUCTURE } from "../../structures/v2.3/BAR_P02.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { EVN } from "../../segments/v2.3/EVN.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PD1 } from "../../segments/v2.3/PD1.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { DB1 } from "../../segments/v2.3/DB1.ts";

/** The PATIENT group of a parsed BAR^P02 (HL7 v2.3) message. */
export interface ParsedBARPurgePatient {
  /** The PID segment. */
  pid: PID;
  /** The PD1 segment. */
  pd1?: PD1;
  /** The PV1 segment. */
  pv1?: PV1;
  /** The DB1 segments. */
  db1List?: DB1[];
}

/** Structured result of parsing an HL7 BAR^P02 (HL7 v2.3) message. */
export interface ParsedBAR_P02 extends ParsedMessageBase {
  /** The MSH segment. */
  msh: MSH;
  /** The EVN segment. */
  evn: EVN;
  /** The PATIENT groups. */
  patients: ParsedBARPurgePatient[];
}

/** The segment parsers of BAR^P02 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  DB1: (s, e) => DB1.parse(s, e),
};

/** Parser for HL7 BAR^P02 (HL7 v2.3) messages. */
export class BAR_P02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = BAR_P02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBAR_P02> {
    return parseStructure<ParsedBAR_P02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 BAR^P02 (HL7 v2.3) message string into a structured result. */
export function parseBAR_P02(messageString: string): Result<ParsedBAR_P02> {
  return new BAR_P02_Parser().parse(messageString);
}
