/**
 * Parser for SRM^S01 messages (HL7 v2.5.1).
 *
 * Structure: MSH ARQ [APR] [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [APR] [{NTE}] }] [{ GENERAL_RESOURCE: AIG [APR] [{NTE}] }] [{ LOCATION_RESOURCE: AIL [APR] [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [APR] [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { SRM_S01_STRUCTURE } from "../../structures/v2.5.1/SRM_S01.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { ARQ } from "../../segments/v2.5.1/ARQ.ts";
import { APR } from "../../segments/v2.5.1/APR.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { PV2 } from "../../segments/v2.5.1/PV2.ts";
import { OBX } from "../../segments/v2.5.1/OBX.ts";
import { DG1 } from "../../segments/v2.5.1/DG1.ts";
import { RGS } from "../../segments/v2.5.1/RGS.ts";
import { AIS } from "../../segments/v2.5.1/AIS.ts";
import { AIG } from "../../segments/v2.5.1/AIG.ts";
import { AIL } from "../../segments/v2.5.1/AIL.ts";
import { AIP } from "../../segments/v2.5.1/AIP.ts";

/** The PATIENT group of a parsed SRM^S01 (HL7 v2.5.1) message. */
export interface ParsedSRMPatient {
  /** The PID segment. */
  pid: PID;
  /** The PV1 segment. */
  pv1?: PV1;
  /** The PV2 segment. */
  pv2?: PV2;
  /** The OBX segments. */
  obxList?: OBX[];
  /** The DG1 segments. */
  dg1List?: DG1[];
}

/** The RESOURCES group of a parsed SRM^S01 (HL7 v2.5.1) message. */
export interface ParsedSRMResources {
  /** The RGS segment. */
  rgs: RGS;
  /** The SERVICE groups. */
  services?: ParsedSRMService[];
  /** The GENERAL RESOURCE groups. */
  generalResources?: ParsedSRMGeneralResource[];
  /** The LOCATION RESOURCE groups. */
  locationResources?: ParsedSRMLocationResource[];
  /** The PERSONNEL RESOURCE groups. */
  personnelResources?: ParsedSRMPersonnelResource[];
}

/** The SERVICE group of a parsed SRM^S01 (HL7 v2.5.1) message. */
export interface ParsedSRMService {
  /** The AIS segment. */
  ais: AIS;
  /** The APR segment. */
  apr?: APR;
  /** The NTE segments. */
  nteList?: NTE[];
}

/** The GENERAL RESOURCE group of a parsed SRM^S01 (HL7 v2.5.1) message. */
export interface ParsedSRMGeneralResource {
  /** The AIG segment. */
  aig: AIG;
  /** The APR segment. */
  apr?: APR;
  /** The NTE segments. */
  nteList?: NTE[];
}

/** The LOCATION RESOURCE group of a parsed SRM^S01 (HL7 v2.5.1) message. */
export interface ParsedSRMLocationResource {
  /** The AIL segment. */
  ail: AIL;
  /** The APR segment. */
  apr?: APR;
  /** The NTE segments. */
  nteList?: NTE[];
}

/** The PERSONNEL RESOURCE group of a parsed SRM^S01 (HL7 v2.5.1) message. */
export interface ParsedSRMPersonnelResource {
  /** The AIP segment. */
  aip: AIP;
  /** The APR segment. */
  apr?: APR;
  /** The NTE segments. */
  nteList?: NTE[];
}

/** Structured result of parsing an HL7 SRM^S01 (HL7 v2.5.1) message. */
export interface ParsedSRM_S01 extends ParsedMessageBase {
  /** The MSH segment. */
  msh: MSH;
  /** The ARQ segment. */
  arq: ARQ;
  /** The APR segment. */
  apr?: APR;
  /** The NTE segments. */
  nteList?: NTE[];
  /** The PATIENT groups. */
  patients?: ParsedSRMPatient[];
  /** The RESOURCES groups. */
  resources: ParsedSRMResources[];
}

/** The segment parsers of SRM^S01 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  ARQ: (s, e) => ARQ.parse(s, e),
  APR: (s, e) => APR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  RGS: (s, e) => RGS.parse(s, e),
  AIS: (s, e) => AIS.parse(s, e),
  AIG: (s, e) => AIG.parse(s, e),
  AIL: (s, e) => AIL.parse(s, e),
  AIP: (s, e) => AIP.parse(s, e),
};

/** Parser for HL7 SRM^S01 (HL7 v2.5.1) messages. */
export class SRM_S01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SRM_S01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SRM_S01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSRM_S01> {
    return parseStructure<ParsedSRM_S01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SRM^S01 (HL7 v2.5.1) message string into a structured result. */
export function parseSRM_S01(messageString: string): Result<ParsedSRM_S01> {
  return new SRM_S01_Parser().parse(messageString);
}
