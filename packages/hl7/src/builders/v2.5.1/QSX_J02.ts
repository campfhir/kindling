/**
 * Builder for QSX^J02 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] QID
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { QSX_J02_STRUCTURE } from "../../structures/v2.5.1/QSX_J02.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { SFT } from "../../segments/v2.5.1/SFT.ts";
import type { QID } from "../../segments/v2.5.1/QID.ts";

/** The optional segments and groups of an QSX^J02 (HL7 v2.5.1) message. */
export interface QSX_J02Options {
  /** The SFT segments. */
  software?: SFT[];
}

/** Builder for HL7 QSX^J02 (HL7 v2.5.1) messages. */
export class QSX_J02<TMSH extends MSH = MSH, TQID extends QID = QID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QSX_J02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QSX_J02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public queryIdentification: TQID,
    public options: QSX_J02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, queryIdentification: this.queryIdentification };
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

/** Builds an HL7 QSX^J02 (HL7 v2.5.1) message. */
export function createQSX_J02<TMSH extends MSH = MSH, TQID extends QID = QID>(
  header: TMSH,
  queryIdentification: TQID,
  options: QSX_J02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QSX_J02<TMSH, TQID> {
  return new QSX_J02(header, queryIdentification, options, encoding);
}
