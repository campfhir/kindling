/**
 * Builder, parser and structure for RCI^I05 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA QRD [QRF] { PROVIDER: PRD [{CTD}] } PID [{DG1}] [{DRG}] [{AL1}] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result as ParseResult } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { QRD } from "./QRD.ts";
import { QRF } from "./QRF.ts";
import { PRD } from "./PRD.ts";
import { CTD } from "./CTD.ts";
import { PID } from "./PID.ts";
import { DG1 } from "./DG1.ts";
import { DRG } from "./DRG.ts";
import { AL1 } from "./AL1.ts";
import { OBR } from "./OBR.ts";
import { NTE } from "./NTE.ts";
import { OBX } from "./OBX.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RCI^I05 (HL7 v2.3.1), in order. */
export const RCI_I05_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "QRD", required: true, repeating: false },
  { name: "QRF", required: false, repeating: false },
  {
    name: "PROVIDER",
    required: true,
    repeating: true,
    segments: [
      { name: "PRD", required: true, repeating: false },
      { name: "CTD", required: false, repeating: true },
    ],
  },
  { name: "PID", required: true, repeating: false },
  { name: "DG1", required: false, repeating: true },
  { name: "DRG", required: false, repeating: true },
  { name: "AL1", required: false, repeating: true },
  {
    name: "OBSERVATION",
    required: false,
    repeating: true,
    segments: [
      { name: "OBR", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      {
        name: "RESULTS",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
  { name: "NTE", required: false, repeating: true },
];

/** The PROVIDER group of a parsed RCI^I05 (HL7 v2.3.1) message. */
export interface ParsedProvider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The OBSERVATION group of a parsed RCI^I05 (HL7 v2.3.1) message. */
export interface ParsedObservation {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESULTS groups. */
  results?: ParsedResult[];
}

/** The RESULTS group of a parsed RCI^I05 (HL7 v2.3.1) message. */
export interface ParsedResult {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 RCI^I05 (HL7 v2.3.1) message. */
export interface ParsedRCI_I05 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PROVIDER groups. */
  providers: ParsedProvider[];
  /** The PID segment. */
  patient: PID;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segments. */
  diagnosisRelatedGroups?: DRG[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The segment parsers of RCI^I05 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  DRG: (s, e) => DRG.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
};

/** Parser for HL7 RCI^I05 (HL7 v2.3.1) messages. */
export class RCI_I05_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RCI_I05";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RCI_I05_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): ParseResult<ParsedRCI_I05> {
    return parseStructure<ParsedRCI_I05>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RCI^I05 (HL7 v2.3.1) message string into a structured result. */
export function parseRCI_I05(messageString: string): ParseResult<ParsedRCI_I05> {
  return new RCI_I05_Parser().parse(messageString);
}

/** The PROVIDER group of an RCI^I05 (HL7 v2.3.1) message being built. */
export interface Provider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The OBSERVATION group of an RCI^I05 (HL7 v2.3.1) message being built. */
export interface Observation {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESULTS groups. */
  results?: Result[];
}

/** The RESULTS group of an RCI^I05 (HL7 v2.3.1) message being built. */
export interface Result {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an RCI^I05 (HL7 v2.3.1) message. */
export interface RCI_I05Options {
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segments. */
  diagnosisRelatedGroups?: DRG[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The OBSERVATION groups. */
  observations?: Observation[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Builder for HL7 RCI^I05 (HL7 v2.3.1) messages. */
export class RCI_I05<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RCI_I05";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RCI_I05_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public providers: Provider[],
    public patient: TPID,
    public options: RCI_I05Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query, providers: this.providers, patient: this.patient };
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

/** Builds an HL7 RCI^I05 (HL7 v2.3.1) message. */
export function createRCI_I05<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TPID extends PID = PID>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  providers: Provider[],
  patient: TPID,
  options: RCI_I05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RCI_I05<TMSH, TMSA, TQRD, TPID> {
  return new RCI_I05(header, acknowledgment, query, providers, patient, options, encoding);
}
