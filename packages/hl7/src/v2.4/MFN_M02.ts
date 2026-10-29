/**
 * Builder, parser and structure for MFN^M02 messages (HL7 v2.4).
 *
 * Structure: MSH MFI { MF_STAFF: MFE STF [PRA] [ORG] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { MFI } from "./MFI.ts";
import { MFE } from "./MFE.ts";
import { STF } from "./STF.ts";
import { PRA } from "./PRA.ts";
import { ORG } from "./ORG.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MFN^M02 (HL7 v2.4), in order. */
export const MFN_M02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_STAFF",
    required: true,
    repeating: true,
    as: "staffEntries",
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "STF", required: true, repeating: false },
      { name: "PRA", required: false, repeating: false },
      { name: "ORG", required: false, repeating: false },
    ],
  },
];

/** The MF STAFF group of a parsed MFN^M02 (HL7 v2.4) message. */
export interface ParsedStaffEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The STF segment. */
  staff: STF;
  /** The PRA segment. */
  practitioner?: PRA;
  /** The ORG segment. */
  organizationUnit?: ORG;
}

/** Structured result of parsing an HL7 MFN^M02 (HL7 v2.4) message. */
export interface ParsedMFN_M02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF STAFF groups. */
  staffEntries: ParsedStaffEntry[];
}

/** The segment parsers of MFN^M02 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  STF: (s, e) => STF.parse(s, e),
  PRA: (s, e) => PRA.parse(s, e),
  ORG: (s, e) => ORG.parse(s, e),
};

/** Parser for HL7 MFN^M02 (HL7 v2.4) messages. */
export class MFN_M02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M02> {
    return parseStructure<ParsedMFN_M02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M02 (HL7 v2.4) message string into a structured result. */
export function parseMFN_M02(messageString: string): Result<ParsedMFN_M02> {
  return new MFN_M02_Parser().parse(messageString);
}

/** The MF STAFF group of an MFN^M02 (HL7 v2.4) message being built. */
export interface StaffEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The STF segment. */
  staff: STF;
  /** The PRA segment. */
  practitioner?: PRA;
  /** The ORG segment. */
  organizationUnit?: ORG;
}

/** The optional segments and groups of an MFN^M02 (HL7 v2.4) message. The message has none. */
export type MFN_M02Options = Record<string, never>;

/** Builder for HL7 MFN^M02 (HL7 v2.4) messages. */
export class MFN_M02<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public staffEntries: StaffEntry[],
    public options: MFN_M02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, staffEntries: this.staffEntries };
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

/** Builds an HL7 MFN^M02 (HL7 v2.4) message. */
export function createMFN_M02<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  staffEntries: StaffEntry[],
  options: MFN_M02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M02<TMSH, TMFI> {
  return new MFN_M02(header, masterFile, staffEntries, options, encoding);
}
