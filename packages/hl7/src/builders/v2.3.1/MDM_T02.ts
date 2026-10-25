/**
 * Builder for MDM^T02 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN PID PV1 TXA {OBX}
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MDM_T02_STRUCTURE } from "../../structures/v2.3.1/MDM_T02.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { EVN } from "../../segments/v2.3.1/EVN.ts";
import type { PID } from "../../segments/v2.3.1/PID.ts";
import type { PV1 } from "../../segments/v2.3.1/PV1.ts";
import type { TXA } from "../../segments/v2.3.1/TXA.ts";
import type { OBX } from "../../segments/v2.3.1/OBX.ts";

/** The optional segments and groups of an MDM^T02 (HL7 v2.3.1) message. The message has none. */
export type MDM_T02Options = Record<string, never>;

/** Builder for HL7 MDM^T02 (HL7 v2.3.1) messages. */
export class MDM_T02<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MDM_T02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MDM_T02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public visit: TPV1,
    public document: TTXA,
    public observations: OBX[],
    public options: MDM_T02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, visit: this.visit, document: this.document, observations: this.observations };
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

/** Builds an HL7 MDM^T02 (HL7 v2.3.1) message. */
export function createMDM_T02<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  document: TTXA,
  observations: OBX[],
  options: MDM_T02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MDM_T02<TMSH, TEVN, TPID, TPV1, TTXA> {
  return new MDM_T02(header, event, patient, visit, document, observations, options, encoding);
}
