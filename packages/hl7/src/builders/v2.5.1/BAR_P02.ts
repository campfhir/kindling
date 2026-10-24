/**
 * Builder for BAR^P02 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN { PATIENT: PID [PD1] [PV1] [{DB1}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { BAR_P02_STRUCTURE } from "../../structures/v2.5.1/BAR_P02.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { SFT } from "../../segments/v2.5.1/SFT.ts";
import type { EVN } from "../../segments/v2.5.1/EVN.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import type { PD1 } from "../../segments/v2.5.1/PD1.ts";
import type { PV1 } from "../../segments/v2.5.1/PV1.ts";
import type { DB1 } from "../../segments/v2.5.1/DB1.ts";

/** The PATIENT group of an BAR^P02 (HL7 v2.5.1) message being built. */
export interface BARPurgePatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PV1 segment. */
  visit?: PV1;
  /** The DB1 segments. */
  disabilities?: DB1[];
}

/** The optional segments and groups of an BAR^P02 (HL7 v2.5.1) message. */
export interface BAR_P02Options {
  /** The SFT segments. */
  software?: SFT[];
}

/** Builder for HL7 BAR^P02 (HL7 v2.5.1) messages. */
export class BAR_P02<TMSH extends MSH = MSH, TEVN extends EVN = EVN> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = BAR_P02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patients: BARPurgePatientGroup[],
    public options: BAR_P02Options = {},
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

/** Builds an HL7 BAR^P02 (HL7 v2.5.1) message. */
export function createBAR_P02<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: BARPurgePatientGroup[],
  options: BAR_P02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BAR_P02<TMSH, TEVN> {
  return new BAR_P02(header, event, patients, options, encoding);
}
