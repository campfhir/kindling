/**
 * Builder for RSP^Z90 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA [ERR] QAK QPD RCP { QUERY_RESPONSE: [ PATIENT: PID [PD1] [{NK1}] [{NTE}] [ VISIT: PV1 [PV2] ] ] { COMMON_ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] OBR [{NTE}] [CTD] { OBSERVATION: [OBX] [{NTE}] } } [{ SPECIMEN: SPM [{OBX}] }] } DSC
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RSP_Z90_STRUCTURE } from "../../structures/v2.5/RSP_Z90.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { MSA } from "../../segments/v2.5/MSA.ts";
import type { ERR } from "../../segments/v2.5/ERR.ts";
import type { QAK } from "../../segments/v2.5/QAK.ts";
import type { QPD } from "../../segments/v2.5/QPD.ts";
import type { RCP } from "../../segments/v2.5/RCP.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { PD1 } from "../../segments/v2.5/PD1.ts";
import type { NK1 } from "../../segments/v2.5/NK1.ts";
import type { NTE } from "../../segments/v2.5/NTE.ts";
import type { PV1 } from "../../segments/v2.5/PV1.ts";
import type { PV2 } from "../../segments/v2.5/PV2.ts";
import type { ORC } from "../../segments/v2.5/ORC.ts";
import type { TQ1 } from "../../segments/v2.5/TQ1.ts";
import type { TQ2 } from "../../segments/v2.5/TQ2.ts";
import type { OBR } from "../../segments/v2.5/OBR.ts";
import type { CTD } from "../../segments/v2.5/CTD.ts";
import type { OBX } from "../../segments/v2.5/OBX.ts";
import type { SPM } from "../../segments/v2.5/SPM.ts";
import type { DSC } from "../../segments/v2.5/DSC.ts";

/** The QUERY RESPONSE group of an RSP^Z90 (HL7 v2.5) message being built. */
export interface QueryResponseGroup {
  /** The PATIENT group. */
  patient?: PatientGroup;
  /** The COMMON ORDER groups. */
  commonOrders: CommonOrderGroup[];
  /** The SPECIMEN groups. */
  specimens?: SpecimenGroup[];
}

/** The PATIENT group of an RSP^Z90 (HL7 v2.5) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The VISIT group. */
  visit?: VisitGroup;
}

/** The VISIT group of an RSP^Z90 (HL7 v2.5) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The COMMON ORDER group of an RSP^Z90 (HL7 v2.5) message being built. */
export interface CommonOrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: TimingGroup[];
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CTD segment. */
  contact?: CTD;
  /** The OBSERVATION groups. */
  observations: ObservationGroup[];
}

/** The TIMING group of an RSP^Z90 (HL7 v2.5) message being built. */
export interface TimingGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of an RSP^Z90 (HL7 v2.5) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The SPECIMEN group of an RSP^Z90 (HL7 v2.5) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The OBX segments. */
  observations?: OBX[];
}

/** The optional segments and groups of an RSP^Z90 (HL7 v2.5) message. */
export interface RSP_Z90Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The ERR segment. */
  error?: ERR;
}

/** Builder for HL7 RSP^Z90 (HL7 v2.5) messages. */
export class RSP_Z90<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD, TRCP extends RCP = RCP, TDSC extends DSC = DSC> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_Z90";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RSP_Z90_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public queryParameters: TQPD,
    public responseControl: TRCP,
    public queryResponses: QueryResponseGroup[],
    public continuation: TDSC,
    public options: RSP_Z90Options = {},
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

/** Builds an HL7 RSP^Z90 (HL7 v2.5) message. */
export function createRSP_Z90<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD, TRCP extends RCP = RCP, TDSC extends DSC = DSC>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  responseControl: TRCP,
  queryResponses: QueryResponseGroup[],
  continuation: TDSC,
  options: RSP_Z90Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RSP_Z90<TMSH, TMSA, TQAK, TQPD, TRCP, TDSC> {
  return new RSP_Z90(header, acknowledgment, queryAcknowledgment, queryParameters, responseControl, queryResponses, continuation, options, encoding);
}
