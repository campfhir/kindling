/**
 * Builder for DBC^O41 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [ DONOR: PID [PD1] [{PRT}] [{ DONOR_OBSERVATIONS: OBX [{PRT}] }] [{NTE}] [{ARV}] [{AL1}] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { DBC_O41_STRUCTURE } from "../../structures/v2.9.1/DBC_O41.ts";
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

/** The DONOR group of an DBC^O41 (HL7 v2.9.1) message being built. */
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
  /** The ARV segments. */
  arvList?: ARV[];
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** The DONOR OBSERVATIONS group of an DBC^O41 (HL7 v2.9.1) message being built. */
export interface DonorObservationsGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The optional segments and groups of an DBC^O41 (HL7 v2.9.1) message. */
export interface DBC_O41Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The DONOR group. */
  donor?: DonorGroup;
}

/** Builder for HL7 DBC^O41 (HL7 v2.9.1) messages. */
export class DBC_O41<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DBC_O41";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = DBC_O41_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public options: DBC_O41Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header };
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

/** Builds an HL7 DBC^O41 (HL7 v2.9.1) message. */
export function createDBC_O41<TMSH extends MSH = MSH>(
  header: TMSH,
  options: DBC_O41Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): DBC_O41<TMSH> {
  return new DBC_O41(header, options, encoding);
}
