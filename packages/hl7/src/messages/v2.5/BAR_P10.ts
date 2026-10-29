/**
 * Builder, parser and structure for BAR^P10 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN PID PV1 [{DG1}] GP1 [{ PROCEDURE: PR1 [GP2] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { EVN } from "../../segments/v2.5/EVN.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { DG1 } from "../../segments/v2.5/DG1.ts";
import { GP1 } from "../../segments/v2.5/GP1.ts";
import { PR1 } from "../../segments/v2.5/PR1.ts";
import { GP2 } from "../../segments/v2.5/GP2.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of BAR^P10 (HL7 v2.5), in order. */
export const BAR_P10_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PV1", required: true, repeating: false },
  { name: "DG1", required: false, repeating: true },
  { name: "GP1", required: true, repeating: false },
  {
    name: "PROCEDURE",
    required: false,
    repeating: true,
    segments: [
      { name: "PR1", required: true, repeating: false },
      { name: "GP2", required: false, repeating: false },
    ],
  },
];

/** The PROCEDURE group of a parsed BAR^P10 (HL7 v2.5) message. */
export interface ParsedProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The GP2 segment. */
  groupingProcedure?: GP2;
}

/** Structured result of parsing an HL7 BAR^P10 (HL7 v2.5) message. */
export interface ParsedBAR_P10 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit: PV1;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The GP1 segment. */
  groupingVisit: GP1;
  /** The PROCEDURE groups. */
  procedures?: ParsedProcedure[];
}

/** The segment parsers of BAR^P10 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  GP1: (s, e) => GP1.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  GP2: (s, e) => GP2.parse(s, e),
};

/** Parser for HL7 BAR^P10 (HL7 v2.5) messages. */
export class BAR_P10_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P10";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = BAR_P10_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBAR_P10> {
    return parseStructure<ParsedBAR_P10>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 BAR^P10 (HL7 v2.5) message string into a structured result. */
export function parseBAR_P10(messageString: string): Result<ParsedBAR_P10> {
  return new BAR_P10_Parser().parse(messageString);
}

/** The PROCEDURE group of an BAR^P10 (HL7 v2.5) message being built. */
export interface ProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The GP2 segment. */
  groupingProcedure?: GP2;
}

/** The optional segments and groups of an BAR^P10 (HL7 v2.5) message. */
export interface BAR_P10Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The PROCEDURE groups. */
  procedures?: ProcedureGroup[];
}

/** Builder for HL7 BAR^P10 (HL7 v2.5) messages. */
export class BAR_P10<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TGP1 extends GP1 = GP1> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P10";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = BAR_P10_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public visit: TPV1,
    public groupingVisit: TGP1,
    public options: BAR_P10Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, visit: this.visit, groupingVisit: this.groupingVisit };
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

/** Builds an HL7 BAR^P10 (HL7 v2.5) message. */
export function createBAR_P10<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TGP1 extends GP1 = GP1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  groupingVisit: TGP1,
  options: BAR_P10Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BAR_P10<TMSH, TEVN, TPID, TPV1, TGP1> {
  return new BAR_P10(header, event, patient, visit, groupingVisit, options, encoding);
}
