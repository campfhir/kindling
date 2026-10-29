/**
 * Builder, parser and structure for SPQ^Q08 messages (HL7 v2.3.1).
 *
 * Structure: MSH SPR [RDF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { SPR } from "../../segments/v2.3.1/SPR.ts";
import { RDF } from "../../segments/v2.3.1/RDF.ts";
import { DSC } from "../../segments/v2.3.1/DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of SPQ^Q08 (HL7 v2.3.1), in order. */
export const SPQ_Q08_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SPR", required: true, repeating: false },
  { name: "RDF", required: false, repeating: false },
  { name: "DSC", required: false, repeating: false },
];

/** Structured result of parsing an HL7 SPQ^Q08 (HL7 v2.3.1) message. */
export interface ParsedSPQ_Q08 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SPR segment. */
  storedProcedureRequest: SPR;
  /** The RDF segment. */
  rowDefinition?: RDF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of SPQ^Q08 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SPR: (s, e) => SPR.parse(s, e),
  RDF: (s, e) => RDF.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 SPQ^Q08 (HL7 v2.3.1) messages. */
export class SPQ_Q08_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SPQ_Q08";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SPQ_Q08_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSPQ_Q08> {
    return parseStructure<ParsedSPQ_Q08>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SPQ^Q08 (HL7 v2.3.1) message string into a structured result. */
export function parseSPQ_Q08(messageString: string): Result<ParsedSPQ_Q08> {
  return new SPQ_Q08_Parser().parse(messageString);
}

/** The optional segments and groups of an SPQ^Q08 (HL7 v2.3.1) message. */
export interface SPQ_Q08Options {
  /** The RDF segment. */
  rowDefinition?: RDF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 SPQ^Q08 (HL7 v2.3.1) messages. */
export class SPQ_Q08<TMSH extends MSH = MSH, TSPR extends SPR = SPR> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SPQ_Q08";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SPQ_Q08_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public storedProcedureRequest: TSPR,
    public options: SPQ_Q08Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, storedProcedureRequest: this.storedProcedureRequest };
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

/** Builds an HL7 SPQ^Q08 (HL7 v2.3.1) message. */
export function createSPQ_Q08<TMSH extends MSH = MSH, TSPR extends SPR = SPR>(
  header: TMSH,
  storedProcedureRequest: TSPR,
  options: SPQ_Q08Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SPQ_Q08<TMSH, TSPR> {
  return new SPQ_Q08(header, storedProcedureRequest, options, encoding);
}
