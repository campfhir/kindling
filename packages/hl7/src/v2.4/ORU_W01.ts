/**
 * Builder, parser and structure for ORU^W01 messages (HL7 v2.4).
 *
 * Structure: MSH { PATIENT_RESULT: [ PATIENT: PID [PD1] [{NK1}] [{NTE}] [ VISIT: PV1 [PV2] ] ] { ORDER_OBSERVATION: [ORC] OBR [{NTE}] [CTD] { OBSERVATION: [OBX] [{NTE}] } [{FT1}] [{CTI}] } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { NK1 } from "./NK1.ts";
import { NTE } from "./NTE.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { ORC } from "./ORC.ts";
import { OBR } from "./OBR.ts";
import { CTD } from "./CTD.ts";
import { OBX } from "./OBX.ts";
import { FT1 } from "./FT1.ts";
import { CTI } from "./CTI.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ORU^W01 (HL7 v2.4), in order. */
export const ORU_W01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  {
    name: "PATIENT_RESULT",
    required: true,
    repeating: true,
    segments: [
      {
        name: "PATIENT",
        required: false,
        repeating: false,
        inline: true,
        segments: [
          { name: "PID", required: true, repeating: false },
          { name: "PD1", required: false, repeating: false },
          { name: "NK1", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
          {
            name: "VISIT",
            required: false,
            repeating: false,
            inline: true,
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
          { name: "ORC", required: false, repeating: false },
          { name: "OBR", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
          { name: "CTD", required: false, repeating: false },
          {
            name: "OBSERVATION",
            required: true,
            repeating: true,
            as: "observations",
            segments: [
              { name: "OBX", required: false, repeating: false },
              { name: "NTE", required: false, repeating: true },
            ],
          },
          { name: "FT1", required: false, repeating: true },
          { name: "CTI", required: false, repeating: true },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The PATIENT RESULT group of a parsed ORU^W01 (HL7 v2.4) message. */
export interface ParsedPatientResult {
  /** The PID segment. */
  patient?: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ORDER OBSERVATION groups. */
  orderObservations: ParsedOrderObservation[];
}

/** The ORDER OBSERVATION group of a parsed ORU^W01 (HL7 v2.4) message. */
export interface ParsedOrderObservation {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CTD segment. */
  contact?: CTD;
  /** The OBSERVATION groups. */
  observations: ParsedObservation[];
  /** The FT1 segments. */
  transactions?: FT1[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The OBSERVATION group of a parsed ORU^W01 (HL7 v2.4) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 ORU^W01 (HL7 v2.4) message. */
export interface ParsedORU_W01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The PATIENT RESULT groups. */
  patientResults: ParsedPatientResult[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of ORU^W01 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  FT1: (s, e) => FT1.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 ORU^W01 (HL7 v2.4) messages. */
export class ORU_W01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORU_W01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORU_W01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORU_W01> {
    return parseStructure<ParsedORU_W01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORU^W01 (HL7 v2.4) message string into a structured result. */
export function parseORU_W01(messageString: string): Result<ParsedORU_W01> {
  return new ORU_W01_Parser().parse(messageString);
}

/** The PATIENT RESULT group of an ORU^W01 (HL7 v2.4) message being built. */
export interface PatientResult {
  /** The PID segment. */
  patient?: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ORDER OBSERVATION groups. */
  orderObservations: OrderObservation[];
}

/** The ORDER OBSERVATION group of an ORU^W01 (HL7 v2.4) message being built. */
export interface OrderObservation {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CTD segment. */
  contact?: CTD;
  /** The OBSERVATION groups. */
  observations: ObservationGroup[];
  /** The FT1 segments. */
  transactions?: FT1[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The OBSERVATION group of an ORU^W01 (HL7 v2.4) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an ORU^W01 (HL7 v2.4) message. */
export interface ORU_W01Options {
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 ORU^W01 (HL7 v2.4) messages. */
export class ORU_W01<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORU_W01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORU_W01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public patientResults: PatientResult[],
    public options: ORU_W01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, patientResults: this.patientResults };
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

/** Builds an HL7 ORU^W01 (HL7 v2.4) message. */
export function createORU_W01<TMSH extends MSH = MSH>(
  header: TMSH,
  patientResults: PatientResult[],
  options: ORU_W01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORU_W01<TMSH> {
  return new ORU_W01(header, patientResults, options, encoding);
}
