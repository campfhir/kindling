/**
 * Builder for ADT^A43 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN { PATIENT: PID [PD1] MRG }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ADT_A43_STRUCTURE } from "../../structures/v2.3.1/ADT_A43.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { EVN } from "../../segments/v2.3.1/EVN.ts";
import type { PID } from "../../segments/v2.3.1/PID.ts";
import type { PD1 } from "../../segments/v2.3.1/PD1.ts";
import type { MRG } from "../../segments/v2.3.1/MRG.ts";

/** The PATIENT group of an ADT^A43 (HL7 v2.3.1) message being built. */
export interface MovePatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The MRG segment. */
  merge: MRG;
}

/** The optional segments and groups of an ADT^A43 (HL7 v2.3.1) message. The message has none. */
export type ADT_A43Options = Record<string, never>;

/** Builder for HL7 ADT^A43 (HL7 v2.3.1) messages. */
export class ADT_A43<TMSH extends MSH = MSH, TEVN extends EVN = EVN> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A43";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A43_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patients: MovePatient[],
    public options: ADT_A43Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patients: this.patients };
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

/** Builds an HL7 ADT^A43 (HL7 v2.3.1) message. */
export function createADT_A43<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: MovePatient[],
  options: ADT_A43Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A43<TMSH, TEVN> {
  return new ADT_A43(header, event, patients, options, encoding);
}
