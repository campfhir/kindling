/**
 * Parser for SRM^S01 messages (HL7 v2.9.1).
 *
 * Structure: MSH ARQ [APR] [{NTE}] [{ PATIENT: PID [{GSP}] [{GSR}] [{GSC}] [{PRT}] PV1 [PV2] [{PRT}] [{ OBSERVATION: OBX [{PRT}] }] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [APR] [{NTE}] }] [{ GENERAL_RESOURCE: AIG [APR] [{NTE}] }] [{ LOCATION_RESOURCE: AIL [APR] [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [APR] [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { SRM_S01_STRUCTURE } from "../../structures/v2.9.1/SRM_S01.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { ARQ } from "../../segments/v2.9.1/ARQ.ts";
import { APR } from "../../segments/v2.9.1/APR.ts";
import { NTE } from "../../segments/v2.9.1/NTE.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { GSP } from "../../segments/v2.9.1/GSP.ts";
import { GSR } from "../../segments/v2.9.1/GSR.ts";
import { GSC } from "../../segments/v2.9.1/GSC.ts";
import { PRT } from "../../segments/v2.9.1/PRT.ts";
import { PV1 } from "../../segments/v2.9.1/PV1.ts";
import { PV2 } from "../../segments/v2.9.1/PV2.ts";
import { OBX } from "../../segments/v2.9.1/OBX.ts";
import { DG1 } from "../../segments/v2.9.1/DG1.ts";
import { RGS } from "../../segments/v2.9.1/RGS.ts";
import { AIS } from "../../segments/v2.9.1/AIS.ts";
import { AIG } from "../../segments/v2.9.1/AIG.ts";
import { AIL } from "../../segments/v2.9.1/AIL.ts";
import { AIP } from "../../segments/v2.9.1/AIP.ts";

/** The PATIENT group of a parsed SRM^S01 (HL7 v2.9.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prt2?: PRT[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
}

/** The OBSERVATION group of a parsed SRM^S01 (HL7 v2.9.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The RESOURCES group of a parsed SRM^S01 (HL7 v2.9.1) message. */
export interface ParsedResources {
  /** The RGS segment. */
  resourceGroup: RGS;
  /** The SERVICE groups. */
  services?: ParsedService[];
  /** The GENERAL RESOURCE groups. */
  generalResources?: ParsedGeneralResource[];
  /** The LOCATION RESOURCE groups. */
  locationResources?: ParsedLocationResource[];
  /** The PERSONNEL RESOURCE groups. */
  personnelResources?: ParsedPersonnelResource[];
}

/** The SERVICE group of a parsed SRM^S01 (HL7 v2.9.1) message. */
export interface ParsedService {
  /** The AIS segment. */
  service: AIS;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GENERAL RESOURCE group of a parsed SRM^S01 (HL7 v2.9.1) message. */
export interface ParsedGeneralResource {
  /** The AIG segment. */
  generalResource: AIG;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The LOCATION RESOURCE group of a parsed SRM^S01 (HL7 v2.9.1) message. */
export interface ParsedLocationResource {
  /** The AIL segment. */
  location: AIL;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PERSONNEL RESOURCE group of a parsed SRM^S01 (HL7 v2.9.1) message. */
export interface ParsedPersonnelResource {
  /** The AIP segment. */
  personnel: AIP;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 SRM^S01 (HL7 v2.9.1) message. */
export interface ParsedSRM_S01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The ARQ segment. */
  appointmentRequest: ARQ;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT groups. */
  patients?: ParsedPatient[];
  /** The RESOURCES groups. */
  resources: ParsedResources[];
}

/** The segment parsers of SRM^S01 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  ARQ: (s, e) => ARQ.parse(s, e),
  APR: (s, e) => APR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  GSP: (s, e) => GSP.parse(s, e),
  GSR: (s, e) => GSR.parse(s, e),
  GSC: (s, e) => GSC.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
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

/** Parser for HL7 SRM^S01 (HL7 v2.9.1) messages. */
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

/** Parses an HL7 SRM^S01 (HL7 v2.9.1) message string into a structured result. */
export function parseSRM_S01(messageString: string): Result<ParsedSRM_S01> {
  return new SRM_S01_Parser().parse(messageString);
}
