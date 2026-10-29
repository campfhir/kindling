/**
 * Builder, parser and structure for BAR^P12 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID PV1 [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [OBX]
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
import { EVN } from "./EVN.ts";
import { PID } from "./PID.ts";
import { PV1 } from "./PV1.ts";
import { DG1 } from "./DG1.ts";
import { DRG } from "./DRG.ts";
import { PR1 } from "./PR1.ts";
import { ROL } from "./ROL.ts";
import { OBX } from "./OBX.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of BAR^P12 (HL7 v2.7), in order. */
export const BAR_P12_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PV1", required: true, repeating: false },
  { name: "DG1", required: false, repeating: true },
  { name: "DRG", required: false, repeating: false },
  {
    name: "PROCEDURE",
    required: false,
    repeating: true,
    segments: [
      { name: "PR1", required: true, repeating: false },
      { name: "ROL", required: false, repeating: true },
    ],
  },
  { name: "OBX", required: false, repeating: false },
];

/** The PROCEDURE group of a parsed BAR^P12 (HL7 v2.7) message. */
export interface ParsedProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The ROL segments. */
  roles?: ROL[];
}

/** Structured result of parsing an HL7 BAR^P12 (HL7 v2.7) message. */
export interface ParsedBAR_P12 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit: PV1;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The PROCEDURE groups. */
  procedures?: ParsedProcedure[];
  /** The OBX segment. */
  observation?: OBX;
}

/** The segment parsers of BAR^P12 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  DRG: (s, e) => DRG.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
};

/** Parser for HL7 BAR^P12 (HL7 v2.7) messages. */
export class BAR_P12_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P12";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = BAR_P12_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBAR_P12> {
    return parseStructure<ParsedBAR_P12>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 BAR^P12 (HL7 v2.7) message string into a structured result. */
export function parseBAR_P12(messageString: string): Result<ParsedBAR_P12> {
  return new BAR_P12_Parser().parse(messageString);
}

/** The PROCEDURE group of an BAR^P12 (HL7 v2.7) message being built. */
export interface ProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The ROL segments. */
  roles?: ROL[];
}

/** The optional segments and groups of an BAR^P12 (HL7 v2.7) message. */
export interface BAR_P12Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The PROCEDURE groups. */
  procedures?: ProcedureGroup[];
  /** The OBX segment. */
  observation?: OBX;
}

/** Builder for HL7 BAR^P12 (HL7 v2.7) messages. */
export class BAR_P12<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P12";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = BAR_P12_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public visit: TPV1,
    public options: BAR_P12Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, visit: this.visit };
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

/** Builds an HL7 BAR^P12 (HL7 v2.7) message. */
export function createBAR_P12<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: BAR_P12Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BAR_P12<TMSH, TEVN, TPID, TPV1> {
  return new BAR_P12(header, event, patient, visit, options, encoding);
}
