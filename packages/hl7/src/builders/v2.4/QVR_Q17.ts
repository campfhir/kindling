/**
 * Builder for QVR^Q17 messages (HL7 v2.4).
 *
 * Structure: MSH QPD RCP [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { QVR_Q17_STRUCTURE } from "../../structures/v2.4/QVR_Q17.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { QPD } from "../../segments/v2.4/QPD.ts";
import type { RCP } from "../../segments/v2.4/RCP.ts";
import type { DSC } from "../../segments/v2.4/DSC.ts";

/** The optional segments and groups of an QVR^Q17 (HL7 v2.4) message. */
export interface QVR_Q17Options {
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 QVR^Q17 (HL7 v2.4) messages. */
export class QVR_Q17<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QVR_Q17";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QVR_Q17_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public queryParameters: TQPD,
    public responseControl: TRCP,
    public options: QVR_Q17Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, queryParameters: this.queryParameters, responseControl: this.responseControl };
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

/** Builds an HL7 QVR^Q17 (HL7 v2.4) message. */
export function createQVR_Q17<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  queryParameters: TQPD,
  responseControl: TRCP,
  options: QVR_Q17Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QVR_Q17<TMSH, TQPD, TRCP> {
  return new QVR_Q17(header, queryParameters, responseControl, options, encoding);
}
