/**
 * Builder, parser and structure for MDM^T02 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID PV1 [{ COMMON_ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] OBR [{NTE}] }] TXA [{CON}] { OBSERVATION: OBX [{NTE}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { EVN } from "./EVN.ts";
import { PID } from "./PID.ts";
import { PV1 } from "./PV1.ts";
import { ORC } from "./ORC.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { OBR } from "./OBR.ts";
import { NTE } from "./NTE.ts";
import { TXA } from "./TXA.ts";
import { CON } from "./CON.ts";
import { OBX } from "./OBX.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MDM^T02 (HL7 v2.7), in order. */
export const MDM_T02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PV1", required: true, repeating: false },
  {
    name: "COMMON_ORDER",
    required: false,
    repeating: true,
    segments: [
      { name: "ORC", required: true, repeating: false },
      {
        name: "TIMING",
        required: false,
        repeating: true,
        segments: [
          { name: "TQ1", required: true, repeating: false },
          { name: "TQ2", required: false, repeating: true },
        ],
      },
      { name: "OBR", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
    ],
  },
  { name: "TXA", required: true, repeating: false },
  { name: "CON", required: false, repeating: true },
  {
    name: "OBSERVATION",
    required: true,
    repeating: true,
    segments: [
      { name: "OBX", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
    ],
  },
];

/** The COMMON ORDER group of a parsed MDM^T02 (HL7 v2.7) message. */
export interface ParsedCommonOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The TIMING group of a parsed MDM^T02 (HL7 v2.7) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of a parsed MDM^T02 (HL7 v2.7) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 MDM^T02 (HL7 v2.7) message. */
export interface ParsedMDM_T02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit: PV1;
  /** The COMMON ORDER groups. */
  commonOrders?: ParsedCommonOrder[];
  /** The TXA segment. */
  document: TXA;
  /** The CON segments. */
  consents?: CON[];
  /** The OBSERVATION groups. */
  observations: ParsedObservation[];
}

/** The segment parsers of MDM^T02 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  TXA: (s, e) => TXA.parse(s, e),
  CON: (s, e) => CON.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
};

/** Parser for HL7 MDM^T02 (HL7 v2.7) messages. */
export class MDM_T02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MDM_T02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MDM_T02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMDM_T02> {
    return parseStructure<ParsedMDM_T02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MDM^T02 (HL7 v2.7) message string into a structured result. */
export function parseMDM_T02(messageString: string): Result<ParsedMDM_T02> {
  return new MDM_T02_Parser().parse(messageString);
}

/** The COMMON ORDER group of an MDM^T02 (HL7 v2.7) message being built. */
export interface CommonOrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The TIMING group of an MDM^T02 (HL7 v2.7) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an MDM^T02 (HL7 v2.7) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an MDM^T02 (HL7 v2.7) message. */
export interface MDM_T02Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The COMMON ORDER groups. */
  commonOrders?: CommonOrderGroup[];
  /** The CON segments. */
  consents?: CON[];
}

/** Builder for HL7 MDM^T02 (HL7 v2.7) messages. */
export class MDM_T02<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MDM_T02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MDM_T02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public visit: TPV1,
    public document: TTXA,
    public observations: ObservationGroup[],
    public options: MDM_T02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, visit: this.visit, document: this.document, observations: this.observations };
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

/** Builds an HL7 MDM^T02 (HL7 v2.7) message. */
export function createMDM_T02<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  document: TTXA,
  observations: ObservationGroup[],
  options: MDM_T02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MDM_T02<TMSH, TEVN, TPID, TPV1, TTXA> {
  return new MDM_T02(header, event, patient, visit, document, observations, options, encoding);
}
