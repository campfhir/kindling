/**
 * Builder, parser and structure for SSU^U03 messages (HL7 v2.8.2).
 *
 * Structure: MSH [{SFT}] [UAC] EQU { SPECIMEN_CONTAINER: SAC [{OBX}] [{NTE}] [{ SPECIMEN: SPM [{OBX}] }] }
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
import { EQU } from "./EQU.ts";
import { SAC } from "./SAC.ts";
import { OBX } from "./OBX.ts";
import { NTE } from "./NTE.ts";
import { SPM } from "./SPM.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of SSU^U03 (HL7 v2.8.2), in order. */
export const SSU_U03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EQU", required: true, repeating: false },
  {
    name: "SPECIMEN_CONTAINER",
    required: true,
    repeating: true,
    segments: [
      { name: "SAC", required: true, repeating: false },
      { name: "OBX", required: false, repeating: true },
      { name: "NTE", required: false, repeating: true },
      {
        name: "SPECIMEN",
        required: false,
        repeating: true,
        segments: [
          { name: "SPM", required: true, repeating: false },
          { name: "OBX", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The SPECIMEN CONTAINER group of a parsed SSU^U03 (HL7 v2.8.2) message. */
export interface ParsedSpecimenContainer {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The OBX segments. */
  observations?: OBX[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The SPECIMEN groups. */
  specimens?: ParsedSpecimen[];
}

/** The SPECIMEN group of a parsed SSU^U03 (HL7 v2.8.2) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The OBX segments. */
  observations?: OBX[];
}

/** Structured result of parsing an HL7 SSU^U03 (HL7 v2.8.2) message. */
export interface ParsedSSU_U03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The SPECIMEN CONTAINER groups. */
  specimenContainers: ParsedSpecimenContainer[];
}

/** The segment parsers of SSU^U03 (HL7 v2.8.2). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EQU: (s, e) => EQU.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
};

/** Parser for HL7 SSU^U03 (HL7 v2.8.2) messages. */
export class SSU_U03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SSU_U03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SSU_U03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSSU_U03> {
    return parseStructure<ParsedSSU_U03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SSU^U03 (HL7 v2.8.2) message string into a structured result. */
export function parseSSU_U03(messageString: string): Result<ParsedSSU_U03> {
  return new SSU_U03_Parser().parse(messageString);
}

/** The SPECIMEN CONTAINER group of an SSU^U03 (HL7 v2.8.2) message being built. */
export interface SpecimenContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The OBX segments. */
  observations?: OBX[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The SPECIMEN groups. */
  specimens?: SpecimenGroup[];
}

/** The SPECIMEN group of an SSU^U03 (HL7 v2.8.2) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The OBX segments. */
  observations?: OBX[];
}

/** The optional segments and groups of an SSU^U03 (HL7 v2.8.2) message. */
export interface SSU_U03Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 SSU^U03 (HL7 v2.8.2) messages. */
export class SSU_U03<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SSU_U03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SSU_U03_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public specimenContainers: SpecimenContainerGroup[],
    public options: SSU_U03Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, equipmentDetail: this.equipmentDetail, specimenContainers: this.specimenContainers };
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

/** Builds an HL7 SSU^U03 (HL7 v2.8.2) message. */
export function createSSU_U03<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  specimenContainers: SpecimenContainerGroup[],
  options: SSU_U03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SSU_U03<TMSH, TEQU> {
  return new SSU_U03(header, equipmentDetail, specimenContainers, options, encoding);
}
