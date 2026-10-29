/**
 * Builder, parser and structure for SQR^S25 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA [ERR] QAK [{ SCHEDULE: SCH [{NTE}] [ PATIENT: PID [PV1] [PV2] [DG1] ] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] } }] [DSC]
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
import { QAK } from "./QAK.ts";
import { SCH } from "./SCH.ts";
import { NTE } from "./NTE.ts";
import { PID } from "./PID.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { DG1 } from "./DG1.ts";
import { RGS } from "./RGS.ts";
import { AIS } from "./AIS.ts";
import { AIG } from "./AIG.ts";
import { AIP } from "./AIP.ts";
import { AIL } from "./AIL.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of SQR^S25 (HL7 v2.3.1), in order. */
export const SQR_S25_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: true, repeating: false },
  {
    name: "SCHEDULE",
    required: false,
    repeating: true,
    segments: [
      { name: "SCH", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      {
        name: "PATIENT",
        required: false,
        repeating: false,
        inline: true,
        segments: [
          { name: "PID", required: true, repeating: false },
          { name: "PV1", required: false, repeating: false },
          { name: "PV2", required: false, repeating: false },
          { name: "DG1", required: false, repeating: false },
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
            name: "PERSONNEL_RESOURCE",
            required: false,
            repeating: true,
            segments: [
              { name: "AIP", required: true, repeating: false },
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
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The SCHEDULE group of a parsed SQR^S25 (HL7 v2.3.1) message. */
export interface ParsedSchedule {
  /** The SCH segment. */
  appointment: SCH;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The DG1 segment. */
  diagnosis?: DG1;
  /** The RESOURCES groups. */
  resources: ParsedResources[];
}

/** The RESOURCES group of a parsed SQR^S25 (HL7 v2.3.1) message. */
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

/** The SERVICE group of a parsed SQR^S25 (HL7 v2.3.1) message. */
export interface ParsedService {
  /** The AIS segment. */
  service: AIS;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GENERAL RESOURCE group of a parsed SQR^S25 (HL7 v2.3.1) message. */
export interface ParsedGeneralResource {
  /** The AIG segment. */
  generalResource: AIG;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PERSONNEL RESOURCE group of a parsed SQR^S25 (HL7 v2.3.1) message. */
export interface ParsedPersonnelResource {
  /** The AIP segment. */
  personnel: AIP;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The LOCATION RESOURCE group of a parsed SQR^S25 (HL7 v2.3.1) message. */
export interface ParsedLocationResource {
  /** The AIL segment. */
  location: AIL;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 SQR^S25 (HL7 v2.3.1) message. */
export interface ParsedSQR_S25 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The SCHEDULE groups. */
  schedules?: ParsedSchedule[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of SQR^S25 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  SCH: (s, e) => SCH.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  RGS: (s, e) => RGS.parse(s, e),
  AIS: (s, e) => AIS.parse(s, e),
  AIG: (s, e) => AIG.parse(s, e),
  AIP: (s, e) => AIP.parse(s, e),
  AIL: (s, e) => AIL.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 SQR^S25 (HL7 v2.3.1) messages. */
export class SQR_S25_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SQR_S25";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SQR_S25_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSQR_S25> {
    return parseStructure<ParsedSQR_S25>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SQR^S25 (HL7 v2.3.1) message string into a structured result. */
export function parseSQR_S25(messageString: string): Result<ParsedSQR_S25> {
  return new SQR_S25_Parser().parse(messageString);
}

/** The SCHEDULE group of an SQR^S25 (HL7 v2.3.1) message being built. */
export interface ScheduleGroup {
  /** The SCH segment. */
  appointment: SCH;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The DG1 segment. */
  diagnosis?: DG1;
  /** The RESOURCES groups. */
  resources: ResourcesGroup[];
}

/** The RESOURCES group of an SQR^S25 (HL7 v2.3.1) message being built. */
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

/** The SERVICE group of an SQR^S25 (HL7 v2.3.1) message being built. */
export interface ServiceGroup {
  /** The AIS segment. */
  service: AIS;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GENERAL RESOURCE group of an SQR^S25 (HL7 v2.3.1) message being built. */
export interface GeneralResourceGroup {
  /** The AIG segment. */
  generalResource: AIG;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PERSONNEL RESOURCE group of an SQR^S25 (HL7 v2.3.1) message being built. */
export interface PersonnelResourceGroup {
  /** The AIP segment. */
  personnel: AIP;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The LOCATION RESOURCE group of an SQR^S25 (HL7 v2.3.1) message being built. */
export interface LocationResourceGroup {
  /** The AIL segment. */
  location: AIL;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an SQR^S25 (HL7 v2.3.1) message. */
export interface SQR_S25Options {
  /** The ERR segment. */
  error?: ERR;
  /** The SCHEDULE groups. */
  schedules?: ScheduleGroup[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 SQR^S25 (HL7 v2.3.1) messages. */
export class SQR_S25<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SQR_S25";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SQR_S25_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public options: SQR_S25Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAcknowledgment: this.queryAcknowledgment };
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

/** Builds an HL7 SQR^S25 (HL7 v2.3.1) message. */
export function createSQR_S25<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  options: SQR_S25Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SQR_S25<TMSH, TMSA, TQAK> {
  return new SQR_S25(header, acknowledgment, queryAcknowledgment, options, encoding);
}
