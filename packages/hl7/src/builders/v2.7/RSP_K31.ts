/**
 * Builder for RSP^K31 messages (HL7 v2.7).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] QAK QPD RCP { RESPONSE: [ PATIENT: PID [ ADDITIONAL_DEMOGRAPHICS: PD1 [{PRT}] ] [{NTE}] [{AL1}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] ] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: RXO [{NTE}] {RXR} [{ COMPONENTS: RXC [{NTE}] }] ] [ ENCODING: RXE [{NTE}] { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] ] RXD [{PRT}] {RXR} [{RXC}] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RSP_K31_STRUCTURE } from "../../structures/v2.7/RSP_K31.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { MSA } from "../../segments/v2.7/MSA.ts";
import type { ERR } from "../../segments/v2.7/ERR.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { QAK } from "../../segments/v2.7/QAK.ts";
import type { QPD } from "../../segments/v2.7/QPD.ts";
import type { RCP } from "../../segments/v2.7/RCP.ts";
import type { PID } from "../../segments/v2.7/PID.ts";
import type { PD1 } from "../../segments/v2.7/PD1.ts";
import type { PRT } from "../../segments/v2.7/PRT.ts";
import type { NTE } from "../../segments/v2.7/NTE.ts";
import type { AL1 } from "../../segments/v2.7/AL1.ts";
import type { PV1 } from "../../segments/v2.7/PV1.ts";
import type { PV2 } from "../../segments/v2.7/PV2.ts";
import type { ORC } from "../../segments/v2.7/ORC.ts";
import type { TQ1 } from "../../segments/v2.7/TQ1.ts";
import type { TQ2 } from "../../segments/v2.7/TQ2.ts";
import type { RXO } from "../../segments/v2.7/RXO.ts";
import type { RXR } from "../../segments/v2.7/RXR.ts";
import type { RXC } from "../../segments/v2.7/RXC.ts";
import type { RXE } from "../../segments/v2.7/RXE.ts";
import type { RXD } from "../../segments/v2.7/RXD.ts";
import type { OBX } from "../../segments/v2.7/OBX.ts";
import type { DSC } from "../../segments/v2.7/DSC.ts";

/** The RESPONSE group of an RSP^K31 (HL7 v2.7) message being built. */
export interface ResponseGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The ORDER groups. */
  orders: OrderGroup[];
}

/** The PATIENT group of an RSP^K31 (HL7 v2.7) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The ADDITIONAL DEMOGRAPHICS group. */
  additionalDemographics?: AdditionalDemographicsGroup;
  /** The NTE segments. */
  notes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PATIENT VISIT group. */
  patientVisit?: PatientVisitGroup;
}

/** The ADDITIONAL DEMOGRAPHICS group of an RSP^K31 (HL7 v2.7) message being built. */
export interface AdditionalDemographicsGroup {
  /** The PD1 segment. */
  patientDemographics: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PATIENT VISIT group of an RSP^K31 (HL7 v2.7) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER group of an RSP^K31 (HL7 v2.7) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The ORDER DETAIL group. */
  orderDetail?: OrderDetailGroup;
  /** The ENCODING group. */
  encoding?: EncodingGroup;
  /** The RXD segment. */
  dispense: RXD;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
}

/** The TIMING group of an RSP^K31 (HL7 v2.7) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of an RSP^K31 (HL7 v2.7) message being built. */
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

/** The COMPONENTS group of an RSP^K31 (HL7 v2.7) message being built. */
export interface ComponentsGroup {
  /** The RXC segment. */
  component: RXC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ENCODING group of an RSP^K31 (HL7 v2.7) message being built. */
export interface EncodingGroup {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING ENCODED groups. */
  timingEncodeds: TimingEncodedGroup[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING ENCODED group of an RSP^K31 (HL7 v2.7) message being built. */
export interface TimingEncodedGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an RSP^K31 (HL7 v2.7) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an RSP^K31 (HL7 v2.7) message. */
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

/** Builder for HL7 RSP^K31 (HL7 v2.7) messages. */
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

/** Builds an HL7 RSP^K31 (HL7 v2.7) message. */
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
