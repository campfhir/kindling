/**
 * Builder, parser and structure for MFN^M15 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_INV_ITEM: MFE IIM }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { MFI } from "../../segments/v2.7/MFI.ts";
import { MFE } from "../../segments/v2.7/MFE.ts";
import { IIM } from "../../segments/v2.7/IIM.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of MFN^M15 (HL7 v2.7), in order. */
export const MFN_M15_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_INV_ITEM",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "IIM", required: true, repeating: false },
    ],
  },
];

/** The MF INV ITEM group of a parsed MFN^M15 (HL7 v2.7) message. */
export interface ParsedMfInvItem {
  /** The MFE segment. */
  entry: MFE;
  /** The IIM segment. */
  inventoryItem: IIM;
}

/** Structured result of parsing an HL7 MFN^M15 (HL7 v2.7) message. */
export interface ParsedMFN_M15 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF INV ITEM groups. */
  mfInvItems: ParsedMfInvItem[];
}

/** The segment parsers of MFN^M15 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  IIM: (s, e) => IIM.parse(s, e),
};

/** Parser for HL7 MFN^M15 (HL7 v2.7) messages. */
export class MFN_M15_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M15";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M15_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M15> {
    return parseStructure<ParsedMFN_M15>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M15 (HL7 v2.7) message string into a structured result. */
export function parseMFN_M15(messageString: string): Result<ParsedMFN_M15> {
  return new MFN_M15_Parser().parse(messageString);
}

/** The MF INV ITEM group of an MFN^M15 (HL7 v2.7) message being built. */
export interface MfInvItemGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The IIM segment. */
  inventoryItem: IIM;
}

/** The optional segments and groups of an MFN^M15 (HL7 v2.7) message. */
export interface MFN_M15Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 MFN^M15 (HL7 v2.7) messages. */
export class MFN_M15<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M15";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M15_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public mfInvItems: MfInvItemGroup[],
    public options: MFN_M15Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, mfInvItems: this.mfInvItems };
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

/** Builds an HL7 MFN^M15 (HL7 v2.7) message. */
export function createMFN_M15<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  mfInvItems: MfInvItemGroup[],
  options: MFN_M15Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M15<TMSH, TMFI> {
  return new MFN_M15(header, masterFile, mfInvItems, options, encoding);
}
