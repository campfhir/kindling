/**
 * Builder, parser and structure for ADT^A01 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{OH1}] [{OH2}] [OH3] [{OH4}] [{ARV}] [{ROL}] [{PRT}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] [{OH2}] [OH3] }] PV1 [PV2] [{ARV}] [{ROL}] [{PRT}] [{DB1}] [{ OBSERVATION: OBX [{PRT}] }] [{AL1}] [{IAM}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] [{PRT}] }] [{ GUARANTOR: GT1 [{GSP}] [{GSR}] }] [{ INSURANCE: IN1 [IN2] [{IN3}] [{GSP}] [{GSR}] [{ROL}] [{PRT}] [{ AUTHORIZATION: AUT [{PRT}] }] [{ REFERRAL: RF1 [{PRT}] }] }] [ACC] [UB1] [UB2] [PDA]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { ARV } from "./ARV.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { EVN } from "./EVN.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { GSP } from "./GSP.ts";
import { GSR } from "./GSR.ts";
import { GSC } from "./GSC.ts";
import { OH1 } from "./OH1.ts";
import { OH2 } from "./OH2.ts";
import { OH3 } from "./OH3.ts";
import { OH4 } from "./OH4.ts";
import { ROL } from "./ROL.ts";
import { PRT } from "./PRT.ts";
import { NK1 } from "./NK1.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { DB1 } from "./DB1.ts";
import { OBX } from "./OBX.ts";
import { AL1 } from "./AL1.ts";
import { IAM } from "./IAM.ts";
import { DG1 } from "./DG1.ts";
import { DRG } from "./DRG.ts";
import { PR1 } from "./PR1.ts";
import { GT1 } from "./GT1.ts";
import { IN1 } from "./IN1.ts";
import { IN2 } from "./IN2.ts";
import { IN3 } from "./IN3.ts";
import { AUT } from "./AUT.ts";
import { RF1 } from "./RF1.ts";
import { ACC } from "./ACC.ts";
import { UB1 } from "./UB1.ts";
import { UB2 } from "./UB2.ts";
import { PDA } from "./PDA.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ADT^A01 (HL7 v2.9.1), in order. */
export const ADT_A01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "GSP", required: false, repeating: true },
  { name: "GSR", required: false, repeating: true },
  { name: "GSC", required: false, repeating: true },
  { name: "OH1", required: false, repeating: true },
  { name: "OH2", required: false, repeating: true },
  { name: "OH3", required: false, repeating: false },
  { name: "OH4", required: false, repeating: true },
  { name: "ARV", required: false, repeating: true, as: "arv2" },
  { name: "ROL", required: false, repeating: true },
  { name: "PRT", required: false, repeating: true },
  {
    name: "NEXT_OF_KIN",
    required: false,
    repeating: true,
    segments: [
      { name: "NK1", required: true, repeating: false },
      { name: "GSP", required: false, repeating: true },
      { name: "GSR", required: false, repeating: true },
      { name: "OH2", required: false, repeating: true },
      { name: "OH3", required: false, repeating: false },
    ],
  },
  { name: "PV1", required: true, repeating: false },
  { name: "PV2", required: false, repeating: false },
  { name: "ARV", required: false, repeating: true, as: "arv3" },
  { name: "ROL", required: false, repeating: true, as: "rol2" },
  { name: "PRT", required: false, repeating: true, as: "prt2" },
  { name: "DB1", required: false, repeating: true },
  {
    name: "OBSERVATION",
    required: false,
    repeating: true,
    segments: [
      { name: "OBX", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
    ],
  },
  { name: "AL1", required: false, repeating: true },
  { name: "IAM", required: false, repeating: true },
  { name: "DG1", required: false, repeating: true },
  { name: "DRG", required: false, repeating: false },
  {
    name: "PROCEDURE",
    required: false,
    repeating: true,
    segments: [
      { name: "PR1", required: true, repeating: false },
      { name: "ROL", required: false, repeating: true },
      { name: "PRT", required: false, repeating: true },
    ],
  },
  {
    name: "GUARANTOR",
    required: false,
    repeating: true,
    segments: [
      { name: "GT1", required: true, repeating: false },
      { name: "GSP", required: false, repeating: true },
      { name: "GSR", required: false, repeating: true },
    ],
  },
  {
    name: "INSURANCE",
    required: false,
    repeating: true,
    segments: [
      { name: "IN1", required: true, repeating: false },
      { name: "IN2", required: false, repeating: false },
      { name: "IN3", required: false, repeating: true },
      { name: "GSP", required: false, repeating: true },
      { name: "GSR", required: false, repeating: true },
      { name: "ROL", required: false, repeating: true },
      { name: "PRT", required: false, repeating: true },
      {
        name: "AUTHORIZATION",
        required: false,
        repeating: true,
        segments: [
          { name: "AUT", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
        ],
      },
      {
        name: "REFERRAL",
        required: false,
        repeating: true,
        segments: [
          { name: "RF1", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
        ],
      },
    ],
  },
  { name: "ACC", required: false, repeating: false },
  { name: "UB1", required: false, repeating: false },
  { name: "UB2", required: false, repeating: false },
  { name: "PDA", required: false, repeating: false },
];

/** The NEXT OF KIN group of a parsed ADT^A01 (HL7 v2.9.1) message. */
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

/** The OBSERVATION group of a parsed ADT^A01 (HL7 v2.9.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PROCEDURE group of a parsed ADT^A01 (HL7 v2.9.1) message. */
export interface ParsedProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The ROL segments. */
  roles?: ROL[];
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The GUARANTOR group of a parsed ADT^A01 (HL7 v2.9.1) message. */
export interface ParsedGuarantor {
  /** The GT1 segment. */
  guarantor: GT1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
}

/** The INSURANCE group of a parsed ADT^A01 (HL7 v2.9.1) message. */
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

/** The AUTHORIZATION group of a parsed ADT^A01 (HL7 v2.9.1) message. */
export interface ParsedAuthorization {
  /** The AUT segment. */
  authorization: AUT;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The REFERRAL group of a parsed ADT^A01 (HL7 v2.9.1) message. */
export interface ParsedReferral {
  /** The RF1 segment. */
  referral: RF1;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** Structured result of parsing an HL7 ADT^A01 (HL7 v2.9.1) message. */
export interface ParsedADT_A01 extends ParsedMessageBase {
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
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
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
  /** The GUARANTOR groups. */
  guarantors?: ParsedGuarantor[];
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The ACC segment. */
  accident?: ACC;
  /** The UB1 segment. */
  ub82?: UB1;
  /** The UB2 segment. */
  ub92?: UB2;
  /** The PDA segment. */
  deathAndAutopsy?: PDA;
}

/** The segment parsers of ADT^A01 (HL7 v2.9.1). */
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
  OBX: (s, e) => OBX.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  IAM: (s, e) => IAM.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  DRG: (s, e) => DRG.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  AUT: (s, e) => AUT.parse(s, e),
  RF1: (s, e) => RF1.parse(s, e),
  ACC: (s, e) => ACC.parse(s, e),
  UB1: (s, e) => UB1.parse(s, e),
  UB2: (s, e) => UB2.parse(s, e),
  PDA: (s, e) => PDA.parse(s, e),
};

/** Parser for HL7 ADT^A01 (HL7 v2.9.1) messages. */
export class ADT_A01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A01> {
    return parseStructure<ParsedADT_A01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A01 (HL7 v2.9.1) message string into a structured result. */
export function parseADT_A01(messageString: string): Result<ParsedADT_A01> {
  return new ADT_A01_Parser().parse(messageString);
}

/** The NEXT OF KIN group of an ADT^A01 (HL7 v2.9.1) message being built. */
export interface NextOfKinGroup {
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

/** The OBSERVATION group of an ADT^A01 (HL7 v2.9.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PROCEDURE group of an ADT^A01 (HL7 v2.9.1) message being built. */
export interface ProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The ROL segments. */
  roles?: ROL[];
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The GUARANTOR group of an ADT^A01 (HL7 v2.9.1) message being built. */
export interface GuarantorGroup {
  /** The GT1 segment. */
  guarantor: GT1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
}

/** The INSURANCE group of an ADT^A01 (HL7 v2.9.1) message being built. */
export interface InsuranceGroup {
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
  authorizations?: AuthorizationGroup[];
  /** The REFERRAL groups. */
  referrals?: ReferralGroup[];
}

/** The AUTHORIZATION group of an ADT^A01 (HL7 v2.9.1) message being built. */
export interface AuthorizationGroup {
  /** The AUT segment. */
  authorization: AUT;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The REFERRAL group of an ADT^A01 (HL7 v2.9.1) message being built. */
export interface ReferralGroup {
  /** The RF1 segment. */
  referral: RF1;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The optional segments and groups of an ADT^A01 (HL7 v2.9.1) message. */
export interface ADT_A01Options {
  /** The ARV segments. */
  arvList?: ARV[];
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
  nextOfKins?: NextOfKinGroup[];
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
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The IAM segments. */
  adverseReactions?: IAM[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The PROCEDURE groups. */
  procedures?: ProcedureGroup[];
  /** The GUARANTOR groups. */
  guarantors?: GuarantorGroup[];
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The ACC segment. */
  accident?: ACC;
  /** The UB1 segment. */
  ub82?: UB1;
  /** The UB2 segment. */
  ub92?: UB2;
  /** The PDA segment. */
  deathAndAutopsy?: PDA;
}

/** Builder for HL7 ADT^A01 (HL7 v2.9.1) messages. */
export class ADT_A01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public visit: TPV1,
    public options: ADT_A01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, visit: this.visit };
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

/** Builds an HL7 ADT^A01 (HL7 v2.9.1) message. */
export function createADT_A01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A01<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A01(header, event, patient, visit, options, encoding);
}
