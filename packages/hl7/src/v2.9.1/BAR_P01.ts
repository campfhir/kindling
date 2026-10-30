/**
 * Builder, parser and structure for BAR^P01 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ROL}] { VISIT: PV1 [PV2] [{PRT}] [{ROL}] [{DB1}] [{OBX}] [{PRT}] [{AL1}] [{ DIAGNOSIS: DG1 }] [DRG] [{ PROCEDURE: PR1 [{PRT}] [{ROL}] }] [{GT1}] [{GSP}] [{GSR}] [{NK1}] [{GSP}] [{GSR}] [{ INSURANCE: IN1 [{GSP}] [{GSR}] [IN2] [{IN3}] [{PRT}] [{ROL}] }] [ACC] [UB1] [UB2] }
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
import { PD1 } from "./PD1.ts";
import { GSP } from "./GSP.ts";
import { GSR } from "./GSR.ts";
import { GSC } from "./GSC.ts";
import { PRT } from "./PRT.ts";
import { ROL } from "./ROL.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { DB1 } from "./DB1.ts";
import { OBX } from "./OBX.ts";
import { AL1 } from "./AL1.ts";
import { DG1 } from "./DG1.ts";
import { DRG } from "./DRG.ts";
import { PR1 } from "./PR1.ts";
import { GT1 } from "./GT1.ts";
import { NK1 } from "./NK1.ts";
import { IN1 } from "./IN1.ts";
import { IN2 } from "./IN2.ts";
import { IN3 } from "./IN3.ts";
import { ACC } from "./ACC.ts";
import { UB1 } from "./UB1.ts";
import { UB2 } from "./UB2.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of BAR^P01 (HL7 v2.9.1), in order. */
export const BAR_P01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "GSP", required: false, repeating: true },
  { name: "GSR", required: false, repeating: true },
  { name: "GSC", required: false, repeating: true },
  { name: "PRT", required: false, repeating: true },
  { name: "ROL", required: false, repeating: true },
  {
    name: "VISIT",
    required: true,
    repeating: true,
    segments: [
      { name: "PV1", required: true, repeating: false },
      { name: "PV2", required: false, repeating: false },
      { name: "PRT", required: false, repeating: true },
      { name: "ROL", required: false, repeating: true },
      { name: "DB1", required: false, repeating: true },
      { name: "OBX", required: false, repeating: true },
      { name: "PRT", required: false, repeating: true, as: "prt2" },
      { name: "AL1", required: false, repeating: true },
      {
        name: "DIAGNOSIS",
        required: false,
        repeating: true,
        segments: [
          { name: "DG1", required: true, repeating: false },
        ],
      },
      { name: "DRG", required: false, repeating: false },
      {
        name: "PROCEDURE",
        required: false,
        repeating: true,
        segments: [
          { name: "PR1", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "ROL", required: false, repeating: true },
        ],
      },
      { name: "GT1", required: false, repeating: true },
      { name: "GSP", required: false, repeating: true },
      { name: "GSR", required: false, repeating: true },
      { name: "NK1", required: false, repeating: true },
      { name: "GSP", required: false, repeating: true, as: "gsp2" },
      { name: "GSR", required: false, repeating: true, as: "gsr2" },
      {
        name: "INSURANCE",
        required: false,
        repeating: true,
        segments: [
          { name: "IN1", required: true, repeating: false },
          { name: "GSP", required: false, repeating: true },
          { name: "GSR", required: false, repeating: true },
          { name: "IN2", required: false, repeating: false },
          { name: "IN3", required: false, repeating: true },
          { name: "PRT", required: false, repeating: true },
          { name: "ROL", required: false, repeating: true },
        ],
      },
      { name: "ACC", required: false, repeating: false },
      { name: "UB1", required: false, repeating: false },
      { name: "UB2", required: false, repeating: false },
    ],
  },
];

/** The VISIT group of a parsed BAR^P01 (HL7 v2.9.1) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The OBX segments. */
  observations?: OBX[];
  /** The PRT segments. */
  prt2?: PRT[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The DIAGNOSIS groups. */
  diagnosis?: ParsedDiagnosis[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The PROCEDURE groups. */
  procedures?: ParsedProcedure[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GSP segments. */
  gsp2?: GSP[];
  /** The GSR segments. */
  gsr2?: GSR[];
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The ACC segment. */
  accident?: ACC;
  /** The UB1 segment. */
  ub82?: UB1;
  /** The UB2 segment. */
  ub92?: UB2;
}

/** The DIAGNOSIS group of a parsed BAR^P01 (HL7 v2.9.1) message. */
export interface ParsedDiagnosis {
  /** The DG1 segment. */
  diagnosis: DG1;
}

/** The PROCEDURE group of a parsed BAR^P01 (HL7 v2.9.1) message. */
export interface ParsedProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The INSURANCE group of a parsed BAR^P01 (HL7 v2.9.1) message. */
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

/** Structured result of parsing an HL7 BAR^P01 (HL7 v2.9.1) message. */
export interface ParsedBAR_P01 extends ParsedMessageBase {
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
  /** The VISIT groups. */
  visits: ParsedVisit[];
}

/** The segment parsers of BAR^P01 (HL7 v2.9.1). */
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
};

/** Parser for HL7 BAR^P01 (HL7 v2.9.1) messages. */
export class BAR_P01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = BAR_P01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBAR_P01> {
    return parseStructure<ParsedBAR_P01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 BAR^P01 (HL7 v2.9.1) message string into a structured result. */
export function parseBAR_P01(messageString: string): Result<ParsedBAR_P01> {
  return new BAR_P01_Parser().parse(messageString);
}

/** The VISIT group of an BAR^P01 (HL7 v2.9.1) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The OBX segments. */
  observations?: OBX[];
  /** The PRT segments. */
  prt2?: PRT[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The DIAGNOSIS groups. */
  diagnosis?: DiagnosisGroup[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The PROCEDURE groups. */
  procedures?: ProcedureGroup[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GSP segments. */
  gsp2?: GSP[];
  /** The GSR segments. */
  gsr2?: GSR[];
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The ACC segment. */
  accident?: ACC;
  /** The UB1 segment. */
  ub82?: UB1;
  /** The UB2 segment. */
  ub92?: UB2;
}

/** The DIAGNOSIS group of an BAR^P01 (HL7 v2.9.1) message being built. */
export interface DiagnosisGroup {
  /** The DG1 segment. */
  diagnosis: DG1;
}

/** The PROCEDURE group of an BAR^P01 (HL7 v2.9.1) message being built. */
export interface ProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The INSURANCE group of an BAR^P01 (HL7 v2.9.1) message being built. */
export interface InsuranceGroup {
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

/** The optional segments and groups of an BAR^P01 (HL7 v2.9.1) message. */
export interface BAR_P01Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
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
}

/** Builder for HL7 BAR^P01 (HL7 v2.9.1) messages. */
export class BAR_P01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = BAR_P01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public visits: VisitGroup[],
    public options: BAR_P01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, visits: this.visits };
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

/** Builds an HL7 BAR^P01 (HL7 v2.9.1) message. */
export function createBAR_P01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visits: VisitGroup[],
  options: BAR_P01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BAR_P01<TMSH, TEVN, TPID> {
  return new BAR_P01(header, event, patient, visits, options, encoding);
}
