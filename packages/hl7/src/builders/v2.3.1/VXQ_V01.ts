/**
 * Builder for VXQ^V01 messages (HL7 v2.3.1).
 *
 * Structure: MSH QRD [QRF]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { VXQ_V01_STRUCTURE } from "../../structures/v2.3.1/VXQ_V01.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { QRD } from "../../segments/v2.3.1/QRD.ts";
import type { QRF } from "../../segments/v2.3.1/QRF.ts";

/** The optional segments and groups of an VXQ^V01 (HL7 v2.3.1) message. */
export interface VXQ_V01Options {
  /** The QRF segment. */
  queryFilter?: QRF;
}

/** Builder for HL7 VXQ^V01 (HL7 v2.3.1) messages. */
export class VXQ_V01<TMSH extends MSH = MSH, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "VXQ_V01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = VXQ_V01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public query: TQRD,
    public options: VXQ_V01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, query: this.query };
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

/** Builds an HL7 VXQ^V01 (HL7 v2.3.1) message. */
export function createVXQ_V01<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: VXQ_V01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): VXQ_V01<TMSH, TQRD> {
  return new VXQ_V01(header, query, options, encoding);
}
