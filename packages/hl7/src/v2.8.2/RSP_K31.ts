/**
 * Builder, parser and structure for RSP^K31 messages (HL7 v2.8.2).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] QAK QPD RCP { RESPONSE: [ PATIENT: PID [ ADDITIONAL_DEMOGRAPHICS: PD1 [{PRT}] ] [{NTE}] [{ARV}] [{AL1}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] [{ARV}] ] ] { ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: RXO [{NTE}] {RXR} [{ COMPONENTS: RXC [{NTE}] }] ] [ ENCODING: RXE [{PRT}] [{NTE}] { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] ] RXD [{PRT}] {RXR} [{RXC}] [{CDO}] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { ERR } from "./ERR.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { QAK } from "./QAK.ts";
import { QPD } from "./QPD.ts";
import { RCP } from "./RCP.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { PRT } from "./PRT.ts";
import { NTE } from "./NTE.ts";
import { ARV } from "./ARV.ts";
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
import { CDO } from "./CDO.ts";
import { OBX } from "./OBX.ts";
import { DSC } from "./DSC.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RSP^K31 (HL7 v2.8.2), in order. */
export const RSP_K31_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "QAK", required: true, repeating: false },
  { name: "QPD", required: true, repeating: false },
  { name: "RCP", required: true, repeating: false },
  {
    name: "RESPONSE",
    required: true,
    repeating: true,
    segments: [
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
          { name: "ARV", required: false, repeating: true },
          { name: "AL1", required: false, repeating: true },
          {
            name: "PATIENT_VISIT",
            required: false,
            repeating: false,
            segments: [
              { name: "PV1", required: true, repeating: false },
              { name: "PV2", required: false, repeating: false },
              { name: "PRT", required: false, repeating: true },
              { name: "ARV", required: false, repeating: true },
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
          { name: "PRT", required: false, repeating: true },
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
              { name: "NTE", required: false, repeating: true },
              { name: "RXR", required: true, repeating: true },
              {
                name: "COMPONENTS",
                required: false,
                repeating: true,
                segments: [
                  { name: "RXC", required: true, repeating: false },
                  { name: "NTE", required: false, repeating: true },
                ],
              },
            ],
          },
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
          { name: "RXR", required: true, repeating: true },
          { name: "RXC", required: false, repeating: true },
          { name: "CDO", required: false, repeating: true },
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
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];

/** The RESPONSE group of a parsed RSP^K31 (HL7 v2.8.2) message. */
export interface ParsedResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The PATIENT group of a parsed RSP^K31 (HL7 v2.8.2) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The ADDITIONAL DEMOGRAPHICS group. */
  additionalDemographics?: ParsedAdditionalDemographics;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PATIENT VISIT group. */
  patientVisit?: ParsedPatientVisit;
}

/** The ADDITIONAL DEMOGRAPHICS group of a parsed RSP^K31 (HL7 v2.8.2) message. */
export interface ParsedAdditionalDemographics {
  /** The PD1 segment. */
  patientDemographics: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PATIENT VISIT group of a parsed RSP^K31 (HL7 v2.8.2) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ARV segments. */
  arvList?: ARV[];
}

