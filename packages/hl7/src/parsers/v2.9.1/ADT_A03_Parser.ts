/**
 * Parser for ADT^A03 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{OH1}] [{OH2}] [OH3] [{OH4}] [{ARV}] [{ROL}] [{PRT}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] [{OH2}] [OH3] }] PV1 [PV2] [{ARV}] [{ROL}] [{PRT}] [{DB1}] [{AL1}] [{IAM}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] [{PRT}] }] [{ OBSERVATION: OBX [{PRT}] }] [{ GUARANTOR: GT1 [{GSP}] [{GSR}] }] [{ INSURANCE: IN1 [IN2] [{IN3}] [{GSP}] [{GSR}] [{ROL}] [{PRT}] [{ AUTHORIZATION: AUT [{PRT}] }] [{ REFERRAL: RF1 [{PRT}] }] }] [ACC] [PDA]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ADT_A03_STRUCTURE } from "../../structures/v2.9.1/ADT_A03.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { ARV } from "../../segments/v2.9.1/ARV.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { EVN } from "../../segments/v2.9.1/EVN.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { PD1 } from "../../segments/v2.9.1/PD1.ts";
import { GSP } from "../../segments/v2.9.1/GSP.ts";
import { GSR } from "../../segments/v2.9.1/GSR.ts";
import { GSC } from "../../segments/v2.9.1/GSC.ts";
import { OH1 } from "../../segments/v2.9.1/OH1.ts";
import { OH2 } from "../../segments/v2.9.1/OH2.ts";
import { OH3 } from "../../segments/v2.9.1/OH3.ts";
import { OH4 } from "../../segments/v2.9.1/OH4.ts";
import { ROL } from "../../segments/v2.9.1/ROL.ts";
import { PRT } from "../../segments/v2.9.1/PRT.ts";
import { NK1 } from "../../segments/v2.9.1/NK1.ts";
import { PV1 } from "../../segments/v2.9.1/PV1.ts";
import { PV2 } from "../../segments/v2.9.1/PV2.ts";
import { DB1 } from "../../segments/v2.9.1/DB1.ts";
import { AL1 } from "../../segments/v2.9.1/AL1.ts";
import { IAM } from "../../segments/v2.9.1/IAM.ts";
import { DG1 } from "../../segments/v2.9.1/DG1.ts";
import { DRG } from "../../segments/v2.9.1/DRG.ts";
import { PR1 } from "../../segments/v2.9.1/PR1.ts";
import { OBX } from "../../segments/v2.9.1/OBX.ts";
import { GT1 } from "../../segments/v2.9.1/GT1.ts";
import { IN1 } from "../../segments/v2.9.1/IN1.ts";
import { IN2 } from "../../segments/v2.9.1/IN2.ts";
import { IN3 } from "../../segments/v2.9.1/IN3.ts";
import { AUT } from "../../segments/v2.9.1/AUT.ts";
import { RF1 } from "../../segments/v2.9.1/RF1.ts";
import { ACC } from "../../segments/v2.9.1/ACC.ts";
import { PDA } from "../../segments/v2.9.1/PDA.ts";

/** The NEXT OF KIN group of a parsed ADT^A03 (HL7 v2.9.1) message. */
export interface ParsedNextOfKin {
  /** The NK1 segment. */
  nextOfKin: NK1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The OH2 segments. */
  oh2List?: OH2[];
  /** The OH3 segment. */
  oh3?: OH3;
}

/** The PROCEDURE group of a parsed ADT^A03 (HL7 v2.9.1) message. */
export interface ParsedProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The ROL segments. */
  roles?: ROL[];
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The OBSERVATION group of a parsed ADT^A03 (HL7 v2.9.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The GUARANTOR group of a parsed ADT^A03 (HL7 v2.9.1) message. */
export interface ParsedGuarantor {
  /** The GT1 segment. */
  guarantor: GT1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
}

/** The INSURANCE group of a parsed ADT^A03 (HL7 v2.9.1) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segments. */
  insuranceCertifications?: IN3[];
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The AUTHORIZATION groups. */
  authorizations?: ParsedAuthorization[];
  /** The REFERRAL groups. */
  referrals?: ParsedReferral[];
}

/** The AUTHORIZATION group of a parsed ADT^A03 (HL7 v2.9.1) message. */
export interface ParsedAuthorization {
  /** The AUT segment. */
  authorization: AUT;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The REFERRAL group of a parsed ADT^A03 (HL7 v2.9.1) message. */
export interface ParsedReferral {
  /** The RF1 segment. */
  referral: RF1;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** Structured result of parsing an HL7 ADT^A03 (HL7 v2.9.1) message. */
export interface ParsedADT_A03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The ARV segments. */
  arvList?: ARV[];
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
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The OH1 segments. */
  oh1List?: OH1[];
  /** The OH2 segments. */
  oh2List?: OH2[];
  /** The OH3 segment. */
  oh3?: OH3;
  /** The OH4 segments. */
  oh4List?: OH4[];
  /** The ARV segments. */
  arv2?: ARV[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NEXT OF KIN groups. */
  nextOfKins?: ParsedNextOfKin[];
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ARV segments. */
  arv3?: ARV[];
  /** The ROL segments. */
  rol2?: ROL[];
  /** The PRT segments. */
  prt2?: PRT[];
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The IAM segments. */
  adverseReactions?: IAM[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The PROCEDURE groups. */
  procedures?: ParsedProcedure[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The GUARANTOR groups. */
  guarantors?: ParsedGuarantor[];
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The ACC segment. */
  accident?: ACC;
  /** The PDA segment. */
  deathAndAutopsy?: PDA;
}

/** The segment parsers of ADT^A03 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  ARV: (s, e) => ARV.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  GSP: (s, e) => GSP.parse(s, e),
  GSR: (s, e) => GSR.parse(s, e),
  GSC: (s, e) => GSC.parse(s, e),
  OH1: (s, e) => OH1.parse(s, e),
  OH2: (s, e) => OH2.parse(s, e),
  OH3: (s, e) => OH3.parse(s, e),
  OH4: (s, e) => OH4.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  DB1: (s, e) => DB1.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  IAM: (s, e) => IAM.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  DRG: (s, e) => DRG.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  AUT: (s, e) => AUT.parse(s, e),
  RF1: (s, e) => RF1.parse(s, e),
  ACC: (s, e) => ACC.parse(s, e),
  PDA: (s, e) => PDA.parse(s, e),
};

/** Parser for HL7 ADT^A03 (HL7 v2.9.1) messages. */
export class ADT_A03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A03> {
    return parseStructure<ParsedADT_A03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A03 (HL7 v2.9.1) message string into a structured result. */
export function parseADT_A03(messageString: string): Result<ParsedADT_A03> {
  return new ADT_A03_Parser().parse(messageString);
}
