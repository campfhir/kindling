/**
 * Builder, parser and structure for PPR^PC1 messages (HL7 v2.3).
 *
 * Structure: MSH PID [ PATIENT_VISIT: PV1 [PV2] ] { PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_PATHWAY: PTH [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { PV2 } from "../../segments/v2.3/PV2.ts";
import { PRB } from "../../segments/v2.3/PRB.ts";
import { NTE } from "../../segments/v2.3/NTE.ts";
import { VAR } from "../../segments/v2.3/VAR.ts";
import { ROL } from "../../segments/v2.3/ROL.ts";
import { PTH } from "../../segments/v2.3/PTH.ts";
import { OBX } from "../../segments/v2.3/OBX.ts";
import { GOL } from "../../segments/v2.3/GOL.ts";
import { ORC } from "../../segments/v2.3/ORC.ts";
import { OBR } from "../../segments/v2.3/OBR.ts";
import { RQD } from "../../segments/v2.3/RQD.ts";
import { RQ1 } from "../../segments/v2.3/RQ1.ts";
import { RXO } from "../../segments/v2.3/RXO.ts";
import { ODS } from "../../segments/v2.3/ODS.ts";
import { ODT } from "../../segments/v2.3/ODT.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of PPR^PC1 (HL7 v2.3), in order. */
export const PPR_PC1_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  {
    name: "PATIENT_VISIT",
    required: false,
    repeating: false,
    inline: true,
    segments: [
      { name: "PV1", required: true, repeating: false },
      { name: "PV2", required: false, repeating: false },
    ],
  },
  {
    name: "PROBLEM",
    required: true,
    repeating: true,
    segments: [
      { name: "PRB", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      { name: "VAR", required: false, repeating: true },
      {
        name: "PROBLEM_ROLE",
        required: false,
        repeating: true,
        as: "roles",
        segments: [
          { name: "ROL", required: true, repeating: false },
          { name: "VAR", required: false, repeating: true },
        ],
      },
      {
        name: "PROBLEM_PATHWAY",
        required: false,
        repeating: true,
        as: "pathways",
        segments: [
          { name: "PTH", required: true, repeating: false },
          { name: "VAR", required: false, repeating: true },
        ],
      },
      {
        name: "PROBLEM_OBSERVATION",
        required: false,
        repeating: true,
        as: "observations",
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "GOAL",
        required: false,
        repeating: true,
        segments: [
          { name: "GOL", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
          { name: "VAR", required: false, repeating: true },
          {
            name: "GOAL_ROLE",
            required: false,
            repeating: true,
            as: "roles",
            segments: [
              { name: "ROL", required: true, repeating: false },
              { name: "VAR", required: false, repeating: true },
            ],
          },
          {
            name: "GOAL_OBSERVATION",
            required: false,
            repeating: true,
            as: "observations",
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "NTE", required: false, repeating: true },
            ],
          },
        ],
      },
      {
        name: "ORDER",
        required: false,
        repeating: true,
        segments: [
          { name: "ORC", required: true, repeating: false },
          {
            name: "ORDER_DETAIL",
            required: false,
            repeating: false,
            as: "detail",
            segments: [
              { oneOf: ["OBR", "RQD", "RQ1", "RXO", "ODS", "ODT"], required: true },
              { name: "NTE", required: false, repeating: true },
              { name: "VAR", required: false, repeating: true },
              {
                name: "ORDER_OBSERVATION",
                required: false,
                repeating: true,
                as: "observations",
                segments: [
                  { name: "OBX", required: true, repeating: false },
                  { name: "NTE", required: false, repeating: true },
                  { name: "VAR", required: false, repeating: true },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

/** The PROBLEM group of a parsed PPR^PC1 (HL7 v2.3) message. */
export interface ParsedProblem {
  /** The PRB segment. */
  problem: PRB;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The PROBLEM ROLE groups. */
  roles?: ParsedProblemRole[];
  /** The PROBLEM PATHWAY groups. */
  pathways?: ParsedProblemPathway[];
  /** The PROBLEM OBSERVATION groups. */
  observations?: ParsedProblemObservation[];
  /** The GOAL groups. */
  goals?: ParsedGoal[];
  /** The ORDER groups. */
  orders?: ParsedCareOrder[];
}

/** The PROBLEM ROLE group of a parsed PPR^PC1 (HL7 v2.3) message. */
export interface ParsedProblemRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM PATHWAY group of a parsed PPR^PC1 (HL7 v2.3) message. */
export interface ParsedProblemPathway {
  /** The PTH segment. */
  pathway: PTH;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM OBSERVATION group of a parsed PPR^PC1 (HL7 v2.3) message. */
export interface ParsedProblemObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GOAL group of a parsed PPR^PC1 (HL7 v2.3) message. */
export interface ParsedGoal {
  /** The GOL segment. */
  goal: GOL;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The GOAL ROLE groups. */
  roles?: ParsedGoalRole[];
  /** The GOAL OBSERVATION groups. */
  observations?: ParsedGoalObservation[];
}

/** The GOAL ROLE group of a parsed PPR^PC1 (HL7 v2.3) message. */
export interface ParsedGoalRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL OBSERVATION group of a parsed PPR^PC1 (HL7 v2.3) message. */
export interface ParsedGoalObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of a parsed PPR^PC1 (HL7 v2.3) message. */
export interface ParsedCareOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  detail?: ParsedOrderDetail;
}

/** The ORDER DETAIL group of a parsed PPR^PC1 (HL7 v2.3) message. */
export interface ParsedOrderDetail {
  /** One of OBR, RQD, RQ1, RXO, ODS, ODT. */
  segment: OBR | RQD | RQ1 | RXO | ODS | ODT;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The ORDER OBSERVATION groups. */
  observations?: ParsedOrderObservation[];
}

/** The ORDER OBSERVATION group of a parsed PPR^PC1 (HL7 v2.3) message. */
export interface ParsedOrderObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
}

/** Structured result of parsing an HL7 PPR^PC1 (HL7 v2.3) message. */
export interface ParsedPPR_PC1 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PROBLEM groups. */
  problems: ParsedProblem[];
}

/** The segment parsers of PPR^PC1 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  PRB: (s, e) => PRB.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  VAR: (s, e) => VAR.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  PTH: (s, e) => PTH.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  GOL: (s, e) => GOL.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  RQD: (s, e) => RQD.parse(s, e),
  RQ1: (s, e) => RQ1.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  ODS: (s, e) => ODS.parse(s, e),
  ODT: (s, e) => ODT.parse(s, e),
};

/** Parser for HL7 PPR^PC1 (HL7 v2.3) messages. */
export class PPR_PC1_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PPR_PC1";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = PPR_PC1_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedPPR_PC1> {
    return parseStructure<ParsedPPR_PC1>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 PPR^PC1 (HL7 v2.3) message string into a structured result. */
export function parsePPR_PC1(messageString: string): Result<ParsedPPR_PC1> {
  return new PPR_PC1_Parser().parse(messageString);
}

/** The PROBLEM group of an PPR^PC1 (HL7 v2.3) message being built. */
export interface Problem {
  /** The PRB segment. */
  problem: PRB;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The PROBLEM ROLE groups. */
  roles?: ProblemRole[];
  /** The PROBLEM PATHWAY groups. */
  pathways?: ProblemPathway[];
  /** The PROBLEM OBSERVATION groups. */
  observations?: ProblemObservation[];
  /** The GOAL groups. */
  goals?: Goal[];
  /** The ORDER groups. */
  orders?: CareOrder[];
}

/** The PROBLEM ROLE group of an PPR^PC1 (HL7 v2.3) message being built. */
export interface ProblemRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM PATHWAY group of an PPR^PC1 (HL7 v2.3) message being built. */
export interface ProblemPathway {
  /** The PTH segment. */
  pathway: PTH;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM OBSERVATION group of an PPR^PC1 (HL7 v2.3) message being built. */
export interface ProblemObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GOAL group of an PPR^PC1 (HL7 v2.3) message being built. */
export interface Goal {
  /** The GOL segment. */
  goal: GOL;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The GOAL ROLE groups. */
  roles?: GoalRole[];
  /** The GOAL OBSERVATION groups. */
  observations?: GoalObservation[];
}

/** The GOAL ROLE group of an PPR^PC1 (HL7 v2.3) message being built. */
export interface GoalRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL OBSERVATION group of an PPR^PC1 (HL7 v2.3) message being built. */
export interface GoalObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of an PPR^PC1 (HL7 v2.3) message being built. */
export interface CareOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  detail?: OrderDetail;
}

/** The ORDER DETAIL group of an PPR^PC1 (HL7 v2.3) message being built. */
export interface OrderDetail {
  /** One of OBR, RQD, RQ1, RXO, ODS, ODT. */
  segment: OBR | RQD | RQ1 | RXO | ODS | ODT;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The ORDER OBSERVATION groups. */
  observations?: OrderObservation[];
}

/** The ORDER OBSERVATION group of an PPR^PC1 (HL7 v2.3) message being built. */
export interface OrderObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
}

/** The optional segments and groups of an PPR^PC1 (HL7 v2.3) message. */
export interface PPR_PC1Options {
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** Builder for HL7 PPR^PC1 (HL7 v2.3) messages. */
export class PPR_PC1<TMSH extends MSH = MSH, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PPR_PC1";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = PPR_PC1_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public patient: TPID,
    public problems: Problem[],
    public options: PPR_PC1Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, patient: this.patient, problems: this.problems };
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

/** Builds an HL7 PPR^PC1 (HL7 v2.3) message. */
export function createPPR_PC1<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  patient: TPID,
  problems: Problem[],
  options: PPR_PC1Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PPR_PC1<TMSH, TPID> {
  return new PPR_PC1(header, patient, problems, options, encoding);
}