/** The ORDER group of a parsed RSP^K31 (HL7 v2.8.2) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The ORDER DETAIL group. */
  orderDetail?: ParsedOrderDetail;
  /** The ENCODING group. */
  encoding?: ParsedEncoding;
  /** The RXD segment. */
  dispense: RXD;
  /** The PRT segments. */
  prt2?: PRT[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The CDO segments. */
  cdoList?: CDO[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
}

/** The TIMING group of a parsed RSP^K31 (HL7 v2.8.2) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of a parsed RSP^K31 (HL7 v2.8.2) message. */
export interface ParsedOrderDetail {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The COMPONENTS groups. */
  components?: ParsedComponents[];
}

/** The COMPONENTS group of a parsed RSP^K31 (HL7 v2.8.2) message. */
export interface ParsedComponents {
  /** The RXC segment. */
  component: RXC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ENCODING group of a parsed RSP^K31 (HL7 v2.8.2) message. */
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

/** The TIMING ENCODED group of a parsed RSP^K31 (HL7 v2.8.2) message. */
export interface ParsedTimingEncoded {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of a parsed RSP^K31 (HL7 v2.8.2) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 RSP^K31 (HL7 v2.8.2) message. */
export interface ParsedRSP_K31 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The RCP segment. */
  responseControl: RCP;
  /** The RESPONSE groups. */
  responses: ParsedResponse[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RSP^K31 (HL7 v2.8.2). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  ARV: (s, e) => ARV.parse(s, e),
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
  CDO: (s, e) => CDO.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RSP^K31 (HL7 v2.8.2) messages. */
export class RSP_K31_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K31";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RSP_K31_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRSP_K31> {
    return parseStructure<ParsedRSP_K31>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RSP^K31 (HL7 v2.8.2) message string into a structured result. */
export function parseRSP_K31(messageString: string): Result<ParsedRSP_K31> {
  return new RSP_K31_Parser().parse(messageString);
}

/** The RESPONSE group of an RSP^K31 (HL7 v2.8.2) message being built. */
export interface ResponseGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The PATIENT group of an RSP^K31 (HL7 v2.8.2) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The ADDITIONAL DEMOGRAPHICS group. */
  additionalDemographics?: AdditionalDemographicsGroup;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PATIENT VISIT group. */
  patientVisit?: PatientVisitGroup;
}

/** The ADDITIONAL DEMOGRAPHICS group of an RSP^K31 (HL7 v2.8.2) message being built. */
export interface AdditionalDemographicsGroup {
  /** The PD1 segment. */
  patientDemographics: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PATIENT VISIT group of an RSP^K31 (HL7 v2.8.2) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ARV segments. */
  arvList?: ARV[];
}

/** The ORDER group of an RSP^K31 (HL7 v2.8.2) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The ORDER DETAIL group. */
  orderDetail?: OrderDetailGroup;
  /** The ENCODING group. */
  encoding?: EncodingGroup;
  /** The RXD segment. */
  dispense: RXD;
  /** The PRT segments. */
  prt2?: PRT[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The CDO segments. */
  cdoList?: CDO[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
}

/** The TIMING group of an RSP^K31 (HL7 v2.8.2) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of an RSP^K31 (HL7 v2.8.2) message being built. */
export interface OrderDetailGroup {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The COMPONENTS groups. */
  components?: ComponentsGroup[];
}

/** The COMPONENTS group of an RSP^K31 (HL7 v2.8.2) message being built. */
export interface ComponentsGroup {
  /** The RXC segment. */
  component: RXC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ENCODING group of an RSP^K31 (HL7 v2.8.2) message being built. */
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

/** The TIMING ENCODED group of an RSP^K31 (HL7 v2.8.2) message being built. */
export interface TimingEncodedGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an RSP^K31 (HL7 v2.8.2) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an RSP^K31 (HL7 v2.8.2) message. */
export interface RSP_K31Options {
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RSP^K31 (HL7 v2.8.2) messages. */
export class RSP_K31<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD, TRCP extends RCP = RCP> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K31";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RSP_K31_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public queryParameters: TQPD,
    public responseControl: TRCP,
    public responses: ResponseGroup[],
    public options: RSP_K31Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAcknowledgment: this.queryAcknowledgment, queryParameters: this.queryParameters, responseControl: this.responseControl, responses: this.responses };
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

/** Builds an HL7 RSP^K31 (HL7 v2.8.2) message. */
export function createRSP_K31<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  responseControl: TRCP,
  responses: ResponseGroup[],
  options: RSP_K31Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RSP_K31<TMSH, TMSA, TQAK, TQPD, TRCP> {
  return new RSP_K31(header, acknowledgment, queryAcknowledgment, queryParameters, responseControl, responses, options, encoding);
}
