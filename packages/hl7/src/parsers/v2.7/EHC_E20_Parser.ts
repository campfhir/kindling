/**
 * Parser for EHC^E20 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [{UAC}]  AUTHORIZATION_REQUEST: IVC {CTD} [{LOC}] [{ROL}] { PAT_INFO: PID [{ACC}] { INSURANCE: IN1 [IN2] } [{ DIAGNOSIS: DG1 [{NTE}] }] [{OBX}] } { PSL_ITEM_INFO: PSL [{NTE}] [{ADJ}] [{LOC}] [{ROL}] } 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { EHC_E20_STRUCTURE } from "../../structures/v2.7/EHC_E20.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { IVC } from "../../segments/v2.7/IVC.ts";
import { CTD } from "../../segments/v2.7/CTD.ts";
import { LOC } from "../../segments/v2.7/LOC.ts";
import { ROL } from "../../segments/v2.7/ROL.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { ACC } from "../../segments/v2.7/ACC.ts";
import { IN1 } from "../../segments/v2.7/IN1.ts";
import { IN2 } from "../../segments/v2.7/IN2.ts";
import { DG1 } from "../../segments/v2.7/DG1.ts";
import { NTE } from "../../segments/v2.7/NTE.ts";
import { OBX } from "../../segments/v2.7/OBX.ts";
import { PSL } from "../../segments/v2.7/PSL.ts";
import { ADJ } from "../../segments/v2.7/ADJ.ts";

/** The AUTHORIZATION REQUEST group of a parsed EHC^E20 (HL7 v2.7) message. */
export interface ParsedAuthorizationRequest {
  /** The IVC segment. */
  ivc: IVC;
  /** The CTD segments. */
  contacts: CTD[];
  /** The LOC segments. */
  patientLocations?: LOC[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The PAT INFO groups. */
  patInfos: ParsedPatInfo[];
  /** The PSL ITEM INFO groups. */
  pslItemInfos: ParsedPslItemInfo[];
}

/** The PAT INFO group of a parsed EHC^E20 (HL7 v2.7) message. */
export interface ParsedPatInfo {
  /** The PID segment. */
  patient: PID;
  /** The ACC segments. */
  accidents?: ACC[];
  /** The INSURANCE groups. */
  insurances: ParsedInsurance[];
  /** The DIAGNOSIS groups. */
  diagnosis?: ParsedDiagnosis[];
  /** The OBX segments. */
  observations?: OBX[];
}

/** The INSURANCE group of a parsed EHC^E20 (HL7 v2.7) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
}

/** The DIAGNOSIS group of a parsed EHC^E20 (HL7 v2.7) message. */
export interface ParsedDiagnosis {
  /** The DG1 segment. */
  diagnosis: DG1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PSL ITEM INFO group of a parsed EHC^E20 (HL7 v2.7) message. */
export interface ParsedPslItemInfo {
  /** The PSL segment. */
  psl: PSL;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ADJ segments. */
  adjList?: ADJ[];
  /** The LOC segments. */
  patientLocations?: LOC[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** Structured result of parsing an HL7 EHC^E20 (HL7 v2.7) message. */
export interface ParsedEHC_E20 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The AUTHORIZATION REQUEST group. */
  authorizationRequest: ParsedAuthorizationRequest;
}

/** The segment parsers of EHC^E20 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  IVC: (s, e) => IVC.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  LOC: (s, e) => LOC.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ACC: (s, e) => ACC.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  PSL: (s, e) => PSL.parse(s, e),
  ADJ: (s, e) => ADJ.parse(s, e),
};

/** Parser for HL7 EHC^E20 (HL7 v2.7) messages. */
export class EHC_E20_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E20";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EHC_E20_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEHC_E20> {
    return parseStructure<ParsedEHC_E20>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EHC^E20 (HL7 v2.7) message string into a structured result. */
export function parseEHC_E20(messageString: string): Result<ParsedEHC_E20> {
  return new EHC_E20_Parser().parse(messageString);
}
