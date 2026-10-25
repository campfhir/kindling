/**
 * Builder for EDR^R07 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] QAK {DSP} [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { EDR_R07_STRUCTURE } from "../../structures/v2.4/EDR_R07.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { MSA } from "../../segments/v2.4/MSA.ts";
import type { ERR } from "../../segments/v2.4/ERR.ts";
import type { QAK } from "../../segments/v2.4/QAK.ts";
import type { DSP } from "../../segments/v2.4/DSP.ts";
import type { DSC } from "../../segments/v2.4/DSC.ts";

/** The optional segments and groups of an EDR^R07 (HL7 v2.4) message. */
export interface EDR_R07Options {
  /** The ERR segment. */
  error?: ERR;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 EDR^R07 (HL7 v2.4) messages. */
export class EDR_R07<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EDR_R07";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EDR_R07_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public displayLines: DSP[],
    public options: EDR_R07Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAcknowledgment: this.queryAcknowledgment, displayLines: this.displayLines };
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

/** Builds an HL7 EDR^R07 (HL7 v2.4) message. */
export function createEDR_R07<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  displayLines: DSP[],
  options: EDR_R07Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EDR_R07<TMSH, TMSA, TQAK> {
  return new EDR_R07(header, acknowledgment, queryAcknowledgment, displayLines, options, encoding);
}
