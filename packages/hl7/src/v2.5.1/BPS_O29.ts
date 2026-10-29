/**
 * Builder, parser and structure for BPS^O29 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] ] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] BPO [{NTE}] [{ PRODUCT: BPX [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { NTE } from "./NTE.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { ORC } from "./ORC.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { BPO } from "./BPO.ts";
import { BPX } from "./BPX.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of BPS^O29 (HL7 v2.5.1), in order. */
export const BPS_O29_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "NTE", required: false, repeating: true },
  {
    name: "PATIENT",
    required: false,
    repeating: false,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "NTE", required: false, repeating: true },
      {
        name: "PATIENT_VISIT",
        required: false,
        repeating: false,
        segments: [
          { name: "PV1", required: true, repeating: false },
          { name: "PV2", required: false, repeating: false },
        ],
      },
    ],
  },
  {
    name: "ORDER",
    required: true,
    repeating: true,
    segments: [
      { name: "ORC", required: true, repeating: false },
      {
        name: "TIMING",
        required: false,
        repeating: true,
        segments: [
          { name: "TQ1", required: true, repeating: false },
          { name: "TQ2", required: false, repeating: true },
        ],
      },
      { name: "BPO", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      {
        name: "PRODUCT",
        required: false,
        repeating: true,
        segments: [
          { name: "BPX", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The PATIENT group of a parsed BPS^O29 (HL7 v2.5.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT VISIT group. */
  patientVisit?: ParsedPatientVisit;
}

/** The PATIENT VISIT group of a parsed BPS^O29 (HL7 v2.5.1) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The ORDER group of a parsed BPS^O29 (HL7 v2.5.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The BPO segment. */
  bloodProductOrder: BPO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRODUCT groups. */
  products?: ParsedProduct[];
}

/** The TIMING group of a parsed BPS^O29 (HL7 v2.5.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The PRODUCT group of a parsed BPS^O29 (HL7 v2.5.1) message. */
export interface ParsedProduct {
  /** The BPX segment. */
  bloodProductDispenseStatus: BPX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 BPS^O29 (HL7 v2.5.1) message. */
export interface ParsedBPS_O29 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The segment parsers of BPS^O29 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  BPO: (s, e) => BPO.parse(s, e),
  BPX: (s, e) => BPX.parse(s, e),
};

/** Parser for HL7 BPS^O29 (HL7 v2.5.1) messages. */
export class BPS_O29_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BPS_O29";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = BPS_O29_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBPS_O29> {
    return parseStructure<ParsedBPS_O29>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 BPS^O29 (HL7 v2.5.1) message string into a structured result. */
export function parseBPS_O29(messageString: string): Result<ParsedBPS_O29> {
  return new BPS_O29_Parser().parse(messageString);
}

/** The PATIENT group of an BPS^O29 (HL7 v2.5.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT VISIT group. */
  patientVisit?: PatientVisitGroup;
}

/** The PATIENT VISIT group of an BPS^O29 (HL7 v2.5.1) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The ORDER group of an BPS^O29 (HL7 v2.5.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The BPO segment. */
  bloodProductOrder: BPO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRODUCT groups. */
  products?: ProductGroup[];
}

/** The TIMING group of an BPS^O29 (HL7 v2.5.1) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The PRODUCT group of an BPS^O29 (HL7 v2.5.1) message being built. */
export interface ProductGroup {
  /** The BPX segment. */
  bloodProductDispenseStatus: BPX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an BPS^O29 (HL7 v2.5.1) message. */
export interface BPS_O29Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: PatientGroup;
}

/** Builder for HL7 BPS^O29 (HL7 v2.5.1) messages. */
export class BPS_O29<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BPS_O29";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = BPS_O29_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: OrderGroup[],
    public options: BPS_O29Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, orders: this.orders };
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

/** Builds an HL7 BPS^O29 (HL7 v2.5.1) message. */
export function createBPS_O29<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: BPS_O29Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BPS_O29<TMSH> {
  return new BPS_O29(header, orders, options, encoding);
}
