/**
 * Builder for ADT^A39 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN { PATIENT: PID [PD1] MRG [PV1] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ADT_A39_STRUCTURE } from "../../structures/v2.6/ADT_A39.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { EVN } from "../../segments/v2.6/EVN.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { PD1 } from "../../segments/v2.6/PD1.ts";
import type { MRG } from "../../segments/v2.6/MRG.ts";
import type { PV1 } from "../../segments/v2.6/PV1.ts";

/** The PATIENT group of an ADT^A39 (HL7 v2.6) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The MRG segment. */
  merge: MRG;
  /** The PV1 segment. */
  visit?: PV1;
}

/** The optional segments and groups of an ADT^A39 (HL7 v2.6) message. */
export interface ADT_A39Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 ADT^A39 (HL7 v2.6) messages. */
export class ADT_A39<TMSH extends MSH = MSH, TEVN extends EVN = EVN> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A39";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A39_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patients: PatientGroup[],
    public options: ADT_A39Options = {},
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

/** Builds an HL7 ADT^A39 (HL7 v2.6) message. */
export function createADT_A39<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: PatientGroup[],
  options: ADT_A39Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A39<TMSH, TEVN> {
  return new ADT_A39(header, event, patients, options, encoding);
}
