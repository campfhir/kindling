/**
 * Builder, parser and structure for BTS^O31 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] ] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] BPO [{NTE}] [{ PRODUCT_STATUS: BTX [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PD1 } from "../../segments/v2.5.1/PD1.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { PV2 } from "../../segments/v2.5.1/PV2.ts";
import { ORC } from "../../segments/v2.5.1/ORC.ts";
import { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import { BPO } from "../../segments/v2.5.1/BPO.ts";
import { BTX } from "../../segments/v2.5.1/BTX.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of BTS^O31 (HL7 v2.5.1), in order. */
export const BTS_O31_STRUCTURE: StructureItem[] = [
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
        name: "PRODUCT_STATUS",
        required: false,
        repeating: true,
        segments: [
          { name: "BTX", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
];

/** The PATIENT group of a parsed BTS^O31 (HL7 v2.5.1) message. */
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

/** The PATIENT VISIT group of a parsed BTS^O31 (HL7 v2.5.1) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The ORDER group of a parsed BTS^O31 (HL7 v2.5.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The BPO segment. */
  bloodProductOrder: BPO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRODUCT STATUS groups. */
  productStatus?: ParsedProductStatus[];
}

/** The TIMING group of a parsed BTS^O31 (HL7 v2.5.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The PRODUCT STATUS group of a parsed BTS^O31 (HL7 v2.5.1) message. */
export interface ParsedProductStatus {
  /** The BTX segment. */
  bloodProductTransfusion: BTX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 BTS^O31 (HL7 v2.5.1) message. */
export interface ParsedBTS_O31 extends ParsedMessageBase {
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

/** The segment parsers of BTS^O31 (HL7 v2.5.1). */
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
  BTX: (s, e) => BTX.parse(s, e),
};

/** Parser for HL7 BTS^O31 (HL7 v2.5.1) messages. */
export class BTS_O31_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BTS_O31";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = BTS_O31_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBTS_O31> {
    return parseStructure<ParsedBTS_O31>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 BTS^O31 (HL7 v2.5.1) message string into a structured result. */
export function parseBTS_O31(messageString: string): Result<ParsedBTS_O31> {
  return new BTS_O31_Parser().parse(messageString);
}

/** The PATIENT group of an BTS^O31 (HL7 v2.5.1) message being built. */
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

/** The PATIENT VISIT group of an BTS^O31 (HL7 v2.5.1) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The ORDER group of an BTS^O31 (HL7 v2.5.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The BPO segment. */
  bloodProductOrder: BPO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRODUCT STATUS groups. */
  productStatus?: ProductStatusGroup[];
}

/** The TIMING group of an BTS^O31 (HL7 v2.5.1) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The PRODUCT STATUS group of an BTS^O31 (HL7 v2.5.1) message being built. */
export interface ProductStatusGroup {
  /** The BTX segment. */
  bloodProductTransfusion: BTX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an BTS^O31 (HL7 v2.5.1) message. */
export interface BTS_O31Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: PatientGroup;
}

/** Builder for HL7 BTS^O31 (HL7 v2.5.1) messages. */
export class BTS_O31<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BTS_O31";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = BTS_O31_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: OrderGroup[],
    public options: BTS_O31Options = {},
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

/** Builds an HL7 BTS^O31 (HL7 v2.5.1) message. */
export function createBTS_O31<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: BTS_O31Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BTS_O31<TMSH> {
  return new BTS_O31(header, orders, options, encoding);
}
