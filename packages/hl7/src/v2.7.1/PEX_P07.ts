/**
 * Builder, parser and structure for PEX^P07 messages (HL7 v2.7.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{PRT}] [{NTE}] [ VISIT: PV1 [PV2] [{PRT}] ] { EXPERIENCE: PES { PEX_OBSERVATION: PEO { PEX_CAUSE: PCR [ RX_ORDER: RXE [{PRT}] { TIMING_QTY: TQ1 [{TQ2}] } [{RXR}] ] [{ RX_ADMINISTRATION: RXA [RXR] [{PRT}] }] [{PRB}] [{ OBSERVATION: OBX [{PRT}] }] [{NTE}] [ ASSOCIATED_PERSON: NK1 [ ASSOCIATED_RX_ORDER: RXE [{PRT}] { NK1_TIMING_QTY: TQ1 [{TQ2}] } [{RXR}] ] [{ ASSOCIATED_RX_ADMIN: RXA [RXR] [{PRT}] }] [{PRB}] [{ ASSOCIATED_OBSERVATION: OBX [{PRT}] }] ] [{ STUDY: CSR [{CSP}] }] } } }
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
import { PD1 } from "./PD1.ts";
import { PRT } from "./PRT.ts";
import { NTE } from "./NTE.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { PES } from "./PES.ts";
import { PEO } from "./PEO.ts";
import { PCR } from "./PCR.ts";
import { RXE } from "./RXE.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { RXR } from "./RXR.ts";
import { RXA } from "./RXA.ts";
import { PRB } from "./PRB.ts";
import { OBX } from "./OBX.ts";
import { NK1 } from "./NK1.ts";
import { CSR } from "./CSR.ts";
import { CSP } from "./CSP.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of PEX^P07 (HL7 v2.7.1), in order. */
export const PEX_P07_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "PRT", required: false, repeating: true },
  { name: "NTE", required: false, repeating: true },
  {
    name: "VISIT",
    required: false,
    repeating: false,
    segments: [
      { name: "PV1", required: true, repeating: false },
      { name: "PV2", required: false, repeating: false },
      { name: "PRT", required: false, repeating: true },
    ],
  },
  {
    name: "EXPERIENCE",
    required: true,
    repeating: true,
    segments: [
      { name: "PES", required: true, repeating: false },
      {
        name: "PEX_OBSERVATION",
        required: true,
        repeating: true,
        segments: [
          { name: "PEO", required: true, repeating: false },
          {
            name: "PEX_CAUSE",
            required: true,
            repeating: true,
            segments: [
              { name: "PCR", required: true, repeating: false },
              {
                name: "RX_ORDER",
                required: false,
                repeating: false,
                segments: [
                  { name: "RXE", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                  {
                    name: "TIMING_QTY",
                    required: true,
                    repeating: true,
                    segments: [
                      { name: "TQ1", required: true, repeating: false },
                      { name: "TQ2", required: false, repeating: true },
                    ],
                  },
                  { name: "RXR", required: false, repeating: true },
                ],
              },
              {
                name: "RX_ADMINISTRATION",
                required: false,
                repeating: true,
                segments: [
                  { name: "RXA", required: true, repeating: false },
                  { name: "RXR", required: false, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                ],
              },
              { name: "PRB", required: false, repeating: true },
              {
                name: "OBSERVATION",
                required: false,
                repeating: true,
                segments: [
                  { name: "OBX", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                ],
              },
              { name: "NTE", required: false, repeating: true },
              {
                name: "ASSOCIATED_PERSON",
                required: false,
                repeating: false,
                segments: [
                  { name: "NK1", required: true, repeating: false },
                  {
                    name: "ASSOCIATED_RX_ORDER",
                    required: false,
                    repeating: false,
                    segments: [
                      { name: "RXE", required: true, repeating: false },
                      { name: "PRT", required: false, repeating: true },
                      {
                        name: "NK1_TIMING_QTY",
                        required: true,
                        repeating: true,
                        segments: [
                          { name: "TQ1", required: true, repeating: false },
                          { name: "TQ2", required: false, repeating: true },
                        ],
                      },
                      { name: "RXR", required: false, repeating: true },
                    ],
                  },
                  {
                    name: "ASSOCIATED_RX_ADMIN",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "RXA", required: true, repeating: false },
                      { name: "RXR", required: false, repeating: false },
                      { name: "PRT", required: false, repeating: true },
                    ],
                  },
                  { name: "PRB", required: false, repeating: true },
                  {
                    name: "ASSOCIATED_OBSERVATION",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "OBX", required: true, repeating: false },
                      { name: "PRT", required: false, repeating: true },
                    ],
                  },
                ],
              },
              {
                name: "STUDY",
                required: false,
                repeating: true,
                segments: [
                  { name: "CSR", required: true, repeating: false },
                  { name: "CSP", required: false, repeating: true },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

/** The VISIT group of a parsed PEX^P07 (HL7 v2.7.1) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The EXPERIENCE group of a parsed PEX^P07 (HL7 v2.7.1) message. */
export interface ParsedExperience {
  /** The PES segment. */
  experienceSender: PES;
  /** The PEX OBSERVATION groups. */
  pexObservations: ParsedPexObservation[];
}

/** The PEX OBSERVATION group of a parsed PEX^P07 (HL7 v2.7.1) message. */
export interface ParsedPexObservation {
  /** The PEO segment. */
  experienceObservation: PEO;
  /** The PEX CAUSE groups. */
  pexCauses: ParsedPexCause[];
}

/** The PEX CAUSE group of a parsed PEX^P07 (HL7 v2.7.1) message. */
export interface ParsedPexCause {
  /** The PCR segment. */
  causalRelationship: PCR;
  /** The RX ORDER group. */
  rxOrder?: ParsedRxOrder;
  /** The RX ADMINISTRATION groups. */
  rxAdministrations?: ParsedRxAdministration[];
  /** The PRB segments. */
  problems?: PRB[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The ASSOCIATED PERSON group. */
  associatedPerson?: ParsedAssociatedPerson;
  /** The STUDY groups. */
  studys?: ParsedStudy[];
}

/** The RX ORDER group of a parsed PEX^P07 (HL7 v2.7.1) message. */
export interface ParsedRxOrder {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING QTY groups. */
  timingQtys: ParsedTimingQty[];
  /** The RXR segments. */
  routes?: RXR[];
}

/** The TIMING QTY group of a parsed PEX^P07 (HL7 v2.7.1) message. */
export interface ParsedTimingQty {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The RX ADMINISTRATION group of a parsed PEX^P07 (HL7 v2.7.1) message. */
export interface ParsedRxAdministration {
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segment. */
  route?: RXR;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The OBSERVATION group of a parsed PEX^P07 (HL7 v2.7.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ASSOCIATED PERSON group of a parsed PEX^P07 (HL7 v2.7.1) message. */
export interface ParsedAssociatedPerson {
  /** The NK1 segment. */
  nextOfKin: NK1;
  /** The ASSOCIATED RX ORDER group. */
  associatedRxOrder?: ParsedAssociatedRxOrder;
  /** The ASSOCIATED RX ADMIN groups. */
  associatedRxAdmins?: ParsedAssociatedRxAdmin[];
  /** The PRB segments. */
  problems?: PRB[];
  /** The ASSOCIATED OBSERVATION groups. */
  associatedObservations?: ParsedAssociatedObservation[];
}

/** The ASSOCIATED RX ORDER group of a parsed PEX^P07 (HL7 v2.7.1) message. */
export interface ParsedAssociatedRxOrder {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NK1 TIMING QTY groups. */
  nk1TimingQtys: ParsedNk1TimingQty[];
  /** The RXR segments. */
  routes?: RXR[];
}

/** The NK1 TIMING QTY group of a parsed PEX^P07 (HL7 v2.7.1) message. */
export interface ParsedNk1TimingQty {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ASSOCIATED RX ADMIN group of a parsed PEX^P07 (HL7 v2.7.1) message. */
export interface ParsedAssociatedRxAdmin {
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segment. */
  route?: RXR;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ASSOCIATED OBSERVATION group of a parsed PEX^P07 (HL7 v2.7.1) message. */
export interface ParsedAssociatedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The STUDY group of a parsed PEX^P07 (HL7 v2.7.1) message. */
export interface ParsedStudy {
  /** The CSR segment. */
  studyRegistration: CSR;
  /** The CSP segments. */
  clinicalStudyPhases?: CSP[];
}

/** Structured result of parsing an HL7 PEX^P07 (HL7 v2.7.1) message. */
export interface ParsedPEX_P07 extends ParsedMessageBase {
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
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The VISIT group. */
  visit?: ParsedVisit;
  /** The EXPERIENCE groups. */
  experiences: ParsedExperience[];
}

/** The segment parsers of PEX^P07 (HL7 v2.7.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  PES: (s, e) => PES.parse(s, e),
  PEO: (s, e) => PEO.parse(s, e),
  PCR: (s, e) => PCR.parse(s, e),
  RXE: (s, e) => RXE.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXA: (s, e) => RXA.parse(s, e),
  PRB: (s, e) => PRB.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  CSR: (s, e) => CSR.parse(s, e),
  CSP: (s, e) => CSP.parse(s, e),
};

/** Parser for HL7 PEX^P07 (HL7 v2.7.1) messages. */
export class PEX_P07_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PEX_P07";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = PEX_P07_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedPEX_P07> {
    return parseStructure<ParsedPEX_P07>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 PEX^P07 (HL7 v2.7.1) message string into a structured result. */
export function parsePEX_P07(messageString: string): Result<ParsedPEX_P07> {
  return new PEX_P07_Parser().parse(messageString);
}

/** The VISIT group of an PEX^P07 (HL7 v2.7.1) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The EXPERIENCE group of an PEX^P07 (HL7 v2.7.1) message being built. */
export interface ExperienceGroup {
  /** The PES segment. */
  experienceSender: PES;
  /** The PEX OBSERVATION groups. */
  pexObservations: PexObservationGroup[];
}

/** The PEX OBSERVATION group of an PEX^P07 (HL7 v2.7.1) message being built. */
export interface PexObservationGroup {
  /** The PEO segment. */
  experienceObservation: PEO;
  /** The PEX CAUSE groups. */
  pexCauses: PexCauseGroup[];
}

/** The PEX CAUSE group of an PEX^P07 (HL7 v2.7.1) message being built. */
export interface PexCauseGroup {
  /** The PCR segment. */
  causalRelationship: PCR;
  /** The RX ORDER group. */
  rxOrder?: RxOrderGroup;
  /** The RX ADMINISTRATION groups. */
  rxAdministrations?: RxAdministrationGroup[];
  /** The PRB segments. */
  problems?: PRB[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The ASSOCIATED PERSON group. */
  associatedPerson?: AssociatedPersonGroup;
  /** The STUDY groups. */
  studys?: StudyGroup[];
}

/** The RX ORDER group of an PEX^P07 (HL7 v2.7.1) message being built. */
export interface RxOrderGroup {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING QTY groups. */
  timingQtys: TimingQtyGroup[];
  /** The RXR segments. */
  routes?: RXR[];
}

/** The TIMING QTY group of an PEX^P07 (HL7 v2.7.1) message being built. */
export interface TimingQtyGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The RX ADMINISTRATION group of an PEX^P07 (HL7 v2.7.1) message being built. */
export interface RxAdministrationGroup {
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segment. */
  route?: RXR;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The OBSERVATION group of an PEX^P07 (HL7 v2.7.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ASSOCIATED PERSON group of an PEX^P07 (HL7 v2.7.1) message being built. */
export interface AssociatedPersonGroup {
  /** The NK1 segment. */
  nextOfKin: NK1;
  /** The ASSOCIATED RX ORDER group. */
  associatedRxOrder?: AssociatedRxOrderGroup;
  /** The ASSOCIATED RX ADMIN groups. */
  associatedRxAdmins?: AssociatedRxAdminGroup[];
  /** The PRB segments. */
  problems?: PRB[];
  /** The ASSOCIATED OBSERVATION groups. */
  associatedObservations?: AssociatedObservationGroup[];
}

/** The ASSOCIATED RX ORDER group of an PEX^P07 (HL7 v2.7.1) message being built. */
export interface AssociatedRxOrderGroup {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NK1 TIMING QTY groups. */
  nk1TimingQtys: Nk1TimingQtyGroup[];
  /** The RXR segments. */
  routes?: RXR[];
}

/** The NK1 TIMING QTY group of an PEX^P07 (HL7 v2.7.1) message being built. */
export interface Nk1TimingQtyGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ASSOCIATED RX ADMIN group of an PEX^P07 (HL7 v2.7.1) message being built. */
export interface AssociatedRxAdminGroup {
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segment. */
  route?: RXR;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ASSOCIATED OBSERVATION group of an PEX^P07 (HL7 v2.7.1) message being built. */
export interface AssociatedObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The STUDY group of an PEX^P07 (HL7 v2.7.1) message being built. */
export interface StudyGroup {
  /** The CSR segment. */
  studyRegistration: CSR;
  /** The CSP segments. */
  clinicalStudyPhases?: CSP[];
}

/** The optional segments and groups of an PEX^P07 (HL7 v2.7.1) message. */
export interface PEX_P07Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The VISIT group. */
  visit?: VisitGroup;
}

/** Builder for HL7 PEX^P07 (HL7 v2.7.1) messages. */
export class PEX_P07<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PEX_P07";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = PEX_P07_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public experiences: ExperienceGroup[],
    public options: PEX_P07Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, experiences: this.experiences };
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

/** Builds an HL7 PEX^P07 (HL7 v2.7.1) message. */
export function createPEX_P07<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  experiences: ExperienceGroup[],
  options: PEX_P07Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PEX_P07<TMSH, TEVN, TPID> {
  return new PEX_P07(header, event, patient, experiences, options, encoding);
}
