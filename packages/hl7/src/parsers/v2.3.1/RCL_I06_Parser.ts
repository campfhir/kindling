/**
 * Parser for RCL^I06 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA QRD [QRF] { PROVIDER: PRD [{CTD}] } PID [{DG1}] [{DRG}] [{AL1}] [{NTE}] [{DSP}] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RCL_I06_STRUCTURE } from "../../structures/v2.3.1/RCL_I06.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { MSA } from "../../segments/v2.3.1/MSA.ts";
import { QRD } from "../../segments/v2.3.1/QRD.ts";
import { QRF } from "../../segments/v2.3.1/QRF.ts";
import { PRD } from "../../segments/v2.3.1/PRD.ts";
import { CTD } from "../../segments/v2.3.1/CTD.ts";
import { PID } from "../../segments/v2.3.1/PID.ts";
import { DG1 } from "../../segments/v2.3.1/DG1.ts";
import { DRG } from "../../segments/v2.3.1/DRG.ts";
import { AL1 } from "../../segments/v2.3.1/AL1.ts";
import { NTE } from "../../segments/v2.3.1/NTE.ts";
import { DSP } from "../../segments/v2.3.1/DSP.ts";
import { DSC } from "../../segments/v2.3.1/DSC.ts";

/** The PROVIDER group of a parsed RCL^I06 (HL7 v2.3.1) message. */
export interface ParsedProvider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** Structured result of parsing an HL7 RCL^I06 (HL7 v2.3.1) message. */
export interface ParsedRCL_I06 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PROVIDER groups. */
  providers: ParsedProvider[];
  /** The PID segment. */
  patient: PID;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segments. */
  diagnosisRelatedGroups?: DRG[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The DSP segments. */
  displayLines?: DSP[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RCL^I06 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  DRG: (s, e) => DRG.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  DSP: (s, e) => DSP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RCL^I06 (HL7 v2.3.1) messages. */
export class RCL_I06_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RCL_I06";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RCL_I06_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRCL_I06> {
    return parseStructure<ParsedRCL_I06>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RCL^I06 (HL7 v2.3.1) message string into a structured result. */
export function parseRCL_I06(messageString: string): Result<ParsedRCL_I06> {
  return new RCL_I06_Parser().parse(messageString);
}
