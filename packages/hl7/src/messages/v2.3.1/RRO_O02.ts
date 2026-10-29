/**
 * Builder, parser and structure for RRO^O02 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [ ORDER_DETAIL: RXO [{NTE}] {RXR} [{RXC}] [{NTE}] ] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { MSA } from "../../segments/v2.3.1/MSA.ts";
import { ERR } from "../../segments/v2.3.1/ERR.ts";
import { NTE } from "../../segments/v2.3.1/NTE.ts";
import { PID } from "../../segments/v2.3.1/PID.ts";
import { ORC } from "../../segments/v2.3.1/ORC.ts";
import { RXO } from "../../segments/v2.3.1/RXO.ts";
import { RXR } from "../../segments/v2.3.1/RXR.ts";
import { RXC } from "../../segments/v2.3.1/RXC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of RRO^O02 (HL7 v2.3.1), in order. */
export const RRO_O02_STRUCTURE: StructureItem[] = [
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
              { name: "NTE", required: false, repeating: true },
              { name: "RXR", required: true, repeating: true },
              { name: "RXC", required: false, repeating: true },
              { name: "NTE", required: false, repeating: true, as: "componentNotes" },
            ],
          },
        ],
      },
    ],
  },
];

/** The ORDER group of a parsed RRO^O02 (HL7 v2.3.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  detail?: ParsedOrderDetail;
}

/** The ORDER DETAIL group of a parsed RRO^O02 (HL7 v2.3.1) message. */
export interface ParsedOrderDetail {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The NTE segments. */
  componentNotes?: NTE[];
}

/** Structured result of parsing an HL7 RRO^O02 (HL7 v2.3.1) message. */
export interface ParsedRRO_O02 extends ParsedMessageBase {
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
  /** The ORDER groups. */
  orders?: ParsedOrder[];
}

/** The segment parsers of RRO^O02 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
};

/** Parser for HL7 RRO^O02 (HL7 v2.3.1) messages. */
export class RRO_O02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RRO_O02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RRO_O02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRRO_O02> {
    return parseStructure<ParsedRRO_O02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RRO^O02 (HL7 v2.3.1) message string into a structured result. */
export function parseRRO_O02(messageString: string): Result<ParsedRRO_O02> {
  return new RRO_O02_Parser().parse(messageString);
}

/** The ORDER group of an RRO^O02 (HL7 v2.3.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  detail?: OrderDetail;
}

/** The ORDER DETAIL group of an RRO^O02 (HL7 v2.3.1) message being built. */
export interface OrderDetail {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The NTE segments. */
  componentNotes?: NTE[];
}

/** The optional segments and groups of an RRO^O02 (HL7 v2.3.1) message. */
export interface RRO_O02Options {
  /** The ERR segment. */
  error?: ERR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders?: OrderGroup[];
}

/** Builder for HL7 RRO^O02 (HL7 v2.3.1) messages. */
export class RRO_O02<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RRO_O02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RRO_O02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: RRO_O02Options = {},
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

/** Builds an HL7 RRO^O02 (HL7 v2.3.1) message. */
export function createRRO_O02<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: RRO_O02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RRO_O02<TMSH, TMSA> {
  return new RRO_O02(header, acknowledgment, options, encoding);
}
