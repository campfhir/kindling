/**
 * Builder, parser and structure for TCR^U11 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EQU { TEST_CONFIGURATION: [SPM] {TCC} } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { EQU } from "../../segments/v2.5/EQU.ts";
import { SPM } from "../../segments/v2.5/SPM.ts";
import { TCC } from "../../segments/v2.5/TCC.ts";
import { ROL } from "../../segments/v2.5/ROL.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of TCR^U11 (HL7 v2.5), in order. */
export const TCR_U11_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EQU", required: true, repeating: false },
  {
    name: "TEST_CONFIGURATION",
    required: true,
    repeating: true,
    segments: [
      { name: "SPM", required: false, repeating: false },
      { name: "TCC", required: true, repeating: true },
    ],
  },
  { name: "ROL", required: false, repeating: false },
];

/** The TEST CONFIGURATION group of a parsed TCR^U11 (HL7 v2.5) message. */
export interface ParsedTestConfiguration {
  /** The SPM segment. */
  specimen?: SPM;
  /** The TCC segments. */
  testCodeConfigurations: TCC[];
}

/** Structured result of parsing an HL7 TCR^U11 (HL7 v2.5) message. */
export interface ParsedTCR_U11 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The TEST CONFIGURATION groups. */
  testConfigurations: ParsedTestConfiguration[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of TCR^U11 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  EQU: (s, e) => EQU.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  TCC: (s, e) => TCC.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 TCR^U11 (HL7 v2.5) messages. */
export class TCR_U11_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "TCR_U11";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = TCR_U11_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedTCR_U11> {
    return parseStructure<ParsedTCR_U11>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 TCR^U11 (HL7 v2.5) message string into a structured result. */
export function parseTCR_U11(messageString: string): Result<ParsedTCR_U11> {
  return new TCR_U11_Parser().parse(messageString);
}

/** The TEST CONFIGURATION group of an TCR^U11 (HL7 v2.5) message being built. */
export interface TestConfigurationGroup {
  /** The SPM segment. */
  specimen?: SPM;
  /** The TCC segments. */
  testCodeConfigurations: TCC[];
}

/** The optional segments and groups of an TCR^U11 (HL7 v2.5) message. */
export interface TCR_U11Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 TCR^U11 (HL7 v2.5) messages. */
export class TCR_U11<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "TCR_U11";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = TCR_U11_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public testConfigurations: TestConfigurationGroup[],
    public options: TCR_U11Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, equipmentDetail: this.equipmentDetail, testConfigurations: this.testConfigurations };
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

/** Builds an HL7 TCR^U11 (HL7 v2.5) message. */
export function createTCR_U11<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  testConfigurations: TestConfigurationGroup[],
  options: TCR_U11Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): TCR_U11<TMSH, TEQU> {
  return new TCR_U11(header, equipmentDetail, testConfigurations, options, encoding);
}
