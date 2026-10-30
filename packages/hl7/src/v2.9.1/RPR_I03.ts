/**
 * Builder, parser and structure for RPR^I03 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MSA { PROVIDER: PRD [{CTD}] } [{PID}] [{GSP}] [{GSR}] [{GSC}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] }]
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
import { MSA } from "./MSA.ts";
import { PRD } from "./PRD.ts";
import { CTD } from "./CTD.ts";
import { PID } from "./PID.ts";
import { GSP } from "./GSP.ts";
import { GSR } from "./GSR.ts";
import { GSC } from "./GSC.ts";
import { NK1 } from "./NK1.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RPR^I03 (HL7 v2.9.1), in order. */
export const RPR_I03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: true, repeating: false },
  {
    name: "PROVIDER",
    required: true,
    repeating: true,
    segments: [
      { name: "PRD", required: true, repeating: false },
      { name: "CTD", required: false, repeating: true },
    ],
  },
  { name: "PID", required: false, repeating: true },
  { name: "GSP", required: false, repeating: true },
  { name: "GSR", required: false, repeating: true },
  { name: "GSC", required: false, repeating: true },
  {
    name: "NEXT_OF_KIN",
    required: false,
    repeating: true,
    segments: [
      { name: "NK1", required: true, repeating: false },
      { name: "GSP", required: false, repeating: true },
      { name: "GSR", required: false, repeating: true },
    ],
  },
];

/** The PROVIDER group of a parsed RPR^I03 (HL7 v2.9.1) message. */
export interface ParsedProvider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The NEXT OF KIN group of a parsed RPR^I03 (HL7 v2.9.1) message. */
export interface ParsedNextOfKin {
  /** The NK1 segment. */
  nextOfKin: NK1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
}

/** Structured result of parsing an HL7 RPR^I03 (HL7 v2.9.1) message. */
export interface ParsedRPR_I03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The PROVIDER groups. */
  providers: ParsedProvider[];
  /** The PID segments. */
  patients?: PID[];
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The NEXT OF KIN groups. */
  nextOfKins?: ParsedNextOfKin[];
}

/** The segment parsers of RPR^I03 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  GSP: (s, e) => GSP.parse(s, e),
  GSR: (s, e) => GSR.parse(s, e),
  GSC: (s, e) => GSC.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
};

/** Parser for HL7 RPR^I03 (HL7 v2.9.1) messages. */
export class RPR_I03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RPR_I03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RPR_I03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRPR_I03> {
    return parseStructure<ParsedRPR_I03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RPR^I03 (HL7 v2.9.1) message string into a structured result. */
export function parseRPR_I03(messageString: string): Result<ParsedRPR_I03> {
  return new RPR_I03_Parser().parse(messageString);
}

/** The PROVIDER group of an RPR^I03 (HL7 v2.9.1) message being built. */
export interface ProviderGroup {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The NEXT OF KIN group of an RPR^I03 (HL7 v2.9.1) message being built. */
export interface NextOfKinGroup {
  /** The NK1 segment. */
  nextOfKin: NK1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
}

/** The optional segments and groups of an RPR^I03 (HL7 v2.9.1) message. */
export interface RPR_I03Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PID segments. */
  patients?: PID[];
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The NEXT OF KIN groups. */
  nextOfKins?: NextOfKinGroup[];
}

/** Builder for HL7 RPR^I03 (HL7 v2.9.1) messages. */
export class RPR_I03<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RPR_I03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RPR_I03_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public providers: ProviderGroup[],
    public options: RPR_I03Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, providers: this.providers };
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

/** Builds an HL7 RPR^I03 (HL7 v2.9.1) message. */
export function createRPR_I03<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  providers: ProviderGroup[],
  options: RPR_I03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RPR_I03<TMSH, TMSA> {
  return new RPR_I03(header, acknowledgment, providers, options, encoding);
}
