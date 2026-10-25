/**
 * Builder for QSB^Q16 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] QPD RCP [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { QSB_Q16_STRUCTURE } from "../../structures/v2.5/QSB_Q16.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { QPD } from "../../segments/v2.5/QPD.ts";
import type { RCP } from "../../segments/v2.5/RCP.ts";
import type { DSC } from "../../segments/v2.5/DSC.ts";

/** The optional segments and groups of an QSB^Q16 (HL7 v2.5) message. */
export interface QSB_Q16Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 QSB^Q16 (HL7 v2.5) messages. */
export class QSB_Q16<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QSB_Q16";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QSB_Q16_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public queryParameters: TQPD,
    public responseControl: TRCP,
    public options: QSB_Q16Options = {},
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

/** Builds an HL7 QSB^Q16 (HL7 v2.5) message. */
export function createQSB_Q16<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  queryParameters: TQPD,
  responseControl: TRCP,
  options: QSB_Q16Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QSB_Q16<TMSH, TQPD, TRCP> {
  return new QSB_Q16(header, queryParameters, responseControl, options, encoding);
}
