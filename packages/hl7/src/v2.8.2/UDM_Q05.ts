/**
 * Builder, parser and structure for UDM^Q05 messages (HL7 v2.8.2).
 *
 * Structure: MSH [{SFT}] [UAC] URD [URS] {DSP} [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { URD } from "./URD.ts";
import { URS } from "./URS.ts";
import { DSP } from "./DSP.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of UDM^Q05 (HL7 v2.8.2), in order. */
export const UDM_Q05_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "URD", required: true, repeating: false },
  { name: "URS", required: false, repeating: false },
  { name: "DSP", required: true, repeating: true },
  { name: "DSC", required: false, repeating: false },
];

/** Structured result of parsing an HL7 UDM^Q05 (HL7 v2.8.2) message. */
export interface ParsedUDM_Q05 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The URD segment. */
  updateDefinition: URD;
  /** The URS segment. */
  updateSelection?: URS;
  /** The DSP segments. */
  displayLines: DSP[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of UDM^Q05 (HL7 v2.8.2). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  URD: (s, e) => URD.parse(s, e),
  URS: (s, e) => URS.parse(s, e),
  DSP: (s, e) => DSP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 UDM^Q05 (HL7 v2.8.2) messages. */
export class UDM_Q05_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "UDM_Q05";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = UDM_Q05_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedUDM_Q05> {
    return parseStructure<ParsedUDM_Q05>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 UDM^Q05 (HL7 v2.8.2) message string into a structured result. */
export function parseUDM_Q05(messageString: string): Result<ParsedUDM_Q05> {
  return new UDM_Q05_Parser().parse(messageString);
}

/** The optional segments and groups of an UDM^Q05 (HL7 v2.8.2) message. */
export interface UDM_Q05Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The URS segment. */
  updateSelection?: URS;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 UDM^Q05 (HL7 v2.8.2) messages. */
export class UDM_Q05<TMSH extends MSH = MSH, TURD extends URD = URD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "UDM_Q05";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = UDM_Q05_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public updateDefinition: TURD,
    public displayLines: DSP[],
    public options: UDM_Q05Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, updateDefinition: this.updateDefinition, displayLines: this.displayLines };
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

/** Builds an HL7 UDM^Q05 (HL7 v2.8.2) message. */
export function createUDM_Q05<TMSH extends MSH = MSH, TURD extends URD = URD>(
  header: TMSH,
  updateDefinition: TURD,
  displayLines: DSP[],
  options: UDM_Q05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): UDM_Q05<TMSH, TURD> {
  return new UDM_Q05(header, updateDefinition, displayLines, options, encoding);
}
