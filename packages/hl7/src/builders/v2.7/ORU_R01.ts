/**
 * Builder for ORU^R01 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] { PATIENT_RESULT: [ PATIENT: PID [PD1] [{PRT}] [{NTE}] [{NK1}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [ VISIT: PV1 [PV2] [{PRT}] ] ] { ORDER_OBSERVATION: [ORC] OBR [{NTE}] [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] [CTD] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] [{FT1}] [{CTI}] [{ SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] }] } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ORU_R01_STRUCTURE } from "../../structures/v2.7/ORU_R01.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { PID } from "../../segments/v2.7/PID.ts";
import type { PD1 } from "../../segments/v2.7/PD1.ts";
import type { PRT } from "../../segments/v2.7/PRT.ts";
import type { NTE } from "../../segments/v2.7/NTE.ts";
import type { NK1 } from "../../segments/v2.7/NK1.ts";
import type { OBX } from "../../segments/v2.7/OBX.ts";
import type { PV1 } from "../../segments/v2.7/PV1.ts";
import type { PV2 } from "../../segments/v2.7/PV2.ts";
import type { ORC } from "../../segments/v2.7/ORC.ts";
import type { OBR } from "../../segments/v2.7/OBR.ts";
import type { TQ1 } from "../../segments/v2.7/TQ1.ts";
import type { TQ2 } from "../../segments/v2.7/TQ2.ts";
import type { CTD } from "../../segments/v2.7/CTD.ts";
import type { FT1 } from "../../segments/v2.7/FT1.ts";
import type { CTI } from "../../segments/v2.7/CTI.ts";
import type { SPM } from "../../segments/v2.7/SPM.ts";
import type { DSC } from "../../segments/v2.7/DSC.ts";

/** The PATIENT RESULT group of an ORU^R01 (HL7 v2.7) message being built. */
export interface PatientResultGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The ORDER OBSERVATION groups. */
  orderObservations: OrderObservationGroup[];
}

/** The PATIENT group of an ORU^R01 (HL7 v2.7) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The PATIENT OBSERVATION groups. */
  patientObservations?: PatientObservationGroup[];
  /** The VISIT group. */
  visit?: VisitGroup;
}

/** The PATIENT OBSERVATION group of an ORU^R01 (HL7 v2.7) message being built. */
export interface PatientObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The VISIT group of an ORU^R01 (HL7 v2.7) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER OBSERVATION group of an ORU^R01 (HL7 v2.7) message being built. */
export interface OrderObservationGroup {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING QTY groups. */
  timingQtys?: TimingQtyGroup[];
  /** The CTD segment. */
  contact?: CTD;
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The FT1 segments. */
  transactions?: FT1[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
  /** The SPECIMEN groups. */
  specimens?: SpecimenGroup[];
}

/** The TIMING QTY group of an ORU^R01 (HL7 v2.7) message being built. */
export interface TimingQtyGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an ORU^R01 (HL7 v2.7) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The SPECIMEN group of an ORU^R01 (HL7 v2.7) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: SpecimenObservationGroup[];
}

/** The SPECIMEN OBSERVATION group of an ORU^R01 (HL7 v2.7) message being built. */
export interface SpecimenObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The optional segments and groups of an ORU^R01 (HL7 v2.7) message. */
export interface ORU_R01Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 ORU^R01 (HL7 v2.7) messages. */
export class ORU_R01<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORU_R01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ORU_R01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public patientResults: PatientResultGroup[],
    public options: ORU_R01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, patientResults: this.patientResults };
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

/** Builds an HL7 ORU^R01 (HL7 v2.7) message. */
export function createORU_R01<TMSH extends MSH = MSH>(
  header: TMSH,
  patientResults: PatientResultGroup[],
  options: ORU_R01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORU_R01<TMSH> {
  return new ORU_R01(header, patientResults, options, encoding);
}
