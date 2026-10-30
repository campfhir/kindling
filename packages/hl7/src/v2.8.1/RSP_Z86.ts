/**
 * Builder, parser and structure for RSP^Z86 messages (HL7 v2.8.1).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [ERR] QAK QPD { QUERY_RESPONSE: [ PATIENT: PID [PD1] [{NTE}] [{AL1}] ] { COMMON_ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: RXO {RXR} [{RXC}] ] [ ENCODED_ORDER: RXE [{ TIMING_ENCODED: TQ1 [{TQ2}] }] {RXR} [{RXC}] ] [ DISPENSE: RXD {RXR} [{RXC}] ] [ GIVE: RXG {RXR} [{RXC}] ] [ ADMINISTRATION: RXA {RXR} [{RXC}] ] { OBSERVATION: [OBX] [{NTE}] } } } [DSC]
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
import { MSA } from "./MSA.ts";
import { ERR } from "./ERR.ts";
import { QAK } from "./QAK.ts";
import { QPD } from "./QPD.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { NTE } from "./NTE.ts";
import { AL1 } from "./AL1.ts";
import { ORC } from "./ORC.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { RXO } from "./RXO.ts";
import { RXR } from "./RXR.ts";
import { RXC } from "./RXC.ts";
import { RXE } from "./RXE.ts";
import { RXD } from "./RXD.ts";
import { RXG } from "./RXG.ts";
import { RXA } from "./RXA.ts";
import { OBX } from "./OBX.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RSP^Z86 (HL7 v2.8.1), in order. */
export const RSP_Z86_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: true, repeating: false },
  { name: "QPD", required: true, repeating: false },
  {
    name: "QUERY_RESPONSE",
    required: true,
    repeating: true,
    segments: [
      {
        name: "PATIENT",
        required: false,
        repeating: false,
        segments: [
          { name: "PID", required: true, repeating: false },
          { name: "PD1", required: false, repeating: false },
          { name: "NTE", required: false, repeating: true },
          { name: "AL1", required: false, repeating: true },
        ],
      },
      {
        name: "COMMON_ORDER",
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
              { name: "RXR", required: true, repeating: true },
              { name: "RXC", required: false, repeating: true },
            ],
          },
          {
            name: "ENCODED_ORDER",
            required: false,
            repeating: false,
            segments: [
              { name: "RXE", required: true, repeating: false },
              {
                name: "TIMING_ENCODED",
                required: false,
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
          {
            name: "DISPENSE",
            required: false,
            repeating: false,
            segments: [
              { name: "RXD", required: true, repeating: false },
              { name: "RXR", required: true, repeating: true },
              { name: "RXC", required: false, repeating: true },
            ],
          },
          {
            name: "GIVE",
            required: false,
            repeating: false,
            segments: [
              { name: "RXG", required: true, repeating: false },
              { name: "RXR", required: true, repeating: true },
              { name: "RXC", required: false, repeating: true },
            ],
          },
          {
            name: "ADMINISTRATION",
            required: false,
            repeating: false,
            segments: [
              { name: "RXA", required: true, repeating: false },
              { name: "RXR", required: true, repeating: true },
              { name: "RXC", required: false, repeating: true },
            ],
          },
          {
            name: "OBSERVATION",
            required: true,
            repeating: true,
            segments: [
              { name: "OBX", required: false, repeating: false },
              { name: "NTE", required: false, repeating: true },
            ],
          },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The QUERY RESPONSE group of a parsed RSP^Z86 (HL7 v2.8.1) message. */
export interface ParsedQueryResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The COMMON ORDER groups. */
  commonOrders: ParsedCommonOrder[];
}

/** The PATIENT group of a parsed RSP^Z86 (HL7 v2.8.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** The COMMON ORDER group of a parsed RSP^Z86 (HL7 v2.8.1) message. */
export interface ParsedCommonOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The ORDER DETAIL group. */
  orderDetail?: ParsedOrderDetail;
  /** The ENCODED ORDER group. */
  encodedOrder?: ParsedEncodedOrder;
  /** The DISPENSE group. */
  dispense?: ParsedDispense;
  /** The GIVE group. */
  give?: ParsedGive;
  /** The ADMINISTRATION group. */
  administration?: ParsedAdministration;
  /** The OBSERVATION groups. */
  observations: ParsedObservation[];
}

/** The TIMING group of a parsed RSP^Z86 (HL7 v2.8.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of a parsed RSP^Z86 (HL7 v2.8.1) message. */
export interface ParsedOrderDetail {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The ENCODED ORDER group of a parsed RSP^Z86 (HL7 v2.8.1) message. */
export interface ParsedEncodedOrder {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The TIMING ENCODED groups. */
  timingEncodeds?: ParsedTimingEncoded[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING ENCODED group of a parsed RSP^Z86 (HL7 v2.8.1) message. */
export interface ParsedTimingEncoded {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The DISPENSE group of a parsed RSP^Z86 (HL7 v2.8.1) message. */
export interface ParsedDispense {
  /** The RXD segment. */
  dispense: RXD;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The GIVE group of a parsed RSP^Z86 (HL7 v2.8.1) message. */
export interface ParsedGive {
  /** The RXG segment. */
  give: RXG;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The ADMINISTRATION group of a parsed RSP^Z86 (HL7 v2.8.1) message. */
export interface ParsedAdministration {
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The OBSERVATION group of a parsed RSP^Z86 (HL7 v2.8.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 RSP^Z86 (HL7 v2.8.1) message. */
export interface ParsedRSP_Z86 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The QUERY RESPONSE groups. */
  queryResponses: ParsedQueryResponse[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RSP^Z86 (HL7 v2.8.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
  RXE: (s, e) => RXE.parse(s, e),
  RXD: (s, e) => RXD.parse(s, e),
  RXG: (s, e) => RXG.parse(s, e),
  RXA: (s, e) => RXA.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RSP^Z86 (HL7 v2.8.1) messages. */
export class RSP_Z86_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_Z86";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RSP_Z86_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRSP_Z86> {
    return parseStructure<ParsedRSP_Z86>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RSP^Z86 (HL7 v2.8.1) message string into a structured result. */
export function parseRSP_Z86(messageString: string): Result<ParsedRSP_Z86> {
  return new RSP_Z86_Parser().parse(messageString);
}

/** The QUERY RESPONSE group of an RSP^Z86 (HL7 v2.8.1) message being built. */
export interface QueryResponseGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The COMMON ORDER groups. */
  commonOrders: CommonOrderGroup[];
}

/** The PATIENT group of an RSP^Z86 (HL7 v2.8.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** The COMMON ORDER group of an RSP^Z86 (HL7 v2.8.1) message being built. */
export interface CommonOrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The ORDER DETAIL group. */
  orderDetail?: OrderDetailGroup;
  /** The ENCODED ORDER group. */
  encodedOrder?: EncodedOrderGroup;
  /** The DISPENSE group. */
  dispense?: DispenseGroup;
  /** The GIVE group. */
  give?: GiveGroup;
  /** The ADMINISTRATION group. */
  administration?: AdministrationGroup;
  /** The OBSERVATION groups. */
  observations: ObservationGroup[];
}

/** The TIMING group of an RSP^Z86 (HL7 v2.8.1) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of an RSP^Z86 (HL7 v2.8.1) message being built. */
export interface OrderDetailGroup {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The ENCODED ORDER group of an RSP^Z86 (HL7 v2.8.1) message being built. */
export interface EncodedOrderGroup {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The TIMING ENCODED groups. */
  timingEncodeds?: TimingEncodedGroup[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING ENCODED group of an RSP^Z86 (HL7 v2.8.1) message being built. */
export interface TimingEncodedGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The DISPENSE group of an RSP^Z86 (HL7 v2.8.1) message being built. */
export interface DispenseGroup {
  /** The RXD segment. */
  dispense: RXD;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The GIVE group of an RSP^Z86 (HL7 v2.8.1) message being built. */
export interface GiveGroup {
  /** The RXG segment. */
  give: RXG;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The ADMINISTRATION group of an RSP^Z86 (HL7 v2.8.1) message being built. */
export interface AdministrationGroup {
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The OBSERVATION group of an RSP^Z86 (HL7 v2.8.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an RSP^Z86 (HL7 v2.8.1) message. */
export interface RSP_Z86Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ERR segment. */
  error?: ERR;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RSP^Z86 (HL7 v2.8.1) messages. */
export class RSP_Z86<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_Z86";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RSP_Z86_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public queryParameters: TQPD,
    public queryResponses: QueryResponseGroup[],
    public options: RSP_Z86Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAcknowledgment: this.queryAcknowledgment, queryParameters: this.queryParameters, queryResponses: this.queryResponses };
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

/** Builds an HL7 RSP^Z86 (HL7 v2.8.1) message. */
export function createRSP_Z86<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  queryResponses: QueryResponseGroup[],
  options: RSP_Z86Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RSP_Z86<TMSH, TMSA, TQAK, TQPD> {
  return new RSP_Z86(header, acknowledgment, queryAcknowledgment, queryParameters, queryResponses, options, encoding);
}
