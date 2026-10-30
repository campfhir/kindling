/**
 * Builder, parser and structure for SRM^S01 messages (HL7 v2.9.1).
 *
 * Structure: MSH ARQ [APR] [{NTE}] [{ PATIENT: PID [{GSP}] [{GSR}] [{GSC}] [{PRT}] PV1 [PV2] [{PRT}] [{ OBSERVATION: OBX [{PRT}] }] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [APR] [{NTE}] }] [{ GENERAL_RESOURCE: AIG [APR] [{NTE}] }] [{ LOCATION_RESOURCE: AIL [APR] [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [APR] [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { ARQ } from "./ARQ.ts";
import { APR } from "./APR.ts";
import { NTE } from "./NTE.ts";
import { PID } from "./PID.ts";
import { GSP } from "./GSP.ts";
import { GSR } from "./GSR.ts";
import { GSC } from "./GSC.ts";
import { PRT } from "./PRT.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { OBX } from "./OBX.ts";
import { DG1 } from "./DG1.ts";
import { RGS } from "./RGS.ts";
import { AIS } from "./AIS.ts";
import { AIG } from "./AIG.ts";
import { AIL } from "./AIL.ts";
import { AIP } from "./AIP.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of SRM^S01 (HL7 v2.9.1), in order. */
export const SRM_S01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ARQ", required: true, repeating: false },
  { name: "APR", required: false, repeating: false },
  { name: "NTE", required: false, repeating: true },
  {
    name: "PATIENT",
    required: false,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "GSP", required: false, repeating: true },
      { name: "GSR", required: false, repeating: true },
      { name: "GSC", required: false, repeating: true },
      { name: "PRT", required: false, repeating: true },
      { name: "PV1", required: true, repeating: false },
      { name: "PV2", required: false, repeating: false },
      { name: "PRT", required: false, repeating: true, as: "prt2" },
      {
        name: "OBSERVATION",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
        ],
      },
      { name: "DG1", required: false, repeating: true },
    ],
  },
  {
    name: "RESOURCES",
    required: true,
    repeating: true,
    segments: [
      { name: "RGS", required: true, repeating: false },
      {
        name: "SERVICE",
        required: false,
        repeating: true,
        segments: [
          { name: "AIS", required: true, repeating: false },
          { name: "APR", required: false, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "GENERAL_RESOURCE",
        required: false,
        repeating: true,
        segments: [
          { name: "AIG", required: true, repeating: false },
          { name: "APR", required: false, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "LOCATION_RESOURCE",
        required: false,
        repeating: true,
        segments: [
          { name: "AIL", required: true, repeating: false },
          { name: "APR", required: false, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "PERSONNEL_RESOURCE",
        required: false,
        repeating: true,
        segments: [
          { name: "AIP", required: true, repeating: false },
          { name: "APR", required: false, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The PATIENT group of a parsed SRM^S01 (HL7 v2.9.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prt2?: PRT[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
}

/** The OBSERVATION group of a parsed SRM^S01 (HL7 v2.9.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The RESOURCES group of a parsed SRM^S01 (HL7 v2.9.1) message. */
export interface ParsedResources {
  /** The RGS segment. */
  resourceGroup: RGS;
  /** The SERVICE groups. */
  services?: ParsedService[];
  /** The GENERAL RESOURCE groups. */
  generalResources?: ParsedGeneralResource[];
  /** The LOCATION RESOURCE groups. */
  locationResources?: ParsedLocationResource[];
  /** The PERSONNEL RESOURCE groups. */
  personnelResources?: ParsedPersonnelResource[];
}

/** The SERVICE group of a parsed SRM^S01 (HL7 v2.9.1) message. */
export interface ParsedService {
  /** The AIS segment. */
  service: AIS;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GENERAL RESOURCE group of a parsed SRM^S01 (HL7 v2.9.1) message. */
export interface ParsedGeneralResource {
  /** The AIG segment. */
  generalResource: AIG;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The LOCATION RESOURCE group of a parsed SRM^S01 (HL7 v2.9.1) message. */
export interface ParsedLocationResource {
  /** The AIL segment. */
  location: AIL;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PERSONNEL RESOURCE group of a parsed SRM^S01 (HL7 v2.9.1) message. */
export interface ParsedPersonnelResource {
  /** The AIP segment. */
  personnel: AIP;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 SRM^S01 (HL7 v2.9.1) message. */
export interface ParsedSRM_S01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The ARQ segment. */
  appointmentRequest: ARQ;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT groups. */
  patients?: ParsedPatient[];
  /** The RESOURCES groups. */
  resources: ParsedResources[];
}

/** The segment parsers of SRM^S01 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  ARQ: (s, e) => ARQ.parse(s, e),
  APR: (s, e) => APR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  GSP: (s, e) => GSP.parse(s, e),
  GSR: (s, e) => GSR.parse(s, e),
  GSC: (s, e) => GSC.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  RGS: (s, e) => RGS.parse(s, e),
  AIS: (s, e) => AIS.parse(s, e),
  AIG: (s, e) => AIG.parse(s, e),
  AIL: (s, e) => AIL.parse(s, e),
  AIP: (s, e) => AIP.parse(s, e),
};

/** Parser for HL7 SRM^S01 (HL7 v2.9.1) messages. */
export class SRM_S01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SRM_S01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SRM_S01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSRM_S01> {
    return parseStructure<ParsedSRM_S01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SRM^S01 (HL7 v2.9.1) message string into a structured result. */
export function parseSRM_S01(messageString: string): Result<ParsedSRM_S01> {
  return new SRM_S01_Parser().parse(messageString);
}

/** The PATIENT group of an SRM^S01 (HL7 v2.9.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prt2?: PRT[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
}

/** The OBSERVATION group of an SRM^S01 (HL7 v2.9.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The RESOURCES group of an SRM^S01 (HL7 v2.9.1) message being built. */
export interface ResourcesGroup {
  /** The RGS segment. */
  resourceGroup: RGS;
  /** The SERVICE groups. */
  services?: ServiceGroup[];
  /** The GENERAL RESOURCE groups. */
  generalResources?: GeneralResourceGroup[];
  /** The LOCATION RESOURCE groups. */
  locationResources?: LocationResourceGroup[];
  /** The PERSONNEL RESOURCE groups. */
  personnelResources?: PersonnelResourceGroup[];
}

/** The SERVICE group of an SRM^S01 (HL7 v2.9.1) message being built. */
export interface ServiceGroup {
  /** The AIS segment. */
  service: AIS;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GENERAL RESOURCE group of an SRM^S01 (HL7 v2.9.1) message being built. */
export interface GeneralResourceGroup {
  /** The AIG segment. */
  generalResource: AIG;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The LOCATION RESOURCE group of an SRM^S01 (HL7 v2.9.1) message being built. */
export interface LocationResourceGroup {
  /** The AIL segment. */
  location: AIL;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PERSONNEL RESOURCE group of an SRM^S01 (HL7 v2.9.1) message being built. */
export interface PersonnelResourceGroup {
  /** The AIP segment. */
  personnel: AIP;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an SRM^S01 (HL7 v2.9.1) message. */
export interface SRM_S01Options {
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT groups. */
  patients?: PatientGroup[];
}

/** Builder for HL7 SRM^S01 (HL7 v2.9.1) messages. */
export class SRM_S01<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SRM_S01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SRM_S01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public appointmentRequest: TARQ,
    public resources: ResourcesGroup[],
    public options: SRM_S01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, appointmentRequest: this.appointmentRequest, resources: this.resources };
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

/** Builds an HL7 SRM^S01 (HL7 v2.9.1) message. */
export function createSRM_S01<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ>(
  header: TMSH,
  appointmentRequest: TARQ,
  resources: ResourcesGroup[],
  options: SRM_S01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRM_S01<TMSH, TARQ> {
  return new SRM_S01(header, appointmentRequest, resources, options, encoding);
}
