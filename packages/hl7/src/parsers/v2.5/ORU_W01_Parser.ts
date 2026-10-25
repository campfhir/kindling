/**
 * Parser for ORU^W01 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] { PATIENT_RESULT: [ PATIENT: PID [PD1] [{NK1}] [{NTE}] [ VISIT: PV1 [PV2] ] ] { ORDER_OBSERVATION: [ORC] OBR [{NTE}] [CTD] { OBSERVATION: [OBX] [{NTE}] } [{FT1}] [{CTI}] [{ SPECIMEN: SPM [{OBX}] }] } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ORU_W01_STRUCTURE } from "../../structures/v2.5/ORU_W01.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { PD1 } from "../../segments/v2.5/PD1.ts";
import { NK1 } from "../../segments/v2.5/NK1.ts";
import { NTE } from "../../segments/v2.5/NTE.ts";
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { PV2 } from "../../segments/v2.5/PV2.ts";
import { ORC } from "../../segments/v2.5/ORC.ts";
import { OBR } from "../../segments/v2.5/OBR.ts";
import { CTD } from "../../segments/v2.5/CTD.ts";
import { OBX } from "../../segments/v2.5/OBX.ts";
import { FT1 } from "../../segments/v2.5/FT1.ts";
import { CTI } from "../../segments/v2.5/CTI.ts";
import { SPM } from "../../segments/v2.5/SPM.ts";
import { DSC } from "../../segments/v2.5/DSC.ts";

/** The PATIENT RESULT group of a parsed ORU^W01 (HL7 v2.5) message. */
export interface ParsedPatientResult {
  /** The PID segment. */
  patient?: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ORDER OBSERVATION groups. */
  orderObservations: ParsedOrderObservation[];
}

/** The ORDER OBSERVATION group of a parsed ORU^W01 (HL7 v2.5) message. */
export interface ParsedOrderObservation {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CTD segment. */
  contact?: CTD;
  /** The OBSERVATION groups. */
  observations: ParsedObservation[];
  /** The FT1 segments. */
  transactions?: FT1[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
  /** The SPECIMEN groups. */
  specimens?: ParsedSpecimen[];
}

/** The OBSERVATION group of a parsed ORU^W01 (HL7 v2.5) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The SPECIMEN group of a parsed ORU^W01 (HL7 v2.5) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The OBX segments. */
  observations?: OBX[];
}

/** Structured result of parsing an HL7 ORU^W01 (HL7 v2.5) message. */
export interface ParsedORU_W01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The PATIENT RESULT groups. */
  patientResults: ParsedPatientResult[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of ORU^W01 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  FT1: (s, e) => FT1.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 ORU^W01 (HL7 v2.5) messages. */
export class ORU_W01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORU_W01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORU_W01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORU_W01> {
    return parseStructure<ParsedORU_W01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORU^W01 (HL7 v2.5) message string into a structured result. */
export function parseORU_W01(messageString: string): Result<ParsedORU_W01> {
  return new ORU_W01_Parser().parse(messageString);
}
