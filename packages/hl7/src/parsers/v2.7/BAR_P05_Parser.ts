/**
 * Parser for BAR^P05 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{ROL}] { VISIT: [PV1] [PV2] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{NK1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2] [ABS] [{BLC}] [RMI] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { BAR_P05_STRUCTURE } from "../../structures/v2.7/BAR_P05.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { EVN } from "../../segments/v2.7/EVN.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { PD1 } from "../../segments/v2.7/PD1.ts";
import { ROL } from "../../segments/v2.7/ROL.ts";
import { PV1 } from "../../segments/v2.7/PV1.ts";
import { PV2 } from "../../segments/v2.7/PV2.ts";
import { DB1 } from "../../segments/v2.7/DB1.ts";
import { OBX } from "../../segments/v2.7/OBX.ts";
import { AL1 } from "../../segments/v2.7/AL1.ts";
import { DG1 } from "../../segments/v2.7/DG1.ts";
import { DRG } from "../../segments/v2.7/DRG.ts";
import { PR1 } from "../../segments/v2.7/PR1.ts";
import { GT1 } from "../../segments/v2.7/GT1.ts";
import { NK1 } from "../../segments/v2.7/NK1.ts";
import { IN1 } from "../../segments/v2.7/IN1.ts";
import { IN2 } from "../../segments/v2.7/IN2.ts";
import { IN3 } from "../../segments/v2.7/IN3.ts";
import { ACC } from "../../segments/v2.7/ACC.ts";
import { UB1 } from "../../segments/v2.7/UB1.ts";
import { UB2 } from "../../segments/v2.7/UB2.ts";
import { ABS } from "../../segments/v2.7/ABS.ts";
import { BLC } from "../../segments/v2.7/BLC.ts";
import { RMI } from "../../segments/v2.7/RMI.ts";

/** The VISIT group of a parsed BAR^P05 (HL7 v2.7) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ROL segments. */
  roles?: ROL[];
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The OBX segments. */
  observations?: OBX[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The PROCEDURE groups. */
  procedures?: ParsedProcedure[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The ACC segment. */
  accident?: ACC;
  /** The UB1 segment. */
  ub82?: UB1;
  /** The UB2 segment. */
  ub92?: UB2;
  /** The ABS segment. */
  abstract?: ABS;
  /** The BLC segments. */
  bloodCodes?: BLC[];
  /** The RMI segment. */
  riskManagementIncident?: RMI;
}

/** The PROCEDURE group of a parsed BAR^P05 (HL7 v2.7) message. */
export interface ParsedProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The ROL segments. */
  roles?: ROL[];
}

/** The INSURANCE group of a parsed BAR^P05 (HL7 v2.7) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segments. */
  insuranceCertifications?: IN3[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** Structured result of parsing an HL7 BAR^P05 (HL7 v2.7) message. */
export interface ParsedBAR_P05 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The ROL segments. */
  roles?: ROL[];
  /** The VISIT groups. */
  visits: ParsedVisit[];
}

/** The segment parsers of BAR^P05 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  DB1: (s, e) => DB1.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  DRG: (s, e) => DRG.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  ACC: (s, e) => ACC.parse(s, e),
  UB1: (s, e) => UB1.parse(s, e),
  UB2: (s, e) => UB2.parse(s, e),
  ABS: (s, e) => ABS.parse(s, e),
  BLC: (s, e) => BLC.parse(s, e),
  RMI: (s, e) => RMI.parse(s, e),
};

/** Parser for HL7 BAR^P05 (HL7 v2.7) messages. */
export class BAR_P05_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P05";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = BAR_P05_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBAR_P05> {
    return parseStructure<ParsedBAR_P05>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 BAR^P05 (HL7 v2.7) message string into a structured result. */
export function parseBAR_P05(messageString: string): Result<ParsedBAR_P05> {
  return new BAR_P05_Parser().parse(messageString);
}
