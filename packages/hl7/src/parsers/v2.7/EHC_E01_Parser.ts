/**
 * Parser for EHC^E01 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [{UAC}]  INVOICE_INFORMATION: IVC [PYE] [{CTD}] [AUT] [{LOC}] [{ROL}] { PRODUCT_SERVICE_SECTION: PSS { PRODUCT_SERVICE_GROUP: PSG [{LOC}] [{ROL}] [{ PATIENT_INFO: PID [PV1] [PV2] [{ACC}] { INSURANCE: IN1 [IN2] } [{ DIAGNOSIS: DG1 [{NTE}] }] [{OBX}] }] { PRODUCT_SERVICE_LINE_ITEM: PSL [{NTE}] [{ADJ}] [AUT] [{LOC}] [{ROL}] } [{ PROCEDURE: PR1 [{NTE}] [{ROL}] }] [{ INVOICE_PROCESSING: IPR }] } } 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { EHC_E01_STRUCTURE } from "../../structures/v2.7/EHC_E01.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { IVC } from "../../segments/v2.7/IVC.ts";
import { PYE } from "../../segments/v2.7/PYE.ts";
import { CTD } from "../../segments/v2.7/CTD.ts";
import { AUT } from "../../segments/v2.7/AUT.ts";
import { LOC } from "../../segments/v2.7/LOC.ts";
import { ROL } from "../../segments/v2.7/ROL.ts";
import { PSS } from "../../segments/v2.7/PSS.ts";
import { PSG } from "../../segments/v2.7/PSG.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { PV1 } from "../../segments/v2.7/PV1.ts";
import { PV2 } from "../../segments/v2.7/PV2.ts";
import { ACC } from "../../segments/v2.7/ACC.ts";
import { IN1 } from "../../segments/v2.7/IN1.ts";
import { IN2 } from "../../segments/v2.7/IN2.ts";
import { DG1 } from "../../segments/v2.7/DG1.ts";
import { NTE } from "../../segments/v2.7/NTE.ts";
import { OBX } from "../../segments/v2.7/OBX.ts";
import { PSL } from "../../segments/v2.7/PSL.ts";
import { ADJ } from "../../segments/v2.7/ADJ.ts";
import { PR1 } from "../../segments/v2.7/PR1.ts";
import { IPR } from "../../segments/v2.7/IPR.ts";

/** The INVOICE INFORMATION group of a parsed EHC^E01 (HL7 v2.7) message. */
export interface ParsedInvoiceInformation {
  /** The IVC segment. */
  ivc: IVC;
  /** The PYE segment. */
  pye?: PYE;
  /** The CTD segments. */
  contacts?: CTD[];
  /** The AUT segment. */
  authorization?: AUT;
  /** The LOC segments. */
  patientLocations?: LOC[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The PRODUCT SERVICE SECTION groups. */
  productServiceSections: ParsedProductServiceSection[];
}

/** The PRODUCT SERVICE SECTION group of a parsed EHC^E01 (HL7 v2.7) message. */
export interface ParsedProductServiceSection {
  /** The PSS segment. */
  pss: PSS;
  /** The PRODUCT SERVICE GROUP groups. */
  productServiceGroups: ParsedProductServiceGroup[];
}

/** The PRODUCT SERVICE GROUP group of a parsed EHC^E01 (HL7 v2.7) message. */
export interface ParsedProductServiceGroup {
  /** The PSG segment. */
  psg: PSG;
  /** The LOC segments. */
  patientLocations?: LOC[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The PATIENT INFO groups. */
  patientInfos?: ParsedPatientInfo[];
  /** The PRODUCT SERVICE LINE ITEM groups. */
  productServiceLineItems: ParsedProductServiceLineItem[];
  /** The PROCEDURE groups. */
  procedures?: ParsedProcedure[];
  /** The INVOICE PROCESSING groups. */
  invoiceProcessings?: ParsedInvoiceProcessing[];
}

/** The PATIENT INFO group of a parsed EHC^E01 (HL7 v2.7) message. */
export interface ParsedPatientInfo {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ACC segments. */
  accidents?: ACC[];
  /** The INSURANCE groups. */
  insurances: ParsedInsurance[];
  /** The DIAGNOSIS groups. */
  diagnosis?: ParsedDiagnosis[];
  /** The OBX segments. */
  observations?: OBX[];
}

/** The INSURANCE group of a parsed EHC^E01 (HL7 v2.7) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
}

/** The DIAGNOSIS group of a parsed EHC^E01 (HL7 v2.7) message. */
export interface ParsedDiagnosis {
  /** The DG1 segment. */
  diagnosis: DG1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PRODUCT SERVICE LINE ITEM group of a parsed EHC^E01 (HL7 v2.7) message. */
export interface ParsedProductServiceLineItem {
  /** The PSL segment. */
  psl: PSL;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ADJ segments. */
  adjList?: ADJ[];
  /** The AUT segment. */
  authorization?: AUT;
  /** The LOC segments. */
  patientLocations?: LOC[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The PROCEDURE group of a parsed EHC^E01 (HL7 v2.7) message. */
export interface ParsedProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The INVOICE PROCESSING group of a parsed EHC^E01 (HL7 v2.7) message. */
export interface ParsedInvoiceProcessing {
  /** The IPR segment. */
  ipr: IPR;
}

/** Structured result of parsing an HL7 EHC^E01 (HL7 v2.7) message. */
export interface ParsedEHC_E01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The INVOICE INFORMATION group. */
  invoiceInformation: ParsedInvoiceInformation;
}

/** The segment parsers of EHC^E01 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  IVC: (s, e) => IVC.parse(s, e),
  PYE: (s, e) => PYE.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  AUT: (s, e) => AUT.parse(s, e),
  LOC: (s, e) => LOC.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  PSS: (s, e) => PSS.parse(s, e),
  PSG: (s, e) => PSG.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  ACC: (s, e) => ACC.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  PSL: (s, e) => PSL.parse(s, e),
  ADJ: (s, e) => ADJ.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  IPR: (s, e) => IPR.parse(s, e),
};

/** Parser for HL7 EHC^E01 (HL7 v2.7) messages. */
export class EHC_E01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EHC_E01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEHC_E01> {
    return parseStructure<ParsedEHC_E01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EHC^E01 (HL7 v2.7) message string into a structured result. */
export function parseEHC_E01(messageString: string): Result<ParsedEHC_E01> {
  return new EHC_E01_Parser().parse(messageString);
}
