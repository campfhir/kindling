/**
 * Parser for ORL^O22 messages (HL7 v2.6).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: PID [{ ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ OBSERVATION_REQUEST: OBR [{ROL}] [{ SPECIMEN: SPM [{SAC}] }] ] }] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ORL_O22_STRUCTURE } from "../../structures/v2.6/ORL_O22.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { ERR } from "../../segments/v2.6/ERR.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { ORC } from "../../segments/v2.6/ORC.ts";
import { TQ1 } from "../../segments/v2.6/TQ1.ts";
import { TQ2 } from "../../segments/v2.6/TQ2.ts";
import { OBR } from "../../segments/v2.6/OBR.ts";
import { ROL } from "../../segments/v2.6/ROL.ts";
import { SPM } from "../../segments/v2.6/SPM.ts";
import { SAC } from "../../segments/v2.6/SAC.ts";

/** The RESPONSE group of a parsed ORL^O22 (HL7 v2.6) message. */
export interface ParsedResponse {
  /** The PID segment. */
  patient: PID;
  /** The ORDER groups. */
  orders?: ParsedOrder[];
}

/** The ORDER group of a parsed ORL^O22 (HL7 v2.6) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The OBSERVATION REQUEST group. */
  observationRequest?: ParsedObservationRequest;
}

/** The TIMING group of a parsed ORL^O22 (HL7 v2.6) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION REQUEST group of a parsed ORL^O22 (HL7 v2.6) message. */
export interface ParsedObservationRequest {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The ROL segments. */
  roles?: ROL[];
  /** The SPECIMEN groups. */
  specimens?: ParsedSpecimen[];
}

/** The SPECIMEN group of a parsed ORL^O22 (HL7 v2.6) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The SAC segments. */
  specimenContainers?: SAC[];
}

/** Structured result of parsing an HL7 ORL^O22 (HL7 v2.6) message. */
export interface ParsedORL_O22 extends ParsedMessageBase {
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

/** The segment parsers of ORL^O22 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
};

/** Parser for HL7 ORL^O22 (HL7 v2.6) messages. */
export class ORL_O22_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORL_O22";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORL_O22_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORL_O22> {
    return parseStructure<ParsedORL_O22>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORL^O22 (HL7 v2.6) message string into a structured result. */
export function parseORL_O22(messageString: string): Result<ParsedORL_O22> {
  return new ORL_O22_Parser().parse(messageString);
}
