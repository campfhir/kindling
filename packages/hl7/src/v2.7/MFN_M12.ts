/**
 * Builder, parser and structure for MFN^M12 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_OBS_ATTRIBUTES: MFE OM1 [OM7] }
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
import { MFI } from "./MFI.ts";
import { MFE } from "./MFE.ts";
import { OM1 } from "./OM1.ts";
import { OM7 } from "./OM7.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of MFN^M12 (HL7 v2.7), in order. */
export const MFN_M12_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_OBS_ATTRIBUTES",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "OM1", required: true, repeating: false },
      { name: "OM7", required: false, repeating: false },
    ],
  },
];

/** The MF OBS ATTRIBUTES group of a parsed MFN^M12 (HL7 v2.7) message. */
export interface ParsedMfObsAttributes {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The OM7 segment. */
  additionalAttributes?: OM7;
}

/** Structured result of parsing an HL7 MFN^M12 (HL7 v2.7) message. */
export interface ParsedMFN_M12 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF OBS ATTRIBUTES groups. */
  mfObsAttributes: ParsedMfObsAttributes[];
}

/** The segment parsers of MFN^M12 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  OM1: (s, e) => OM1.parse(s, e),
  OM7: (s, e) => OM7.parse(s, e),
};

/** Parser for HL7 MFN^M12 (HL7 v2.7) messages. */
export class MFN_M12_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M12";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M12_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M12> {
    return parseStructure<ParsedMFN_M12>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M12 (HL7 v2.7) message string into a structured result. */
export function parseMFN_M12(messageString: string): Result<ParsedMFN_M12> {
  return new MFN_M12_Parser().parse(messageString);
}

/** The MF OBS ATTRIBUTES group of an MFN^M12 (HL7 v2.7) message being built. */
export interface MfObsAttributesGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The OM7 segment. */
  additionalAttributes?: OM7;
}

/** The optional segments and groups of an MFN^M12 (HL7 v2.7) message. */
export interface MFN_M12Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 MFN^M12 (HL7 v2.7) messages. */
export class MFN_M12<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M12";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M12_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public mfObsAttributes: MfObsAttributesGroup[],
    public options: MFN_M12Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, mfObsAttributes: this.mfObsAttributes };
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

/** Builds an HL7 MFN^M12 (HL7 v2.7) message. */
export function createMFN_M12<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  mfObsAttributes: MfObsAttributesGroup[],
  options: MFN_M12Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M12<TMSH, TMFI> {
  return new MFN_M12(header, masterFile, mfObsAttributes, options, encoding);
}
