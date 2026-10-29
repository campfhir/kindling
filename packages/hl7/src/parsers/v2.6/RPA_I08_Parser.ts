/**
 * Parser for RPA^I08 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [{DG1}] [{DRG}] [{AL1}] { PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] } [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [ VISIT: PV1 [PV2] ] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RPA_I08_STRUCTURE } from "../../structures/v2.6/RPA_I08.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { RF1 } from "../../segments/v2.6/RF1.ts";
import { AUT } from "../../segments/v2.6/AUT.ts";
import { CTD } from "../../segments/v2.6/CTD.ts";
import { PRD } from "../../segments/v2.6/PRD.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { NK1 } from "../../segments/v2.6/NK1.ts";
import { GT1 } from "../../segments/v2.6/GT1.ts";
import { IN1 } from "../../segments/v2.6/IN1.ts";
import { IN2 } from "../../segments/v2.6/IN2.ts";
import { IN3 } from "../../segments/v2.6/IN3.ts";
import { ACC } from "../../segments/v2.6/ACC.ts";
import { DG1 } from "../../segments/v2.6/DG1.ts";
import { DRG } from "../../segments/v2.6/DRG.ts";
import { AL1 } from "../../segments/v2.6/AL1.ts";
import { PR1 } from "../../segments/v2.6/PR1.ts";
import { OBR } from "../../segments/v2.6/OBR.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";
import { OBX } from "../../segments/v2.6/OBX.ts";
import { PV1 } from "../../segments/v2.6/PV1.ts";
import { PV2 } from "../../segments/v2.6/PV2.ts";

/** The AUTHORIZATION group of a parsed RPA^I08 (HL7 v2.6) message. */
export interface ParsedAuthorization1 {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The PROVIDER group of a parsed RPA^I08 (HL7 v2.6) message. */
export interface ParsedProvider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The INSURANCE group of a parsed RPA^I08 (HL7 v2.6) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The PROCEDURE group of a parsed RPA^I08 (HL7 v2.6) message. */
export interface ParsedProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The AUTHORIZATION group. */
  authorization?: ParsedAuthorization2;
}

/** The AUTHORIZATION group of a parsed RPA^I08 (HL7 v2.6) message. */
export interface ParsedAuthorization2 {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The OBSERVATION group of a parsed RPA^I08 (HL7 v2.6) message. */
export interface ParsedObservation {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESULTS groups. */
  results?: ParsedResults[];
}

/** The RESULTS group of a parsed RPA^I08 (HL7 v2.6) message. */
export interface ParsedResults {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The VISIT group of a parsed RPA^I08 (HL7 v2.6) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** Structured result of parsing an HL7 RPA^I08 (HL7 v2.6) message. */
export interface ParsedRPA_I08 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The RF1 segment. */
  referral?: RF1;
  /** The AUTHORIZATION group. */
  authorization?: ParsedAuthorization1;
  /** The PROVIDER groups. */
  providers: ParsedProvider[];
  /** The PID segment. */
  patient: PID;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The ACC segment. */
  accident?: ACC;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segments. */
  diagnosisRelatedGroups?: DRG[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PROCEDURE groups. */
  procedures: ParsedProcedure[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The VISIT group. */
  visit?: ParsedVisit;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The segment parsers of RPA^I08 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  RF1: (s, e) => RF1.parse(s, e),
  AUT: (s, e) => AUT.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
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

/** Parser for HL7 RPA^I08 (HL7 v2.6) messages. */
export class RPA_I08_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RPA_I08";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RPA_I08_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRPA_I08> {
    return parseStructure<ParsedRPA_I08>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RPA^I08 (HL7 v2.6) message string into a structured result. */
export function parseRPA_I08(messageString: string): Result<ParsedRPA_I08> {
  return new RPA_I08_Parser().parse(messageString);
}
