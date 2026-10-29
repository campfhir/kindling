/**
 * Builder, parser and structure for SQM^S25 messages (HL7 v2.5.1).
 *
 * Structure: MSH QRD [QRF] [ REQUEST: ARQ [APR] [PID] { RESOURCES: RGS [{ SERVICE: AIS [APR] }] [{ GENERAL_RESOURCE: AIG [APR] }] [{ PERSONNEL_RESOURCE: AIP [APR] }] [{ LOCATION_RESOURCE: AIL [APR] }] } ] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { QRD } from "./QRD.ts";
import { QRF } from "./QRF.ts";
import { ARQ } from "./ARQ.ts";
import { APR } from "./APR.ts";
import { PID } from "./PID.ts";
import { RGS } from "./RGS.ts";
import { AIS } from "./AIS.ts";
import { AIG } from "./AIG.ts";
import { AIP } from "./AIP.ts";
import { AIL } from "./AIL.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of SQM^S25 (HL7 v2.5.1), in order. */
export const SQM_S25_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
  {
    name: "REQUEST",
    required: false,
    repeating: false,
    inline: true,
    segments: [
      { name: "ARQ", required: true, repeating: false },
      { name: "APR", required: false, repeating: false },
      { name: "PID", required: false, repeating: false },
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
            ],
          },
          {
            name: "GENERAL_RESOURCE",
            required: false,
            repeating: true,
            segments: [
              { name: "AIG", required: true, repeating: false },
              { name: "APR", required: false, repeating: false },
            ],
          },
          {
            name: "PERSONNEL_RESOURCE",
            required: false,
            repeating: true,
            segments: [
              { name: "AIP", required: true, repeating: false },
              { name: "APR", required: false, repeating: false },
            ],
          },
          {
            name: "LOCATION_RESOURCE",
            required: false,
            repeating: true,
            segments: [
              { name: "AIL", required: true, repeating: false },
              { name: "APR", required: false, repeating: false },
            ],
          },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The RESOURCES group of a parsed SQM^S25 (HL7 v2.5.1) message. */
export interface ParsedResources {
  /** The RGS segment. */
  resourceGroup: RGS;
  /** The SERVICE groups. */
  services?: ParsedService[];
  /** The GENERAL RESOURCE groups. */
  generalResources?: ParsedGeneralResource[];
  /** The PERSONNEL RESOURCE groups. */
  personnelResources?: ParsedPersonnelResource[];
  /** The LOCATION RESOURCE groups. */
  locationResources?: ParsedLocationResource[];
}

/** The SERVICE group of a parsed SQM^S25 (HL7 v2.5.1) message. */
export interface ParsedService {
  /** The AIS segment. */
  service: AIS;
  /** The APR segment. */
  appointmentPreferences?: APR;
}

/** The GENERAL RESOURCE group of a parsed SQM^S25 (HL7 v2.5.1) message. */
export interface ParsedGeneralResource {
  /** The AIG segment. */
  generalResource: AIG;
  /** The APR segment. */
  appointmentPreferences?: APR;
}

/** The PERSONNEL RESOURCE group of a parsed SQM^S25 (HL7 v2.5.1) message. */
export interface ParsedPersonnelResource {
  /** The AIP segment. */
  personnel: AIP;
  /** The APR segment. */
  appointmentPreferences?: APR;
}

/** The LOCATION RESOURCE group of a parsed SQM^S25 (HL7 v2.5.1) message. */
export interface ParsedLocationResource {
  /** The AIL segment. */
  location: AIL;
  /** The APR segment. */
  appointmentPreferences?: APR;
}

/** Structured result of parsing an HL7 SQM^S25 (HL7 v2.5.1) message. */
export interface ParsedSQM_S25 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The ARQ segment. */
  appointmentRequest?: ARQ;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The PID segment. */
  patient?: PID;
  /** The RESOURCES groups. */
  resources?: ParsedResources[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of SQM^S25 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  ARQ: (s, e) => ARQ.parse(s, e),
  APR: (s, e) => APR.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  RGS: (s, e) => RGS.parse(s, e),
  AIS: (s, e) => AIS.parse(s, e),
  AIG: (s, e) => AIG.parse(s, e),
  AIP: (s, e) => AIP.parse(s, e),
  AIL: (s, e) => AIL.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 SQM^S25 (HL7 v2.5.1) messages. */
export class SQM_S25_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SQM_S25";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SQM_S25_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSQM_S25> {
    return parseStructure<ParsedSQM_S25>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SQM^S25 (HL7 v2.5.1) message string into a structured result. */
export function parseSQM_S25(messageString: string): Result<ParsedSQM_S25> {
  return new SQM_S25_Parser().parse(messageString);
}

/** The RESOURCES group of an SQM^S25 (HL7 v2.5.1) message being built. */
export interface ResourcesGroup {
  /** The RGS segment. */
  resourceGroup: RGS;
  /** The SERVICE groups. */
  services?: ServiceGroup[];
  /** The GENERAL RESOURCE groups. */
  generalResources?: GeneralResourceGroup[];
  /** The PERSONNEL RESOURCE groups. */
  personnelResources?: PersonnelResourceGroup[];
  /** The LOCATION RESOURCE groups. */
  locationResources?: LocationResourceGroup[];
}

/** The SERVICE group of an SQM^S25 (HL7 v2.5.1) message being built. */
export interface ServiceGroup {
  /** The AIS segment. */
  service: AIS;
  /** The APR segment. */
  appointmentPreferences?: APR;
}

/** The GENERAL RESOURCE group of an SQM^S25 (HL7 v2.5.1) message being built. */
export interface GeneralResourceGroup {
  /** The AIG segment. */
  generalResource: AIG;
  /** The APR segment. */
  appointmentPreferences?: APR;
}

/** The PERSONNEL RESOURCE group of an SQM^S25 (HL7 v2.5.1) message being built. */
export interface PersonnelResourceGroup {
  /** The AIP segment. */
  personnel: AIP;
  /** The APR segment. */
  appointmentPreferences?: APR;
}

/** The LOCATION RESOURCE group of an SQM^S25 (HL7 v2.5.1) message being built. */
export interface LocationResourceGroup {
  /** The AIL segment. */
  location: AIL;
  /** The APR segment. */
  appointmentPreferences?: APR;
}

/** The optional segments and groups of an SQM^S25 (HL7 v2.5.1) message. */
export interface SQM_S25Options {
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The ARQ segment. */
  appointmentRequest?: ARQ;
  /** The APR segment. */
  appointmentPreferences?: APR;
  /** The PID segment. */
  patient?: PID;
  /** The RESOURCES groups. */
  resources?: ResourcesGroup[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 SQM^S25 (HL7 v2.5.1) messages. */
export class SQM_S25<TMSH extends MSH = MSH, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SQM_S25";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SQM_S25_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public query: TQRD,
    public options: SQM_S25Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, query: this.query };
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

/** Builds an HL7 SQM^S25 (HL7 v2.5.1) message. */
export function createSQM_S25<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: SQM_S25Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SQM_S25<TMSH, TQRD> {
  return new SQM_S25(header, query, options, encoding);
}
