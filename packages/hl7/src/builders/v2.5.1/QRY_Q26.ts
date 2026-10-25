/**
 * Builder for QRY^Q26 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] QRD [QRF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { QRY_Q26_STRUCTURE } from "../../structures/v2.5.1/QRY_Q26.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { SFT } from "../../segments/v2.5.1/SFT.ts";
import type { QRD } from "../../segments/v2.5.1/QRD.ts";
import type { QRF } from "../../segments/v2.5.1/QRF.ts";
import type { DSC } from "../../segments/v2.5.1/DSC.ts";

/** The optional segments and groups of an QRY^Q26 (HL7 v2.5.1) message. */
export interface QRY_Q26Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 QRY^Q26 (HL7 v2.5.1) messages. */
export class QRY_Q26<TMSH extends MSH = MSH, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QRY_Q26";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QRY_Q26_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public query: TQRD,
    public options: QRY_Q26Options = {},
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

/** Builds an HL7 QRY^Q26 (HL7 v2.5.1) message. */
export function createQRY_Q26<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_Q26Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_Q26<TMSH, TQRD> {
  return new QRY_Q26(header, query, options, encoding);
}
