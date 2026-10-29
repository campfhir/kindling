/**
 * Builder, parser and structure for RDS^O13 messages (HL7 v2.7.1).
 *
 * Structure: MSH [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [ ADDITIONAL_DEMOGRAPHICS: PD1 [{PRT}] ] [{NTE}] [{AL1}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] ] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: RXO [ ORDER_DETAIL_SUPPLEMENT: {NTE} {RXR} [{ COMPONENT: RXC [{NTE}] }] ] ] [{PRT}] [ ENCODING: RXE [{PRT}] [{NTE}] { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] ] RXD [{PRT}] [{NTE}] {RXR} [{RXC}] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] [{FT1}] }
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
import { NTE } from "./NTE.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { PRT } from "./PRT.ts";
import { AL1 } from "./AL1.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { ORC } from "./ORC.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { RXO } from "./RXO.ts";
import { RXR } from "./RXR.ts";
import { RXC } from "./RXC.ts";
import { RXE } from "./RXE.ts";
import { RXD } from "./RXD.ts";
import { OBX } from "./OBX.ts";
import { FT1 } from "./FT1.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RDS^O13 (HL7 v2.7.1), in order. */
export const RDS_O13_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "NTE", required: false, repeating: true },
  {
    name: "PATIENT",
    required: false,
    repeating: false,
    segments: [
      { name: "PID", required: true, repeating: false },
      {
        name: "ADDITIONAL_DEMOGRAPHICS",
        required: false,
        repeating: false,
        segments: [
          { name: "PD1", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
        ],
      },
      { name: "NTE", required: false, repeating: true },
      { name: "AL1", required: false, repeating: true },
      {
        name: "PATIENT_VISIT",
        required: false,
        repeating: false,
        segments: [
          { name: "PV1", required: true, repeating: false },
          { name: "PV2", required: false, repeating: false },
          { name: "PRT", required: false, repeating: true },
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
      {
        name: "ORDER_DETAIL",
        required: false,
        repeating: false,
        segments: [
          { name: "RXO", required: true, repeating: false },
          {
            name: "ORDER_DETAIL_SUPPLEMENT",
            required: false,
            repeating: false,
            segments: [
              { name: "NTE", required: true, repeating: true },
              { name: "RXR", required: true, repeating: true },
              {
                name: "COMPONENT",
                required: false,
                repeating: true,
                segments: [
                  { name: "RXC", required: true, repeating: false },
                  { name: "NTE", required: false, repeating: true },
                ],
              },
            ],
          },
        ],
      },
      { name: "PRT", required: false, repeating: true },
      {
        name: "ENCODING",
        required: false,
        repeating: false,
        segments: [
          { name: "RXE", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
          {
            name: "TIMING_ENCODED",
            required: true,
            repeating: true,
            segments: [
              { name: "TQ1", required: true, repeating: false },
              { name: "TQ2", required: false, repeating: true },
            ],
          },
          { name: "RXR", required: true, repeating: true },
          { name: "RXC", required: false, repeating: true },
        ],
      },
      { name: "RXD", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true, as: "prt2" },
      { name: "NTE", required: false, repeating: true },
      { name: "RXR", required: true, repeating: true },
      { name: "RXC", required: false, repeating: true },
      {
        name: "OBSERVATION",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      { name: "FT1", required: false, repeating: true },
    ],
  },
];

/** The PATIENT group of a parsed RDS^O13 (HL7 v2.7.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The ADDITIONAL DEMOGRAPHICS group. */
  additionalDemographics?: ParsedAdditionalDemographics;
  /** The NTE segments. */
  notes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PATIENT VISIT group. */
  patientVisit?: ParsedPatientVisit;
}

/** The ADDITIONAL DEMOGRAPHICS group of a parsed RDS^O13 (HL7 v2.7.1) message. */
export interface ParsedAdditionalDemographics {
  /** The PD1 segment. */
  patientDemographics: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PATIENT VISIT group of a parsed RDS^O13 (HL7 v2.7.1) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER group of a parsed RDS^O13 (HL7 v2.7.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The ORDER DETAIL group. */
  orderDetail?: ParsedOrderDetail;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ENCODING group. */
  encoding?: ParsedEncoding;
  /** The RXD segment. */
  dispense: RXD;
  /** The PRT segments. */
  prt2?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The FT1 segments. */
  transactions?: FT1[];
}

/** The TIMING group of a parsed RDS^O13 (HL7 v2.7.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of a parsed RDS^O13 (HL7 v2.7.1) message. */
export interface ParsedOrderDetail {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The ORDER DETAIL SUPPLEMENT group. */
  orderDetailSupplement?: ParsedOrderDetailSupplement;
}

/** The ORDER DETAIL SUPPLEMENT group of a parsed RDS^O13 (HL7 v2.7.1) message. */
export interface ParsedOrderDetailSupplement {
  /** The NTE segments. */
  notes: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The COMPONENT groups. */
  components?: ParsedComponent[];
}

/** The COMPONENT group of a parsed RDS^O13 (HL7 v2.7.1) message. */
export interface ParsedComponent {
  /** The RXC segment. */
  component: RXC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ENCODING group of a parsed RDS^O13 (HL7 v2.7.1) message. */
export interface ParsedEncoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING ENCODED groups. */
  timingEncodeds: ParsedTimingEncoded[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING ENCODED group of a parsed RDS^O13 (HL7 v2.7.1) message. */
export interface ParsedTimingEncoded {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of a parsed RDS^O13 (HL7 v2.7.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 RDS^O13 (HL7 v2.7.1) message. */
export interface ParsedRDS_O13 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The segment parsers of RDS^O13 (HL7 v2.7.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
  RXE: (s, e) => RXE.parse(s, e),
  RXD: (s, e) => RXD.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  FT1: (s, e) => FT1.parse(s, e),
};

/** Parser for HL7 RDS^O13 (HL7 v2.7.1) messages. */
export class RDS_O13_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RDS_O13";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RDS_O13_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRDS_O13> {
    return parseStructure<ParsedRDS_O13>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RDS^O13 (HL7 v2.7.1) message string into a structured result. */
export function parseRDS_O13(messageString: string): Result<ParsedRDS_O13> {
  return new RDS_O13_Parser().parse(messageString);
}

/** The PATIENT group of an RDS^O13 (HL7 v2.7.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The ADDITIONAL DEMOGRAPHICS group. */
  additionalDemographics?: AdditionalDemographicsGroup;
  /** The NTE segments. */
  notes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PATIENT VISIT group. */
  patientVisit?: PatientVisitGroup;
}

/** The ADDITIONAL DEMOGRAPHICS group of an RDS^O13 (HL7 v2.7.1) message being built. */
export interface AdditionalDemographicsGroup {
  /** The PD1 segment. */
  patientDemographics: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PATIENT VISIT group of an RDS^O13 (HL7 v2.7.1) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER group of an RDS^O13 (HL7 v2.7.1) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The ORDER DETAIL group. */
  orderDetail?: OrderDetailGroup;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ENCODING group. */
  encoding?: EncodingGroup;
  /** The RXD segment. */
  dispense: RXD;
  /** The PRT segments. */
  prt2?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The FT1 segments. */
  transactions?: FT1[];
}

/** The TIMING group of an RDS^O13 (HL7 v2.7.1) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of an RDS^O13 (HL7 v2.7.1) message being built. */
export interface OrderDetailGroup {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The ORDER DETAIL SUPPLEMENT group. */
  orderDetailSupplement?: OrderDetailSupplementGroup;
}

/** The ORDER DETAIL SUPPLEMENT group of an RDS^O13 (HL7 v2.7.1) message being built. */
export interface OrderDetailSupplementGroup {
  /** The NTE segments. */
  notes: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The COMPONENT groups. */
  components?: ComponentGroup[];
}

/** The COMPONENT group of an RDS^O13 (HL7 v2.7.1) message being built. */
export interface ComponentGroup {
  /** The RXC segment. */
  component: RXC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ENCODING group of an RDS^O13 (HL7 v2.7.1) message being built. */
export interface EncodingGroup {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING ENCODED groups. */
  timingEncodeds: TimingEncodedGroup[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING ENCODED group of an RDS^O13 (HL7 v2.7.1) message being built. */
export interface TimingEncodedGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an RDS^O13 (HL7 v2.7.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an RDS^O13 (HL7 v2.7.1) message. */
export interface RDS_O13Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: PatientGroup;
}

/** Builder for HL7 RDS^O13 (HL7 v2.7.1) messages. */
export class RDS_O13<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RDS_O13";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RDS_O13_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: OrderGroup[],
    public options: RDS_O13Options = {},
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

/** Builds an HL7 RDS^O13 (HL7 v2.7.1) message. */
export function createRDS_O13<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: RDS_O13Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RDS_O13<TMSH> {
  return new RDS_O13(header, orders, options, encoding);
}
