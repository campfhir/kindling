/**
 * Builder for PIN^I07 messages (HL7 v2.3).
 *
 * Structure: MSH { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { PIN_I07_STRUCTURE } from "../../structures/v2.3/PIN_I07.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { PRD } from "../../segments/v2.3/PRD.ts";
import type { CTD } from "../../segments/v2.3/CTD.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { NK1 } from "../../segments/v2.3/NK1.ts";
import type { GT1 } from "../../segments/v2.3/GT1.ts";
import type { IN1 } from "../../segments/v2.3/IN1.ts";
import type { IN2 } from "../../segments/v2.3/IN2.ts";
import type { IN3 } from "../../segments/v2.3/IN3.ts";
import type { NTE } from "../../segments/v2.3/NTE.ts";

/** The PROVIDER group of an PIN^I07 (HL7 v2.3) message being built. */
export interface Provider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The INSURANCE group of an PIN^I07 (HL7 v2.3) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The optional segments and groups of an PIN^I07 (HL7 v2.3) message. */
export interface PIN_I07Options {
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Builder for HL7 PIN^I07 (HL7 v2.3) messages. */
export class PIN_I07<TMSH extends MSH = MSH, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PIN_I07";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = PIN_I07_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public providers: Provider[],
    public patient: TPID,
    public options: PIN_I07Options = {},
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

/** Builds an HL7 PIN^I07 (HL7 v2.3) message. */
export function createPIN_I07<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providers: Provider[],
  patient: TPID,
  options: PIN_I07Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PIN_I07<TMSH, TPID> {
  return new PIN_I07(header, providers, patient, options, encoding);
}
