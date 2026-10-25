/**
 * Builder for QCN^J01 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] QID
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { QCN_J01_STRUCTURE } from "../../structures/v2.5/QCN_J01.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { QID } from "../../segments/v2.5/QID.ts";

/** The optional segments and groups of an QCN^J01 (HL7 v2.5) message. */
export interface QCN_J01Options {
  /** The SFT segments. */
  software?: SFT[];
}

/** Builder for HL7 QCN^J01 (HL7 v2.5) messages. */
export class QCN_J01<TMSH extends MSH = MSH, TQID extends QID = QID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QCN_J01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QCN_J01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public queryIdentification: TQID,
    public options: QCN_J01Options = {},
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

/** Builds an HL7 QCN^J01 (HL7 v2.5) message. */
export function createQCN_J01<TMSH extends MSH = MSH, TQID extends QID = QID>(
  header: TMSH,
  queryIdentification: TQID,
  options: QCN_J01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QCN_J01<TMSH, TQID> {
  return new QCN_J01(header, queryIdentification, options, encoding);
}
