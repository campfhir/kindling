/**
 * Parser for ORG^O20 messages (HL7 v2.7).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] [{PRT}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ OBSERVATION_GROUP: OBR ] [{PRT}] [{NTE}] [{CTI}] [{ SPECIMEN: SPM [{SAC}] }] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ORG_O20_STRUCTURE } from "../../structures/v2.7/ORG_O20.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { MSA } from "../../segments/v2.7/MSA.ts";
import { ERR } from "../../segments/v2.7/ERR.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { NTE } from "../../segments/v2.7/NTE.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { PRT } from "../../segments/v2.7/PRT.ts";
import { ORC } from "../../segments/v2.7/ORC.ts";
import { TQ1 } from "../../segments/v2.7/TQ1.ts";
import { TQ2 } from "../../segments/v2.7/TQ2.ts";
import { OBR } from "../../segments/v2.7/OBR.ts";
import { CTI } from "../../segments/v2.7/CTI.ts";
import { SPM } from "../../segments/v2.7/SPM.ts";
import { SAC } from "../../segments/v2.7/SAC.ts";

/** The RESPONSE group of a parsed ORG^O20 (HL7 v2.7) message. */
export interface ParsedResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The PATIENT group of a parsed ORG^O20 (HL7 v2.7) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER group of a parsed ORG^O20 (HL7 v2.7) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The OBSERVATION GROUP group. */
  observationGroup?: ParsedObservationGroup;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
  /** The SPECIMEN groups. */
  specimens?: ParsedSpecimen[];
}

/** The TIMING group of a parsed ORG^O20 (HL7 v2.7) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION GROUP group of a parsed ORG^O20 (HL7 v2.7) message. */
export interface ParsedObservationGroup {
  /** The OBR segment. */
  observationRequest: OBR;
}

/** The SPECIMEN group of a parsed ORG^O20 (HL7 v2.7) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The SAC segments. */
  specimenContainers?: SAC[];
}

/** Structured result of parsing an HL7 ORG^O20 (HL7 v2.7) message. */
export interface ParsedORG_O20 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ParsedResponse;
}

/** The segment parsers of ORG^O20 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
};

/** Parser for HL7 ORG^O20 (HL7 v2.7) messages. */
export class ORG_O20_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORG_O20";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORG_O20_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORG_O20> {
    return parseStructure<ParsedORG_O20>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORG^O20 (HL7 v2.7) message string into a structured result. */
export function parseORG_O20(messageString: string): Result<ParsedORG_O20> {
  return new ORG_O20_Parser().parse(messageString);
}
