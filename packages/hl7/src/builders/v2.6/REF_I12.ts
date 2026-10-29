/**
 * Builder for REF^I12 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] [RF1] [ AUTHORIZATION_CONTACT: AUT [CTD] ] { PROVIDER_CONTACT: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION_CONTACT: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS_NOTES: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { REF_I12_STRUCTURE } from "../../structures/v2.6/REF_I12.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { RF1 } from "../../segments/v2.6/RF1.ts";
import type { AUT } from "../../segments/v2.6/AUT.ts";
import type { CTD } from "../../segments/v2.6/CTD.ts";
import type { PRD } from "../../segments/v2.6/PRD.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { NK1 } from "../../segments/v2.6/NK1.ts";
import type { GT1 } from "../../segments/v2.6/GT1.ts";
import type { IN1 } from "../../segments/v2.6/IN1.ts";
import type { IN2 } from "../../segments/v2.6/IN2.ts";
import type { IN3 } from "../../segments/v2.6/IN3.ts";
import type { ACC } from "../../segments/v2.6/ACC.ts";
import type { DG1 } from "../../segments/v2.6/DG1.ts";
import type { DRG } from "../../segments/v2.6/DRG.ts";
import type { AL1 } from "../../segments/v2.6/AL1.ts";
import type { PR1 } from "../../segments/v2.6/PR1.ts";
import type { OBR } from "../../segments/v2.6/OBR.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { OBX } from "../../segments/v2.6/OBX.ts";
import type { PV1 } from "../../segments/v2.6/PV1.ts";
import type { PV2 } from "../../segments/v2.6/PV2.ts";

/** The AUTHORIZATION CONTACT group of an REF^I12 (HL7 v2.6) message being built. */
export interface AuthorizationContact1Group {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The PROVIDER CONTACT group of an REF^I12 (HL7 v2.6) message being built. */
export interface ProviderContactGroup {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The INSURANCE group of an REF^I12 (HL7 v2.6) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The PROCEDURE group of an REF^I12 (HL7 v2.6) message being built. */
export interface ProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The AUTHORIZATION CONTACT group. */
  authorizationContact?: AuthorizationContact2Group;
}

/** The AUTHORIZATION CONTACT group of an REF^I12 (HL7 v2.6) message being built. */
export interface AuthorizationContact2Group {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The OBSERVATION group of an REF^I12 (HL7 v2.6) message being built. */
export interface ObservationGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESULTS NOTES groups. */
  resultsNotes?: ResultsNotesGroup[];
}

/** The RESULTS NOTES group of an REF^I12 (HL7 v2.6) message being built. */
export interface ResultsNotesGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PATIENT VISIT group of an REF^I12 (HL7 v2.6) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The optional segments and groups of an REF^I12 (HL7 v2.6) message. */
export interface REF_I12Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The RF1 segment. */
  referral?: RF1;
  /** The AUTHORIZATION CONTACT group. */
  authorizationContact?: AuthorizationContact1Group;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The ACC segment. */
  accident?: ACC;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segments. */
  diagnosisRelatedGroups?: DRG[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PROCEDURE groups. */
  procedures?: ProcedureGroup[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The PATIENT VISIT group. */
  patientVisit?: PatientVisitGroup;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Builder for HL7 REF^I12 (HL7 v2.6) messages. */
export class REF_I12<TMSH extends MSH = MSH, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "REF_I12";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = REF_I12_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public providerContacts: ProviderContactGroup[],
    public patient: TPID,
    public options: REF_I12Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, providerContacts: this.providerContacts, patient: this.patient };
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

/** Builds an HL7 REF^I12 (HL7 v2.6) message. */
export function createREF_I12<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providerContacts: ProviderContactGroup[],
  patient: TPID,
  options: REF_I12Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): REF_I12<TMSH, TPID> {
  return new REF_I12(header, providerContacts, patient, options, encoding);
}
