/**
 * Builder, parser and structure for DFT^P03 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID [PD1] [{ROL}] [PV1] [PV2] [{ROL}] [{DB1}] [{ COMMON_ORDER: [ORC] [ ORDER: OBR [{NTE}] ] [{ OBSERVATION: OBX [{NTE}] }] }] { FINANCIAL: FT1 [{ FINANCIAL_PROCEDURE: PR1 [{ROL}] }] [{ FINANCIAL_COMMON_ORDER: [ORC] [ FINANCIAL_ORDER: OBR [{NTE}] ] [{ FINANCIAL_OBSERVATION: OBX [{NTE}] }] }] } [{DG1}] [DRG] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { EVN } from "./EVN.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { ROL } from "./ROL.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { DB1 } from "./DB1.ts";
import { ORC } from "./ORC.ts";
import { OBR } from "./OBR.ts";
import { NTE } from "./NTE.ts";
import { OBX } from "./OBX.ts";
import { FT1 } from "./FT1.ts";
import { PR1 } from "./PR1.ts";
import { DG1 } from "./DG1.ts";
import { DRG } from "./DRG.ts";
import { GT1 } from "./GT1.ts";
import { IN1 } from "./IN1.ts";
import { IN2 } from "./IN2.ts";
import { IN3 } from "./IN3.ts";
import { ACC } from "./ACC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of DFT^P03 (HL7 v2.4), in order. */
export const DFT_P03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "ROL", required: false, repeating: true },
  { name: "PV1", required: false, repeating: false },
  { name: "PV2", required: false, repeating: false },
  { name: "ROL", required: false, repeating: true, as: "visitRoles" },
  { name: "DB1", required: false, repeating: true },
  {
    name: "COMMON_ORDER",
    required: false,
    repeating: true,
    as: "orders",
    segments: [
      { name: "ORC", required: false, repeating: false },
      {
        name: "ORDER",
        required: false,
        repeating: false,
        inline: true,
        segments: [
          { name: "OBR", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "OBSERVATION",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
  {
    name: "FINANCIAL",
    required: true,
    repeating: true,
    segments: [
      { name: "FT1", required: true, repeating: false },
      {
        name: "FINANCIAL_PROCEDURE",
        required: false,
        repeating: true,
        as: "procedures",
        segments: [
          { name: "PR1", required: true, repeating: false },
          { name: "ROL", required: false, repeating: true },
        ],
      },
      {
        name: "FINANCIAL_COMMON_ORDER",
        required: false,
        repeating: true,
        as: "orders",
        segments: [
          { name: "ORC", required: false, repeating: false },
          {
            name: "FINANCIAL_ORDER",
            required: false,
            repeating: false,
            inline: true,
            segments: [
              { name: "OBR", required: true, repeating: false },
              { name: "NTE", required: false, repeating: true },
            ],
          },
          {
            name: "FINANCIAL_OBSERVATION",
            required: false,
            repeating: true,
            as: "observations",
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "NTE", required: false, repeating: true },
            ],
          },
        ],
      },
    ],
  },
  { name: "DG1", required: false, repeating: true },
  { name: "DRG", required: false, repeating: false },
  { name: "GT1", required: false, repeating: true },
  {
    name: "INSURANCE",
    required: false,
    repeating: true,
    as: "insurances",
    segments: [
      { name: "IN1", required: true, repeating: false },
      { name: "IN2", required: false, repeating: false },
      { name: "IN3", required: false, repeating: true },
      { name: "ROL", required: false, repeating: true },
    ],
  },
  { name: "ACC", required: false, repeating: false },
];

/** The COMMON ORDER group of a parsed DFT^P03 (HL7 v2.4) message. */
export interface ParsedDFTOrder {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest?: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBSERVATION groups. */
  observations?: ParsedDFTObservation[];
}

/** The OBSERVATION group of a parsed DFT^P03 (HL7 v2.4) message. */
export interface ParsedDFTObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The FINANCIAL group of a parsed DFT^P03 (HL7 v2.4) message. */
export interface ParsedDFTFinancial {
  /** The FT1 segment. */
  transaction: FT1;
  /** The FINANCIAL PROCEDURE groups. */
  procedures?: ParsedDFTProcedure[];
  /** The FINANCIAL COMMON ORDER groups. */
  orders?: ParsedDFTFinancialOrder[];
}

/** The FINANCIAL PROCEDURE group of a parsed DFT^P03 (HL7 v2.4) message. */
export interface ParsedDFTProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The ROL segments. */
  roles?: ROL[];
}

/** The FINANCIAL COMMON ORDER group of a parsed DFT^P03 (HL7 v2.4) message. */
export interface ParsedDFTFinancialOrder {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest?: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The FINANCIAL OBSERVATION groups. */
  observations?: ParsedDFTFinancialObservation[];
}

/** The FINANCIAL OBSERVATION group of a parsed DFT^P03 (HL7 v2.4) message. */
export interface ParsedDFTFinancialObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The INSURANCE group of a parsed DFT^P03 (HL7 v2.4) message. */
export interface ParsedDFTInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segments. */
  insuranceCertifications?: IN3[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** Structured result of parsing an HL7 DFT^P03 (HL7 v2.4) message. */
export interface ParsedDFT_P03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
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
  orders?: ParsedDFTOrder[];
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

/** The segment parsers of DFT^P03 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  DB1: (s, e) => DB1.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
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

/** Parser for HL7 DFT^P03 (HL7 v2.4) messages. */
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

/** Parses an HL7 DFT^P03 (HL7 v2.4) message string into a structured result. */
export function parseDFT_P03(messageString: string): Result<ParsedDFT_P03> {
  return new DFT_P03_Parser().parse(messageString);
}

/** The COMMON ORDER group of an DFT^P03 (HL7 v2.4) message being built. */
export interface DFTOrderGroup {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest?: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBSERVATION groups. */
  observations?: DFTObservationGroup[];
}

/** The OBSERVATION group of an DFT^P03 (HL7 v2.4) message being built. */
export interface DFTObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The FINANCIAL group of an DFT^P03 (HL7 v2.4) message being built. */
export interface DFTFinancialGroup {
  /** The FT1 segment. */
  transaction: FT1;
  /** The FINANCIAL PROCEDURE groups. */
  procedures?: DFTProcedureGroup[];
  /** The FINANCIAL COMMON ORDER groups. */
  orders?: DFTFinancialOrderGroup[];
}

/** The FINANCIAL PROCEDURE group of an DFT^P03 (HL7 v2.4) message being built. */
export interface DFTProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The ROL segments. */
  roles?: ROL[];
}

/** The FINANCIAL COMMON ORDER group of an DFT^P03 (HL7 v2.4) message being built. */
export interface DFTFinancialOrderGroup {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest?: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The FINANCIAL OBSERVATION groups. */
  observations?: DFTFinancialObservationGroup[];
}

/** The FINANCIAL OBSERVATION group of an DFT^P03 (HL7 v2.4) message being built. */
export interface DFTFinancialObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The INSURANCE group of an DFT^P03 (HL7 v2.4) message being built. */
export interface DFTInsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segments. */
  insuranceCertifications?: IN3[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The optional segments and groups of an DFT^P03 (HL7 v2.4) message. */
export interface DFT_P03Options {
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
  orders?: DFTOrderGroup[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: DFTInsuranceGroup[];
  /** The ACC segment. */
  accident?: ACC;
}

/** Builder for HL7 DFT^P03 (HL7 v2.4) messages. */
export class DFT_P03<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DFT_P03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = DFT_P03_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public financials: DFTFinancialGroup[],
    public options: DFT_P03Options = {},
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

/** Builds an HL7 DFT^P03 (HL7 v2.4) message. */
export function createDFT_P03<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  financials: DFTFinancialGroup[],
  options: DFT_P03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): DFT_P03<TMSH, TEVN, TPID> {
  return new DFT_P03(header, event, patient, financials, options, encoding);
}
