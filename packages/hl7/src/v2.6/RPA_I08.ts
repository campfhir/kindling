/**
 * Builder, parser and structure for RPA^I08 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [{DG1}] [{DRG}] [{AL1}] { PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] } [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [ VISIT: PV1 [PV2] ] [{NTE}]
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
import { MSA } from "./MSA.ts";
import { RF1 } from "./RF1.ts";
import { AUT } from "./AUT.ts";
import { CTD } from "./CTD.ts";
import { PRD } from "./PRD.ts";
import { PID } from "./PID.ts";
import { NK1 } from "./NK1.ts";
import { GT1 } from "./GT1.ts";
import { IN1 } from "./IN1.ts";
import { IN2 } from "./IN2.ts";
import { IN3 } from "./IN3.ts";
import { ACC } from "./ACC.ts";
import { DG1 } from "./DG1.ts";
import { DRG } from "./DRG.ts";
import { AL1 } from "./AL1.ts";
import { PR1 } from "./PR1.ts";
import { OBR } from "./OBR.ts";
import { NTE } from "./NTE.ts";
import { OBX } from "./OBX.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RPA^I08 (HL7 v2.6), in order. */
export const RPA_I08_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "RF1", required: false, repeating: false },
  {
    name: "AUTHORIZATION",
    required: false,
    repeating: false,
    segments: [
      { name: "AUT", required: true, repeating: false },
      { name: "CTD", required: false, repeating: false },
    ],
  },
  {
    name: "PROVIDER",
    required: true,
    repeating: true,
    segments: [
      { name: "PRD", required: true, repeating: false },
      { name: "CTD", required: false, repeating: true },
    ],
  },
  { name: "PID", required: true, repeating: false },
  { name: "NK1", required: false, repeating: true },
  { name: "GT1", required: false, repeating: true },
  {
    name: "INSURANCE",
    required: false,
    repeating: true,
    segments: [
      { name: "IN1", required: true, repeating: false },
      { name: "IN2", required: false, repeating: false },
      { name: "IN3", required: false, repeating: false },
    ],
  },
  { name: "ACC", required: false, repeating: false },
  { name: "DG1", required: false, repeating: true },
  { name: "DRG", required: false, repeating: true },
  { name: "AL1", required: false, repeating: true },
  {
    name: "PROCEDURE",
    required: true,
    repeating: true,
    segments: [
      { name: "PR1", required: true, repeating: false },
      {
        name: "AUTHORIZATION",
        required: false,
        repeating: false,
        segments: [
          { name: "AUT", required: true, repeating: false },
          { name: "CTD", required: false, repeating: false },
        ],
      },
    ],
  },
  {
    name: "OBSERVATION",
    required: false,
    repeating: true,
    segments: [
      { name: "OBR", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      {
        name: "RESULTS",
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
    name: "VISIT",
    required: false,
    repeating: false,
    segments: [
      { name: "PV1", required: true, repeating: false },
      { name: "PV2", required: false, repeating: false },
    ],
  },
  { name: "NTE", required: false, repeating: true },
];

/** The AUTHORIZATION group of a parsed RPA^I08 (HL7 v2.6) message. */
export interface ParsedAuthorization1 {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The PROVIDER group of a parsed RPA^I08 (HL7 v2.6) message. */
export interface ParsedProvider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The INSURANCE group of a parsed RPA^I08 (HL7 v2.6) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The PROCEDURE group of a parsed RPA^I08 (HL7 v2.6) message. */
export interface ParsedProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The AUTHORIZATION group. */
  authorization?: ParsedAuthorization2;
}

/** The AUTHORIZATION group of a parsed RPA^I08 (HL7 v2.6) message. */
export interface ParsedAuthorization2 {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The OBSERVATION group of a parsed RPA^I08 (HL7 v2.6) message. */
export interface ParsedObservation {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESULTS groups. */
  results?: ParsedResults[];
}

/** The RESULTS group of a parsed RPA^I08 (HL7 v2.6) message. */
export interface ParsedResults {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The VISIT group of a parsed RPA^I08 (HL7 v2.6) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** Structured result of parsing an HL7 RPA^I08 (HL7 v2.6) message. */
export interface ParsedRPA_I08 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The RF1 segment. */
  referral?: RF1;
  /** The AUTHORIZATION group. */
  authorization?: ParsedAuthorization1;
  /** The PROVIDER groups. */
  providers: ParsedProvider[];
  /** The PID segment. */
  patient: PID;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The ACC segment. */
  accident?: ACC;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segments. */
  diagnosisRelatedGroups?: DRG[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PROCEDURE groups. */
  procedures: ParsedProcedure[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The VISIT group. */
  visit?: ParsedVisit;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The segment parsers of RPA^I08 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  RF1: (s, e) => RF1.parse(s, e),
  AUT: (s, e) => AUT.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  ACC: (s, e) => ACC.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  DRG: (s, e) => DRG.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
};

/** Parser for HL7 RPA^I08 (HL7 v2.6) messages. */
export class RPA_I08_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RPA_I08";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RPA_I08_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRPA_I08> {
    return parseStructure<ParsedRPA_I08>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RPA^I08 (HL7 v2.6) message string into a structured result. */
export function parseRPA_I08(messageString: string): Result<ParsedRPA_I08> {
  return new RPA_I08_Parser().parse(messageString);
}

/** The AUTHORIZATION group of an RPA^I08 (HL7 v2.6) message being built. */
export interface Authorization1Group {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The PROVIDER group of an RPA^I08 (HL7 v2.6) message being built. */
export interface ProviderGroup {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The INSURANCE group of an RPA^I08 (HL7 v2.6) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The PROCEDURE group of an RPA^I08 (HL7 v2.6) message being built. */
export interface ProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The AUTHORIZATION group. */
  authorization?: Authorization2Group;
}

/** The AUTHORIZATION group of an RPA^I08 (HL7 v2.6) message being built. */
export interface Authorization2Group {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The OBSERVATION group of an RPA^I08 (HL7 v2.6) message being built. */
export interface ObservationGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESULTS groups. */
  results?: ResultsGroup[];
}

/** The RESULTS group of an RPA^I08 (HL7 v2.6) message being built. */
export interface ResultsGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The VISIT group of an RPA^I08 (HL7 v2.6) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The optional segments and groups of an RPA^I08 (HL7 v2.6) message. */
export interface RPA_I08Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The RF1 segment. */
  referral?: RF1;
  /** The AUTHORIZATION group. */
  authorization?: Authorization1Group;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The ACC segment. */
  accident?: ACC;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segments. */
  diagnosisRelatedGroups?: DRG[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The VISIT group. */
  visit?: VisitGroup;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Builder for HL7 RPA^I08 (HL7 v2.6) messages. */
export class RPA_I08<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RPA_I08";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RPA_I08_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public providers: ProviderGroup[],
    public patient: TPID,
    public procedures: ProcedureGroup[],
    public options: RPA_I08Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, providers: this.providers, patient: this.patient, procedures: this.procedures };
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

/** Builds an HL7 RPA^I08 (HL7 v2.6) message. */
export function createRPA_I08<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TPID extends PID = PID>(
  header: TMSH,
  acknowledgment: TMSA,
  providers: ProviderGroup[],
  patient: TPID,
  procedures: ProcedureGroup[],
  options: RPA_I08Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RPA_I08<TMSH, TMSA, TPID> {
  return new RPA_I08(header, acknowledgment, providers, patient, procedures, options, encoding);
}
