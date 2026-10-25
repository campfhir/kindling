/**
 * Builder for QBP^Q25 messages (HL7 v2.4).
 *
 * Structure: MSH QPD RCP [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { QBP_Q25_STRUCTURE } from "../../structures/v2.4/QBP_Q25.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { QPD } from "../../segments/v2.4/QPD.ts";
import type { RCP } from "../../segments/v2.4/RCP.ts";
import type { DSC } from "../../segments/v2.4/DSC.ts";

/** The optional segments and groups of an QBP^Q25 (HL7 v2.4) message. */
export interface QBP_Q25Options {
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 QBP^Q25 (HL7 v2.4) messages. */
export class QBP_Q25<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QBP_Q25";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QBP_Q25_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public queryParameters: TQPD,
    public responseControl: TRCP,
    public options: QBP_Q25Options = {},
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

/** Builds an HL7 QBP^Q25 (HL7 v2.4) message. */
export function createQBP_Q25<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  queryParameters: TQPD,
  responseControl: TRCP,
  options: QBP_Q25Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QBP_Q25<TMSH, TQPD, TRCP> {
  return new QBP_Q25(header, queryParameters, responseControl, options, encoding);
}
