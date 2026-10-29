/**
 * Builder, parser and structure for ORS^O02 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC RQD [{NTE}] } ]
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
import { RQD } from "./RQD.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ORS^O02 (HL7 v2.3.1), in order. */
export const ORS_O02_STRUCTURE: StructureItem[] = [
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
          { name: "RQD", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The ORDER group of a parsed ORS^O02 (HL7 v2.3.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The RQD segment. */
  requisition: RQD;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 ORS^O02 (HL7 v2.3.1) message. */
export interface ParsedORS_O02 extends ParsedMessageBase {
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

/** The segment parsers of ORS^O02 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  RQD: (s, e) => RQD.parse(s, e),
};

/** Parser for HL7 ORS^O02 (HL7 v2.3.1) messages. */
export class ORS_O02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORS_O02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORS_O02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORS_O02> {
    return parseStructure<ParsedORS_O02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORS^O02 (HL7 v2.3.1) message string into a structured result. */
export function parseORS_O02(messageString: string): Result<ParsedORS_O02> {
  return new ORS_O02_Parser().parse(messageString);
}

/** The ORDER group of an ORS^O02 (HL7 v2.3.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The RQD segment. */
  requisition: RQD;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an ORS^O02 (HL7 v2.3.1) message. */
export interface ORS_O02Options {
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

/** Builder for HL7 ORS^O02 (HL7 v2.3.1) messages. */
export class ORS_O02<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORS_O02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORS_O02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: ORS_O02Options = {},
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

/** Builds an HL7 ORS^O02 (HL7 v2.3.1) message. */
export function createORS_O02<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: ORS_O02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORS_O02<TMSH, TMSA> {
  return new ORS_O02(header, acknowledgment, options, encoding);
}
