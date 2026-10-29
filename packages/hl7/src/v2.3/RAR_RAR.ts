/**
 * Builder, parser and structure for RAR^RAR messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] { DEFINITION: QRD [QRF] [ PATIENT: PID [{NTE}] ] { ORDER: ORC [ ENCODING: RXE {RXR} [{RXC}] ] {RXA} RXR } } [DSC]
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
import { QRD } from "./QRD.ts";
import { QRF } from "./QRF.ts";
import { PID } from "./PID.ts";
import { NTE } from "./NTE.ts";
import { ORC } from "./ORC.ts";
import { RXE } from "./RXE.ts";
import { RXR } from "./RXR.ts";
import { RXC } from "./RXC.ts";
import { RXA } from "./RXA.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RAR^RAR (HL7 v2.3), in order. */
export const RAR_RAR_STRUCTURE: StructureItem[] = [
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
          { name: "RXA", required: true, repeating: true },
          { name: "RXR", required: true, repeating: false },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The DEFINITION group of a parsed RAR^RAR (HL7 v2.3) message. */
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

/** The ORDER group of a parsed RAR^RAR (HL7 v2.3) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ENCODING group. */
  encoding?: ParsedEncoding;
  /** The RXA segments. */
  administrations: RXA[];
  /** The RXR segment. */
  route: RXR;
}

/** The ENCODING group of a parsed RAR^RAR (HL7 v2.3) message. */
export interface ParsedEncoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** Structured result of parsing an HL7 RAR^RAR (HL7 v2.3) message. */
export interface ParsedRAR_RAR extends ParsedMessageBase {
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

/** The segment parsers of RAR^RAR (HL7 v2.3). */
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
  RXA: (s, e) => RXA.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RAR^RAR (HL7 v2.3) messages. */
export class RAR_RAR_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RAR_RAR";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RAR_RAR_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRAR_RAR> {
    return parseStructure<ParsedRAR_RAR>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RAR^RAR (HL7 v2.3) message string into a structured result. */
export function parseRAR_RAR(messageString: string): Result<ParsedRAR_RAR> {
  return new RAR_RAR_Parser().parse(messageString);
}

/** The DEFINITION group of an RAR^RAR (HL7 v2.3) message being built. */
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

/** The ORDER group of an RAR^RAR (HL7 v2.3) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ENCODING group. */
  encoding?: Encoding;
  /** The RXA segments. */
  administrations: RXA[];
  /** The RXR segment. */
  route: RXR;
}

/** The ENCODING group of an RAR^RAR (HL7 v2.3) message being built. */
export interface Encoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The optional segments and groups of an RAR^RAR (HL7 v2.3) message. */
export interface RAR_RAROptions {
  /** The ERR segment. */
  error?: ERR;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RAR^RAR (HL7 v2.3) messages. */
export class RAR_RAR<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RAR_RAR";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RAR_RAR_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public definitions: DefinitionGroup[],
    public options: RAR_RAROptions = {},
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

/** Builds an HL7 RAR^RAR (HL7 v2.3) message. */
export function createRAR_RAR<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  definitions: DefinitionGroup[],
  options: RAR_RAROptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RAR_RAR<TMSH, TMSA> {
  return new RAR_RAR(header, acknowledgment, definitions, options, encoding);
}
