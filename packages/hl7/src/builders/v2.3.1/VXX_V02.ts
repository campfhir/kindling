/**
 * Builder for VXX^V02 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA QRD [QRF] { PATIENT: PID [{NK1}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { VXX_V02_STRUCTURE } from "../../structures/v2.3.1/VXX_V02.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { MSA } from "../../segments/v2.3.1/MSA.ts";
import type { QRD } from "../../segments/v2.3.1/QRD.ts";
import type { QRF } from "../../segments/v2.3.1/QRF.ts";
import type { PID } from "../../segments/v2.3.1/PID.ts";
import type { NK1 } from "../../segments/v2.3.1/NK1.ts";

/** The PATIENT group of an VXX^V02 (HL7 v2.3.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
}

/** The optional segments and groups of an VXX^V02 (HL7 v2.3.1) message. */
export interface VXX_V02Options {
  /** The QRF segment. */
  queryFilter?: QRF;
}

/** Builder for HL7 VXX^V02 (HL7 v2.3.1) messages. */
export class VXX_V02<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "VXX_V02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = VXX_V02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public patients: PatientGroup[],
    public options: VXX_V02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query, patients: this.patients };
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

/** Builds an HL7 VXX^V02 (HL7 v2.3.1) message. */
export function createVXX_V02<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  patients: PatientGroup[],
  options: VXX_V02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): VXX_V02<TMSH, TMSA, TQRD> {
  return new VXX_V02(header, acknowledgment, query, patients, options, encoding);
}
