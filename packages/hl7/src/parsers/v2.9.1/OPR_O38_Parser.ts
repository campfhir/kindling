/**
 * Parser for OPR^O38 messages (HL7 v2.9.1).
 *
 * Structure: MSH MSA [{ARV}] [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: { ORDER: {NK1} [ PATIENT: PID [{PRT}] [{ARV}] ] [{ SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{SAC}] [{ OBSERVATION_REQUEST: ORC [{PRT}] OBR [{PRT}] }] [{ TIMING: TQ1 [{TQ2}] }] }] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { OPR_O38_STRUCTURE } from "../../structures/v2.9.1/OPR_O38.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { MSA } from "../../segments/v2.9.1/MSA.ts";
import { ARV } from "../../segments/v2.9.1/ARV.ts";
import { ERR } from "../../segments/v2.9.1/ERR.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { NTE } from "../../segments/v2.9.1/NTE.ts";
import { NK1 } from "../../segments/v2.9.1/NK1.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { PRT } from "../../segments/v2.9.1/PRT.ts";
import { SPM } from "../../segments/v2.9.1/SPM.ts";
import { OBX } from "../../segments/v2.9.1/OBX.ts";
import { SAC } from "../../segments/v2.9.1/SAC.ts";
import { ORC } from "../../segments/v2.9.1/ORC.ts";
import { OBR } from "../../segments/v2.9.1/OBR.ts";
import { TQ1 } from "../../segments/v2.9.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.9.1/TQ2.ts";

/** The RESPONSE group of a parsed OPR^O38 (HL7 v2.9.1) message. */
export interface ParsedResponse {
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The ORDER group of a parsed OPR^O38 (HL7 v2.9.1) message. */
export interface ParsedOrder {
  /** The NK1 segments. */
  nextOfKin: NK1[];
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The SPECIMEN groups. */
  specimens?: ParsedSpecimen[];
}

/** The PATIENT group of a parsed OPR^O38 (HL7 v2.9.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ARV segments. */
  arvList?: ARV[];
}

/** The SPECIMEN group of a parsed OPR^O38 (HL7 v2.9.1) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: ParsedSpecimenObservation[];
  /** The SAC segments. */
  specimenContainers?: SAC[];
  /** The OBSERVATION REQUEST groups. */
  observationRequests?: ParsedObservationRequest[];
  /** The TIMING groups. */
  timings?: ParsedTiming[];
}

/** The SPECIMEN OBSERVATION group of a parsed OPR^O38 (HL7 v2.9.1) message. */
export interface ParsedSpecimenObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The OBSERVATION REQUEST group of a parsed OPR^O38 (HL7 v2.9.1) message. */
export interface ParsedObservationRequest {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prt2?: PRT[];
}

/** The TIMING group of a parsed OPR^O38 (HL7 v2.9.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** Structured result of parsing an HL7 OPR^O38 (HL7 v2.9.1) message. */
export interface ParsedOPR_O38 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ARV segments. */
  arvList?: ARV[];
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

/** The segment parsers of OPR^O38 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ARV: (s, e) => ARV.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
};

/** Parser for HL7 OPR^O38 (HL7 v2.9.1) messages. */
export class OPR_O38_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OPR_O38";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OPR_O38_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOPR_O38> {
    return parseStructure<ParsedOPR_O38>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OPR^O38 (HL7 v2.9.1) message string into a structured result. */
export function parseOPR_O38(messageString: string): Result<ParsedOPR_O38> {
  return new OPR_O38_Parser().parse(messageString);
}
