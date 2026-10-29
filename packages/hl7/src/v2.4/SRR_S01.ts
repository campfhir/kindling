/**
 * Builder, parser and structure for SRR^S01 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] [ SCHEDULE: SCH [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { ERR } from "./ERR.ts";
import { SCH } from "./SCH.ts";
import { NTE } from "./NTE.ts";
import { PID } from "./PID.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { DG1 } from "./DG1.ts";
import { RGS } from "./RGS.ts";
import { AIS } from "./AIS.ts";
import { AIG } from "./AIG.ts";
import { AIL } from "./AIL.ts";
import { AIP } from "./AIP.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of SRR^S01 (HL7 v2.4), in order. */
export const SRR_S01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  {
    name: "SCHEDULE",
    required: false,
    repeating: false,
    segments: [
      { name: "SCH", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      {
        name: "PATIENT",
        required: false,
        repeating: true,
        segments: [
          { name: "PID", required: true, repeating: false },
          { name: "PV1", required: false, repeating: false },
          { name: "PV2", required: false, repeating: false },
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
    ],
  },
];

/** The SCHEDULE group of a parsed SRR^S01 (HL7 v2.4) message. */
export interface ParsedSRRSchedule {
  /** The SCH segment. */
  appointment: SCH;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT groups. */
  patients?: ParsedSRRPatient[];
  /** The RESOURCES groups. */
  resources: ParsedSRRResources[];
}

/** The PATIENT group of a parsed SRR^S01 (HL7 v2.4) message. */
export interface ParsedSRRPatient {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The DG1 segments. */
  diagnoses?: DG1[];
}

/** The RESOURCES group of a parsed SRR^S01 (HL7 v2.4) message. */
export interface ParsedSRRResources {
  /** The RGS segment. */
  resourceGroup: RGS;
  /** The SERVICE groups. */
  services?: ParsedSRRService[];
  /** The GENERAL RESOURCE groups. */
  generalResources?: ParsedSRRGeneralResource[];
  /** The LOCATION RESOURCE groups. */
  locationResources?: ParsedSRRLocationResource[];
  /** The PERSONNEL RESOURCE groups. */
  personnelResources?: ParsedSRRPersonnelResource[];
}

/** The SERVICE group of a parsed SRR^S01 (HL7 v2.4) message. */
export interface ParsedSRRService {
  /** The AIS segment. */
  service: AIS;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GENERAL RESOURCE group of a parsed SRR^S01 (HL7 v2.4) message. */
export interface ParsedSRRGeneralResource {
  /** The AIG segment. */
  generalResource: AIG;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The LOCATION RESOURCE group of a parsed SRR^S01 (HL7 v2.4) message. */
export interface ParsedSRRLocationResource {
  /** The AIL segment. */
  location: AIL;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PERSONNEL RESOURCE group of a parsed SRR^S01 (HL7 v2.4) message. */
export interface ParsedSRRPersonnelResource {
  /** The AIP segment. */
  personnel: AIP;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 SRR^S01 (HL7 v2.4) message. */
export interface ParsedSRR_S01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The SCHEDULE group. */
  schedule?: ParsedSRRSchedule;
}

/** The segment parsers of SRR^S01 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SCH: (s, e) => SCH.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  RGS: (s, e) => RGS.parse(s, e),
  AIS: (s, e) => AIS.parse(s, e),
  AIG: (s, e) => AIG.parse(s, e),
  AIL: (s, e) => AIL.parse(s, e),
  AIP: (s, e) => AIP.parse(s, e),
};

/** Parser for HL7 SRR^S01 (HL7 v2.4) messages. */
export class SRR_S01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SRR_S01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SRR_S01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSRR_S01> {
    return parseStructure<ParsedSRR_S01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SRR^S01 (HL7 v2.4) message string into a structured result. */
export function parseSRR_S01(messageString: string): Result<ParsedSRR_S01> {
  return new SRR_S01_Parser().parse(messageString);
}

/** The SCHEDULE group of an SRR^S01 (HL7 v2.4) message being built. */
export interface SRRScheduleGroup {
  /** The SCH segment. */
  appointment: SCH;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT groups. */
  patients?: SRRPatientGroup[];
  /** The RESOURCES groups. */
  resources: SRRResourcesGroup[];
}

/** The PATIENT group of an SRR^S01 (HL7 v2.4) message being built. */
export interface SRRPatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The DG1 segments. */
  diagnoses?: DG1[];
}

/** The RESOURCES group of an SRR^S01 (HL7 v2.4) message being built. */
export interface SRRResourcesGroup {
  /** The RGS segment. */
  resourceGroup: RGS;
  /** The SERVICE groups. */
  services?: SRRServiceGroup[];
  /** The GENERAL RESOURCE groups. */
  generalResources?: SRRGeneralResourceGroup[];
  /** The LOCATION RESOURCE groups. */
  locationResources?: SRRLocationResourceGroup[];
  /** The PERSONNEL RESOURCE groups. */
  personnelResources?: SRRPersonnelResourceGroup[];
}

/** The SERVICE group of an SRR^S01 (HL7 v2.4) message being built. */
export interface SRRServiceGroup {
  /** The AIS segment. */
  service: AIS;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GENERAL RESOURCE group of an SRR^S01 (HL7 v2.4) message being built. */
export interface SRRGeneralResourceGroup {
  /** The AIG segment. */
  generalResource: AIG;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The LOCATION RESOURCE group of an SRR^S01 (HL7 v2.4) message being built. */
export interface SRRLocationResourceGroup {
  /** The AIL segment. */
  location: AIL;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PERSONNEL RESOURCE group of an SRR^S01 (HL7 v2.4) message being built. */
export interface SRRPersonnelResourceGroup {
  /** The AIP segment. */
  personnel: AIP;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an SRR^S01 (HL7 v2.4) message. */
export interface SRR_S01Options {
  /** The ERR segment. */
  error?: ERR;
  /** The SCHEDULE group. */
  schedule?: SRRScheduleGroup;
}

/** Builder for HL7 SRR^S01 (HL7 v2.4) messages. */
export class SRR_S01<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SRR_S01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SRR_S01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: SRR_S01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment };
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

/** Builds an HL7 SRR^S01 (HL7 v2.4) message. */
export function createSRR_S01<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: SRR_S01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRR_S01<TMSH, TMSA> {
  return new SRR_S01(header, acknowledgment, options, encoding);
}
