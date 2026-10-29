/**
 * Builder, parser and structure for ORD^O02 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER_DIET: ORC [{ODS}] [{NTE}] } [{ ORDER_TRAY: ORC [{ODT}] [{NTE}] }] ]
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
import { ORC } from "./ORC.ts";
import { ODS } from "./ODS.ts";
import { ODT } from "./ODT.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ORD^O02 (HL7 v2.3), in order. */
export const ORD_O02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "NTE", required: false, repeating: true },
  {
    name: "RESPONSE",
    required: false,
    repeating: false,
    inline: true,
    segments: [
      {
        name: "PATIENT",
        required: false,
        repeating: false,
        inline: true,
        segments: [
          { name: "PID", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true, as: "patientNotes" },
        ],
      },
      {
        name: "ORDER_DIET",
        required: true,
        repeating: true,
        as: "dietOrders",
        segments: [
          { name: "ORC", required: true, repeating: false },
          { name: "ODS", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "ORDER_TRAY",
        required: false,
        repeating: true,
        as: "trayOrders",
        segments: [
          { name: "ORC", required: true, repeating: false },
          { name: "ODT", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The ORDER DIET group of a parsed ORD^O02 (HL7 v2.3) message. */
export interface ParsedDietOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ODS segments. */
  diets?: ODS[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER TRAY group of a parsed ORD^O02 (HL7 v2.3) message. */
export interface ParsedTrayOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ODT segments. */
  dietTrays?: ODT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 ORD^O02 (HL7 v2.3) message. */
export interface ParsedORD_O02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER DIET groups. */
  dietOrders?: ParsedDietOrder[];
  /** The ORDER TRAY groups. */
  trayOrders?: ParsedTrayOrder[];
}

/** The segment parsers of ORD^O02 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  ODS: (s, e) => ODS.parse(s, e),
  ODT: (s, e) => ODT.parse(s, e),
};

/** Parser for HL7 ORD^O02 (HL7 v2.3) messages. */
export class ORD_O02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORD_O02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORD_O02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORD_O02> {
    return parseStructure<ParsedORD_O02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORD^O02 (HL7 v2.3) message string into a structured result. */
export function parseORD_O02(messageString: string): Result<ParsedORD_O02> {
  return new ORD_O02_Parser().parse(messageString);
}

/** The ORDER DIET group of an ORD^O02 (HL7 v2.3) message being built. */
export interface DietOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ODS segments. */
  diets?: ODS[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER TRAY group of an ORD^O02 (HL7 v2.3) message being built. */
export interface TrayOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ODT segments. */
  dietTrays?: ODT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an ORD^O02 (HL7 v2.3) message. */
export interface ORD_O02Options {
  /** The ERR segment. */
  error?: ERR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER DIET groups. */
  dietOrders?: DietOrder[];
  /** The ORDER TRAY groups. */
  trayOrders?: TrayOrder[];
}

/** Builder for HL7 ORD^O02 (HL7 v2.3) messages. */
export class ORD_O02<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORD_O02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORD_O02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: ORD_O02Options = {},
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

/** Builds an HL7 ORD^O02 (HL7 v2.3) message. */
export function createORD_O02<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: ORD_O02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORD_O02<TMSH, TMSA> {
  return new ORD_O02(header, acknowledgment, options, encoding);
}
