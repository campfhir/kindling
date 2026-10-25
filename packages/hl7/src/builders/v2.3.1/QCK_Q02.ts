/**
 * Builder for QCK^Q02 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA [ERR] [QAK]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { QCK_Q02_STRUCTURE } from "../../structures/v2.3.1/QCK_Q02.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { MSA } from "../../segments/v2.3.1/MSA.ts";
import type { ERR } from "../../segments/v2.3.1/ERR.ts";
import type { QAK } from "../../segments/v2.3.1/QAK.ts";

/** The optional segments and groups of an QCK^Q02 (HL7 v2.3.1) message. */
export interface QCK_Q02Options {
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
}

/** Builder for HL7 QCK^Q02 (HL7 v2.3.1) messages. */
export class QCK_Q02<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QCK_Q02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QCK_Q02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public options: QCK_Q02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment };
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

/** Builds an HL7 QCK^Q02 (HL7 v2.3.1) message. */
export function createQCK_Q02<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: QCK_Q02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QCK_Q02<TMSH, TMSA> {
  return new QCK_Q02(header, acknowledgment, options, encoding);
}
