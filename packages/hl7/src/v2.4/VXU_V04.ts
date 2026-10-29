/**
 * Builder, parser and structure for VXU^V04 messages (HL7 v2.4).
 *
 * Structure: MSH PID [PD1] [{NK1}] [ PATIENT: PV1 [PV2] ] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [{ ORDER: [ORC] RXA [RXR] [{ OBSERVATION: OBX [{NTE}] }] }]
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
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { GT1 } from "./GT1.ts";
import { IN1 } from "./IN1.ts";
import { IN2 } from "./IN2.ts";
import { IN3 } from "./IN3.ts";
import { ORC } from "./ORC.ts";
import { RXA } from "./RXA.ts";
import { RXR } from "./RXR.ts";
import { OBX } from "./OBX.ts";
import { NTE } from "./NTE.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of VXU^V04 (HL7 v2.4), in order. */
export const VXU_V04_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "NK1", required: false, repeating: true },
  {
    name: "PATIENT",
    required: false,
    repeating: false,
    inline: true,
    segments: [
      { name: "PV1", required: true, repeating: false },
      { name: "PV2", required: false, repeating: false },
    ],
  },
  { name: "GT1", required: false, repeating: true },
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
  {
    name: "ORDER",
    required: false,
    repeating: true,
    segments: [
      { name: "ORC", required: false, repeating: false },
      { name: "RXA", required: true, repeating: false },
      { name: "RXR", required: false, repeating: false },
      {
        name: "OBSERVATION",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The INSURANCE group of a parsed VXU^V04 (HL7 v2.4) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER group of a parsed VXU^V04 (HL7 v2.4) message. */
export interface ParsedVaccination {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segment. */
  route?: RXR;
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
}

/** The OBSERVATION group of a parsed VXU^V04 (HL7 v2.4) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 VXU^V04 (HL7 v2.4) message. */
export interface ParsedVXU_V04 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The ORDER groups. */
  orders?: ParsedVaccination[];
}

/** The segment parsers of VXU^V04 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  RXA: (s, e) => RXA.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
};

/** Parser for HL7 VXU^V04 (HL7 v2.4) messages. */
export class VXU_V04_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "VXU_V04";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = VXU_V04_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedVXU_V04> {
    return parseStructure<ParsedVXU_V04>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 VXU^V04 (HL7 v2.4) message string into a structured result. */
export function parseVXU_V04(messageString: string): Result<ParsedVXU_V04> {
  return new VXU_V04_Parser().parse(messageString);
}

/** The INSURANCE group of an VXU^V04 (HL7 v2.4) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER group of an VXU^V04 (HL7 v2.4) message being built. */
export interface VaccinationGroup {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segment. */
  route?: RXR;
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
}

/** The OBSERVATION group of an VXU^V04 (HL7 v2.4) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an VXU^V04 (HL7 v2.4) message. */
export interface VXU_V04Options {
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The ORDER groups. */
  orders?: VaccinationGroup[];
}

/** Builder for HL7 VXU^V04 (HL7 v2.4) messages. */
export class VXU_V04<TMSH extends MSH = MSH, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "VXU_V04";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = VXU_V04_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public patient: TPID,
    public options: VXU_V04Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, patient: this.patient };
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

/** Builds an HL7 VXU^V04 (HL7 v2.4) message. */
export function createVXU_V04<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  patient: TPID,
  options: VXU_V04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): VXU_V04<TMSH, TPID> {
  return new VXU_V04(header, patient, options, encoding);
}
