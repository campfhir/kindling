/**
 * Builder for PEX^P07 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{PRT}] [{NTE}] [ VISIT: PV1 [PV2] [{PRT}] ] { EXPERIENCE: PES { PEX_OBSERVATION: PEO { PEX_CAUSE: PCR [ RX_ORDER: RXE [{PRT}] { TIMING_QTY: TQ1 [{TQ2}] } [{RXR}] ] [{ RX_ADMINISTRATION: RXA [RXR] [{PRT}] }] [{PRB}] [{ OBSERVATION: OBX [{PRT}] }] [{NTE}] [ ASSOCIATED_PERSON: NK1 [ ASSOCIATED_RX_ORDER: RXE [{PRT}] { NK1_TIMING_QTY: TQ1 [{TQ2}] } [{RXR}] ] [{ ASSOCIATED_RX_ADMIN: RXA [RXR] [{PRT}] }] [{PRB}] [{ ASSOCIATED_OBSERVATION: OBX [{PRT}] }] ] [{ STUDY: CSR [{CSP}] }] } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { PEX_P07_STRUCTURE } from "../../structures/v2.7/PEX_P07.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { EVN } from "../../segments/v2.7/EVN.ts";
import type { PID } from "../../segments/v2.7/PID.ts";
import type { PD1 } from "../../segments/v2.7/PD1.ts";
import type { PRT } from "../../segments/v2.7/PRT.ts";
import type { NTE } from "../../segments/v2.7/NTE.ts";
import type { PV1 } from "../../segments/v2.7/PV1.ts";
import type { PV2 } from "../../segments/v2.7/PV2.ts";
import type { PES } from "../../segments/v2.7/PES.ts";
import type { PEO } from "../../segments/v2.7/PEO.ts";
import type { PCR } from "../../segments/v2.7/PCR.ts";
import type { RXE } from "../../segments/v2.7/RXE.ts";
import type { TQ1 } from "../../segments/v2.7/TQ1.ts";
import type { TQ2 } from "../../segments/v2.7/TQ2.ts";
import type { RXR } from "../../segments/v2.7/RXR.ts";
import type { RXA } from "../../segments/v2.7/RXA.ts";
import type { PRB } from "../../segments/v2.7/PRB.ts";
import type { OBX } from "../../segments/v2.7/OBX.ts";
import type { NK1 } from "../../segments/v2.7/NK1.ts";
import type { CSR } from "../../segments/v2.7/CSR.ts";
import type { CSP } from "../../segments/v2.7/CSP.ts";

/** The VISIT group of an PEX^P07 (HL7 v2.7) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The EXPERIENCE group of an PEX^P07 (HL7 v2.7) message being built. */
export interface ExperienceGroup {
  /** The PES segment. */
  experienceSender: PES;
  /** The PEX OBSERVATION groups. */
  pexObservations: PexObservationGroup[];
}

/** The PEX OBSERVATION group of an PEX^P07 (HL7 v2.7) message being built. */
export interface PexObservationGroup {
  /** The PEO segment. */
  experienceObservation: PEO;
  /** The PEX CAUSE groups. */
  pexCauses: PexCauseGroup[];
}

/** The PEX CAUSE group of an PEX^P07 (HL7 v2.7) message being built. */
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

/** The RX ORDER group of an PEX^P07 (HL7 v2.7) message being built. */
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

/** The TIMING QTY group of an PEX^P07 (HL7 v2.7) message being built. */
export interface TimingQtyGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The RX ADMINISTRATION group of an PEX^P07 (HL7 v2.7) message being built. */
export interface RxAdministrationGroup {
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segment. */
  route?: RXR;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The OBSERVATION group of an PEX^P07 (HL7 v2.7) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ASSOCIATED PERSON group of an PEX^P07 (HL7 v2.7) message being built. */
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

/** The ASSOCIATED RX ORDER group of an PEX^P07 (HL7 v2.7) message being built. */
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

/** The NK1 TIMING QTY group of an PEX^P07 (HL7 v2.7) message being built. */
export interface Nk1TimingQtyGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ASSOCIATED RX ADMIN group of an PEX^P07 (HL7 v2.7) message being built. */
export interface AssociatedRxAdminGroup {
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segment. */
  route?: RXR;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ASSOCIATED OBSERVATION group of an PEX^P07 (HL7 v2.7) message being built. */
export interface AssociatedObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The STUDY group of an PEX^P07 (HL7 v2.7) message being built. */
export interface StudyGroup {
  /** The CSR segment. */
  studyRegistration: CSR;
  /** The CSP segments. */
  clinicalStudyPhases?: CSP[];
}

/** The optional segments and groups of an PEX^P07 (HL7 v2.7) message. */
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

/** Builder for HL7 PEX^P07 (HL7 v2.7) messages. */
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

/** Builds an HL7 PEX^P07 (HL7 v2.7) message. */
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
