/**
 * Parser for ORL^O22 messages (HL7 v2.5.1).
 *
 * Structure: MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID { GENERAL_ORDER: [ CONTAINER: SAC [{OBX}] ] [{ ORDER: ORC [ OBSERVATION_REQUEST: OBR [{SAC}] ] }] } ] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ORL_O22_STRUCTURE } from "../../structures/v2.5.1/ORL_O22.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { MSA } from "../../segments/v2.5.1/MSA.ts";
import { ERR } from "../../segments/v2.5.1/ERR.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { SAC } from "../../segments/v2.5.1/SAC.ts";
import { OBX } from "../../segments/v2.5.1/OBX.ts";
import { ORC } from "../../segments/v2.5.1/ORC.ts";
import { OBR } from "../../segments/v2.5.1/OBR.ts";

/** The RESPONSE group of a parsed ORL^O22 (HL7 v2.5.1) message. */
export interface ParsedResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
}

/** The PATIENT group of a parsed ORL^O22 (HL7 v2.5.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The GENERAL ORDER groups. */
  generalOrders: ParsedGeneralOrder[];
}

/** The GENERAL ORDER group of a parsed ORL^O22 (HL7 v2.5.1) message. */
export interface ParsedGeneralOrder {
  /** The CONTAINER group. */
  container?: ParsedContainer;
  /** The ORDER groups. */
  orders?: ParsedOrder[];
}

/** The CONTAINER group of a parsed ORL^O22 (HL7 v2.5.1) message. */
export interface ParsedContainer {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The OBX segments. */
  observations?: OBX[];
}

/** The ORDER group of a parsed ORL^O22 (HL7 v2.5.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The OBSERVATION REQUEST group. */
  observationRequest?: ParsedObservationRequest;
}

/** The OBSERVATION REQUEST group of a parsed ORL^O22 (HL7 v2.5.1) message. */
export interface ParsedObservationRequest {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The SAC segments. */
  specimenContainers?: SAC[];
}

/** Structured result of parsing an HL7 ORL^O22 (HL7 v2.5.1) message. */
export interface ParsedORL_O22 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ParsedResponse;
}

/** The segment parsers of ORL^O22 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
};

/** Parser for HL7 ORL^O22 (HL7 v2.5.1) messages. */
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

/** Parses an HL7 ORL^O22 (HL7 v2.5.1) message string into a structured result. */
export function parseORL_O22(messageString: string): Result<ParsedORL_O22> {
  return new ORL_O22_Parser().parse(messageString);
}
