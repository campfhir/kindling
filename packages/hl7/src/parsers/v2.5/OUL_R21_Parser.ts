/**
 * Parser for OUL^R21 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] [NTE] [ PATIENT: PID [PD1] [{NTE}] ] [ VISIT: PV1 [PV2] ] { ORDER_OBSERVATION: [ CONTAINER: SAC [SID] ] [ORC] OBR [{NTE}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { OBSERVATION: [OBX] [TCD] [{SID}] [{NTE}] } [{CTI}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { OUL_R21_STRUCTURE } from "../../structures/v2.5/OUL_R21.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { NTE } from "../../segments/v2.5/NTE.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { PD1 } from "../../segments/v2.5/PD1.ts";
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { PV2 } from "../../segments/v2.5/PV2.ts";
import { SAC } from "../../segments/v2.5/SAC.ts";
import { SID } from "../../segments/v2.5/SID.ts";
import { ORC } from "../../segments/v2.5/ORC.ts";
import { OBR } from "../../segments/v2.5/OBR.ts";
import { TQ1 } from "../../segments/v2.5/TQ1.ts";
import { TQ2 } from "../../segments/v2.5/TQ2.ts";
import { OBX } from "../../segments/v2.5/OBX.ts";
import { TCD } from "../../segments/v2.5/TCD.ts";
import { CTI } from "../../segments/v2.5/CTI.ts";
import { DSC } from "../../segments/v2.5/DSC.ts";

/** The PATIENT group of a parsed OUL^R21 (HL7 v2.5) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The VISIT group of a parsed OUL^R21 (HL7 v2.5) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The ORDER OBSERVATION group of a parsed OUL^R21 (HL7 v2.5) message. */
export interface ParsedOrderObservation {
  /** The CONTAINER group. */
  container?: ParsedContainer;
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING QTY groups. */
  timingQtys?: ParsedTimingQty[];
  /** The OBSERVATION groups. */
  observations: ParsedObservation[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The CONTAINER group of a parsed OUL^R21 (HL7 v2.5) message. */
export interface ParsedContainer {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The SID segment. */
  substanceIdentifier?: SID;
}

/** The TIMING QTY group of a parsed OUL^R21 (HL7 v2.5) message. */
export interface ParsedTimingQty {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of a parsed OUL^R21 (HL7 v2.5) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation?: OBX;
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The SID segments. */
  substanceIdentifiers?: SID[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 OUL^R21 (HL7 v2.5) message. */
export interface ParsedOUL_R21 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segment. */
  note?: NTE;
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The VISIT group. */
  visit?: ParsedVisit;
  /** The ORDER OBSERVATION groups. */
  orderObservations: ParsedOrderObservation[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of OUL^R21 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  SID: (s, e) => SID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  TCD: (s, e) => TCD.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 OUL^R21 (HL7 v2.5) messages. */
export class OUL_R21_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OUL_R21";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OUL_R21_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOUL_R21> {
    return parseStructure<ParsedOUL_R21>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OUL^R21 (HL7 v2.5) message string into a structured result. */
export function parseOUL_R21(messageString: string): Result<ParsedOUL_R21> {
  return new OUL_R21_Parser().parse(messageString);
}
