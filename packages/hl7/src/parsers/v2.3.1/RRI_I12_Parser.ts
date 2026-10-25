/**
 * Parser for RRI^I12 messages (HL7 v2.3.1).
 *
 * Structure: MSH [MSA] [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RRI_I12_STRUCTURE } from "../../structures/v2.3.1/RRI_I12.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { MSA } from "../../segments/v2.3.1/MSA.ts";
import { RF1 } from "../../segments/v2.3.1/RF1.ts";
import { AUT } from "../../segments/v2.3.1/AUT.ts";
import { CTD } from "../../segments/v2.3.1/CTD.ts";
import { PRD } from "../../segments/v2.3.1/PRD.ts";
import { PID } from "../../segments/v2.3.1/PID.ts";
import { ACC } from "../../segments/v2.3.1/ACC.ts";
import { DG1 } from "../../segments/v2.3.1/DG1.ts";
import { DRG } from "../../segments/v2.3.1/DRG.ts";
import { AL1 } from "../../segments/v2.3.1/AL1.ts";
import { PR1 } from "../../segments/v2.3.1/PR1.ts";
import { OBR } from "../../segments/v2.3.1/OBR.ts";
import { NTE } from "../../segments/v2.3.1/NTE.ts";
import { OBX } from "../../segments/v2.3.1/OBX.ts";
import { PV1 } from "../../segments/v2.3.1/PV1.ts";
import { PV2 } from "../../segments/v2.3.1/PV2.ts";

/** The PROVIDER group of a parsed RRI^I12 (HL7 v2.3.1) message. */
export interface ParsedProvider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The PROCEDURE group of a parsed RRI^I12 (HL7 v2.3.1) message. */
export interface ParsedProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The AUT segment. */
  authorization?: AUT;
  /** The CTD segment. */
  authorizationContact?: CTD;
}

/** The OBSERVATION group of a parsed RRI^I12 (HL7 v2.3.1) message. */
export interface ParsedObservation {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESULTS groups. */
  results?: ParsedResult[];
}

/** The RESULTS group of a parsed RRI^I12 (HL7 v2.3.1) message. */
export interface ParsedResult {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 RRI^I12 (HL7 v2.3.1) message. */
export interface ParsedRRI_I12 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment?: MSA;
  /** The RF1 segment. */
  referral?: RF1;
  /** The AUT segment. */
  authorization?: AUT;
  /** The CTD segment. */
  authorizationContact?: CTD;
  /** The PROVIDER groups. */
  providers: ParsedProvider[];
  /** The PID segment. */
  patient: PID;
  /** The ACC segment. */
  accident?: ACC;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segments. */
  diagnosisRelatedGroups?: DRG[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PROCEDURE groups. */
  procedures?: ParsedProcedure[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The segment parsers of RRI^I12 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  RF1: (s, e) => RF1.parse(s, e),
  AUT: (s, e) => AUT.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ACC: (s, e) => ACC.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  DRG: (s, e) => DRG.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
};

/** Parser for HL7 RRI^I12 (HL7 v2.3.1) messages. */
export class RRI_I12_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RRI_I12";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RRI_I12_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRRI_I12> {
    return parseStructure<ParsedRRI_I12>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RRI^I12 (HL7 v2.3.1) message string into a structured result. */
export function parseRRI_I12(messageString: string): Result<ParsedRRI_I12> {
  return new RRI_I12_Parser().parse(messageString);
}
