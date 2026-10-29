/**
 * Builder, parser and structure for OUL^R23 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] [NTE] [ PATIENT: PID [PD1] [{NTE}] ] [ VISIT: PV1 [PV2] ] { SPECIMEN: SPM [{OBX}] { CONTAINER: SAC [INV] { ORDER: OBR [ORC] [{NTE}] [{ TIMING_QTY: TQ1 [{TQ2}] }] [{ RESULT: OBX [TCD] [{SID}] [{NTE}] }] [{CTI}] } } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { NTE } from "./NTE.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { SPM } from "./SPM.ts";
import { OBX } from "./OBX.ts";
import { SAC } from "./SAC.ts";
import { INV } from "./INV.ts";
import { OBR } from "./OBR.ts";
import { ORC } from "./ORC.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { TCD } from "./TCD.ts";
import { SID } from "./SID.ts";
import { CTI } from "./CTI.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of OUL^R23 (HL7 v2.5.1), in order. */
export const OUL_R23_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "NTE", required: false, repeating: false },
  {
    name: "PATIENT",
    required: false,
    repeating: false,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "NTE", required: false, repeating: true },
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
  {
    name: "SPECIMEN",
    required: true,
    repeating: true,
    segments: [
      { name: "SPM", required: true, repeating: false },
      { name: "OBX", required: false, repeating: true },
      {
        name: "CONTAINER",
        required: true,
        repeating: true,
        segments: [
          { name: "SAC", required: true, repeating: false },
          { name: "INV", required: false, repeating: false },
          {
            name: "ORDER",
            required: true,
            repeating: true,
            segments: [
              { name: "OBR", required: true, repeating: false },
              { name: "ORC", required: false, repeating: false },
              { name: "NTE", required: false, repeating: true },
              {
                name: "TIMING_QTY",
                required: false,
                repeating: true,
                segments: [
                  { name: "TQ1", required: true, repeating: false },
                  { name: "TQ2", required: false, repeating: true },
                ],
              },
              {
                name: "RESULT",
                required: false,
                repeating: true,
                segments: [
                  { name: "OBX", required: true, repeating: false },
                  { name: "TCD", required: false, repeating: false },
                  { name: "SID", required: false, repeating: true },
                  { name: "NTE", required: false, repeating: true },
                ],
              },
              { name: "CTI", required: false, repeating: true },
            ],
          },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The PATIENT group of a parsed OUL^R23 (HL7 v2.5.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The VISIT group of a parsed OUL^R23 (HL7 v2.5.1) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The SPECIMEN group of a parsed OUL^R23 (HL7 v2.5.1) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The OBX segments. */
  observations?: OBX[];
  /** The CONTAINER groups. */
  containers: ParsedContainer[];
}

/** The CONTAINER group of a parsed OUL^R23 (HL7 v2.5.1) message. */
export interface ParsedContainer {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The INV segment. */
  inventoryDetail?: INV;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The ORDER group of a parsed OUL^R23 (HL7 v2.5.1) message. */
export interface ParsedOrder {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING QTY groups. */
  timingQtys?: ParsedTimingQty[];
  /** The RESULT groups. */
  results?: ParsedResult[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The TIMING QTY group of a parsed OUL^R23 (HL7 v2.5.1) message. */
export interface ParsedTimingQty {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The RESULT group of a parsed OUL^R23 (HL7 v2.5.1) message. */
export interface ParsedResult {
  /** The OBX segment. */
  observation: OBX;
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The SID segments. */
  substanceIdentifiers?: SID[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 OUL^R23 (HL7 v2.5.1) message. */
export interface ParsedOUL_R23 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segment. */
  note?: NTE;
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The VISIT group. */
  visit?: ParsedVisit;
  /** The SPECIMEN groups. */
  specimens: ParsedSpecimen[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of OUL^R23 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  INV: (s, e) => INV.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  TCD: (s, e) => TCD.parse(s, e),
  SID: (s, e) => SID.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 OUL^R23 (HL7 v2.5.1) messages. */
export class OUL_R23_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OUL_R23";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OUL_R23_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOUL_R23> {
    return parseStructure<ParsedOUL_R23>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OUL^R23 (HL7 v2.5.1) message string into a structured result. */
export function parseOUL_R23(messageString: string): Result<ParsedOUL_R23> {
  return new OUL_R23_Parser().parse(messageString);
}

/** The PATIENT group of an OUL^R23 (HL7 v2.5.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The VISIT group of an OUL^R23 (HL7 v2.5.1) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The SPECIMEN group of an OUL^R23 (HL7 v2.5.1) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The OBX segments. */
  observations?: OBX[];
  /** The CONTAINER groups. */
  containers: ContainerGroup[];
}

/** The CONTAINER group of an OUL^R23 (HL7 v2.5.1) message being built. */
export interface ContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The INV segment. */
  inventoryDetail?: INV;
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The ORDER group of an OUL^R23 (HL7 v2.5.1) message being built. */
export interface OrderGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING QTY groups. */
  timingQtys?: TimingQtyGroup[];
  /** The RESULT groups. */
  results?: ResultGroup[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The TIMING QTY group of an OUL^R23 (HL7 v2.5.1) message being built. */
export interface TimingQtyGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The RESULT group of an OUL^R23 (HL7 v2.5.1) message being built. */
export interface ResultGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The SID segments. */
  substanceIdentifiers?: SID[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an OUL^R23 (HL7 v2.5.1) message. */
export interface OUL_R23Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segment. */
  note?: NTE;
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The VISIT group. */
  visit?: VisitGroup;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 OUL^R23 (HL7 v2.5.1) messages. */
export class OUL_R23<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OUL_R23";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OUL_R23_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public specimens: SpecimenGroup[],
    public options: OUL_R23Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, specimens: this.specimens };
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

/** Builds an HL7 OUL^R23 (HL7 v2.5.1) message. */
export function createOUL_R23<TMSH extends MSH = MSH>(
  header: TMSH,
  specimens: SpecimenGroup[],
  options: OUL_R23Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OUL_R23<TMSH> {
  return new OUL_R23(header, specimens, options, encoding);
}
