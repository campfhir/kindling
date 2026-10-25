/**
 * Parser for DFT^P11 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] [{ROL}] [PV1] [PV2] [{ROL}] [{DB1}] [{ COMMON_ORDER: [ORC] [{ TIMING_QUANTITY: TQ1 [{TQ2}] }] [ ORDER: OBR [{NTE}] ] [{ OBSERVATION: OBX [{NTE}] }] }] [{DG1}] [DRG] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] { FINANCIAL: FT1 [{ FINANCIAL_PROCEDURE: PR1 [{ROL}] }] [{ FINANCIAL_COMMON_ORDER: [ORC] [{ FINANCIAL_TIMING_QUANTITY: TQ1 [{TQ2}] }] [ FINANCIAL_ORDER: OBR [{NTE}] ] [{ FINANCIAL_OBSERVATION: OBX [{NTE}] }] }] [{DG1}] [DRG] [{GT1}] [{ FINANCIAL_INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { DFT_P11_STRUCTURE } from "../../structures/v2.5/DFT_P11.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { EVN } from "../../segments/v2.5/EVN.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { PD1 } from "../../segments/v2.5/PD1.ts";
import { ROL } from "../../segments/v2.5/ROL.ts";
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { PV2 } from "../../segments/v2.5/PV2.ts";
import { DB1 } from "../../segments/v2.5/DB1.ts";
import { ORC } from "../../segments/v2.5/ORC.ts";
import { TQ1 } from "../../segments/v2.5/TQ1.ts";
import { TQ2 } from "../../segments/v2.5/TQ2.ts";
import { OBR } from "../../segments/v2.5/OBR.ts";
import { NTE } from "../../segments/v2.5/NTE.ts";
import { OBX } from "../../segments/v2.5/OBX.ts";
import { DG1 } from "../../segments/v2.5/DG1.ts";
import { DRG } from "../../segments/v2.5/DRG.ts";
import { GT1 } from "../../segments/v2.5/GT1.ts";
import { IN1 } from "../../segments/v2.5/IN1.ts";
import { IN2 } from "../../segments/v2.5/IN2.ts";
import { IN3 } from "../../segments/v2.5/IN3.ts";
import { ACC } from "../../segments/v2.5/ACC.ts";
import { FT1 } from "../../segments/v2.5/FT1.ts";
import { PR1 } from "../../segments/v2.5/PR1.ts";

/** The COMMON ORDER group of a parsed DFT^P11 (HL7 v2.5) message. */
export interface ParsedCommonOrder {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The TIMING QUANTITY groups. */
  timingQuantitys?: ParsedTimingQuantity[];
  /** The ORDER group. */
  order?: ParsedOrder;
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
}

/** The TIMING QUANTITY group of a parsed DFT^P11 (HL7 v2.5) message. */
export interface ParsedTimingQuantity {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER group of a parsed DFT^P11 (HL7 v2.5) message. */
export interface ParsedOrder {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The OBSERVATION group of a parsed DFT^P11 (HL7 v2.5) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The INSURANCE group of a parsed DFT^P11 (HL7 v2.5) message. */
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

/** The FINANCIAL group of a parsed DFT^P11 (HL7 v2.5) message. */
export interface ParsedFinancial {
  /** The FT1 segment. */
  transaction: FT1;
  /** The FINANCIAL PROCEDURE groups. */
  financialProcedures?: ParsedFinancialProcedure[];
  /** The FINANCIAL COMMON ORDER groups. */
  financialCommonOrders?: ParsedFinancialCommonOrder[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The FINANCIAL INSURANCE groups. */
  financialInsurances?: ParsedFinancialInsurance[];
}

/** The FINANCIAL PROCEDURE group of a parsed DFT^P11 (HL7 v2.5) message. */
export interface ParsedFinancialProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The ROL segments. */
  roles?: ROL[];
}

/** The FINANCIAL COMMON ORDER group of a parsed DFT^P11 (HL7 v2.5) message. */
export interface ParsedFinancialCommonOrder {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The FINANCIAL TIMING QUANTITY groups. */
  financialTimingQuantitys?: ParsedFinancialTimingQuantity[];
  /** The FINANCIAL ORDER group. */
  financialOrder?: ParsedFinancialOrder;
  /** The FINANCIAL OBSERVATION groups. */
  financialObservations?: ParsedFinancialObservation[];
}

/** The FINANCIAL TIMING QUANTITY group of a parsed DFT^P11 (HL7 v2.5) message. */
export interface ParsedFinancialTimingQuantity {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The FINANCIAL ORDER group of a parsed DFT^P11 (HL7 v2.5) message. */
export interface ParsedFinancialOrder {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The FINANCIAL OBSERVATION group of a parsed DFT^P11 (HL7 v2.5) message. */
export interface ParsedFinancialObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The FINANCIAL INSURANCE group of a parsed DFT^P11 (HL7 v2.5) message. */
export interface ParsedFinancialInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segments. */
  insuranceCertifications?: IN3[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** Structured result of parsing an HL7 DFT^P11 (HL7 v2.5) message. */
export interface ParsedDFT_P11 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The ROL segments. */
  roles?: ROL[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ROL segments. */
  visitRoles?: ROL[];
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The COMMON ORDER groups. */
  commonOrders?: ParsedCommonOrder[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The ACC segment. */
  accident?: ACC;
  /** The FINANCIAL groups. */
  financials: ParsedFinancial[];
}

/** The segment parsers of DFT^P11 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
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
  DG1: (s, e) => DG1.parse(s, e),
  DRG: (s, e) => DRG.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  ACC: (s, e) => ACC.parse(s, e),
  FT1: (s, e) => FT1.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
};

/** Parser for HL7 DFT^P11 (HL7 v2.5) messages. */
export class DFT_P11_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DFT_P11";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = DFT_P11_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedDFT_P11> {
    return parseStructure<ParsedDFT_P11>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 DFT^P11 (HL7 v2.5) message string into a structured result. */
export function parseDFT_P11(messageString: string): Result<ParsedDFT_P11> {
  return new DFT_P11_Parser().parse(messageString);
}
