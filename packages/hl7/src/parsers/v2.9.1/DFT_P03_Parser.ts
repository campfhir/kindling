/**
 * Parser for DFT^P03 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ROL}] [ VISIT: [PV1] [PV2] [{PRT}] [{ROL}] ] [{DB1}] [{ COMMON_ORDER: ORC [{PRT}] [{ TIMING_QUANTITY: TQ1 [{TQ2}] }] [ ORDER: OBR [{PRT}] [{NTE}] ] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] }] { FINANCIAL: FT1 [{PRT}] [{ROL}] [{NTE}] [{ FINANCIAL_PROCEDURE: PR1 [{PRT}] [{ROL}] }] [{ FINANCIAL_OBSERVATION_STANDALONE: OBX [{PRT}] [{NTE}] }] [{ FINANCIAL_ORDER_STANDALONE: OBR [{PRT}] [{NTE}] [{ FINANCIAL_OBSERVATION: OBX [{PRT}] [{NTE}] }] }] [{ FINANCIAL_COMMON_ORDER: ORC [{PRT}] [{ FINANCIAL_TIMING_QUANTITY: TQ1 [{TQ2}] }] [ FINANCIAL_ORDER: OBR [{PRT}] [{NTE}] ] [{ FINANCIAL_OBSERVATION: OBX [{PRT}] [{NTE}] }] }] } [{ DIAGNOSIS: DG1 }] [DRG] [{GT1}] [{ INSURANCE: IN1 [{GSP}] [{GSR}] [IN2] [{IN3}] [{PRT}] [{ROL}] }] [ACC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { DFT_P03_STRUCTURE } from "../../structures/v2.9.1/DFT_P03.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { EVN } from "../../segments/v2.9.1/EVN.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { PD1 } from "../../segments/v2.9.1/PD1.ts";
import { GSP } from "../../segments/v2.9.1/GSP.ts";
import { GSR } from "../../segments/v2.9.1/GSR.ts";
import { GSC } from "../../segments/v2.9.1/GSC.ts";
import { PRT } from "../../segments/v2.9.1/PRT.ts";
import { ROL } from "../../segments/v2.9.1/ROL.ts";
import { PV1 } from "../../segments/v2.9.1/PV1.ts";
import { PV2 } from "../../segments/v2.9.1/PV2.ts";
import { DB1 } from "../../segments/v2.9.1/DB1.ts";
import { ORC } from "../../segments/v2.9.1/ORC.ts";
import { TQ1 } from "../../segments/v2.9.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.9.1/TQ2.ts";
import { OBR } from "../../segments/v2.9.1/OBR.ts";
import { NTE } from "../../segments/v2.9.1/NTE.ts";
import { OBX } from "../../segments/v2.9.1/OBX.ts";
import { FT1 } from "../../segments/v2.9.1/FT1.ts";
import { PR1 } from "../../segments/v2.9.1/PR1.ts";
import { DG1 } from "../../segments/v2.9.1/DG1.ts";
import { DRG } from "../../segments/v2.9.1/DRG.ts";
import { GT1 } from "../../segments/v2.9.1/GT1.ts";
import { IN1 } from "../../segments/v2.9.1/IN1.ts";
import { IN2 } from "../../segments/v2.9.1/IN2.ts";
import { IN3 } from "../../segments/v2.9.1/IN3.ts";
import { ACC } from "../../segments/v2.9.1/ACC.ts";

/** The VISIT group of a parsed DFT^P03 (HL7 v2.9.1) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The COMMON ORDER group of a parsed DFT^P03 (HL7 v2.9.1) message. */
export interface ParsedCommonOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING QUANTITY groups. */
  timingQuantitys?: ParsedTimingQuantity[];
  /** The ORDER group. */
  order?: ParsedOrder;
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
}

