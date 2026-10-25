/**
 * Builder for RSP^Z88 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA [ERR] QAK QPD RCP { QUERY_RESPONSE: [ PATIENT: PID [PD1] [{NTE}] [ ALLERGY: {AL1} [ VISIT: PV1 [PV2] ] ] ] { COMMON_ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: RXO [{NTE}] {RXR} [ COMPONENT: {RXC} [{NTE}] ] ] [ ORDER_ENCODED: RXE [{ TIMING_ENCODED: TQ1 [{TQ2}] }] {RXR} [{RXC}] ] RXD {RXR} [{RXC}] { OBSERVATION: [OBX] [{NTE}] } } } DSC
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RSP_Z88_STRUCTURE } from "../../structures/v2.5/RSP_Z88.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { MSA } from "../../segments/v2.5/MSA.ts";
import type { ERR } from "../../segments/v2.5/ERR.ts";
import type { QAK } from "../../segments/v2.5/QAK.ts";
import type { QPD } from "../../segments/v2.5/QPD.ts";
import type { RCP } from "../../segments/v2.5/RCP.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { PD1 } from "../../segments/v2.5/PD1.ts";
import type { NTE } from "../../segments/v2.5/NTE.ts";
import type { AL1 } from "../../segments/v2.5/AL1.ts";
import type { PV1 } from "../../segments/v2.5/PV1.ts";
import type { PV2 } from "../../segments/v2.5/PV2.ts";
import type { ORC } from "../../segments/v2.5/ORC.ts";
import type { TQ1 } from "../../segments/v2.5/TQ1.ts";
import type { TQ2 } from "../../segments/v2.5/TQ2.ts";
import type { RXO } from "../../segments/v2.5/RXO.ts";
import type { RXR } from "../../segments/v2.5/RXR.ts";
import type { RXC } from "../../segments/v2.5/RXC.ts";
import type { RXE } from "../../segments/v2.5/RXE.ts";
import type { RXD } from "../../segments/v2.5/RXD.ts";
import type { OBX } from "../../segments/v2.5/OBX.ts";
import type { DSC } from "../../segments/v2.5/DSC.ts";

/** The QUERY RESPONSE group of an RSP^Z88 (HL7 v2.5) message being built. */
export interface QueryResponseGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The COMMON ORDER groups. */
  commonOrders: CommonOrderGroup[];
}

/** The PATIENT group of an RSP^Z88 (HL7 v2.5) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ALLERGY group. */
  allergy?: AllergyGroup;
}

/** The ALLERGY group of an RSP^Z88 (HL7 v2.5) message being built. */
export interface AllergyGroup {
  /** The AL1 segments. */
  allergies: AL1[];
  /** The VISIT group. */
  visit?: VisitGroup;
}

/** The VISIT group of an RSP^Z88 (HL7 v2.5) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The COMMON ORDER group of an RSP^Z88 (HL7 v2.5) message being built. */
export interface CommonOrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The ORDER DETAIL group. */
  orderDetail?: OrderDetailGroup;
  /** The ORDER ENCODED group. */
  orderEncoded?: OrderEncodedGroup;
  /** The RXD segment. */
  dispense: RXD;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The OBSERVATION groups. */
  observations: ObservationGroup[];
}

/** The TIMING group of an RSP^Z88 (HL7 v2.5) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of an RSP^Z88 (HL7 v2.5) message being built. */
export interface OrderDetailGroup {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The COMPONENT group. */
  component?: ComponentGroup;
}

/** The COMPONENT group of an RSP^Z88 (HL7 v2.5) message being built. */
export interface ComponentGroup {
  /** The RXC segments. */
  components: RXC[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER ENCODED group of an RSP^Z88 (HL7 v2.5) message being built. */
export interface OrderEncodedGroup {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The TIMING ENCODED groups. */
  timingEncodeds?: TimingEncodedGroup[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING ENCODED group of an RSP^Z88 (HL7 v2.5) message being built. */
export interface TimingEncodedGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an RSP^Z88 (HL7 v2.5) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an RSP^Z88 (HL7 v2.5) message. */
export interface RSP_Z88Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The ERR segment. */
  error?: ERR;
}

/** Builder for HL7 RSP^Z88 (HL7 v2.5) messages. */
export class RSP_Z88<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD, TRCP extends RCP = RCP, TDSC extends DSC = DSC> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_Z88";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RSP_Z88_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public queryParameters: TQPD,
    public responseControl: TRCP,
    public queryResponses: QueryResponseGroup[],
    public continuation: TDSC,
    public options: RSP_Z88Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAcknowledgment: this.queryAcknowledgment, queryParameters: this.queryParameters, responseControl: this.responseControl, queryResponses: this.queryResponses, continuation: this.continuation };
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

/** Builds an HL7 RSP^Z88 (HL7 v2.5) message. */
export function createRSP_Z88<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD, TRCP extends RCP = RCP, TDSC extends DSC = DSC>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  responseControl: TRCP,
  queryResponses: QueryResponseGroup[],
  continuation: TDSC,
  options: RSP_Z88Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RSP_Z88<TMSH, TMSA, TQAK, TQPD, TRCP, TDSC> {
  return new RSP_Z88(header, acknowledgment, queryAcknowledgment, queryParameters, responseControl, queryResponses, continuation, options, encoding);
}
