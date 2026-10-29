/**
 * Builder, parser and structure for OSR^Q06 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA [ERR] [{NTE}] QRD [QRF] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [<OBR|RQD|RQ1|RXO|ODS|ODT>] [{NTE}] [{CTI}] } ] [DSC]
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
import { QRD } from "../../segments/v2.3.1/QRD.ts";
import { QRF } from "../../segments/v2.3.1/QRF.ts";
import { PID } from "../../segments/v2.3.1/PID.ts";
import { ORC } from "../../segments/v2.3.1/ORC.ts";
import { OBR } from "../../segments/v2.3.1/OBR.ts";
import { RQD } from "../../segments/v2.3.1/RQD.ts";
import { RQ1 } from "../../segments/v2.3.1/RQ1.ts";
import { RXO } from "../../segments/v2.3.1/RXO.ts";
import { ODS } from "../../segments/v2.3.1/ODS.ts";
import { ODT } from "../../segments/v2.3.1/ODT.ts";
import { CTI } from "../../segments/v2.3.1/CTI.ts";
import { DSC } from "../../segments/v2.3.1/DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of OSR^Q06 (HL7 v2.3.1), in order. */
export const OSR_Q06_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "NTE", required: false, repeating: true },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
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
          { oneOf: ["OBR", "RQD", "RQ1", "RXO", "ODS", "ODT"], required: false },
          { name: "NTE", required: false, repeating: true },
          { name: "CTI", required: false, repeating: true },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The ORDER group of a parsed OSR^Q06 (HL7 v2.3.1) message. */
export interface ParsedResponseOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** One of OBR, RQD, RQ1, RXO, ODS, ODT. */
  segment?: OBR | RQD | RQ1 | RXO | ODS | ODT;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** Structured result of parsing an HL7 OSR^Q06 (HL7 v2.3.1) message. */
export interface ParsedOSR_Q06 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders?: ParsedResponseOrder[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of OSR^Q06 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  RQD: (s, e) => RQD.parse(s, e),
  RQ1: (s, e) => RQ1.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  ODS: (s, e) => ODS.parse(s, e),
  ODT: (s, e) => ODT.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 OSR^Q06 (HL7 v2.3.1) messages. */
export class OSR_Q06_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OSR_Q06";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OSR_Q06_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOSR_Q06> {
    return parseStructure<ParsedOSR_Q06>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OSR^Q06 (HL7 v2.3.1) message string into a structured result. */
export function parseOSR_Q06(messageString: string): Result<ParsedOSR_Q06> {
  return new OSR_Q06_Parser().parse(messageString);
}

/** The ORDER group of an OSR^Q06 (HL7 v2.3.1) message being built. */
export interface ResponseOrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** One of OBR, RQD, RQ1, RXO, ODS, ODT. */
  segment?: OBR | RQD | RQ1 | RXO | ODS | ODT;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The optional segments and groups of an OSR^Q06 (HL7 v2.3.1) message. */
export interface OSR_Q06Options {
  /** The ERR segment. */
  error?: ERR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders?: ResponseOrderGroup[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 OSR^Q06 (HL7 v2.3.1) messages. */
export class OSR_Q06<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OSR_Q06";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OSR_Q06_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public options: OSR_Q06Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query };
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

/** Builds an HL7 OSR^Q06 (HL7 v2.3.1) message. */
export function createOSR_Q06<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  options: OSR_Q06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OSR_Q06<TMSH, TMSA, TQRD> {
  return new OSR_Q06(header, acknowledgment, query, options, encoding);
}
