/**
 * Builder for RDE^O25 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [PD1] [{PRT}] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: RXO [{NTE}] {RXR} [{ COMPONENTS: RXC [{NTE}] }] ] [{PRT}] RXE [{PRT}] [{NTE}] { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] [{FT1}] [BLG] [{CTI}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RDE_O25_STRUCTURE } from "../../structures/v2.7/RDE_O25.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { NTE } from "../../segments/v2.7/NTE.ts";
import type { PID } from "../../segments/v2.7/PID.ts";
import type { PD1 } from "../../segments/v2.7/PD1.ts";
import type { PRT } from "../../segments/v2.7/PRT.ts";
import type { PV1 } from "../../segments/v2.7/PV1.ts";
import type { PV2 } from "../../segments/v2.7/PV2.ts";
import type { IN1 } from "../../segments/v2.7/IN1.ts";
import type { IN2 } from "../../segments/v2.7/IN2.ts";
import type { IN3 } from "../../segments/v2.7/IN3.ts";
import type { GT1 } from "../../segments/v2.7/GT1.ts";
import type { AL1 } from "../../segments/v2.7/AL1.ts";
import type { ORC } from "../../segments/v2.7/ORC.ts";
import type { TQ1 } from "../../segments/v2.7/TQ1.ts";
import type { TQ2 } from "../../segments/v2.7/TQ2.ts";
import type { RXO } from "../../segments/v2.7/RXO.ts";
import type { RXR } from "../../segments/v2.7/RXR.ts";
import type { RXC } from "../../segments/v2.7/RXC.ts";
import type { RXE } from "../../segments/v2.7/RXE.ts";
import type { OBX } from "../../segments/v2.7/OBX.ts";
import type { FT1 } from "../../segments/v2.7/FT1.ts";
import type { BLG } from "../../segments/v2.7/BLG.ts";
import type { CTI } from "../../segments/v2.7/CTI.ts";

/** The PATIENT group of an RDE^O25 (HL7 v2.7) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT VISIT group. */
  patientVisit?: PatientVisitGroup;
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The GT1 segment. */
  guarantor?: GT1;
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** The PATIENT VISIT group of an RDE^O25 (HL7 v2.7) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The INSURANCE group of an RDE^O25 (HL7 v2.7) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER group of an RDE^O25 (HL7 v2.7) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The ORDER DETAIL group. */
  orderDetail?: OrderDetailGroup;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The PRT segments. */
  prt2?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING ENCODED groups. */
  timingEncodeds: TimingEncodedGroup[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The FT1 segments. */
  transactions?: FT1[];
  /** The BLG segment. */
  billing?: BLG;
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The TIMING group of an RDE^O25 (HL7 v2.7) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of an RDE^O25 (HL7 v2.7) message being built. */
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

/** The COMPONENTS group of an RDE^O25 (HL7 v2.7) message being built. */
export interface ComponentsGroup {
  /** The RXC segment. */
  component: RXC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The TIMING ENCODED group of an RDE^O25 (HL7 v2.7) message being built. */
export interface TimingEncodedGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an RDE^O25 (HL7 v2.7) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an RDE^O25 (HL7 v2.7) message. */
export interface RDE_O25Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: PatientGroup;
}

/** Builder for HL7 RDE^O25 (HL7 v2.7) messages. */
export class RDE_O25<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RDE_O25";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RDE_O25_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public orders: OrderGroup[],
    public options: RDE_O25Options = {},
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

/** Builds an HL7 RDE^O25 (HL7 v2.7) message. */
export function createRDE_O25<TMSH extends MSH = MSH>(
  header: TMSH,
  orders: OrderGroup[],
  options: RDE_O25Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RDE_O25<TMSH> {
  return new RDE_O25(header, orders, options, encoding);
}
