/**
 * Builder for DEO^O45 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [ DONOR: PID [{PRT}] [{ DONOR_OBSERVATIONS: OBX [{PRT}] }] [{ARV}] [{NTE}] [ DONOR_REGISTRATION: PV1 [{PRT}] [{NTE}] ] ] { DONATION_ORDER: OBR [{PRT}] [{NTE}] [{ DONATION_OBSERVATION: OBX [{PRT}] [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { DEO_O45_STRUCTURE } from "../../structures/v2.9.1/DEO_O45.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { ARV } from "../../segments/v2.9.1/ARV.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { OBX } from "../../segments/v2.9.1/OBX.ts";
import type { NTE } from "../../segments/v2.9.1/NTE.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import type { OBR } from "../../segments/v2.9.1/OBR.ts";

/** The DONOR group of an DEO^O45 (HL7 v2.9.1) message being built. */
export interface DonorGroup {
  /** The PID segment. */
  patient: PID;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The DONOR OBSERVATIONS groups. */
  donorObservations?: DonorObservationsGroup[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The DONOR REGISTRATION group. */
  donorRegistration?: DonorRegistrationGroup;
}

/** The DONOR OBSERVATIONS group of an DEO^O45 (HL7 v2.9.1) message being built. */
export interface DonorObservationsGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The DONOR REGISTRATION group of an DEO^O45 (HL7 v2.9.1) message being built. */
export interface DonorRegistrationGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The DONATION ORDER group of an DEO^O45 (HL7 v2.9.1) message being built. */
export interface DonationOrderGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The DONATION OBSERVATION groups. */
  donationObservations?: DonationObservationGroup[];
}

/** The DONATION OBSERVATION group of an DEO^O45 (HL7 v2.9.1) message being built. */
export interface DonationObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an DEO^O45 (HL7 v2.9.1) message. */
export interface DEO_O45Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The DONOR group. */
  donor?: DonorGroup;
}

/** Builder for HL7 DEO^O45 (HL7 v2.9.1) messages. */
export class DEO_O45<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DEO_O45";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = DEO_O45_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public donationOrders: DonationOrderGroup[],
    public options: DEO_O45Options = {},
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

/** Builds an HL7 DEO^O45 (HL7 v2.9.1) message. */
export function createDEO_O45<TMSH extends MSH = MSH>(
  header: TMSH,
  donationOrders: DonationOrderGroup[],
  options: DEO_O45Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): DEO_O45<TMSH> {
  return new DEO_O45(header, donationOrders, options, encoding);
}
