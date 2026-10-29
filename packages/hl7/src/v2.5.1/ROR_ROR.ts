/**
 * Builder, parser and structure for ROR^ROR messages (HL7 v2.5.1).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] { DEFINITION: QRD [QRF] [ PATIENT: PID [{NTE}] ] { ORDER: ORC RXO {RXR} [{RXC}] } } [DSC]
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
import { SFT } from "./SFT.ts";
import { QRD } from "./QRD.ts";
import { QRF } from "./QRF.ts";
import { PID } from "./PID.ts";
import { NTE } from "./NTE.ts";
import { ORC } from "./ORC.ts";
import { RXO } from "./RXO.ts";
import { RXR } from "./RXR.ts";
import { RXC } from "./RXC.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of ROR^ROR (HL7 v2.5.1), in order. */
export const ROR_ROR_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
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
          { name: "RXO", required: true, repeating: false },
          { name: "RXR", required: true, repeating: true },
          { name: "RXC", required: false, repeating: true },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The DEFINITION group of a parsed ROR^ROR (HL7 v2.5.1) message. */
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

/** The ORDER group of a parsed ROR^ROR (HL7 v2.5.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** Structured result of parsing an HL7 ROR^ROR (HL7 v2.5.1) message. */
export interface ParsedROR_ROR extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The DEFINITION groups. */
  definitions: ParsedDefinition[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of ROR^ROR (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 ROR^ROR (HL7 v2.5.1) messages. */
export class ROR_ROR_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ROR_ROR";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ROR_ROR_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedROR_ROR> {
    return parseStructure<ParsedROR_ROR>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ROR^ROR (HL7 v2.5.1) message string into a structured result. */
export function parseROR_ROR(messageString: string): Result<ParsedROR_ROR> {
  return new ROR_ROR_Parser().parse(messageString);
}

/** The DEFINITION group of an ROR^ROR (HL7 v2.5.1) message being built. */
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

/** The ORDER group of an ROR^ROR (HL7 v2.5.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The optional segments and groups of an ROR^ROR (HL7 v2.5.1) message. */
export interface ROR_ROROptions {
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 ROR^ROR (HL7 v2.5.1) messages. */
export class ROR_ROR<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ROR_ROR";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ROR_ROR_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public definitions: DefinitionGroup[],
    public options: ROR_ROROptions = {},
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

/** Builds an HL7 ROR^ROR (HL7 v2.5.1) message. */
export function createROR_ROR<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  definitions: DefinitionGroup[],
  options: ROR_ROROptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ROR_ROR<TMSH, TMSA> {
  return new ROR_ROR(header, acknowledgment, definitions, options, encoding);
}
