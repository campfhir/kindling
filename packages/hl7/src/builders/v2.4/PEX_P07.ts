/**
 * Builder for PEX^P07 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID [PD1] [{NTE}] [ VISIT: PV1 [PV2] ] { EXPERIENCE: PES { PEX_OBSERVATION: PEO { PEX_CAUSE: PCR [ RX_ORDER: RXE [{RXR}] ] [{ RX_ADMINISTRATION: RXA [RXR] }] [{PRB}] [{OBX}] [{NTE}] [ ASSOCIATED_PERSON: NK1 [ ASSOCIATED_RX_ORDER: RXE [{RXR}] ] [{ ASSOCIATED_RX_ADMIN: RXA [RXR] }] [{PRB}] [{OBX}] ] [{ STUDY: CSR [{CSP}] }] } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { PEX_P07_STRUCTURE } from "../../structures/v2.4/PEX_P07.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { EVN } from "../../segments/v2.4/EVN.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { PD1 } from "../../segments/v2.4/PD1.ts";
import type { NTE } from "../../segments/v2.4/NTE.ts";
import type { PV1 } from "../../segments/v2.4/PV1.ts";
import type { PV2 } from "../../segments/v2.4/PV2.ts";
import type { PES } from "../../segments/v2.4/PES.ts";
import type { PEO } from "../../segments/v2.4/PEO.ts";
import type { PCR } from "../../segments/v2.4/PCR.ts";
import type { RXE } from "../../segments/v2.4/RXE.ts";
import type { RXR } from "../../segments/v2.4/RXR.ts";
import type { RXA } from "../../segments/v2.4/RXA.ts";
import type { PRB } from "../../segments/v2.4/PRB.ts";
import type { OBX } from "../../segments/v2.4/OBX.ts";
import type { NK1 } from "../../segments/v2.4/NK1.ts";
import type { CSR } from "../../segments/v2.4/CSR.ts";
import type { CSP } from "../../segments/v2.4/CSP.ts";

/** The EXPERIENCE group of an PEX^P07 (HL7 v2.4) message being built. */
export interface Experience {
  /** The PES segment. */
  experienceSender: PES;
  /** The PEX OBSERVATION groups. */
  observations: PexObservation[];
}

/** The PEX OBSERVATION group of an PEX^P07 (HL7 v2.4) message being built. */
export interface PexObservation {
  /** The PEO segment. */
  experienceObservation: PEO;
  /** The PEX CAUSE groups. */
  causes: PexCause[];
}

/** The PEX CAUSE group of an PEX^P07 (HL7 v2.4) message being built. */
export interface PexCause {
  /** The PCR segment. */
  causalRelationship: PCR;
  /** The RX ORDER group. */
  rxOrder?: RxOrder;
  /** The RX ADMINISTRATION groups. */
  rxAdministrations?: RxAdministration[];
  /** The PRB segments. */
  problems?: PRB[];
  /** The OBX segments. */
  observations?: OBX[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The ASSOCIATED PERSON group. */
  associatedPerson?: AssociatedPerson;
  /** The STUDY groups. */
  studies?: Study[];
}

/** The RX ORDER group of an PEX^P07 (HL7 v2.4) message being built. */
export interface RxOrder {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The RXR segments. */
  routes?: RXR[];
}

/** The RX ADMINISTRATION group of an PEX^P07 (HL7 v2.4) message being built. */
export interface RxAdministration {
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segment. */
  route?: RXR;
}

/** The ASSOCIATED PERSON group of an PEX^P07 (HL7 v2.4) message being built. */
export interface AssociatedPerson {
  /** The NK1 segment. */
  nextOfKin: NK1;
  /** The ASSOCIATED RX ORDER group. */
  rxOrder?: AssociatedRxOrder;
  /** The ASSOCIATED RX ADMIN groups. */
  rxAdministrations?: AssociatedRxAdmin[];
  /** The PRB segments. */
  problems?: PRB[];
  /** The OBX segments. */
  observations?: OBX[];
}

/** The ASSOCIATED RX ORDER group of an PEX^P07 (HL7 v2.4) message being built. */
export interface AssociatedRxOrder {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The RXR segments. */
  routes?: RXR[];
}

/** The ASSOCIATED RX ADMIN group of an PEX^P07 (HL7 v2.4) message being built. */
export interface AssociatedRxAdmin {
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segment. */
  route?: RXR;
}

/** The STUDY group of an PEX^P07 (HL7 v2.4) message being built. */
export interface Study {
  /** The CSR segment. */
  studyRegistration: CSR;
  /** The CSP segments. */
  clinicalStudyPhases?: CSP[];
}

/** The optional segments and groups of an PEX^P07 (HL7 v2.4) message. */
export interface PEX_P07Options {
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** Builder for HL7 PEX^P07 (HL7 v2.4) messages. */
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
    public experiences: Experience[],
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

/** Builds an HL7 PEX^P07 (HL7 v2.4) message. */
export function createPEX_P07<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  experiences: Experience[],
  options: PEX_P07Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PEX_P07<TMSH, TEVN, TPID> {
  return new PEX_P07(header, event, patient, experiences, options, encoding);
}
