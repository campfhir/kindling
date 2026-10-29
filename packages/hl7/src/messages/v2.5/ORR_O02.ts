/**
 * Builder, parser and structure for ORR^O02 messages (HL7 v2.5).
 *
 * Structure: MSH MSA [{ERR}] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{CTI}] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { MSA } from "../../segments/v2.5/MSA.ts";
import { ERR } from "../../segments/v2.5/ERR.ts";
import { NTE } from "../../segments/v2.5/NTE.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { ORC } from "../../segments/v2.5/ORC.ts";
import { OBR } from "../../segments/v2.5/OBR.ts";
import { RQD } from "../../segments/v2.5/RQD.ts";
import { RQ1 } from "../../segments/v2.5/RQ1.ts";
import { RXO } from "../../segments/v2.5/RXO.ts";
import { ODS } from "../../segments/v2.5/ODS.ts";
import { ODT } from "../../segments/v2.5/ODT.ts";
import { CTI } from "../../segments/v2.5/CTI.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of ORR^O02 (HL7 v2.5), in order. */
export const ORR_O02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
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
          { oneOf: ["OBR", "RQD", "RQ1", "RXO", "ODS", "ODT"], required: true },
          { name: "NTE", required: false, repeating: true },
          { name: "CTI", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The ORDER group of a parsed ORR^O02 (HL7 v2.5) message. */
export interface ParsedResponseOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** One of OBR, RQD, RQ1, RXO, ODS, ODT. */
  segment: OBR | RQD | RQ1 | RXO | ODS | ODT;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** Structured result of parsing an HL7 ORR^O02 (HL7 v2.5) message. */
export interface ParsedORR_O02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders?: ParsedResponseOrder[];
}

/** The segment parsers of ORR^O02 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  RQD: (s, e) => RQD.parse(s, e),
  RQ1: (s, e) => RQ1.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  ODS: (s, e) => ODS.parse(s, e),
  ODT: (s, e) => ODT.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
};

/** Parser for HL7 ORR^O02 (HL7 v2.5) messages. */
export class ORR_O02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORR_O02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORR_O02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORR_O02> {
    return parseStructure<ParsedORR_O02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORR^O02 (HL7 v2.5) message string into a structured result. */
export function parseORR_O02(messageString: string): Result<ParsedORR_O02> {
  return new ORR_O02_Parser().parse(messageString);
}

/** The ORDER group of an ORR^O02 (HL7 v2.5) message being built. */
export interface ResponseOrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** One of OBR, RQD, RQ1, RXO, ODS, ODT. */
  segment: OBR | RQD | RQ1 | RXO | ODS | ODT;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The optional segments and groups of an ORR^O02 (HL7 v2.5) message. */
export interface ORR_O02Options {
  /** The ERR segments. */
  errors?: ERR[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders?: ResponseOrderGroup[];
}

/** Builder for HL7 ORR^O02 (HL7 v2.5) messages. */
export class ORR_O02<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORR_O02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORR_O02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: ORR_O02Options = {},
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

/** Builds an HL7 ORR^O02 (HL7 v2.5) message. */
export function createORR_O02<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: ORR_O02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORR_O02<TMSH, TMSA> {
  return new ORR_O02(header, acknowledgment, options, encoding);
}
