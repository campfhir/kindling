/**
 * Builder for QRY^T12 messages (HL7 v2.5).
 *
 * Structure: MSH QRD [QRF]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { QRY_T12_STRUCTURE } from "../../structures/v2.5/QRY_T12.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { QRD } from "../../segments/v2.5/QRD.ts";
import type { QRF } from "../../segments/v2.5/QRF.ts";

/** The optional segments and groups of an QRY^T12 (HL7 v2.5) message. */
export interface QRY_T12Options {
  /** The QRF segment. */
  queryFilter?: QRF;
}

/** Builder for HL7 QRY^T12 (HL7 v2.5) messages. */
export class QRY_T12<TMSH extends MSH = MSH, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QRY_T12";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QRY_T12_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public query: TQRD,
    public options: QRY_T12Options = {},
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

/** Builds an HL7 QRY^T12 (HL7 v2.5) message. */
export function createQRY_T12<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_T12Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_T12<TMSH, TQRD> {
  return new QRY_T12(header, query, options, encoding);
}
