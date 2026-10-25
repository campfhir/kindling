/**
 * Builder for ADT^A37 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID [PD1] [PV1] [{DB1}] PID [PD1] [PV1] [{DB1}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ADT_A37_STRUCTURE } from "../../structures/v2.4/ADT_A37.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { EVN } from "../../segments/v2.4/EVN.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { PD1 } from "../../segments/v2.4/PD1.ts";
import type { PV1 } from "../../segments/v2.4/PV1.ts";
import type { DB1 } from "../../segments/v2.4/DB1.ts";

/** The optional segments and groups of an ADT^A37 (HL7 v2.4) message. */
export interface ADT_A37Options {
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PV1 segment. */
  visit?: PV1;
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The PD1 segment. */
  otherPatientDemographics?: PD1;
  /** The PV1 segment. */
  otherVisit?: PV1;
  /** The DB1 segments. */
  otherDisabilities?: DB1[];
}

/** Builder for HL7 ADT^A37 (HL7 v2.4) messages. */
export class ADT_A37<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A37";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A37_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public otherPatient: PID,
    public options: ADT_A37Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, otherPatient: this.otherPatient };
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

/** Builds an HL7 ADT^A37 (HL7 v2.4) message. */
export function createADT_A37<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  otherPatient: PID,
  options: ADT_A37Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A37<TMSH, TEVN, TPID> {
  return new ADT_A37(header, event, patient, otherPatient, options, encoding);
}
