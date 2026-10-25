/**
 * Builder for RRI^I12 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] [MSA] [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RRI_I12_STRUCTURE } from "../../structures/v2.5.1/RRI_I12.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { SFT } from "../../segments/v2.5.1/SFT.ts";
import type { MSA } from "../../segments/v2.5.1/MSA.ts";
import type { RF1 } from "../../segments/v2.5.1/RF1.ts";
import type { AUT } from "../../segments/v2.5.1/AUT.ts";
import type { CTD } from "../../segments/v2.5.1/CTD.ts";
import type { PRD } from "../../segments/v2.5.1/PRD.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import type { ACC } from "../../segments/v2.5.1/ACC.ts";
import type { DG1 } from "../../segments/v2.5.1/DG1.ts";
import type { DRG } from "../../segments/v2.5.1/DRG.ts";
import type { AL1 } from "../../segments/v2.5.1/AL1.ts";
import type { PR1 } from "../../segments/v2.5.1/PR1.ts";
import type { OBR } from "../../segments/v2.5.1/OBR.ts";
import type { NTE } from "../../segments/v2.5.1/NTE.ts";
import type { OBX } from "../../segments/v2.5.1/OBX.ts";
import type { PV1 } from "../../segments/v2.5.1/PV1.ts";
import type { PV2 } from "../../segments/v2.5.1/PV2.ts";

/** The PROVIDER group of an RRI^I12 (HL7 v2.5.1) message being built. */
export interface Provider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The PROCEDURE group of an RRI^I12 (HL7 v2.5.1) message being built. */
export interface ProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The AUT segment. */
  authorization?: AUT;
  /** The CTD segment. */
  authorizationContact?: CTD;
}

/** The OBSERVATION group of an RRI^I12 (HL7 v2.5.1) message being built. */
export interface Observation {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESULTS groups. */
  results?: Result[];
}

/** The RESULTS group of an RRI^I12 (HL7 v2.5.1) message being built. */
export interface Result {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an RRI^I12 (HL7 v2.5.1) message. */
export interface RRI_I12Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The MSA segment. */
  acknowledgment?: MSA;
  /** The RF1 segment. */
  referral?: RF1;
  /** The AUT segment. */
  authorization?: AUT;
  /** The CTD segment. */
  authorizationContact?: CTD;
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
  observations?: Observation[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Builder for HL7 RRI^I12 (HL7 v2.5.1) messages. */
export class RRI_I12<TMSH extends MSH = MSH, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RRI_I12";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RRI_I12_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public providers: Provider[],
    public patient: TPID,
    public options: RRI_I12Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, providers: this.providers, patient: this.patient };
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

/** Builds an HL7 RRI^I12 (HL7 v2.5.1) message. */
export function createRRI_I12<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providers: Provider[],
  patient: TPID,
  options: RRI_I12Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RRI_I12<TMSH, TPID> {
  return new RRI_I12(header, providers, patient, options, encoding);
}
