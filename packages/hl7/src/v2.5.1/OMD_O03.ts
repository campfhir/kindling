/**
 * Builder, parser and structure for OMD^O03 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { ORDER_DIET: ORC [{ TIMING_DIET: TQ1 [{TQ2}] }] [ DIET: {ODS} [{NTE}] [{ OBSERVATION: OBX [{NTE}] }] ] } [{ ORDER_TRAY: ORC [{ TIMING_TRAY: TQ1 [{TQ2}] }] {ODT} [{NTE}] }]
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
import { IN1 } from "./IN1.ts";
import { IN2 } from "./IN2.ts";
import { IN3 } from "./IN3.ts";
import { GT1 } from "./GT1.ts";
import { AL1 } from "./AL1.ts";
import { ORC } from "./ORC.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { ODS } from "./ODS.ts";
import { OBX } from "./OBX.ts";
import { ODT } from "./ODT.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of OMD^O03 (HL7 v2.5.1), in order. */
export const OMD_O03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "NTE", required: false, repeating: true },
  {
    name: "PATIENT",
    required: false,
    repeating: false,
    inline: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "NTE", required: false, repeating: true, as: "patientNotes" },
      {
        name: "PATIENT_VISIT",
        required: false,
        repeating: false,
        inline: true,
        segments: [
          { name: "PV1", required: true, repeating: false },
          { name: "PV2", required: false, repeating: false },
        ],
      },
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
      { name: "GT1", required: false, repeating: false },
      { name: "AL1", required: false, repeating: true },
    ],
  },
  {
    name: "ORDER_DIET",
    required: true,
    repeating: true,
    as: "dietOrders",
    segments: [
      { name: "ORC", required: true, repeating: false },
      {
        name: "TIMING_DIET",
        required: false,
        repeating: true,
        as: "timings",
        segments: [
          { name: "TQ1", required: true, repeating: false },
          { name: "TQ2", required: false, repeating: true },
        ],
      },
      {
        name: "DIET",
        required: false,
        repeating: false,
        inline: true,
        segments: [
          { name: "ODS", required: true, repeating: true },
          { name: "NTE", required: false, repeating: true },
          {
            name: "OBSERVATION",
            required: false,
            repeating: true,
            as: "observations",
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "NTE", required: false, repeating: true },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "ORDER_TRAY",
    required: false,
    repeating: true,
    as: "trayOrders",
    segments: [
      { name: "ORC", required: true, repeating: false },
      {
        name: "TIMING_TRAY",
        required: false,
        repeating: true,
        as: "timings",
        segments: [
          { name: "TQ1", required: true, repeating: false },
          { name: "TQ2", required: false, repeating: true },
        ],
      },
      { name: "ODT", required: true, repeating: true },
      { name: "NTE", required: false, repeating: true },
    ],
  },
];

/** The INSURANCE group of a parsed OMD^O03 (HL7 v2.5.1) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER DIET group of a parsed OMD^O03 (HL7 v2.5.1) message. */
export interface ParsedDietOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING DIET groups. */
  timings?: ParsedTimingDiet[];
  /** The ODS segments. */
  diets?: ODS[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
}

/** The TIMING DIET group of a parsed OMD^O03 (HL7 v2.5.1) message. */
export interface ParsedTimingDiet {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of a parsed OMD^O03 (HL7 v2.5.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER TRAY group of a parsed OMD^O03 (HL7 v2.5.1) message. */
export interface ParsedTrayOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING TRAY groups. */
  timings?: ParsedTimingTray[];
  /** The ODT segments. */
  dietTrays: ODT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The TIMING TRAY group of a parsed OMD^O03 (HL7 v2.5.1) message. */
export interface ParsedTimingTray {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** Structured result of parsing an HL7 OMD^O03 (HL7 v2.5.1) message. */
export interface ParsedOMD_O03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The GT1 segment. */
  guarantor?: GT1;
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The ORDER DIET groups. */
  dietOrders: ParsedDietOrder[];
  /** The ORDER TRAY groups. */
  trayOrders?: ParsedTrayOrder[];
}

/** The segment parsers of OMD^O03 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  ODS: (s, e) => ODS.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  ODT: (s, e) => ODT.parse(s, e),
};

/** Parser for HL7 OMD^O03 (HL7 v2.5.1) messages. */
export class OMD_O03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OMD_O03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OMD_O03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOMD_O03> {
    return parseStructure<ParsedOMD_O03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OMD^O03 (HL7 v2.5.1) message string into a structured result. */
export function parseOMD_O03(messageString: string): Result<ParsedOMD_O03> {
  return new OMD_O03_Parser().parse(messageString);
}

/** The INSURANCE group of an OMD^O03 (HL7 v2.5.1) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER DIET group of an OMD^O03 (HL7 v2.5.1) message being built. */
export interface DietOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING DIET groups. */
  timings?: TimingDietGroup[];
  /** The ODS segments. */
  diets?: ODS[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
}

/** The TIMING DIET group of an OMD^O03 (HL7 v2.5.1) message being built. */
export interface TimingDietGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an OMD^O03 (HL7 v2.5.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER TRAY group of an OMD^O03 (HL7 v2.5.1) message being built. */
export interface TrayOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING TRAY groups. */
  timings?: TimingTrayGroup[];
  /** The ODT segments. */
  dietTrays: ODT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The TIMING TRAY group of an OMD^O03 (HL7 v2.5.1) message being built. */
export interface TimingTrayGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The optional segments and groups of an OMD^O03 (HL7 v2.5.1) message. */
export interface OMD_O03Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The GT1 segment. */
  guarantor?: GT1;
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The ORDER TRAY groups. */
  trayOrders?: TrayOrder[];
}

/** Builder for HL7 OMD^O03 (HL7 v2.5.1) messages. */
export class OMD_O03<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OMD_O03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OMD_O03_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public dietOrders: DietOrder[],
    public options: OMD_O03Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, dietOrders: this.dietOrders };
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

/** Builds an HL7 OMD^O03 (HL7 v2.5.1) message. */
export function createOMD_O03<TMSH extends MSH = MSH>(
  header: TMSH,
  dietOrders: DietOrder[],
  options: OMD_O03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OMD_O03<TMSH> {
  return new OMD_O03(header, dietOrders, options, encoding);
}
