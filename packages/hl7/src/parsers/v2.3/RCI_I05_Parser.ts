/**
 * Parser for RCI^I05 messages (HL7 v2.3).
 *
 * Structure: MSH MSA QRD [QRF] { PROVIDER: PRD [{CTD}] } PID [{DG1}] [{DRG}] [{AL1}] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RCI_I05_STRUCTURE } from "../../structures/v2.3/RCI_I05.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { QRD } from "../../segments/v2.3/QRD.ts";
import { QRF } from "../../segments/v2.3/QRF.ts";
import { PRD } from "../../segments/v2.3/PRD.ts";
import { CTD } from "../../segments/v2.3/CTD.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { DG1 } from "../../segments/v2.3/DG1.ts";
import { DRG } from "../../segments/v2.3/DRG.ts";
import { AL1 } from "../../segments/v2.3/AL1.ts";
import { OBR } from "../../segments/v2.3/OBR.ts";
import { NTE } from "../../segments/v2.3/NTE.ts";
import { OBX } from "../../segments/v2.3/OBX.ts";

/** The PROVIDER group of a parsed RCI^I05 (HL7 v2.3) message. */
export interface ParsedProvider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The OBSERVATION group of a parsed RCI^I05 (HL7 v2.3) message. */
export interface ParsedObservation {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESULTS groups. */
  results?: ParsedResult[];
}

/** The RESULTS group of a parsed RCI^I05 (HL7 v2.3) message. */
export interface ParsedResult {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 RCI^I05 (HL7 v2.3) message. */
export interface ParsedRCI_I05 extends ParsedMessageBase {
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
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The segment parsers of RCI^I05 (HL7 v2.3). */
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
  OBR: (s, e) => OBR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
};

/** Parser for HL7 RCI^I05 (HL7 v2.3) messages. */
export class RCI_I05_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RCI_I05";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RCI_I05_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRCI_I05> {
    return parseStructure<ParsedRCI_I05>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RCI^I05 (HL7 v2.3) message string into a structured result. */
export function parseRCI_I05(messageString: string): Result<ParsedRCI_I05> {
  return new RCI_I05_Parser().parse(messageString);
}
