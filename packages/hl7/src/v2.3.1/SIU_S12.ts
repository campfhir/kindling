/**
 * Builder, parser and structure for SIU^S12 messages (HL7 v2.3.1).
 *
 * Structure: MSH SCH [{NTE}] [{ PATIENT: PID [PD1] [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SCH } from "./SCH.ts";
import { NTE } from "./NTE.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
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

/** The segments, choices and groups of SIU^S12 (HL7 v2.3.1), in order. */
export const SIU_S12_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SCH", required: true, repeating: false },
  { name: "NTE", required: false, repeating: true },
  {
    name: "PATIENT",
    required: false,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "PV1", required: false, repeating: false },
      { name: "PV2", required: false, repeating: false },
      { name: "OBX", required: false, repeating: true },
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
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "GENERAL_RESOURCE",
        required: false,
        repeating: true,
        segments: [
          { name: "AIG", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "LOCATION_RESOURCE",
        required: false,
        repeating: true,
        segments: [
          { name: "AIL", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "PERSONNEL_RESOURCE",
        required: false,
        repeating: true,
        segments: [
          { name: "AIP", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The PATIENT group of a parsed SIU^S12 (HL7 v2.3.1) message. */
export interface ParsedSIUPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The OBX segments. */
  observations?: OBX[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
}

/** The RESOURCES group of a parsed SIU^S12 (HL7 v2.3.1) message. */
export interface ParsedSIUResources {
  /** The RGS segment. */
  resourceGroup: RGS;
  /** The SERVICE groups. */
  services?: ParsedSIUService[];
  /** The GENERAL RESOURCE groups. */
  generalResources?: ParsedSIUGeneralResource[];
  /** The LOCATION RESOURCE groups. */
  locationResources?: ParsedSIULocationResource[];
  /** The PERSONNEL RESOURCE groups. */
  personnelResources?: ParsedSIUPersonnelResource[];
}

/** The SERVICE group of a parsed SIU^S12 (HL7 v2.3.1) message. */
export interface ParsedSIUService {
  /** The AIS segment. */
  service: AIS;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GENERAL RESOURCE group of a parsed SIU^S12 (HL7 v2.3.1) message. */
export interface ParsedSIUGeneralResource {
  /** The AIG segment. */
  generalResource: AIG;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The LOCATION RESOURCE group of a parsed SIU^S12 (HL7 v2.3.1) message. */
export interface ParsedSIULocationResource {
  /** The AIL segment. */
  location: AIL;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PERSONNEL RESOURCE group of a parsed SIU^S12 (HL7 v2.3.1) message. */
export interface ParsedSIUPersonnelResource {
  /** The AIP segment. */
  personnel: AIP;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 SIU^S12 (HL7 v2.3.1) message. */
export interface ParsedSIU_S12 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SCH segment. */
  appointment: SCH;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT groups. */
  patients?: ParsedSIUPatient[];
  /** The RESOURCES groups. */
  resources: ParsedSIUResources[];
}

/** The segment parsers of SIU^S12 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SCH: (s, e) => SCH.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
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

/** Parser for HL7 SIU^S12 (HL7 v2.3.1) messages. */
export class SIU_S12_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SIU_S12";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SIU_S12_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSIU_S12> {
    return parseStructure<ParsedSIU_S12>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SIU^S12 (HL7 v2.3.1) message string into a structured result. */
export function parseSIU_S12(messageString: string): Result<ParsedSIU_S12> {
  return new SIU_S12_Parser().parse(messageString);
}

/** The PATIENT group of an SIU^S12 (HL7 v2.3.1) message being built. */
export interface SIUPatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The OBX segments. */
  observations?: OBX[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
}

/** The RESOURCES group of an SIU^S12 (HL7 v2.3.1) message being built. */
export interface SIUResourcesGroup {
  /** The RGS segment. */
  resourceGroup: RGS;
  /** The SERVICE groups. */
  services?: SIUServiceGroup[];
  /** The GENERAL RESOURCE groups. */
  generalResources?: SIUGeneralResourceGroup[];
  /** The LOCATION RESOURCE groups. */
  locationResources?: SIULocationResourceGroup[];
  /** The PERSONNEL RESOURCE groups. */
  personnelResources?: SIUPersonnelResourceGroup[];
}

/** The SERVICE group of an SIU^S12 (HL7 v2.3.1) message being built. */
export interface SIUServiceGroup {
  /** The AIS segment. */
  service: AIS;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GENERAL RESOURCE group of an SIU^S12 (HL7 v2.3.1) message being built. */
export interface SIUGeneralResourceGroup {
  /** The AIG segment. */
  generalResource: AIG;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The LOCATION RESOURCE group of an SIU^S12 (HL7 v2.3.1) message being built. */
export interface SIULocationResourceGroup {
  /** The AIL segment. */
  location: AIL;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PERSONNEL RESOURCE group of an SIU^S12 (HL7 v2.3.1) message being built. */
export interface SIUPersonnelResourceGroup {
  /** The AIP segment. */
  personnel: AIP;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an SIU^S12 (HL7 v2.3.1) message. */
export interface SIU_S12Options {
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT groups. */
  patients?: SIUPatientGroup[];
}

/** Builder for HL7 SIU^S12 (HL7 v2.3.1) messages. */
export class SIU_S12<TMSH extends MSH = MSH, TSCH extends SCH = SCH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SIU_S12";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SIU_S12_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public appointment: TSCH,
    public resources: SIUResourcesGroup[],
    public options: SIU_S12Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, appointment: this.appointment, resources: this.resources };
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

/** Builds an HL7 SIU^S12 (HL7 v2.3.1) message. */
export function createSIU_S12<TMSH extends MSH = MSH, TSCH extends SCH = SCH>(
  header: TMSH,
  appointment: TSCH,
  resources: SIUResourcesGroup[],
  options: SIU_S12Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SIU_S12<TMSH, TSCH> {
  return new SIU_S12(header, appointment, resources, options, encoding);
}
