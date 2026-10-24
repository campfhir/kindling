/**
 * Builder for BAR^P06 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN { PATIENT: PID [PV1] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { BAR_P06_STRUCTURE } from "../../structures/v2.5/BAR_P06.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { EVN } from "../../segments/v2.5/EVN.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { PV1 } from "../../segments/v2.5/PV1.ts";

/** The PATIENT group of an BAR^P06 (HL7 v2.5) message being built. */
export interface BAREndPatientGroup {
  /** The PID segment. */
  pid: PID;
  /** The PV1 segment. */
  pv1?: PV1;
}

/** The optional segments and groups of an BAR^P06 (HL7 v2.5) message. */
export interface BAR_P06Options {
  /** The SFT segments. */
  sftList?: SFT[];
}

/** Builder for HL7 BAR^P06 (HL7 v2.5) messages. */
export class BAR_P06<TMSH extends MSH = MSH, TEVN extends EVN = EVN> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P06";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = BAR_P06_STRUCTURE;

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public evn: TEVN,
    public patients: BAREndPatientGroup[],
    public options: BAR_P06Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, msh: this.msh, evn: this.evn, patients: this.patients };
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

/** Builds an HL7 BAR^P06 (HL7 v2.5) message. */
export function createBAR_P06<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  msh: TMSH,
  evn: TEVN,
  patients: BAREndPatientGroup[],
  options: BAR_P06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BAR_P06<TMSH, TEVN> {
  return new BAR_P06(msh, evn, patients, options, encoding);
}
