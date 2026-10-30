/**
 * Builder, parser and structure for ORI^O24 messages (HL7 v2.9.1).
 *
 * Structure: MSH MSA [{ARV}] [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{ARV}] [{NTE}] [{PRT}] ] { ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] OBR [{NTE}] [{PRT}] {IPC} } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { ARV } from "./ARV.ts";
import { ERR } from "./ERR.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { NTE } from "./NTE.ts";
import { PID } from "./PID.ts";
import { PRT } from "./PRT.ts";
import { ORC } from "./ORC.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { OBR } from "./OBR.ts";
import { IPC } from "./IPC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ORI^O24 (HL7 v2.9.1), in order. */
export const ORI_O24_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
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
        name: "PATIENT",
        required: false,
        repeating: false,
        segments: [
          { name: "PID", required: true, repeating: false },
          { name: "ARV", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
          { name: "PRT", required: false, repeating: true },
        ],
      },
      {
        name: "ORDER",
        required: true,
        repeating: true,
        segments: [
          { name: "ORC", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
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
          { name: "PRT", required: false, repeating: true, as: "prt2" },
          { name: "IPC", required: true, repeating: true },
        ],
      },
    ],
  },
];

/** The RESPONSE group of a parsed ORI^O24 (HL7 v2.9.1) message. */
export interface ParsedResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The PATIENT group of a parsed ORI^O24 (HL7 v2.9.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The ARV segments. */
  arvList?: ARV[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER group of a parsed ORI^O24 (HL7 v2.9.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prt2?: PRT[];
  /** The IPC segments. */
  imagingProcedureControls: IPC[];
}

/** The TIMING group of a parsed ORI^O24 (HL7 v2.9.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** Structured result of parsing an HL7 ORI^O24 (HL7 v2.9.1) message. */
export interface ParsedORI_O24 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ARV segments. */
  arvList?: ARV[];
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

/** The segment parsers of ORI^O24 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ARV: (s, e) => ARV.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  IPC: (s, e) => IPC.parse(s, e),
};

/** Parser for HL7 ORI^O24 (HL7 v2.9.1) messages. */
export class ORI_O24_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORI_O24";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORI_O24_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORI_O24> {
    return parseStructure<ParsedORI_O24>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORI^O24 (HL7 v2.9.1) message string into a structured result. */
export function parseORI_O24(messageString: string): Result<ParsedORI_O24> {
  return new ORI_O24_Parser().parse(messageString);
}

/** The RESPONSE group of an ORI^O24 (HL7 v2.9.1) message being built. */
export interface ResponseGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The PATIENT group of an ORI^O24 (HL7 v2.9.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The ARV segments. */
  arvList?: ARV[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER group of an ORI^O24 (HL7 v2.9.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prt2?: PRT[];
  /** The IPC segments. */
  imagingProcedureControls: IPC[];
}

/** The TIMING group of an ORI^O24 (HL7 v2.9.1) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The optional segments and groups of an ORI^O24 (HL7 v2.9.1) message. */
export interface ORI_O24Options {
  /** The ARV segments. */
  arvList?: ARV[];
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

/** Builder for HL7 ORI^O24 (HL7 v2.9.1) messages. */
export class ORI_O24<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORI_O24";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORI_O24_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: ORI_O24Options = {},
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

/** Builds an HL7 ORI^O24 (HL7 v2.9.1) message. */
export function createORI_O24<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: ORI_O24Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORI_O24<TMSH, TMSA> {
  return new ORI_O24(header, acknowledgment, options, encoding);
}
