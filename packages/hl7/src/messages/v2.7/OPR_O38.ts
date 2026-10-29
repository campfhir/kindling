/**
 * Builder, parser and structure for OPR^O38 messages (HL7 v2.7).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: { ORDER: {NK1} [PID] [{PRT}] [{ SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{SAC}] [{ OBSERVATION_REQUEST: ORC OBR [{PRT}] }] [{ TIMING: TQ1 [{TQ2}] }] }] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { MSA } from "../../segments/v2.7/MSA.ts";
import { ERR } from "../../segments/v2.7/ERR.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { NTE } from "../../segments/v2.7/NTE.ts";
import { NK1 } from "../../segments/v2.7/NK1.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { PRT } from "../../segments/v2.7/PRT.ts";
import { SPM } from "../../segments/v2.7/SPM.ts";
import { OBX } from "../../segments/v2.7/OBX.ts";
import { SAC } from "../../segments/v2.7/SAC.ts";
import { ORC } from "../../segments/v2.7/ORC.ts";
import { OBR } from "../../segments/v2.7/OBR.ts";
import { TQ1 } from "../../segments/v2.7/TQ1.ts";
import { TQ2 } from "../../segments/v2.7/TQ2.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of OPR^O38 (HL7 v2.7), in order. */
export const OPR_O38_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "NTE", required: false, repeating: true },
  {
    name: "RESPONSE",
    required: false,
    repeating: false,
    segments: [
      {
        name: "ORDER",
        required: true,
        repeating: true,
        segments: [
          { name: "NK1", required: true, repeating: true },
          { name: "PID", required: false, repeating: false },
          { name: "PRT", required: false, repeating: true },
          {
            name: "SPECIMEN",
            required: false,
            repeating: true,
            segments: [
              { name: "SPM", required: true, repeating: false },
              {
                name: "SPECIMEN_OBSERVATION",
                required: false,
                repeating: true,
                segments: [
                  { name: "OBX", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                ],
              },
              { name: "SAC", required: false, repeating: true },
              {
                name: "OBSERVATION_REQUEST",
                required: false,
                repeating: true,
                segments: [
                  { name: "ORC", required: true, repeating: false },
                  { name: "OBR", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                ],
              },
              {
                name: "TIMING",
                required: false,
                repeating: true,
                segments: [
                  { name: "TQ1", required: true, repeating: false },
                  { name: "TQ2", required: false, repeating: true },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

/** The RESPONSE group of a parsed OPR^O38 (HL7 v2.7) message. */
export interface ParsedResponse {
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The ORDER group of a parsed OPR^O38 (HL7 v2.7) message. */
export interface ParsedOrder {
  /** The NK1 segments. */
  nextOfKin: NK1[];
  /** The PID segment. */
  patient?: PID;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The SPECIMEN groups. */
  specimens?: ParsedSpecimen[];
}

/** The SPECIMEN group of a parsed OPR^O38 (HL7 v2.7) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: ParsedSpecimenObservation[];
  /** The SAC segments. */
  specimenContainers?: SAC[];
  /** The OBSERVATION REQUEST groups. */
  observationRequests?: ParsedObservationRequest[];
  /** The TIMING groups. */
  timings?: ParsedTiming[];
}

/** The SPECIMEN OBSERVATION group of a parsed OPR^O38 (HL7 v2.7) message. */
export interface ParsedSpecimenObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The OBSERVATION REQUEST group of a parsed OPR^O38 (HL7 v2.7) message. */
export interface ParsedObservationRequest {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The TIMING group of a parsed OPR^O38 (HL7 v2.7) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** Structured result of parsing an HL7 OPR^O38 (HL7 v2.7) message. */
export interface ParsedOPR_O38 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ParsedResponse;
}

/** The segment parsers of OPR^O38 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
};

/** Parser for HL7 OPR^O38 (HL7 v2.7) messages. */
export class OPR_O38_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OPR_O38";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OPR_O38_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOPR_O38> {
    return parseStructure<ParsedOPR_O38>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OPR^O38 (HL7 v2.7) message string into a structured result. */
export function parseOPR_O38(messageString: string): Result<ParsedOPR_O38> {
  return new OPR_O38_Parser().parse(messageString);
}

/** The RESPONSE group of an OPR^O38 (HL7 v2.7) message being built. */
export interface ResponseGroup {
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The ORDER group of an OPR^O38 (HL7 v2.7) message being built. */
export interface OrderGroup {
  /** The NK1 segments. */
  nextOfKin: NK1[];
  /** The PID segment. */
  patient?: PID;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The SPECIMEN groups. */
  specimens?: SpecimenGroup[];
}

/** The SPECIMEN group of an OPR^O38 (HL7 v2.7) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: SpecimenObservationGroup[];
  /** The SAC segments. */
  specimenContainers?: SAC[];
  /** The OBSERVATION REQUEST groups. */
  observationRequests?: ObservationRequestGroup[];
  /** The TIMING groups. */
  timings?: TimingGroup[];
}

/** The SPECIMEN OBSERVATION group of an OPR^O38 (HL7 v2.7) message being built. */
export interface SpecimenObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The OBSERVATION REQUEST group of an OPR^O38 (HL7 v2.7) message being built. */
export interface ObservationRequestGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The TIMING group of an OPR^O38 (HL7 v2.7) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The optional segments and groups of an OPR^O38 (HL7 v2.7) message. */
export interface OPR_O38Options {
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ResponseGroup;
}

/** Builder for HL7 OPR^O38 (HL7 v2.7) messages. */
export class OPR_O38<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OPR_O38";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OPR_O38_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: OPR_O38Options = {},
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

/** Builds an HL7 OPR^O38 (HL7 v2.7) message. */
export function createOPR_O38<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: OPR_O38Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OPR_O38<TMSH, TMSA> {
  return new OPR_O38(header, acknowledgment, options, encoding);
}
