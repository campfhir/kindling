/**
 * Builder for DPR^O48 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [ DONOR: PID [PD1] [{PRT}] [{ DONOR_OBSERVATIONS: OBX [{PRT}] }] [{NTE}] [{AL1}] [{ARV}] [ DONOR_REGISTRATION: PV1 [{PRT}] [{NTE}] ] ] { DONATION_ORDER: OBR [{PRT}] [{NTE}] } [ DONATION: DON [{ DONATION_OBSERVATIONS: OBX [{PRT}] }] [{NTE}] [ BLOOD_UNIT: [{BUI}] [{NTE}] ] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { DPR_O48_STRUCTURE } from "../../structures/v2.9.1/DPR_O48.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { ARV } from "../../segments/v2.9.1/ARV.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PD1 } from "../../segments/v2.9.1/PD1.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { OBX } from "../../segments/v2.9.1/OBX.ts";
import type { NTE } from "../../segments/v2.9.1/NTE.ts";
import type { AL1 } from "../../segments/v2.9.1/AL1.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import type { OBR } from "../../segments/v2.9.1/OBR.ts";
import type { DON } from "../../segments/v2.9.1/DON.ts";
import type { BUI } from "../../segments/v2.9.1/BUI.ts";

/** The DONOR group of an DPR^O48 (HL7 v2.9.1) message being built. */
export interface DonorGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The DONOR OBSERVATIONS groups. */
  donorObservations?: DonorObservationsGroup[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The DONOR REGISTRATION group. */
  donorRegistration?: DonorRegistrationGroup;
}

/** The DONOR OBSERVATIONS group of an DPR^O48 (HL7 v2.9.1) message being built. */
export interface DonorObservationsGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The DONOR REGISTRATION group of an DPR^O48 (HL7 v2.9.1) message being built. */
export interface DonorRegistrationGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DONATION ORDER group of an DPR^O48 (HL7 v2.9.1) message being built. */
export interface DonationOrderGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DONATION group of an DPR^O48 (HL7 v2.9.1) message being built. */
export interface DonationGroup {
  /** The DON segment. */
  don: DON;
  /** The DONATION OBSERVATIONS groups. */
  donationObservations?: DonationObservationsGroup[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The BLOOD UNIT group. */
  bloodUnit?: BloodUnitGroup;
}

/** The DONATION OBSERVATIONS group of an DPR^O48 (HL7 v2.9.1) message being built. */
export interface DonationObservationsGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The BLOOD UNIT group of an DPR^O48 (HL7 v2.9.1) message being built. */
export interface BloodUnitGroup {
  /** The BUI segments. */
  buiList?: BUI[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an DPR^O48 (HL7 v2.9.1) message. */
export interface DPR_O48Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The DONOR group. */
  donor?: DonorGroup;
  /** The DONATION group. */
  donation?: DonationGroup;
}

/** Builder for HL7 DPR^O48 (HL7 v2.9.1) messages. */
export class DPR_O48<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DPR_O48";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = DPR_O48_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public donationOrders: DonationOrderGroup[],
    public options: DPR_O48Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, donationOrders: this.donationOrders };
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

/** Builds an HL7 DPR^O48 (HL7 v2.9.1) message. */
export function createDPR_O48<TMSH extends MSH = MSH>(
  header: TMSH,
  donationOrders: DonationOrderGroup[],
  options: DPR_O48Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): DPR_O48<TMSH> {
  return new DPR_O48(header, donationOrders, options, encoding);
}
