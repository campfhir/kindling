/**
 * Builder, parser and structure for OUL^R21 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [NTE] [ PATIENT: PID [PD1] [{NTE}] [ VISIT: PV1 [PV2] ] ] { ORDER_OBSERVATION: [ CONTAINER: SAC [SID] ] [ORC] OBR [{NTE}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { OBSERVATION: [OBX] [TCD] [{SID}] [{NTE}] } [{CTI}] } [DSC]
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
import { SAC } from "./SAC.ts";
import { SID } from "./SID.ts";
import { ORC } from "./ORC.ts";
import { OBR } from "./OBR.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { OBX } from "./OBX.ts";
import { TCD } from "./TCD.ts";
import { CTI } from "./CTI.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of OUL^R21 (HL7 v2.6), in order. */
export const OUL_R21_STRUCTURE: StructureItem[] = [
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
      {
        name: "VISIT",
        required: false,
        repeating: false,
        segments: [
          { name: "PV1", required: true, repeating: false },
          { name: "PV2", required: false, repeating: false },
        ],
      },
    ],
  },
  {
    name: "ORDER_OBSERVATION",
    required: true,
    repeating: true,
    segments: [
      {
        name: "CONTAINER",
        required: false,
        repeating: false,
        segments: [
          { name: "SAC", required: true, repeating: false },
          { name: "SID", required: false, repeating: false },
        ],
      },
      { name: "ORC", required: false, repeating: false },
      { name: "OBR", required: true, repeating: false },
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
        name: "OBSERVATION",
        required: true,
        repeating: true,
        segments: [
          { name: "OBX", required: false, repeating: false },
          { name: "TCD", required: false, repeating: false },
          { name: "SID", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      { name: "CTI", required: false, repeating: true },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The PATIENT group of a parsed OUL^R21 (HL7 v2.6) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VISIT group. */
  visit?: ParsedVisit;
}

/** The VISIT group of a parsed OUL^R21 (HL7 v2.6) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The ORDER OBSERVATION group of a parsed OUL^R21 (HL7 v2.6) message. */
export interface ParsedOrderObservation {
  /** The CONTAINER group. */
  container?: ParsedContainer;
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING QTY groups. */
  timingQtys?: ParsedTimingQty[];
  /** The OBSERVATION groups. */
  observations: ParsedObservation[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The CONTAINER group of a parsed OUL^R21 (HL7 v2.6) message. */
export interface ParsedContainer {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The SID segment. */
  substanceIdentifier?: SID;
}

/** The TIMING QTY group of a parsed OUL^R21 (HL7 v2.6) message. */
export interface ParsedTimingQty {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of a parsed OUL^R21 (HL7 v2.6) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation?: OBX;
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The SID segments. */
  substanceIdentifiers?: SID[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 OUL^R21 (HL7 v2.6) message. */
export interface ParsedOUL_R21 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segment. */
  note?: NTE;
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER OBSERVATION groups. */
  orderObservations: ParsedOrderObservation[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of OUL^R21 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  SID: (s, e) => SID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  TCD: (s, e) => TCD.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 OUL^R21 (HL7 v2.6) messages. */
export class OUL_R21_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OUL_R21";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OUL_R21_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOUL_R21> {
    return parseStructure<ParsedOUL_R21>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OUL^R21 (HL7 v2.6) message string into a structured result. */
export function parseOUL_R21(messageString: string): Result<ParsedOUL_R21> {
  return new OUL_R21_Parser().parse(messageString);
}

/** The PATIENT group of an OUL^R21 (HL7 v2.6) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VISIT group. */
  visit?: VisitGroup;
}

/** The VISIT group of an OUL^R21 (HL7 v2.6) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The ORDER OBSERVATION group of an OUL^R21 (HL7 v2.6) message being built. */
export interface OrderObservationGroup {
  /** The CONTAINER group. */
  container?: ContainerGroup;
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING QTY groups. */
  timingQtys?: TimingQtyGroup[];
  /** The OBSERVATION groups. */
  observations: ObservationGroup[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The CONTAINER group of an OUL^R21 (HL7 v2.6) message being built. */
export interface ContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The SID segment. */
  substanceIdentifier?: SID;
}

/** The TIMING QTY group of an OUL^R21 (HL7 v2.6) message being built. */
export interface TimingQtyGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an OUL^R21 (HL7 v2.6) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation?: OBX;
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The SID segments. */
  substanceIdentifiers?: SID[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an OUL^R21 (HL7 v2.6) message. */
export interface OUL_R21Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segment. */
  note?: NTE;
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 OUL^R21 (HL7 v2.6) messages. */
export class OUL_R21<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OUL_R21";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OUL_R21_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orderObservations: OrderObservationGroup[],
    public options: OUL_R21Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, orderObservations: this.orderObservations };
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

/** Builds an HL7 OUL^R21 (HL7 v2.6) message. */
export function createOUL_R21<TMSH extends MSH = MSH>(
  header: TMSH,
  orderObservations: OrderObservationGroup[],
  options: OUL_R21Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OUL_R21<TMSH> {
  return new OUL_R21(header, orderObservations, options, encoding);
}
