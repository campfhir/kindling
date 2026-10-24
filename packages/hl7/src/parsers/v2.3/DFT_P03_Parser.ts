/**
 * Parser for DFT^P03 messages (HL7 v2.3).
 *
 * Structure: MSH EVN PID [PD1] [PV1] [PV2] [{DB1}] [{OBX}] { FINANCIAL: FT1 [{ FINANCIAL_PROCEDURE: PR1 [{ROL}] }] } [{DG1}] [DRG] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { DFT_P03_STRUCTURE } from "../../structures/v2.3/DFT_P03.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { EVN } from "../../segments/v2.3/EVN.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PD1 } from "../../segments/v2.3/PD1.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { PV2 } from "../../segments/v2.3/PV2.ts";
import { DB1 } from "../../segments/v2.3/DB1.ts";
import { OBX } from "../../segments/v2.3/OBX.ts";
import { FT1 } from "../../segments/v2.3/FT1.ts";
import { PR1 } from "../../segments/v2.3/PR1.ts";
import { ROL } from "../../segments/v2.3/ROL.ts";
import { DG1 } from "../../segments/v2.3/DG1.ts";
import { DRG } from "../../segments/v2.3/DRG.ts";
import { GT1 } from "../../segments/v2.3/GT1.ts";
import { IN1 } from "../../segments/v2.3/IN1.ts";
import { IN2 } from "../../segments/v2.3/IN2.ts";
import { IN3 } from "../../segments/v2.3/IN3.ts";
import { ACC } from "../../segments/v2.3/ACC.ts";

/** The FINANCIAL group of a parsed DFT^P03 (HL7 v2.3) message. */
export interface ParsedDFTFinancial {
  /** The FT1 segment. */
  transaction: FT1;
  /** The FINANCIAL PROCEDURE groups. */
  procedures?: ParsedDFTProcedure[];
}

/** The FINANCIAL PROCEDURE group of a parsed DFT^P03 (HL7 v2.3) message. */
export interface ParsedDFTProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The ROL segments. */
  roles?: ROL[];
}

/** The INSURANCE group of a parsed DFT^P03 (HL7 v2.3) message. */
export interface ParsedDFTInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** Structured result of parsing an HL7 DFT^P03 (HL7 v2.3) message. */
export interface ParsedDFT_P03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The OBX segments. */
  observations?: OBX[];
  /** The FINANCIAL groups. */
  financials: ParsedDFTFinancial[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: ParsedDFTInsurance[];
  /** The ACC segment. */
  accident?: ACC;
}

/** The segment parsers of DFT^P03 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  DB1: (s, e) => DB1.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  FT1: (s, e) => FT1.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  DRG: (s, e) => DRG.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  ACC: (s, e) => ACC.parse(s, e),
};

/** Parser for HL7 DFT^P03 (HL7 v2.3) messages. */
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

/** Parses an HL7 DFT^P03 (HL7 v2.3) message string into a structured result. */
export function parseDFT_P03(messageString: string): Result<ParsedDFT_P03> {
  return new DFT_P03_Parser().parse(messageString);
}
