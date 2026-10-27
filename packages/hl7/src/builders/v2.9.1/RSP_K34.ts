/**
 * Builder for RSP^K34 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] MSA [ERR] QAK QPD [ DONOR: PID [PD1] [{PRT}] [{ DONOR_OBSERVATIONS: OBX [{PRT}] }] [{NTE}] [{AL1}] [{ARV}] [ DONOR_REGISTRATION: PV1 [{PRT}] [{NTE}] ] ] [ DONATION: DON [{ DONOR_OBSERVATIONS: OBX [{PRT}] }] [{NTE}] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RSP_K34_STRUCTURE } from "../../structures/v2.9.1/RSP_K34.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { ARV } from "../../segments/v2.9.1/ARV.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { MSA } from "../../segments/v2.9.1/MSA.ts";
import type { ERR } from "../../segments/v2.9.1/ERR.ts";
import type { QAK } from "../../segments/v2.9.1/QAK.ts";
import type { QPD } from "../../segments/v2.9.1/QPD.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PD1 } from "../../segments/v2.9.1/PD1.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { OBX } from "../../segments/v2.9.1/OBX.ts";
import type { NTE } from "../../segments/v2.9.1/NTE.ts";
import type { AL1 } from "../../segments/v2.9.1/AL1.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import type { DON } from "../../segments/v2.9.1/DON.ts";

/** The DONOR group of an RSP^K34 (HL7 v2.9.1) message being built. */
export interface DonorGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The DONOR OBSERVATIONS groups. */
  donorObservations?: DonorObservations1Group[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The DONOR REGISTRATION group. */
  donorRegistration?: DonorRegistrationGroup;
}

/** The DONOR OBSERVATIONS group of an RSP^K34 (HL7 v2.9.1) message being built. */
export interface DonorObservations1Group {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The DONOR REGISTRATION group of an RSP^K34 (HL7 v2.9.1) message being built. */
export interface DonorRegistrationGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DONATION group of an RSP^K34 (HL7 v2.9.1) message being built. */
export interface DonationGroup {
  /** The DON segment. */
  don: DON;
  /** The DONOR OBSERVATIONS groups. */
  donorObservations?: DonorObservations2Group[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DONOR OBSERVATIONS group of an RSP^K34 (HL7 v2.9.1) message being built. */
export interface DonorObservations2Group {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The optional segments and groups of an RSP^K34 (HL7 v2.9.1) message. */
export interface RSP_K34Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ERR segment. */
  error?: ERR;
  /** The DONOR group. */
  donor?: DonorGroup;
  /** The DONATION group. */
  donation?: DonationGroup;
}

/** Builder for HL7 RSP^K34 (HL7 v2.9.1) messages. */
export class RSP_K34<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K34";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RSP_K34_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public queryParameters: TQPD,
    public options: RSP_K34Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAcknowledgment: this.queryAcknowledgment, queryParameters: this.queryParameters };
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

/** Builds an HL7 RSP^K34 (HL7 v2.9.1) message. */
export function createRSP_K34<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  options: RSP_K34Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RSP_K34<TMSH, TMSA, TQAK, TQPD> {
  return new RSP_K34(header, acknowledgment, queryAcknowledgment, queryParameters, options, encoding);
}
