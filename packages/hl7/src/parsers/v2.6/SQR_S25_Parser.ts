/**
 * Parser for SQR^S25 messages (HL7 v2.6).
 *
 * Structure: MSH MSA [{ERR}] QAK [{ SCHEDULE: SCH [{TQ1}] [{NTE}] [ PATIENT: PID [PV1] [PV2] [DG1] ] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] } }] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { SQR_S25_STRUCTURE } from "../../structures/v2.6/SQR_S25.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { ERR } from "../../segments/v2.6/ERR.ts";
import { QAK } from "../../segments/v2.6/QAK.ts";
import { SCH } from "../../segments/v2.6/SCH.ts";
import { TQ1 } from "../../segments/v2.6/TQ1.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { PV1 } from "../../segments/v2.6/PV1.ts";
import { PV2 } from "../../segments/v2.6/PV2.ts";
import { DG1 } from "../../segments/v2.6/DG1.ts";
import { RGS } from "../../segments/v2.6/RGS.ts";
import { AIS } from "../../segments/v2.6/AIS.ts";
import { AIG } from "../../segments/v2.6/AIG.ts";
import { AIP } from "../../segments/v2.6/AIP.ts";
import { AIL } from "../../segments/v2.6/AIL.ts";
import { DSC } from "../../segments/v2.6/DSC.ts";

/** The SCHEDULE group of a parsed SQR^S25 (HL7 v2.6) message. */
export interface ParsedSchedule {
  /** The SCH segment. */
  appointment: SCH;
  /** The TQ1 segments. */
  timings?: TQ1[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The RESOURCES groups. */
  resources: ParsedResources[];
}

/** The PATIENT group of a parsed SQR^S25 (HL7 v2.6) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The DG1 segment. */
  diagnosis?: DG1;
}

/** The RESOURCES group of a parsed SQR^S25 (HL7 v2.6) message. */
export interface ParsedResources {
  /** The RGS segment. */
  resourceGroup: RGS;
  /** The SERVICE groups. */
  services?: ParsedService[];
  /** The GENERAL RESOURCE groups. */
  generalResources?: ParsedGeneralResource[];
  /** The PERSONNEL RESOURCE groups. */
  personnelResources?: ParsedPersonnelResource[];
  /** The LOCATION RESOURCE groups. */
  locationResources?: ParsedLocationResource[];
}

/** The SERVICE group of a parsed SQR^S25 (HL7 v2.6) message. */
export interface ParsedService {
  /** The AIS segment. */
  service: AIS;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GENERAL RESOURCE group of a parsed SQR^S25 (HL7 v2.6) message. */
export interface ParsedGeneralResource {
  /** The AIG segment. */
  generalResource: AIG;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PERSONNEL RESOURCE group of a parsed SQR^S25 (HL7 v2.6) message. */
export interface ParsedPersonnelResource {
  /** The AIP segment. */
  personnel: AIP;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The LOCATION RESOURCE group of a parsed SQR^S25 (HL7 v2.6) message. */
export interface ParsedLocationResource {
  /** The AIL segment. */
  location: AIL;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 SQR^S25 (HL7 v2.6) message. */
export interface ParsedSQR_S25 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The SCHEDULE groups. */
  schedules?: ParsedSchedule[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of SQR^S25 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  SCH: (s, e) => SCH.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  RGS: (s, e) => RGS.parse(s, e),
  AIS: (s, e) => AIS.parse(s, e),
  AIG: (s, e) => AIG.parse(s, e),
  AIP: (s, e) => AIP.parse(s, e),
  AIL: (s, e) => AIL.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 SQR^S25 (HL7 v2.6) messages. */
export class SQR_S25_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SQR_S25";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SQR_S25_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSQR_S25> {
    return parseStructure<ParsedSQR_S25>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SQR^S25 (HL7 v2.6) message string into a structured result. */
export function parseSQR_S25(messageString: string): Result<ParsedSQR_S25> {
  return new SQR_S25_Parser().parse(messageString);
}
