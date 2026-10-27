/**
 * Parser for ORL^O56 messages (HL7 v2.9.1).
 *
 * Structure: MSH MSA [{ARV}] [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{PRT}] ] [{ ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [ OBSERVATION_REQUEST: OBR [{PRT}] [{ SPECIMEN_SHIPMENT: SHP { PACKAGE: PAC [{ SPECIMEN_IN_PACKAGE: SPM [{ SPECIMEN_CONTAINER_IN_PACKAGE: SAC }] }] } }] ] }] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ORL_O56_STRUCTURE } from "../../structures/v2.9.1/ORL_O56.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { MSA } from "../../segments/v2.9.1/MSA.ts";
import { ARV } from "../../segments/v2.9.1/ARV.ts";
import { ERR } from "../../segments/v2.9.1/ERR.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { NTE } from "../../segments/v2.9.1/NTE.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { PRT } from "../../segments/v2.9.1/PRT.ts";
import { ORC } from "../../segments/v2.9.1/ORC.ts";
import { TQ1 } from "../../segments/v2.9.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.9.1/TQ2.ts";
import { OBR } from "../../segments/v2.9.1/OBR.ts";
import { SHP } from "../../segments/v2.9.1/SHP.ts";
import { PAC } from "../../segments/v2.9.1/PAC.ts";
import { SPM } from "../../segments/v2.9.1/SPM.ts";
import { SAC } from "../../segments/v2.9.1/SAC.ts";

/** The RESPONSE group of a parsed ORL^O56 (HL7 v2.9.1) message. */
export interface ParsedResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders?: ParsedOrder[];
}

/** The PATIENT group of a parsed ORL^O56 (HL7 v2.9.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER group of a parsed ORL^O56 (HL7 v2.9.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The OBSERVATION REQUEST group. */
  observationRequest?: ParsedObservationRequest;
}

/** The TIMING group of a parsed ORL^O56 (HL7 v2.9.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION REQUEST group of a parsed ORL^O56 (HL7 v2.9.1) message. */
export interface ParsedObservationRequest {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The SPECIMEN SHIPMENT groups. */
  specimenShipments?: ParsedSpecimenShipment[];
}

/** The SPECIMEN SHIPMENT group of a parsed ORL^O56 (HL7 v2.9.1) message. */
export interface ParsedSpecimenShipment {
  /** The SHP segment. */
  shp: SHP;
  /** The PACKAGE groups. */
  packages: ParsedPackage[];
}

/** The PACKAGE group of a parsed ORL^O56 (HL7 v2.9.1) message. */
export interface ParsedPackage {
  /** The PAC segment. */
  pac: PAC;
  /** The SPECIMEN IN PACKAGE groups. */
  specimenInPackages?: ParsedSpecimenInPackage[];
}

/** The SPECIMEN IN PACKAGE group of a parsed ORL^O56 (HL7 v2.9.1) message. */
export interface ParsedSpecimenInPackage {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN CONTAINER IN PACKAGE groups. */
  specimenContainerInPackages?: ParsedSpecimenContainerInPackage[];
}

/** The SPECIMEN CONTAINER IN PACKAGE group of a parsed ORL^O56 (HL7 v2.9.1) message. */
export interface ParsedSpecimenContainerInPackage {
  /** The SAC segment. */
  specimenContainer: SAC;
}

/** Structured result of parsing an HL7 ORL^O56 (HL7 v2.9.1) message. */
export interface ParsedORL_O56 extends ParsedMessageBase {
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

/** The segment parsers of ORL^O56 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ARV: (s, e) => ARV.parse(s, e),
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
  SHP: (s, e) => SHP.parse(s, e),
  PAC: (s, e) => PAC.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
};

/** Parser for HL7 ORL^O56 (HL7 v2.9.1) messages. */
export class ORL_O56_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORL_O56";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORL_O56_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORL_O56> {
    return parseStructure<ParsedORL_O56>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORL^O56 (HL7 v2.9.1) message string into a structured result. */
export function parseORL_O56(messageString: string): Result<ParsedORL_O56> {
  return new ORL_O56_Parser().parse(messageString);
}
