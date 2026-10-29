/**
 * Builder, parser and structure for RDR^RDR messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] { DEFINITION: QRD [QRF] [ PATIENT: PID [{NTE}] ] { ORDER: ORC [ ENCODING: RXE {RXR} [{RXC}] ] { DISPENSE: RXD {RXR} [{RXC}] } } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { ERR } from "../../segments/v2.3/ERR.ts";
import { QRD } from "../../segments/v2.3/QRD.ts";
import { QRF } from "../../segments/v2.3/QRF.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { NTE } from "../../segments/v2.3/NTE.ts";
import { ORC } from "../../segments/v2.3/ORC.ts";
import { RXE } from "../../segments/v2.3/RXE.ts";
import { RXR } from "../../segments/v2.3/RXR.ts";
import { RXC } from "../../segments/v2.3/RXC.ts";
import { RXD } from "../../segments/v2.3/RXD.ts";
import { DSC } from "../../segments/v2.3/DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of RDR^RDR (HL7 v2.3), in order. */
export const RDR_RDR_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  {
    name: "DEFINITION",
    required: true,
    repeating: true,
    segments: [
      { name: "QRD", required: true, repeating: false },
      { name: "QRF", required: false, repeating: false },
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
            name: "DISPENSE",
            required: true,
            repeating: true,
            segments: [
              { name: "RXD", required: true, repeating: false },
              { name: "RXR", required: true, repeating: true },
              { name: "RXC", required: false, repeating: true },
            ],
          },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The DEFINITION group of a parsed RDR^RDR (HL7 v2.3) message. */
export interface ParsedDefinition {
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The ORDER group of a parsed RDR^RDR (HL7 v2.3) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ENCODING group. */
  encoding?: ParsedEncoding;
  /** The DISPENSE groups. */
  dispenses: ParsedDispense[];
}

/** The ENCODING group of a parsed RDR^RDR (HL7 v2.3) message. */
export interface ParsedEncoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The DISPENSE group of a parsed RDR^RDR (HL7 v2.3) message. */
export interface ParsedDispense {
  /** The RXD segment. */
  dispense: RXD;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** Structured result of parsing an HL7 RDR^RDR (HL7 v2.3) message. */
export interface ParsedRDR_RDR extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The DEFINITION groups. */
  definitions: ParsedDefinition[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RDR^RDR (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  RXE: (s, e) => RXE.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
  RXD: (s, e) => RXD.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RDR^RDR (HL7 v2.3) messages. */
export class RDR_RDR_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RDR_RDR";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RDR_RDR_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRDR_RDR> {
    return parseStructure<ParsedRDR_RDR>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RDR^RDR (HL7 v2.3) message string into a structured result. */
export function parseRDR_RDR(messageString: string): Result<ParsedRDR_RDR> {
  return new RDR_RDR_Parser().parse(messageString);
}

/** The DEFINITION group of an RDR^RDR (HL7 v2.3) message being built. */
export interface DefinitionGroup {
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The ORDER group of an RDR^RDR (HL7 v2.3) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ENCODING group. */
  encoding?: Encoding;
  /** The DISPENSE groups. */
  dispenses: Dispense[];
}

/** The ENCODING group of an RDR^RDR (HL7 v2.3) message being built. */
export interface Encoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The DISPENSE group of an RDR^RDR (HL7 v2.3) message being built. */
export interface Dispense {
  /** The RXD segment. */
  dispense: RXD;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The optional segments and groups of an RDR^RDR (HL7 v2.3) message. */
export interface RDR_RDROptions {
  /** The ERR segment. */
  error?: ERR;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RDR^RDR (HL7 v2.3) messages. */
export class RDR_RDR<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RDR_RDR";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RDR_RDR_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public definitions: DefinitionGroup[],
    public options: RDR_RDROptions = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, definitions: this.definitions };
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

/** Builds an HL7 RDR^RDR (HL7 v2.3) message. */
export function createRDR_RDR<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  definitions: DefinitionGroup[],
  options: RDR_RDROptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RDR_RDR<TMSH, TMSA> {
  return new RDR_RDR(header, acknowledgment, definitions, options, encoding);
}
