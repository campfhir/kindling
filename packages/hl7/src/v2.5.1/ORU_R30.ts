/**
 * Builder, parser and structure for ORU^R30 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] PID [PD1] [ VISIT: PV1 [PV2] ] ORC OBR [{NTE}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { OBSERVATION: OBX [{NTE}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { ORC } from "./ORC.ts";
import { OBR } from "./OBR.ts";
import { NTE } from "./NTE.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { OBX } from "./OBX.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ORU^R30 (HL7 v2.5.1), in order. */
export const ORU_R30_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
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
  { name: "ORC", required: true, repeating: false },
  { name: "OBR", required: true, repeating: false },
  { name: "NTE", required: false, repeating: true },
  {
    name: "TIMING_QTY",
    required: false,
    repeating: true,
    as: "timings",
    segments: [
      { name: "TQ1", required: true, repeating: false },
      { name: "TQ2", required: false, repeating: true },
    ],
  },
  {
    name: "OBSERVATION",
    required: true,
    repeating: true,
    as: "observations",
    segments: [
      { name: "OBX", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
    ],
  },
];

/** The TIMING QTY group of a parsed ORU^R30 (HL7 v2.5.1) message. */
export interface ParsedTimingQty {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of a parsed ORU^R30 (HL7 v2.5.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 ORU^R30 (HL7 v2.5.1) message. */
export interface ParsedORU_R30 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ORC segment. */
  commonOrder: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING QTY groups. */
  timings?: ParsedTimingQty[];
  /** The OBSERVATION groups. */
  observations: ParsedObservation[];
}

/** The segment parsers of ORU^R30 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
};

/** Parser for HL7 ORU^R30 (HL7 v2.5.1) messages. */
export class ORU_R30_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORU_R30";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORU_R30_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORU_R30> {
    return parseStructure<ParsedORU_R30>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORU^R30 (HL7 v2.5.1) message string into a structured result. */
export function parseORU_R30(messageString: string): Result<ParsedORU_R30> {
  return new ORU_R30_Parser().parse(messageString);
}

/** The TIMING QTY group of an ORU^R30 (HL7 v2.5.1) message being built. */
export interface TimingQty {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an ORU^R30 (HL7 v2.5.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an ORU^R30 (HL7 v2.5.1) message. */
export interface ORU_R30Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING QTY groups. */
  timings?: TimingQty[];
}

/** Builder for HL7 ORU^R30 (HL7 v2.5.1) messages. */
export class ORU_R30<TMSH extends MSH = MSH, TPID extends PID = PID, TORC extends ORC = ORC, TOBR extends OBR = OBR> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORU_R30";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORU_R30_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public patient: TPID,
    public commonOrder: TORC,
    public observationRequest: TOBR,
    public observations: ObservationGroup[],
    public options: ORU_R30Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, patient: this.patient, commonOrder: this.commonOrder, observationRequest: this.observationRequest, observations: this.observations };
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

/** Builds an HL7 ORU^R30 (HL7 v2.5.1) message. */
export function createORU_R30<TMSH extends MSH = MSH, TPID extends PID = PID, TORC extends ORC = ORC, TOBR extends OBR = OBR>(
  header: TMSH,
  patient: TPID,
  commonOrder: TORC,
  observationRequest: TOBR,
  observations: ObservationGroup[],
  options: ORU_R30Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORU_R30<TMSH, TPID, TORC, TOBR> {
  return new ORU_R30(header, patient, commonOrder, observationRequest, observations, options, encoding);
}
