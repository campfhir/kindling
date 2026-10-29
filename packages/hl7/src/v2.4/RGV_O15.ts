/**
 * Builder, parser and structure for RGV^O15 messages (HL7 v2.4).
 *
 * Structure: MSH [{NTE}] [ PATIENT: PID [{NTE}] [{AL1}] [ PATIENT_VISIT: PV1 [PV2] ] ] { ORDER: ORC [ ORDER_DETAIL: RXO [ ORDER_DETAIL_SUPPLEMENT: {NTE} {RXR} [ COMPONENT: {RXC} [{NTE}] ] ] ] [ ENCODING: RXE {RXR} [{RXC}] ] { GIVE: RXG {RXR} [{RXC}] { OBSERVATION: [OBX] [{NTE}] } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { NTE } from "./NTE.ts";
import { PID } from "./PID.ts";
import { AL1 } from "./AL1.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { ORC } from "./ORC.ts";
import { RXO } from "./RXO.ts";
import { RXR } from "./RXR.ts";
import { RXC } from "./RXC.ts";
import { RXE } from "./RXE.ts";
import { RXG } from "./RXG.ts";
import { OBX } from "./OBX.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RGV^O15 (HL7 v2.4), in order. */
export const RGV_O15_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "NTE", required: false, repeating: true },
  {
    name: "PATIENT",
    required: false,
    repeating: false,
    inline: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true, as: "patientNotes" },
      { name: "AL1", required: false, repeating: true },
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
    ],
  },
  {
    name: "ORDER",
    required: true,
    repeating: true,
    segments: [
      { name: "ORC", required: true, repeating: false },
      {
        name: "ORDER_DETAIL",
        required: false,
        repeating: false,
        as: "detail",
        segments: [
          { name: "RXO", required: true, repeating: false },
          {
            name: "ORDER_DETAIL_SUPPLEMENT",
            required: false,
            repeating: false,
            inline: true,
            segments: [
              { name: "NTE", required: true, repeating: true },
              { name: "RXR", required: true, repeating: true },
              {
                name: "COMPONENT",
                required: false,
                repeating: false,
                inline: true,
                segments: [
                  { name: "RXC", required: true, repeating: true },
                  { name: "NTE", required: false, repeating: true, as: "componentNotes" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "ENCODING",
        required: false,
        repeating: false,
        segments: [
          { name: "RXE", required: true, repeating: false },
          { name: "RXR", required: true, repeating: true },
          { name: "RXC", required: false, repeating: true },
        ],
      },
      {
        name: "GIVE",
        required: true,
        repeating: true,
        segments: [
          { name: "RXG", required: true, repeating: false },
          { name: "RXR", required: true, repeating: true },
          { name: "RXC", required: false, repeating: true },
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
        ],
      },
    ],
  },
];

/** The ORDER group of a parsed RGV^O15 (HL7 v2.4) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  detail?: ParsedOrderDetail;
  /** The ENCODING group. */
  encoding?: ParsedEncoding;
  /** The GIVE groups. */
  gives: ParsedGive[];
}

/** The ORDER DETAIL group of a parsed RGV^O15 (HL7 v2.4) message. */
export interface ParsedOrderDetail {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes?: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The NTE segments. */
  componentNotes?: NTE[];
}

/** The ENCODING group of a parsed RGV^O15 (HL7 v2.4) message. */
export interface ParsedEncoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The GIVE group of a parsed RGV^O15 (HL7 v2.4) message. */
export interface ParsedGive {
  /** The RXG segment. */
  give: RXG;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The OBSERVATION groups. */
  observations: ParsedObservation[];
}

/** The OBSERVATION group of a parsed RGV^O15 (HL7 v2.4) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 RGV^O15 (HL7 v2.4) message. */
export interface ParsedRGV_O15 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The segment parsers of RGV^O15 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
  RXE: (s, e) => RXE.parse(s, e),
  RXG: (s, e) => RXG.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
};

/** Parser for HL7 RGV^O15 (HL7 v2.4) messages. */
export class RGV_O15_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RGV_O15";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RGV_O15_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRGV_O15> {
    return parseStructure<ParsedRGV_O15>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RGV^O15 (HL7 v2.4) message string into a structured result. */
export function parseRGV_O15(messageString: string): Result<ParsedRGV_O15> {
  return new RGV_O15_Parser().parse(messageString);
}

/** The ORDER group of an RGV^O15 (HL7 v2.4) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  detail?: OrderDetail;
  /** The ENCODING group. */
  encoding?: Encoding;
  /** The GIVE groups. */
  gives: Give[];
}

/** The ORDER DETAIL group of an RGV^O15 (HL7 v2.4) message being built. */
export interface OrderDetail {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes?: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The NTE segments. */
  componentNotes?: NTE[];
}

/** The ENCODING group of an RGV^O15 (HL7 v2.4) message being built. */
export interface Encoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The GIVE group of an RGV^O15 (HL7 v2.4) message being built. */
export interface Give {
  /** The RXG segment. */
  give: RXG;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The OBSERVATION groups. */
  observations: ObservationGroup[];
}

/** The OBSERVATION group of an RGV^O15 (HL7 v2.4) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an RGV^O15 (HL7 v2.4) message. */
export interface RGV_O15Options {
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** Builder for HL7 RGV^O15 (HL7 v2.4) messages. */
export class RGV_O15<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RGV_O15";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RGV_O15_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: OrderGroup[],
    public options: RGV_O15Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, orders: this.orders };
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

/** Builds an HL7 RGV^O15 (HL7 v2.4) message. */
export function createRGV_O15<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: RGV_O15Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RGV_O15<TMSH> {
  return new RGV_O15(header, orders, options, encoding);
}
