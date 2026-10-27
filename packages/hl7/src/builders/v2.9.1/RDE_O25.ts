/**
 * Builder for RDE^O25 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{NTE}] [{ARV}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] [{ARV}] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: RXO [{PRT}] [{NTE}] {RXR} [{ COMPONENTS: RXC [{NTE}] }] ] RXE [{PRT}] [{NTE}] { TIMING_ENCODED: TQ1 [{TQ2}] } [{ PHARMACY_TREATMENT_INFUSION_ORDER: RXV [{PRT}] [{NTE}] { TIMING_ENCODED: TQ1 [{TQ2}] } }] {RXR} [{RXC}] [{CDO}] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] [{FT1}] [BLG] [{CTI}] } MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{PRT}] [{NTE}] ] { ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [ ENCODING: RXE [{PRT}] [{NTE}] { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] ] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RDE_O25_STRUCTURE } from "../../structures/v2.9.1/RDE_O25.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { ARV } from "../../segments/v2.9.1/ARV.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { NTE } from "../../segments/v2.9.1/NTE.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PD1 } from "../../segments/v2.9.1/PD1.ts";
import type { GSP } from "../../segments/v2.9.1/GSP.ts";
import type { GSR } from "../../segments/v2.9.1/GSR.ts";
import type { GSC } from "../../segments/v2.9.1/GSC.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import type { PV2 } from "../../segments/v2.9.1/PV2.ts";
import type { IN1 } from "../../segments/v2.9.1/IN1.ts";
import type { IN2 } from "../../segments/v2.9.1/IN2.ts";
import type { IN3 } from "../../segments/v2.9.1/IN3.ts";
import type { GT1 } from "../../segments/v2.9.1/GT1.ts";
import type { AL1 } from "../../segments/v2.9.1/AL1.ts";
import type { ORC } from "../../segments/v2.9.1/ORC.ts";
import type { TQ1 } from "../../segments/v2.9.1/TQ1.ts";
import type { TQ2 } from "../../segments/v2.9.1/TQ2.ts";
import type { RXO } from "../../segments/v2.9.1/RXO.ts";
import type { RXR } from "../../segments/v2.9.1/RXR.ts";
import type { RXC } from "../../segments/v2.9.1/RXC.ts";
import type { RXE } from "../../segments/v2.9.1/RXE.ts";
import type { RXV } from "../../segments/v2.9.1/RXV.ts";
import type { CDO } from "../../segments/v2.9.1/CDO.ts";
import type { OBX } from "../../segments/v2.9.1/OBX.ts";
import type { FT1 } from "../../segments/v2.9.1/FT1.ts";
import type { BLG } from "../../segments/v2.9.1/BLG.ts";
import type { CTI } from "../../segments/v2.9.1/CTI.ts";
import type { MSA } from "../../segments/v2.9.1/MSA.ts";
import type { ERR } from "../../segments/v2.9.1/ERR.ts";

/** The PATIENT group of an RDE^O25 (HL7 v2.9.1) message being built. */
export interface Patient1Group {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The PATIENT VISIT group. */
  patientVisit?: PatientVisitGroup;
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The GT1 segment. */
  guarantor?: GT1;
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** The PATIENT VISIT group of an RDE^O25 (HL7 v2.9.1) message being built. */
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

/** The INSURANCE group of an RDE^O25 (HL7 v2.9.1) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER group of an RDE^O25 (HL7 v2.9.1) message being built. */
export interface Order1Group {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: Timing1Group[];
  /** The ORDER DETAIL group. */
  orderDetail?: OrderDetailGroup;
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The PRT segments. */
  prt2?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING ENCODED groups. */
  timingEncodeds: TimingEncoded1Group[];
  /** The PHARMACY TREATMENT INFUSION ORDER groups. */
  pharmacyTreatmentInfusionOrders?: PharmacyTreatmentInfusionOrderGroup[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The CDO segments. */
  cdoList?: CDO[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The FT1 segments. */
  transactions?: FT1[];
  /** The BLG segment. */
  billing?: BLG;
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The TIMING group of an RDE^O25 (HL7 v2.9.1) message being built. */
export interface Timing1Group {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of an RDE^O25 (HL7 v2.9.1) message being built. */
export interface OrderDetailGroup {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The COMPONENTS groups. */
  components?: ComponentsGroup[];
}

/** The COMPONENTS group of an RDE^O25 (HL7 v2.9.1) message being built. */
export interface ComponentsGroup {
  /** The RXC segment. */
  component: RXC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The TIMING ENCODED group of an RDE^O25 (HL7 v2.9.1) message being built. */
export interface TimingEncoded1Group {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The PHARMACY TREATMENT INFUSION ORDER group of an RDE^O25 (HL7 v2.9.1) message being built. */
export interface PharmacyTreatmentInfusionOrderGroup {
  /** The RXV segment. */
  rxv: RXV;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING ENCODED groups. */
  timingEncodeds: TimingEncoded2Group[];
}

/** The TIMING ENCODED group of an RDE^O25 (HL7 v2.9.1) message being built. */
export interface TimingEncoded2Group {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an RDE^O25 (HL7 v2.9.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The RESPONSE group of an RDE^O25 (HL7 v2.9.1) message being built. */
export interface ResponseGroup {
  /** The PATIENT group. */
  patient?: Patient2Group;
  /** The ORDER groups. */
  orders: Order2Group[];
}

/** The PATIENT group of an RDE^O25 (HL7 v2.9.1) message being built. */
export interface Patient2Group {
  /** The PID segment. */
  patient: PID;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of an RDE^O25 (HL7 v2.9.1) message being built. */
export interface Order2Group {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: Timing2Group[];
  /** The ENCODING group. */
  encoding?: EncodingGroup;
}

/** The TIMING group of an RDE^O25 (HL7 v2.9.1) message being built. */
export interface Timing2Group {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ENCODING group of an RDE^O25 (HL7 v2.9.1) message being built. */
export interface EncodingGroup {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING ENCODED groups. */
  timingEncodeds: TimingEncoded3Group[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING ENCODED group of an RDE^O25 (HL7 v2.9.1) message being built. */
export interface TimingEncoded3Group {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The optional segments and groups of an RDE^O25 (HL7 v2.9.1) message. */
export interface RDE_O25Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: Patient1Group;
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  sft2?: SFT[];
  /** The UAC segment. */
  uac2?: UAC;
  /** The NTE segments. */
  nte2?: NTE[];
  /** The RESPONSE group. */
  response?: ResponseGroup;
}

/** Builder for HL7 RDE^O25 (HL7 v2.9.1) messages. */
export class RDE_O25<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RDE_O25";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RDE_O25_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: Order1Group[],
    public msh2: MSH,
    public acknowledgment: TMSA,
    public options: RDE_O25Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, orders: this.orders, msh2: this.msh2, acknowledgment: this.acknowledgment };
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

/** Builds an HL7 RDE^O25 (HL7 v2.9.1) message. */
export function createRDE_O25<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  orders: Order1Group[],
  msh2: MSH,
  acknowledgment: TMSA,
  options: RDE_O25Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RDE_O25<TMSH, TMSA> {
  return new RDE_O25(header, orders, msh2, acknowledgment, options, encoding);
}
