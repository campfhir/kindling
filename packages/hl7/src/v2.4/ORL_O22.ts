/**
 * Builder, parser and structure for ORL^O22 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID { GENERAL_ORDER: [ CONTAINER: SAC [{OBX}] ] [{ ORDER: ORC [ OBSERVATION_REQUEST: OBR [{SAC}] ] }] } ] ]
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
import { NTE } from "./NTE.ts";
import { PID } from "./PID.ts";
import { SAC } from "./SAC.ts";
import { OBX } from "./OBX.ts";
import { ORC } from "./ORC.ts";
import { OBR } from "./OBR.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ORL^O22 (HL7 v2.4), in order. */
export const ORL_O22_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
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
          {
            name: "GENERAL_ORDER",
            required: true,
            repeating: true,
            segments: [
              {
                name: "CONTAINER",
                required: false,
                repeating: false,
                segments: [
                  { name: "SAC", required: true, repeating: false },
                  { name: "OBX", required: false, repeating: true },
                ],
              },
              {
                name: "ORDER",
                required: false,
                repeating: true,
                segments: [
                  { name: "ORC", required: true, repeating: false },
                  {
                    name: "OBSERVATION_REQUEST",
                    required: false,
                    repeating: false,
                    segments: [
                      { name: "OBR", required: true, repeating: false },
                      { name: "SAC", required: false, repeating: true },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

/** The RESPONSE group of a parsed ORL^O22 (HL7 v2.4) message. */
export interface ParsedResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
}

/** The PATIENT group of a parsed ORL^O22 (HL7 v2.4) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The GENERAL ORDER groups. */
  generalOrders: ParsedGeneralOrder[];
}

/** The GENERAL ORDER group of a parsed ORL^O22 (HL7 v2.4) message. */
export interface ParsedGeneralOrder {
  /** The CONTAINER group. */
  container?: ParsedContainer;
  /** The ORDER groups. */
  orders?: ParsedOrder[];
}

/** The CONTAINER group of a parsed ORL^O22 (HL7 v2.4) message. */
export interface ParsedContainer {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The OBX segments. */
  observations?: OBX[];
}

/** The ORDER group of a parsed ORL^O22 (HL7 v2.4) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The OBSERVATION REQUEST group. */
  observationRequest?: ParsedObservationRequest;
}

/** The OBSERVATION REQUEST group of a parsed ORL^O22 (HL7 v2.4) message. */
export interface ParsedObservationRequest {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The SAC segments. */
  specimenContainers?: SAC[];
}

/** Structured result of parsing an HL7 ORL^O22 (HL7 v2.4) message. */
export interface ParsedORL_O22 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ParsedResponse;
}

/** The segment parsers of ORL^O22 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
};

/** Parser for HL7 ORL^O22 (HL7 v2.4) messages. */
export class ORL_O22_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORL_O22";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORL_O22_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORL_O22> {
    return parseStructure<ParsedORL_O22>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORL^O22 (HL7 v2.4) message string into a structured result. */
export function parseORL_O22(messageString: string): Result<ParsedORL_O22> {
  return new ORL_O22_Parser().parse(messageString);
}

/** The RESPONSE group of an ORL^O22 (HL7 v2.4) message being built. */
export interface ResponseGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
}

/** The PATIENT group of an ORL^O22 (HL7 v2.4) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The GENERAL ORDER groups. */
  generalOrders: GeneralOrderGroup[];
}

/** The GENERAL ORDER group of an ORL^O22 (HL7 v2.4) message being built. */
export interface GeneralOrderGroup {
  /** The CONTAINER group. */
  container?: ContainerGroup;
  /** The ORDER groups. */
  orders?: OrderGroup[];
}

/** The CONTAINER group of an ORL^O22 (HL7 v2.4) message being built. */
export interface ContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The OBX segments. */
  observations?: OBX[];
}

/** The ORDER group of an ORL^O22 (HL7 v2.4) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The OBSERVATION REQUEST group. */
  observationRequest?: ObservationRequestGroup;
}

/** The OBSERVATION REQUEST group of an ORL^O22 (HL7 v2.4) message being built. */
export interface ObservationRequestGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The SAC segments. */
  specimenContainers?: SAC[];
}

/** The optional segments and groups of an ORL^O22 (HL7 v2.4) message. */
export interface ORL_O22Options {
  /** The ERR segment. */
  error?: ERR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ResponseGroup;
}

/** Builder for HL7 ORL^O22 (HL7 v2.4) messages. */
export class ORL_O22<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORL_O22";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORL_O22_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: ORL_O22Options = {},
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

/** Builds an HL7 ORL^O22 (HL7 v2.4) message. */
export function createORL_O22<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: ORL_O22Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORL_O22<TMSH, TMSA> {
  return new ORL_O22(header, acknowledgment, options, encoding);
}
