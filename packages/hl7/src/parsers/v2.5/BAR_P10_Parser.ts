/**
 * Parser for BAR^P10 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN PID PV1 [{DG1}] GP1 [{ PROCEDURE: PR1 [GP2] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { BAR_P10_STRUCTURE } from "../../structures/v2.5/BAR_P10.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { EVN } from "../../segments/v2.5/EVN.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { DG1 } from "../../segments/v2.5/DG1.ts";
import { GP1 } from "../../segments/v2.5/GP1.ts";
import { PR1 } from "../../segments/v2.5/PR1.ts";
import { GP2 } from "../../segments/v2.5/GP2.ts";

/** The PROCEDURE group of a parsed BAR^P10 (HL7 v2.5) message. */
export interface ParsedProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The GP2 segment. */
  groupingProcedure?: GP2;
}

/** Structured result of parsing an HL7 BAR^P10 (HL7 v2.5) message. */
export interface ParsedBAR_P10 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit: PV1;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The GP1 segment. */
  groupingVisit: GP1;
  /** The PROCEDURE groups. */
  procedures?: ParsedProcedure[];
}

/** The segment parsers of BAR^P10 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  GP1: (s, e) => GP1.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  GP2: (s, e) => GP2.parse(s, e),
};

/** Parser for HL7 BAR^P10 (HL7 v2.5) messages. */
export class BAR_P10_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P10";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = BAR_P10_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBAR_P10> {
    return parseStructure<ParsedBAR_P10>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 BAR^P10 (HL7 v2.5) message string into a structured result. */
export function parseBAR_P10(messageString: string): Result<ParsedBAR_P10> {
  return new BAR_P10_Parser().parse(messageString);
}
