/**
 * Builder for ADT^A24 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [PV1] [{DB1}] PID [PD1] [PV1] [{DB1}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ADT_A24_STRUCTURE } from "../../structures/v2.7/ADT_A24.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { EVN } from "../../segments/v2.7/EVN.ts";
import type { PID } from "../../segments/v2.7/PID.ts";
import type { PD1 } from "../../segments/v2.7/PD1.ts";
import type { PV1 } from "../../segments/v2.7/PV1.ts";
import type { DB1 } from "../../segments/v2.7/DB1.ts";

/** The optional segments and groups of an ADT^A24 (HL7 v2.7) message. */
export interface ADT_A24Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PV1 segment. */
  visit?: PV1;
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The PD1 segment. */
  pd12?: PD1;
  /** The PV1 segment. */
  pv12?: PV1;
  /** The DB1 segments. */
  db12?: DB1[];
}

/** Builder for HL7 ADT^A24 (HL7 v2.7) messages. */
export class ADT_A24<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A24";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A24_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public pid2: PID,
    public options: ADT_A24Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, pid2: this.pid2 };
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

/** Builds an HL7 ADT^A24 (HL7 v2.7) message. */
export function createADT_A24<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  pid2: PID,
  options: ADT_A24Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A24<TMSH, TEVN, TPID> {
  return new ADT_A24(header, event, patient, pid2, options, encoding);
}
