/**
 * Builder, parser and structure for DFT^P11 messages (HL7 v2.9).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [{PRT}] [PD1] [{PRT}] [{ROL}] [ VISIT: [PV1] [PV2] [{PRT}] [{ROL}] ] [{DB1}] [{ COMMON_ORDER: ORC [{PRT}] [{ TIMING_QUANTITY: TQ1 [{TQ2}] }] [ ORDER: OBR [{PRT}] [{NTE}] ] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] }] [{ DIAGNOSIS: DG1 }] [DRG] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{PRT}] [{ROL}] }] [ACC] { FINANCIAL: FT1 [{NTE}] [{PRT}] [{ FINANCIAL_PROCEDURE: PR1 [{PRT}] [{ROL}] }] [{ FINANCIAL_OBSERVATION_STANDALONE: OBX [{PRT}] [{NTE}] }] [{ FINANCIAL_ORDER_STANDALONE: OBR [{PRT}] [{NTE}] [{ FINANCIAL_OBSERVATION: OBX [{PRT}] [{NTE}] }] }] [{ FINANCIAL_COMMON_ORDER: ORC [{PRT}] [{ FINANCIAL_TIMING_QUANTITY: TQ1 [{TQ2}] }] [ FINANCIAL_ORDER: OBR [{PRT}] [{NTE}] ] [{ FINANCIAL_OBSERVATION: OBX [{PRT}] [{NTE}] }] }] [{ DIAGNOSIS_FT1: DG1 }] [DRG] [{GT1}] [{ FINANCIAL_INSURANCE: IN1 [IN2] [{IN3}] [{PRT}] [{ROL}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { EVN } from "./EVN.ts";
import { PID } from "./PID.ts";
import { PRT } from "./PRT.ts";
import { PD1 } from "./PD1.ts";
import { ROL } from "./ROL.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { DB1 } from "./DB1.ts";
import { ORC } from "./ORC.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { OBR } from "./OBR.ts";
import { NTE } from "./NTE.ts";
import { OBX } from "./OBX.ts";
import { DG1 } from "./DG1.ts";
import { DRG } from "./DRG.ts";
import { GT1 } from "./GT1.ts";
import { IN1 } from "./IN1.ts";
import { IN2 } from "./IN2.ts";
import { IN3 } from "./IN3.ts";
import { ACC } from "./ACC.ts";
import { FT1 } from "./FT1.ts";
import { PR1 } from "./PR1.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of DFT^P11 (HL7 v2.9), in order. */
export const DFT_P11_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PRT", required: false, repeating: true },
  { name: "PD1", required: false, repeating: false },
  { name: "PRT", required: false, repeating: true, as: "prt2" },
  { name: "ROL", required: false, repeating: true },
  {
    name: "VISIT",
    required: false,
    repeating: false,
    segments: [
      { name: "PV1", required: false, repeating: false },
      { name: "PV2", required: false, repeating: false },
      { name: "PRT", required: false, repeating: true },
      { name: "ROL", required: false, repeating: true },
    ],
  },
  { name: "DB1", required: false, repeating: true },
  {
    name: "COMMON_ORDER",
    required: false,
    repeating: true,
    segments: [
      { name: "ORC", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
      {
        name: "TIMING_QUANTITY",
        required: false,
        repeating: true,
        segments: [
          { name: "TQ1", required: true, repeating: false },
          { name: "TQ2", required: false, repeating: true },
        ],
      },
      {
        name: "ORDER",
        required: false,
        repeating: false,
        segments: [
          { name: "OBR", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "OBSERVATION",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
  {
    name: "DIAGNOSIS",
    required: false,
    repeating: true,
    segments: [
      { name: "DG1", required: true, repeating: false },
    ],
  },
  { name: "DRG", required: false, repeating: false },
  { name: "GT1", required: false, repeating: true },
  {
    name: "INSURANCE",
    required: false,
    repeating: true,
    segments: [
      { name: "IN1", required: true, repeating: false },
      { name: "IN2", required: false, repeating: false },
      { name: "IN3", required: false, repeating: true },
      { name: "PRT", required: false, repeating: true },
      { name: "ROL", required: false, repeating: true },
    ],
  },
  { name: "ACC", required: false, repeating: false },
  {
    name: "FINANCIAL",
    required: true,
    repeating: true,
    segments: [
      { name: "FT1", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      { name: "PRT", required: false, repeating: true },
      {
        name: "FINANCIAL_PROCEDURE",
        required: false,
        repeating: true,
        segments: [
          { name: "PR1", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "ROL", required: false, repeating: true },
        ],
      },
      {
        name: "FINANCIAL_OBSERVATION_STANDALONE",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "FINANCIAL_ORDER_STANDALONE",
        required: false,
        repeating: true,
        segments: [
          { name: "OBR", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
          {
            name: "FINANCIAL_OBSERVATION",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
              { name: "NTE", required: false, repeating: true },
            ],
          },
        ],
      },
      {
        name: "FINANCIAL_COMMON_ORDER",
        required: false,
        repeating: true,
        segments: [
          { name: "ORC", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          {
            name: "FINANCIAL_TIMING_QUANTITY",
            required: false,
            repeating: true,
            segments: [
              { name: "TQ1", required: true, repeating: false },
              { name: "TQ2", required: false, repeating: true },
            ],
          },
          {
            name: "FINANCIAL_ORDER",
            required: false,
            repeating: false,
            segments: [
              { name: "OBR", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
              { name: "NTE", required: false, repeating: true },
            ],
          },
          {
            name: "FINANCIAL_OBSERVATION",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
              { name: "NTE", required: false, repeating: true },
            ],
          },
        ],
      },
      {
        name: "DIAGNOSIS_FT1",
        required: false,
        repeating: true,
        segments: [
          { name: "DG1", required: true, repeating: false },
        ],
      },
      { name: "DRG", required: false, repeating: false },
      { name: "GT1", required: false, repeating: true },
      {
        name: "FINANCIAL_INSURANCE",
        required: false,
        repeating: true,
        segments: [
          { name: "IN1", required: true, repeating: false },
          { name: "IN2", required: false, repeating: false },
          { name: "IN3", required: false, repeating: true },
          { name: "PRT", required: false, repeating: true },
          { name: "ROL", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The VISIT group of a parsed DFT^P11 (HL7 v2.9) message. */
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

/** The COMMON ORDER group of a parsed DFT^P11 (HL7 v2.9) message. */
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

/** The TIMING QUANTITY group of a parsed DFT^P11 (HL7 v2.9) message. */
export interface ParsedTimingQuantity {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER group of a parsed DFT^P11 (HL7 v2.9) message. */
export interface ParsedOrder {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The OBSERVATION group of a parsed DFT^P11 (HL7 v2.9) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DIAGNOSIS group of a parsed DFT^P11 (HL7 v2.9) message. */
export interface ParsedDiagnosis {
  /** The DG1 segment. */
  diagnosis: DG1;
}

/** The INSURANCE group of a parsed DFT^P11 (HL7 v2.9) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segments. */
  insuranceCertifications?: IN3[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The FINANCIAL group of a parsed DFT^P11 (HL7 v2.9) message. */
export interface ParsedFinancial {
  /** The FT1 segment. */
  transaction: FT1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The FINANCIAL PROCEDURE groups. */
  financialProcedures?: ParsedFinancialProcedure[];
  /** The FINANCIAL OBSERVATION STANDALONE groups. */
  financialObservationStandalones?: ParsedFinancialObservationStandalone[];
  /** The FINANCIAL ORDER STANDALONE groups. */
  financialOrderStandalones?: ParsedFinancialOrderStandalone[];
  /** The FINANCIAL COMMON ORDER groups. */
  financialCommonOrders?: ParsedFinancialCommonOrder[];
  /** The DIAGNOSIS FT1 groups. */
  diagnosisFt1s?: ParsedDiagnosisFt1[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The FINANCIAL INSURANCE groups. */
  financialInsurances?: ParsedFinancialInsurance[];
}

/** The FINANCIAL PROCEDURE group of a parsed DFT^P11 (HL7 v2.9) message. */
export interface ParsedFinancialProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The FINANCIAL OBSERVATION STANDALONE group of a parsed DFT^P11 (HL7 v2.9) message. */
export interface ParsedFinancialObservationStandalone {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The FINANCIAL ORDER STANDALONE group of a parsed DFT^P11 (HL7 v2.9) message. */
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

/** The FINANCIAL OBSERVATION group of a parsed DFT^P11 (HL7 v2.9) message. */
export interface ParsedFinancialObservation1 {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The FINANCIAL COMMON ORDER group of a parsed DFT^P11 (HL7 v2.9) message. */
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

/** The FINANCIAL TIMING QUANTITY group of a parsed DFT^P11 (HL7 v2.9) message. */
export interface ParsedFinancialTimingQuantity {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The FINANCIAL ORDER group of a parsed DFT^P11 (HL7 v2.9) message. */
export interface ParsedFinancialOrder {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The FINANCIAL OBSERVATION group of a parsed DFT^P11 (HL7 v2.9) message. */
export interface ParsedFinancialObservation2 {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DIAGNOSIS FT1 group of a parsed DFT^P11 (HL7 v2.9) message. */
export interface ParsedDiagnosisFt1 {
  /** The DG1 segment. */
  diagnosis: DG1;
}

/** The FINANCIAL INSURANCE group of a parsed DFT^P11 (HL7 v2.9) message. */
export interface ParsedFinancialInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segments. */
  insuranceCertifications?: IN3[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** Structured result of parsing an HL7 DFT^P11 (HL7 v2.9) message. */
export interface ParsedDFT_P11 extends ParsedMessageBase {
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
  /** The PRT segments. */
  prtList?: PRT[];
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prt2?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The VISIT group. */
  visit?: ParsedVisit;
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The COMMON ORDER groups. */
  commonOrders?: ParsedCommonOrder[];
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
  /** The FINANCIAL groups. */
  financials: ParsedFinancial[];
}

/** The segment parsers of DFT^P11 (HL7 v2.9). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
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

/** Parser for HL7 DFT^P11 (HL7 v2.9) messages. */
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

/** Parses an HL7 DFT^P11 (HL7 v2.9) message string into a structured result. */
export function parseDFT_P11(messageString: string): Result<ParsedDFT_P11> {
  return new DFT_P11_Parser().parse(messageString);
}

/** The VISIT group of an DFT^P11 (HL7 v2.9) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The COMMON ORDER group of an DFT^P11 (HL7 v2.9) message being built. */
export interface CommonOrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING QUANTITY groups. */
  timingQuantitys?: TimingQuantityGroup[];
  /** The ORDER group. */
  order?: OrderGroup;
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
}

/** The TIMING QUANTITY group of an DFT^P11 (HL7 v2.9) message being built. */
export interface TimingQuantityGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER group of an DFT^P11 (HL7 v2.9) message being built. */
export interface OrderGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The OBSERVATION group of an DFT^P11 (HL7 v2.9) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DIAGNOSIS group of an DFT^P11 (HL7 v2.9) message being built. */
export interface DiagnosisGroup {
  /** The DG1 segment. */
  diagnosis: DG1;
}

/** The INSURANCE group of an DFT^P11 (HL7 v2.9) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segments. */
  insuranceCertifications?: IN3[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The FINANCIAL group of an DFT^P11 (HL7 v2.9) message being built. */
export interface FinancialGroup {
  /** The FT1 segment. */
  transaction: FT1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The FINANCIAL PROCEDURE groups. */
  financialProcedures?: FinancialProcedureGroup[];
  /** The FINANCIAL OBSERVATION STANDALONE groups. */
  financialObservationStandalones?: FinancialObservationStandaloneGroup[];
  /** The FINANCIAL ORDER STANDALONE groups. */
  financialOrderStandalones?: FinancialOrderStandaloneGroup[];
  /** The FINANCIAL COMMON ORDER groups. */
  financialCommonOrders?: FinancialCommonOrderGroup[];
  /** The DIAGNOSIS FT1 groups. */
  diagnosisFt1s?: DiagnosisFt1Group[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The FINANCIAL INSURANCE groups. */
  financialInsurances?: FinancialInsuranceGroup[];
}

/** The FINANCIAL PROCEDURE group of an DFT^P11 (HL7 v2.9) message being built. */
export interface FinancialProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The FINANCIAL OBSERVATION STANDALONE group of an DFT^P11 (HL7 v2.9) message being built. */
export interface FinancialObservationStandaloneGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The FINANCIAL ORDER STANDALONE group of an DFT^P11 (HL7 v2.9) message being built. */
export interface FinancialOrderStandaloneGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The FINANCIAL OBSERVATION groups. */
  financialObservations?: FinancialObservation1Group[];
}

/** The FINANCIAL OBSERVATION group of an DFT^P11 (HL7 v2.9) message being built. */
export interface FinancialObservation1Group {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The FINANCIAL COMMON ORDER group of an DFT^P11 (HL7 v2.9) message being built. */
export interface FinancialCommonOrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The FINANCIAL TIMING QUANTITY groups. */
  financialTimingQuantitys?: FinancialTimingQuantityGroup[];
  /** The FINANCIAL ORDER group. */
  financialOrder?: FinancialOrderGroup;
  /** The FINANCIAL OBSERVATION groups. */
  financialObservations?: FinancialObservation2Group[];
}

/** The FINANCIAL TIMING QUANTITY group of an DFT^P11 (HL7 v2.9) message being built. */
export interface FinancialTimingQuantityGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The FINANCIAL ORDER group of an DFT^P11 (HL7 v2.9) message being built. */
export interface FinancialOrderGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The FINANCIAL OBSERVATION group of an DFT^P11 (HL7 v2.9) message being built. */
export interface FinancialObservation2Group {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DIAGNOSIS FT1 group of an DFT^P11 (HL7 v2.9) message being built. */
export interface DiagnosisFt1Group {
  /** The DG1 segment. */
  diagnosis: DG1;
}

/** The FINANCIAL INSURANCE group of an DFT^P11 (HL7 v2.9) message being built. */
export interface FinancialInsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segments. */
  insuranceCertifications?: IN3[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The optional segments and groups of an DFT^P11 (HL7 v2.9) message. */
export interface DFT_P11Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prt2?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The VISIT group. */
  visit?: VisitGroup;
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The COMMON ORDER groups. */
  commonOrders?: CommonOrderGroup[];
  /** The DIAGNOSIS groups. */
  diagnosis?: DiagnosisGroup[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The ACC segment. */
  accident?: ACC;
}

/** Builder for HL7 DFT^P11 (HL7 v2.9) messages. */
export class DFT_P11<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DFT_P11";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = DFT_P11_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public financials: FinancialGroup[],
    public options: DFT_P11Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, financials: this.financials };
  }

  /** Validates the message structure, returning a result. */
  verify(): { valid: boolean; errors: string[] } {
    const errors = verifyStructure(this.structure, this.toInput());
    return { valid: errors.length === 0, errors };
  }

  /** Encodes this message to its HL7 wire string. */
  encode(): string {
    const verification = this.verify();
    if (!verification.valid) {
      throw new Error(`Cannot encode invalid ${this.messageName} message:\n${verification.errors.join("\n")}`);
    }
    return encodeStructure(this.structure, this.toInput(), this.encoding);
  }
}

/** Builds an HL7 DFT^P11 (HL7 v2.9) message. */
export function createDFT_P11<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  financials: FinancialGroup[],
  options: DFT_P11Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): DFT_P11<TMSH, TEVN, TPID> {
  return new DFT_P11(header, event, patient, financials, options, encoding);
}
