/**
 * Parser for SQM^S25 messages (HL7 v2.4).
 *
 * Structure: MSH QRD [QRF] [ REQUEST: ARQ [APR] [PID] { RESOURCES: RGS [{ SERVICE: AIS [APR] }] [{ GENERAL_RESOURCE: AIG [APR] }] [{ PERSONNEL_RESOURCE: AIP [APR] }] [{ LOCATION_RESOURCE: AIL [APR] }] } ] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { SQM_S25_STRUCTURE } from "../../structures/v2.4/SQM_S25.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { QRD } from "../../segments/v2.4/QRD.ts";
import { QRF } from "../../segments/v2.4/QRF.ts";
import { ARQ } from "../../segments/v2.4/ARQ.ts";
import { APR } from "../../segments/v2.4/APR.ts";
import { PID } from "../../segments/v2.4/PID.ts";
import { RGS } from "../../segments/v2.4/RGS.ts";
import { AIS } from "../../segments/v2.4/AIS.ts";
import { AIG } from "../../segments/v2.4/AIG.ts";
import { AIP } from "../../segments/v2.4/AIP.ts";
import { AIL } from "../../segments/v2.4/AIL.ts";
import { DSC } from "../../segments/v2.4/DSC.ts";

/** The RESOURCES group of a parsed SQM^S25 (HL7 v2.4) message. */
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

/** The SERVICE group of a parsed SQM^S25 (HL7 v2.4) message. */
export interface ParsedService {
  /** The AIS segment. */
  service: AIS;
  /** The APR segment. */
  appointmentPreferences?: APR;
}

/** The GENERAL RESOURCE group of a parsed SQM^S25 (HL7 v2.4) message. */
export interface ParsedGeneralResource {
  /** The AIG segment. */
  generalResource: AIG;
  /** The APR segment. */
  appointmentPreferences?: APR;
}

/** The PERSONNEL RESOURCE group of a parsed SQM^S25 (HL7 v2.4) message. */
export interface ParsedPersonnelResource {
  /** The AIP segment. */
  personnel: AIP;
  /** The APR segment. */
  appointmentPreferences?: APR;
}

/** The LOCATION RESOURCE group of a parsed SQM^S25 (HL7 v2.4) message. */
export interface ParsedLocationResource {
  /** The AIL segment. */
  location: AIL;
  /** The APR segment. */
  appointmentPreferences?: APR;
}

/** Structured result of parsing an HL7 SQM^S25 (HL7 v2.4) message. */
export interface ParsedSQM_S25 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The ARQ segment. */
  appointmentRequest?: ARQ;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The PID segment. */
  patient?: PID;
  /** The RESOURCES groups. */
  resources?: ParsedResources[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of SQM^S25 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  ARQ: (s, e) => ARQ.parse(s, e),
  APR: (s, e) => APR.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  RGS: (s, e) => RGS.parse(s, e),
  AIS: (s, e) => AIS.parse(s, e),
  AIG: (s, e) => AIG.parse(s, e),
  AIP: (s, e) => AIP.parse(s, e),
  AIL: (s, e) => AIL.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 SQM^S25 (HL7 v2.4) messages. */
export class SQM_S25_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SQM_S25";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SQM_S25_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSQM_S25> {
    return parseStructure<ParsedSQM_S25>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SQM^S25 (HL7 v2.4) message string into a structured result. */
export function parseSQM_S25(messageString: string): Result<ParsedSQM_S25> {
  return new SQM_S25_Parser().parse(messageString);
}
