/**
 * Builder, parser and structure for VQQ^Q01 messages (HL7 v2.3).
 *
 * Structure: MSH VTQ [RDF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { VTQ } from "./VTQ.ts";
import { RDF } from "./RDF.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of VQQ^Q01 (HL7 v2.3), in order. */
export const VQQ_Q01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "VTQ", required: true, repeating: false },
  { name: "RDF", required: false, repeating: false },
  { name: "DSC", required: false, repeating: false },
];

/** Structured result of parsing an HL7 VQQ^Q01 (HL7 v2.3) message. */
export interface ParsedVQQ_Q01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The VTQ segment. */
  virtualTableQuery: VTQ;
  /** The RDF segment. */
  rowDefinition?: RDF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of VQQ^Q01 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  VTQ: (s, e) => VTQ.parse(s, e),
  RDF: (s, e) => RDF.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 VQQ^Q01 (HL7 v2.3) messages. */
export class VQQ_Q01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "VQQ_Q01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = VQQ_Q01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedVQQ_Q01> {
    return parseStructure<ParsedVQQ_Q01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 VQQ^Q01 (HL7 v2.3) message string into a structured result. */
export function parseVQQ_Q01(messageString: string): Result<ParsedVQQ_Q01> {
  return new VQQ_Q01_Parser().parse(messageString);
}

/** The optional segments and groups of an VQQ^Q01 (HL7 v2.3) message. */
export interface VQQ_Q01Options {
  /** The RDF segment. */
  rowDefinition?: RDF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 VQQ^Q01 (HL7 v2.3) messages. */
export class VQQ_Q01<TMSH extends MSH = MSH, TVTQ extends VTQ = VTQ> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "VQQ_Q01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = VQQ_Q01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public virtualTableQuery: TVTQ,
    public options: VQQ_Q01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, virtualTableQuery: this.virtualTableQuery };
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

/** Builds an HL7 VQQ^Q01 (HL7 v2.3) message. */
export function createVQQ_Q01<TMSH extends MSH = MSH, TVTQ extends VTQ = VTQ>(
  header: TMSH,
  virtualTableQuery: TVTQ,
  options: VQQ_Q01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): VQQ_Q01<TMSH, TVTQ> {
  return new VQQ_Q01(header, virtualTableQuery, options, encoding);
}
