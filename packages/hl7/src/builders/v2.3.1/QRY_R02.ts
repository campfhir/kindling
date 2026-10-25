/**
 * Builder for QRY^R02 messages (HL7 v2.3.1).
 *
 * Structure: MSH QRD QRF
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { QRY_R02_STRUCTURE } from "../../structures/v2.3.1/QRY_R02.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { QRD } from "../../segments/v2.3.1/QRD.ts";
import type { QRF } from "../../segments/v2.3.1/QRF.ts";

/** The optional segments and groups of an QRY^R02 (HL7 v2.3.1) message. The message has none. */
export type QRY_R02Options = Record<string, never>;

/** Builder for HL7 QRY^R02 (HL7 v2.3.1) messages. */
export class QRY_R02<TMSH extends MSH = MSH, TQRD extends QRD = QRD, TQRF extends QRF = QRF> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QRY_R02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QRY_R02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public query: TQRD,
    public queryFilter: TQRF,
    public options: QRY_R02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, query: this.query, queryFilter: this.queryFilter };
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

/** Builds an HL7 QRY^R02 (HL7 v2.3.1) message. */
export function createQRY_R02<TMSH extends MSH = MSH, TQRD extends QRD = QRD, TQRF extends QRF = QRF>(
  header: TMSH,
  query: TQRD,
  queryFilter: TQRF,
  options: QRY_R02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_R02<TMSH, TQRD, TQRF> {
  return new QRY_R02(header, query, queryFilter, options, encoding);
}
