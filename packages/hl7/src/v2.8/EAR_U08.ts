/**
 * Builder, parser and structure for EAR^U08 messages (HL7 v2.8).
 *
 * Structure: MSH [{SFT}] [UAC] EQU { COMMAND_RESPONSE: ECD [ SPECIMEN_CONTAINER: SAC [{SPM}] ] ECR }
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
import { ECD } from "./ECD.ts";
import { SAC } from "./SAC.ts";
import { SPM } from "./SPM.ts";
import { ECR } from "./ECR.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of EAR^U08 (HL7 v2.8), in order. */
export const EAR_U08_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EQU", required: true, repeating: false },
  {
    name: "COMMAND_RESPONSE",
    required: true,
    repeating: true,
    segments: [
      { name: "ECD", required: true, repeating: false },
      {
        name: "SPECIMEN_CONTAINER",
        required: false,
        repeating: false,
        segments: [
          { name: "SAC", required: true, repeating: false },
          { name: "SPM", required: false, repeating: true },
        ],
      },
      { name: "ECR", required: true, repeating: false },
    ],
  },
];

/** The COMMAND RESPONSE group of a parsed EAR^U08 (HL7 v2.8) message. */
export interface ParsedCommandResponse {
  /** The ECD segment. */
  equipmentCommand: ECD;
  /** The SPECIMEN CONTAINER group. */
  specimenContainer?: ParsedSpecimenContainer;
  /** The ECR segment. */
  commandResponse: ECR;
}

/** The SPECIMEN CONTAINER group of a parsed EAR^U08 (HL7 v2.8) message. */
export interface ParsedSpecimenContainer {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The SPM segments. */
  specimens?: SPM[];
}

/** Structured result of parsing an HL7 EAR^U08 (HL7 v2.8) message. */
export interface ParsedEAR_U08 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The COMMAND RESPONSE groups. */
  commandResponses: ParsedCommandResponse[];
}

/** The segment parsers of EAR^U08 (HL7 v2.8). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EQU: (s, e) => EQU.parse(s, e),
  ECD: (s, e) => ECD.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  ECR: (s, e) => ECR.parse(s, e),
};

/** Parser for HL7 EAR^U08 (HL7 v2.8) messages. */
export class EAR_U08_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EAR_U08";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EAR_U08_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEAR_U08> {
    return parseStructure<ParsedEAR_U08>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EAR^U08 (HL7 v2.8) message string into a structured result. */
export function parseEAR_U08(messageString: string): Result<ParsedEAR_U08> {
  return new EAR_U08_Parser().parse(messageString);
}

/** The COMMAND RESPONSE group of an EAR^U08 (HL7 v2.8) message being built. */
export interface CommandResponseGroup {
  /** The ECD segment. */
  equipmentCommand: ECD;
  /** The SPECIMEN CONTAINER group. */
  specimenContainer?: SpecimenContainerGroup;
  /** The ECR segment. */
  commandResponse: ECR;
}

/** The SPECIMEN CONTAINER group of an EAR^U08 (HL7 v2.8) message being built. */
export interface SpecimenContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The SPM segments. */
  specimens?: SPM[];
}

/** The optional segments and groups of an EAR^U08 (HL7 v2.8) message. */
export interface EAR_U08Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 EAR^U08 (HL7 v2.8) messages. */
export class EAR_U08<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EAR_U08";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EAR_U08_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public commandResponses: CommandResponseGroup[],
    public options: EAR_U08Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, equipmentDetail: this.equipmentDetail, commandResponses: this.commandResponses };
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

/** Builds an HL7 EAR^U08 (HL7 v2.8) message. */
export function createEAR_U08<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  commandResponses: CommandResponseGroup[],
  options: EAR_U08Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EAR_U08<TMSH, TEQU> {
  return new EAR_U08(header, equipmentDetail, commandResponses, options, encoding);
}
