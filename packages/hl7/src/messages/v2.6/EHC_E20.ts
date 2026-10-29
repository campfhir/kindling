/**
 * Builder, parser and structure for EHC^E20 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}]  AUTHORIZATION_REQUEST: IVC {CTD} [{LOC}] [{ROL}] { PAT_INFO: PID [{ACC}] { INSURANCE: IN1 [IN2] } [{ DIAGNOSIS: DG1 [{NTE}] }] [{OBX}] } { PSL_ITEM_INFO: PSL [{NTE}] [{ADJ}] [{LOC}] [{ROL}] } 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { IVC } from "../../segments/v2.6/IVC.ts";
import { CTD } from "../../segments/v2.6/CTD.ts";
import { LOC } from "../../segments/v2.6/LOC.ts";
import { ROL } from "../../segments/v2.6/ROL.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { ACC } from "../../segments/v2.6/ACC.ts";
import { IN1 } from "../../segments/v2.6/IN1.ts";
import { IN2 } from "../../segments/v2.6/IN2.ts";
import { DG1 } from "../../segments/v2.6/DG1.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";
import { OBX } from "../../segments/v2.6/OBX.ts";
import { PSL } from "../../segments/v2.6/PSL.ts";
import { ADJ } from "../../segments/v2.6/ADJ.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of EHC^E20 (HL7 v2.6), in order. */
export const EHC_E20_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  {
    name: "AUTHORIZATION_REQUEST",
    required: true,
    repeating: false,
    segments: [
      { name: "IVC", required: true, repeating: false },
      { name: "CTD", required: true, repeating: true },
      { name: "LOC", required: false, repeating: true },
      { name: "ROL", required: false, repeating: true },
      {
        name: "PAT_INFO",
        required: true,
        repeating: true,
        segments: [
          { name: "PID", required: true, repeating: false },
          { name: "ACC", required: false, repeating: true },
          {
            name: "INSURANCE",
            required: true,
            repeating: true,
            segments: [
              { name: "IN1", required: true, repeating: false },
              { name: "IN2", required: false, repeating: false },
            ],
          },
          {
            name: "DIAGNOSIS",
            required: false,
            repeating: true,
            segments: [
              { name: "DG1", required: true, repeating: false },
              { name: "NTE", required: false, repeating: true },
            ],
          },
          { name: "OBX", required: false, repeating: true },
        ],
      },
      {
        name: "PSL_ITEM_INFO",
        required: true,
        repeating: true,
        segments: [
          { name: "PSL", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
          { name: "ADJ", required: false, repeating: true },
          { name: "LOC", required: false, repeating: true },
          { name: "ROL", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The AUTHORIZATION REQUEST group of a parsed EHC^E20 (HL7 v2.6) message. */
export interface ParsedAuthorizationRequest {
  /** The IVC segment. */
  ivc: IVC;
  /** The CTD segments. */
  contacts: CTD[];
  /** The LOC segments. */
  patientLocations?: LOC[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The PAT INFO groups. */
  patInfos: ParsedPatInfo[];
  /** The PSL ITEM INFO groups. */
  pslItemInfos: ParsedPslItemInfo[];
}

/** The PAT INFO group of a parsed EHC^E20 (HL7 v2.6) message. */
export interface ParsedPatInfo {
  /** The PID segment. */
  patient: PID;
  /** The ACC segments. */
  accidents?: ACC[];
  /** The INSURANCE groups. */
  insurances: ParsedInsurance[];
  /** The DIAGNOSIS groups. */
  diagnosis?: ParsedDiagnosis[];
  /** The OBX segments. */
  observations?: OBX[];
}

/** The INSURANCE group of a parsed EHC^E20 (HL7 v2.6) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
}

/** The DIAGNOSIS group of a parsed EHC^E20 (HL7 v2.6) message. */
export interface ParsedDiagnosis {
  /** The DG1 segment. */
  diagnosis: DG1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PSL ITEM INFO group of a parsed EHC^E20 (HL7 v2.6) message. */
export interface ParsedPslItemInfo {
  /** The PSL segment. */
  psl: PSL;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ADJ segments. */
  adjList?: ADJ[];
  /** The LOC segments. */
  patientLocations?: LOC[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** Structured result of parsing an HL7 EHC^E20 (HL7 v2.6) message. */
export interface ParsedEHC_E20 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The AUTHORIZATION REQUEST group. */
  authorizationRequest: ParsedAuthorizationRequest;
}

/** The segment parsers of EHC^E20 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  IVC: (s, e) => IVC.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  LOC: (s, e) => LOC.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ACC: (s, e) => ACC.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  PSL: (s, e) => PSL.parse(s, e),
  ADJ: (s, e) => ADJ.parse(s, e),
};

/** Parser for HL7 EHC^E20 (HL7 v2.6) messages. */
export class EHC_E20_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E20";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EHC_E20_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEHC_E20> {
    return parseStructure<ParsedEHC_E20>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EHC^E20 (HL7 v2.6) message string into a structured result. */
export function parseEHC_E20(messageString: string): Result<ParsedEHC_E20> {
  return new EHC_E20_Parser().parse(messageString);
}

/** The AUTHORIZATION REQUEST group of an EHC^E20 (HL7 v2.6) message being built. */
export interface AuthorizationRequestGroup {
  /** The IVC segment. */
  ivc: IVC;
  /** The CTD segments. */
  contacts: CTD[];
  /** The LOC segments. */
  patientLocations?: LOC[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The PAT INFO groups. */
  patInfos: PatInfoGroup[];
  /** The PSL ITEM INFO groups. */
  pslItemInfos: PslItemInfoGroup[];
}

/** The PAT INFO group of an EHC^E20 (HL7 v2.6) message being built. */
export interface PatInfoGroup {
  /** The PID segment. */
  patient: PID;
  /** The ACC segments. */
  accidents?: ACC[];
  /** The INSURANCE groups. */
  insurances: InsuranceGroup[];
  /** The DIAGNOSIS groups. */
  diagnosis?: DiagnosisGroup[];
  /** The OBX segments. */
  observations?: OBX[];
}

/** The INSURANCE group of an EHC^E20 (HL7 v2.6) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
}

/** The DIAGNOSIS group of an EHC^E20 (HL7 v2.6) message being built. */
export interface DiagnosisGroup {
  /** The DG1 segment. */
  diagnosis: DG1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PSL ITEM INFO group of an EHC^E20 (HL7 v2.6) message being built. */
export interface PslItemInfoGroup {
  /** The PSL segment. */
  psl: PSL;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ADJ segments. */
  adjList?: ADJ[];
  /** The LOC segments. */
  patientLocations?: LOC[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The optional segments and groups of an EHC^E20 (HL7 v2.6) message. */
export interface EHC_E20Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
}

/** Builder for HL7 EHC^E20 (HL7 v2.6) messages. */
export class EHC_E20<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E20";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EHC_E20_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public authorizationRequest: AuthorizationRequestGroup,
    public options: EHC_E20Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, authorizationRequest: this.authorizationRequest };
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

/** Builds an HL7 EHC^E20 (HL7 v2.6) message. */
export function createEHC_E20<TMSH extends MSH = MSH>(
  header: TMSH,
  authorizationRequest: AuthorizationRequestGroup,
  options: EHC_E20Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EHC_E20<TMSH> {
  return new EHC_E20(header, authorizationRequest, options, encoding);
}
