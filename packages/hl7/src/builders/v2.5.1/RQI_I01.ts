/**
 * Builder for RQI^I01 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RQI_I01_STRUCTURE } from "../../structures/v2.5.1/RQI_I01.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { SFT } from "../../segments/v2.5.1/SFT.ts";
import type { PRD } from "../../segments/v2.5.1/PRD.ts";
import type { CTD } from "../../segments/v2.5.1/CTD.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import type { NK1 } from "../../segments/v2.5.1/NK1.ts";
import type { GT1 } from "../../segments/v2.5.1/GT1.ts";
import type { IN1 } from "../../segments/v2.5.1/IN1.ts";
import type { IN2 } from "../../segments/v2.5.1/IN2.ts";
import type { IN3 } from "../../segments/v2.5.1/IN3.ts";
import type { NTE } from "../../segments/v2.5.1/NTE.ts";

/** The PROVIDER group of an RQI^I01 (HL7 v2.5.1) message being built. */
export interface Provider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The INSURANCE group of an RQI^I01 (HL7 v2.5.1) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The optional segments and groups of an RQI^I01 (HL7 v2.5.1) message. */
export interface RQI_I01Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Builder for HL7 RQI^I01 (HL7 v2.5.1) messages. */
export class RQI_I01<TMSH extends MSH = MSH, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RQI_I01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RQI_I01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public providers: Provider[],
    public patient: TPID,
    public options: RQI_I01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, providers: this.providers, patient: this.patient };
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

/** Builds an HL7 RQI^I01 (HL7 v2.5.1) message. */
export function createRQI_I01<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providers: Provider[],
  patient: TPID,
  options: RQI_I01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RQI_I01<TMSH, TPID> {
  return new RQI_I01(header, providers, patient, options, encoding);
}
