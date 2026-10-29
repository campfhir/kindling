/**
 * Builder for ADT^A50 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] MRG PV1
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ADT_A50_STRUCTURE } from "../../structures/v2.7/ADT_A50.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { EVN } from "../../segments/v2.7/EVN.ts";
import type { PID } from "../../segments/v2.7/PID.ts";
import type { PD1 } from "../../segments/v2.7/PD1.ts";
import type { MRG } from "../../segments/v2.7/MRG.ts";
import type { PV1 } from "../../segments/v2.7/PV1.ts";

/** The optional segments and groups of an ADT^A50 (HL7 v2.7) message. */
export interface ADT_A50Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PD1 segment. */
  patientDemographics?: PD1;
}

/** Builder for HL7 ADT^A50 (HL7 v2.7) messages. */
export class ADT_A50<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG, TPV1 extends PV1 = PV1> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A50";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A50_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public merge: TMRG,
    public visit: TPV1,
    public options: ADT_A50Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, merge: this.merge, visit: this.visit };
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

/** Builds an HL7 ADT^A50 (HL7 v2.7) message. */
export function createADT_A50<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  merge: TMRG,
  visit: TPV1,
  options: ADT_A50Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A50<TMSH, TEVN, TPID, TMRG, TPV1> {
  return new ADT_A50(header, event, patient, merge, visit, options, encoding);
}