/** The TIMING QUANTITY group of a parsed DFT^P03 (HL7 v2.9.1) message. */
export interface ParsedTimingQuantity {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER group of a parsed DFT^P03 (HL7 v2.9.1) message. */
export interface ParsedOrder {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The OBSERVATION group of a parsed DFT^P03 (HL7 v2.9.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The FINANCIAL group of a parsed DFT^P03 (HL7 v2.9.1) message. */
export interface ParsedFinancial {
  /** The FT1 segment. */
  transaction: FT1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The FINANCIAL PROCEDURE groups. */
  financialProcedures?: ParsedFinancialProcedure[];
  /** The FINANCIAL OBSERVATION STANDALONE groups. */
  financialObservationStandalones?: ParsedFinancialObservationStandalone[];
  /** The FINANCIAL ORDER STANDALONE groups. */
  financialOrderStandalones?: ParsedFinancialOrderStandalone[];
  /** The FINANCIAL COMMON ORDER groups. */
  financialCommonOrders?: ParsedFinancialCommonOrder[];
}

/** The FINANCIAL PROCEDURE group of a parsed DFT^P03 (HL7 v2.9.1) message. */
export interface ParsedFinancialProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The FINANCIAL OBSERVATION STANDALONE group of a parsed DFT^P03 (HL7 v2.9.1) message. */
export interface ParsedFinancialObservationStandalone {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The FINANCIAL ORDER STANDALONE group of a parsed DFT^P03 (HL7 v2.9.1) message. */
export interface ParsedFinancialOrderStandalone {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The FINANCIAL OBSERVATION groups. */
  financialObservations?: ParsedFinancialObservation1[];
}

/** The FINANCIAL OBSERVATION group of a parsed DFT^P03 (HL7 v2.9.1) message. */
export interface ParsedFinancialObservation1 {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The FINANCIAL COMMON ORDER group of a parsed DFT^P03 (HL7 v2.9.1) message. */
export interface ParsedFinancialCommonOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The FINANCIAL TIMING QUANTITY groups. */
  financialTimingQuantitys?: ParsedFinancialTimingQuantity[];
  /** The FINANCIAL ORDER group. */
  financialOrder?: ParsedFinancialOrder;
  /** The FINANCIAL OBSERVATION groups. */
  financialObservations?: ParsedFinancialObservation2[];
}

/** The FINANCIAL TIMING QUANTITY group of a parsed DFT^P03 (HL7 v2.9.1) message. */
export interface ParsedFinancialTimingQuantity {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The FINANCIAL ORDER group of a parsed DFT^P03 (HL7 v2.9.1) message. */
export interface ParsedFinancialOrder {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The FINANCIAL OBSERVATION group of a parsed DFT^P03 (HL7 v2.9.1) message. */
export interface ParsedFinancialObservation2 {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DIAGNOSIS group of a parsed DFT^P03 (HL7 v2.9.1) message. */
export interface ParsedDiagnosis {
  /** The DG1 segment. */
  diagnosis: DG1;
}

/** The INSURANCE group of a parsed DFT^P03 (HL7 v2.9.1) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segments. */
  insuranceCertifications?: IN3[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** Structured result of parsing an HL7 DFT^P03 (HL7 v2.9.1) message. */
export interface ParsedDFT_P03 extends ParsedMessageBase {
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
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The VISIT group. */
  visit?: ParsedVisit;
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The COMMON ORDER groups. */
  commonOrders?: ParsedCommonOrder[];
  /** The FINANCIAL groups. */
  financials: ParsedFinancial[];
  /** The DIAGNOSIS groups. */
  diagnosis?: ParsedDiagnosis[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The ACC segment. */
  accident?: ACC;
}

/** The segment parsers of DFT^P03 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  GSP: (s, e) => GSP.parse(s, e),
  GSR: (s, e) => GSR.parse(s, e),
  GSC: (s, e) => GSC.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  DB1: (s, e) => DB1.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  FT1: (s, e) => FT1.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  DRG: (s, e) => DRG.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  ACC: (s, e) => ACC.parse(s, e),
};

/** Parser for HL7 DFT^P03 (HL7 v2.9.1) messages. */
export class DFT_P03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DFT_P03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = DFT_P03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedDFT_P03> {
    return parseStructure<ParsedDFT_P03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 DFT^P03 (HL7 v2.9.1) message string into a structured result. */
export function parseDFT_P03(messageString: string): Result<ParsedDFT_P03> {
  return new DFT_P03_Parser().parse(messageString);
}
