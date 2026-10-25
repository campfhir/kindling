/**
 * Parser for BAR^P12 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN PID PV1 [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { BAR_P12_STRUCTURE } from "../../structures/v2.5.1/BAR_P12.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { EVN } from "../../segments/v2.5.1/EVN.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { DG1 } from "../../segments/v2.5.1/DG1.ts";
import { DRG } from "../../segments/v2.5.1/DRG.ts";
import { PR1 } from "../../segments/v2.5.1/PR1.ts";
import { ROL } from "../../segments/v2.5.1/ROL.ts";

/** The PROCEDURE group of a parsed BAR^P12 (HL7 v2.5.1) message. */
export interface ParsedProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The ROL segments. */
  roles?: ROL[];
}

/** Structured result of parsing an HL7 BAR^P12 (HL7 v2.5.1) message. */
export interface ParsedBAR_P12 extends ParsedMessageBase {
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
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The PROCEDURE groups. */
  procedures?: ParsedProcedure[];
}

/** The segment parsers of BAR^P12 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  DRG: (s, e) => DRG.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 BAR^P12 (HL7 v2.5.1) messages. */
export class BAR_P12_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P12";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = BAR_P12_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBAR_P12> {
    return parseStructure<ParsedBAR_P12>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 BAR^P12 (HL7 v2.5.1) message string into a structured result. */
export function parseBAR_P12(messageString: string): Result<ParsedBAR_P12> {
  return new BAR_P12_Parser().parse(messageString);
}
