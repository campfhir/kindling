/**
 * Builder for ADT^A17 messages (HL7 v2.3).
 *
 * Structure: MSH EVN { PATIENT: PID [PD1] PV1 [PV2] [{DB1}] [{OBX}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ADT_A17_STRUCTURE } from "../../structures/v2.3/ADT_A17.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { EVN } from "../../segments/v2.3/EVN.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { PD1 } from "../../segments/v2.3/PD1.ts";
import type { PV1 } from "../../segments/v2.3/PV1.ts";
import type { PV2 } from "../../segments/v2.3/PV2.ts";
import type { DB1 } from "../../segments/v2.3/DB1.ts";
import type { OBX } from "../../segments/v2.3/OBX.ts";

/** The PATIENT group of an ADT^A17 (HL7 v2.3) message being built. */
export interface SwapPatient {
  /** The PID segment. */
  pid: PID;
  /** The PD1 segment. */
  pd1?: PD1;
  /** The PV1 segment. */
  pv1: PV1;
  /** The PV2 segment. */
  pv2?: PV2;
  /** The DB1 segments. */
  db1List?: DB1[];
  /** The OBX segments. */
  obxList?: OBX[];
}

/** The optional segments and groups of an ADT^A17 (HL7 v2.3) message. The message has none. */
export type ADT_A17Options = Record<string, never>;

/** Builder for HL7 ADT^A17 (HL7 v2.3) messages. */
export class ADT_A17<TMSH extends MSH = MSH, TEVN extends EVN = EVN> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A17";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A17_STRUCTURE;

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public evn: TEVN,
    public patients: SwapPatient[],
    public options: ADT_A17Options = {},
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

/** Builds an HL7 ADT^A17 (HL7 v2.3) message. */
export function createADT_A17<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  msh: TMSH,
  evn: TEVN,
  patients: SwapPatient[],
  options: ADT_A17Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A17<TMSH, TEVN> {
  return new ADT_A17(msh, evn, patients, options, encoding);
}
