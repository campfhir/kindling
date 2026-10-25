/**
 * Parser for RSP^Z90 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MSA [ERR] QAK QPD RCP { QUERY_RESPONSE: [ PATIENT: PID [PD1] [{NK1}] [{NTE}] [ VISIT: PV1 [PV2] ] ] { COMMON_ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] OBR [{NTE}] [CTD] { OBSERVATION: [OBX] [{NTE}] } } [{ SPECIMEN: SPM [{OBX}] }] } DSC
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RSP_Z90_STRUCTURE } from "../../structures/v2.5.1/RSP_Z90.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { MSA } from "../../segments/v2.5.1/MSA.ts";
import { ERR } from "../../segments/v2.5.1/ERR.ts";
import { QAK } from "../../segments/v2.5.1/QAK.ts";
import { QPD } from "../../segments/v2.5.1/QPD.ts";
import { RCP } from "../../segments/v2.5.1/RCP.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PD1 } from "../../segments/v2.5.1/PD1.ts";
import { NK1 } from "../../segments/v2.5.1/NK1.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { PV2 } from "../../segments/v2.5.1/PV2.ts";
import { ORC } from "../../segments/v2.5.1/ORC.ts";
import { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import { OBR } from "../../segments/v2.5.1/OBR.ts";
import { CTD } from "../../segments/v2.5.1/CTD.ts";
import { OBX } from "../../segments/v2.5.1/OBX.ts";
import { SPM } from "../../segments/v2.5.1/SPM.ts";
import { DSC } from "../../segments/v2.5.1/DSC.ts";

/** The QUERY RESPONSE group of a parsed RSP^Z90 (HL7 v2.5.1) message. */
export interface ParsedQueryResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The COMMON ORDER groups. */
  commonOrders: ParsedCommonOrder[];
  /** The SPECIMEN groups. */
  specimens?: ParsedSpecimen[];
}

/** The PATIENT group of a parsed RSP^Z90 (HL7 v2.5.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The VISIT group. */
  visit?: ParsedVisit;
}

/** The VISIT group of a parsed RSP^Z90 (HL7 v2.5.1) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The COMMON ORDER group of a parsed RSP^Z90 (HL7 v2.5.1) message. */
export interface ParsedCommonOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CTD segment. */
  contact?: CTD;
  /** The OBSERVATION groups. */
  observations: ParsedObservation[];
}

/** The TIMING group of a parsed RSP^Z90 (HL7 v2.5.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of a parsed RSP^Z90 (HL7 v2.5.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The SPECIMEN group of a parsed RSP^Z90 (HL7 v2.5.1) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The OBX segments. */
  observations?: OBX[];
}

/** Structured result of parsing an HL7 RSP^Z90 (HL7 v2.5.1) message. */
export interface ParsedRSP_Z90 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The RCP segment. */
  responseControl: RCP;
  /** The QUERY RESPONSE groups. */
  queryResponses: ParsedQueryResponse[];
  /** The DSC segment. */
  continuation: DSC;
}

/** The segment parsers of RSP^Z90 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RSP^Z90 (HL7 v2.5.1) messages. */
export class RSP_Z90_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_Z90";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RSP_Z90_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRSP_Z90> {
    return parseStructure<ParsedRSP_Z90>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RSP^Z90 (HL7 v2.5.1) message string into a structured result. */
export function parseRSP_Z90(messageString: string): Result<ParsedRSP_Z90> {
  return new RSP_Z90_Parser().parse(messageString);
}
