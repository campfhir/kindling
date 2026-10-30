/**
 * Builder, parser and structure for ORM^O01 messages (HL7 v2.1).
 *
 * Structure: MSH [{NTE}] [ PATIENT: PID [{NTE}] [PV1] ] { ORDER: ORC [ ORDER_DETAIL: <OBR|ORO|RX1> [{NTE}] [{OBX}] [{NTE}] ] [BLG] }
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
import { PV1 } from "./PV1.ts";
import { ORC } from "./ORC.ts";
import { OBR } from "./OBR.ts";
import { ORO } from "./ORO.ts";
import { RX1 } from "./RX1.ts";
import { OBX } from "./OBX.ts";
import { BLG } from "./BLG.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ORM^O01 (HL7 v2.1), in order. */
export const ORM_O01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "NTE", required: false, repeating: true },
  {
    name: "PATIENT",
    required: false,
    repeating: false,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      { name: "PV1", required: false, repeating: false },
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
        segments: [
          { oneOf: ["OBR", "ORO", "RX1"], required: true },
          { name: "NTE", required: false, repeating: true },
          { name: "OBX", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true, as: "nte2" },
        ],
      },
      { name: "BLG", required: false, repeating: false },
    ],
  },
];

/** The PATIENT group of a parsed ORM^O01 (HL7 v2.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PV1 segment. */
  visit?: PV1;
}

/** The ORDER group of a parsed ORM^O01 (HL7 v2.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  orderDetail?: ParsedOrderDetail;
  /** The BLG segment. */
  billing?: BLG;
}

/** The ORDER DETAIL group of a parsed ORM^O01 (HL7 v2.1) message. */
export interface ParsedOrderDetail {
  /** One of OBR, ORO, RX1. */
  segment: OBR | ORO | RX1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBX segments. */
  observations?: OBX[];
  /** The NTE segments. */
  nte2?: NTE[];
}

/** Structured result of parsing an HL7 ORM^O01 (HL7 v2.1) message. */
export interface ParsedORM_O01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The segment parsers of ORM^O01 (HL7 v2.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  ORO: (s, e) => ORO.parse(s, e),
  RX1: (s, e) => RX1.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  BLG: (s, e) => BLG.parse(s, e),
};

/** Parser for HL7 ORM^O01 (HL7 v2.1) messages. */
export class ORM_O01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORM_O01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORM_O01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORM_O01> {
    return parseStructure<ParsedORM_O01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORM^O01 (HL7 v2.1) message string into a structured result. */
export function parseORM_O01(messageString: string): Result<ParsedORM_O01> {
  return new ORM_O01_Parser().parse(messageString);
}

/** The PATIENT group of an ORM^O01 (HL7 v2.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PV1 segment. */
  visit?: PV1;
}

/** The ORDER group of an ORM^O01 (HL7 v2.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  orderDetail?: OrderDetailGroup;
  /** The BLG segment. */
  billing?: BLG;
}

/** The ORDER DETAIL group of an ORM^O01 (HL7 v2.1) message being built. */
export interface OrderDetailGroup {
  /** One of OBR, ORO, RX1. */
  segment: OBR | ORO | RX1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBX segments. */
  observations?: OBX[];
  /** The NTE segments. */
  nte2?: NTE[];
}

/** The optional segments and groups of an ORM^O01 (HL7 v2.1) message. */
export interface ORM_O01Options {
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: PatientGroup;
}

/** Builder for HL7 ORM^O01 (HL7 v2.1) messages. */
export class ORM_O01<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORM_O01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORM_O01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: OrderGroup[],
    public options: ORM_O01Options = {},
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

/** Builds an HL7 ORM^O01 (HL7 v2.1) message. */
export function createORM_O01<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: ORM_O01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORM_O01<TMSH> {
  return new ORM_O01(header, orders, options, encoding);
}
