/**
 * Parser for SIU^S12 messages (HL7 v2.3).
 *
 * Structure: MSH SCH [{NTE}] [{ PATIENT: PID [PD1] [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { SIU_S12_STRUCTURE } from "../../structures/v2.3/SIU_S12.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { SCH } from "../../segments/v2.3/SCH.ts";
import { NTE } from "../../segments/v2.3/NTE.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PD1 } from "../../segments/v2.3/PD1.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { PV2 } from "../../segments/v2.3/PV2.ts";
import { OBX } from "../../segments/v2.3/OBX.ts";
import { DG1 } from "../../segments/v2.3/DG1.ts";
import { RGS } from "../../segments/v2.3/RGS.ts";
import { AIS } from "../../segments/v2.3/AIS.ts";
import { AIG } from "../../segments/v2.3/AIG.ts";
import { AIL } from "../../segments/v2.3/AIL.ts";
import { AIP } from "../../segments/v2.3/AIP.ts";

/** The PATIENT group of a parsed SIU^S12 (HL7 v2.3) message. */
export interface ParsedSIUPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The OBX segments. */
  observations?: OBX[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
}

/** The RESOURCES group of a parsed SIU^S12 (HL7 v2.3) message. */
export interface ParsedSIUResources {
  /** The RGS segment. */
  resourceGroup: RGS;
  /** The SERVICE groups. */
  services?: ParsedSIUService[];
  /** The GENERAL RESOURCE groups. */
  generalResources?: ParsedSIUGeneralResource[];
  /** The LOCATION RESOURCE groups. */
  locationResources?: ParsedSIULocationResource[];
  /** The PERSONNEL RESOURCE groups. */
  personnelResources?: ParsedSIUPersonnelResource[];
}

/** The SERVICE group of a parsed SIU^S12 (HL7 v2.3) message. */
export interface ParsedSIUService {
  /** The AIS segment. */
  service: AIS;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GENERAL RESOURCE group of a parsed SIU^S12 (HL7 v2.3) message. */
export interface ParsedSIUGeneralResource {
  /** The AIG segment. */
  generalResource: AIG;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The LOCATION RESOURCE group of a parsed SIU^S12 (HL7 v2.3) message. */
export interface ParsedSIULocationResource {
  /** The AIL segment. */
  location: AIL;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PERSONNEL RESOURCE group of a parsed SIU^S12 (HL7 v2.3) message. */
export interface ParsedSIUPersonnelResource {
  /** The AIP segment. */
  personnel: AIP;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 SIU^S12 (HL7 v2.3) message. */
export interface ParsedSIU_S12 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SCH segment. */
  appointment: SCH;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT groups. */
  patients?: ParsedSIUPatient[];
  /** The RESOURCES groups. */
  resources: ParsedSIUResources[];
}

/** The segment parsers of SIU^S12 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SCH: (s, e) => SCH.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
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

/** Parser for HL7 SIU^S12 (HL7 v2.3) messages. */
export class SIU_S12_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SIU_S12";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SIU_S12_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSIU_S12> {
    return parseStructure<ParsedSIU_S12>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SIU^S12 (HL7 v2.3) message string into a structured result. */
export function parseSIU_S12(messageString: string): Result<ParsedSIU_S12> {
  return new SIU_S12_Parser().parse(messageString);
}
