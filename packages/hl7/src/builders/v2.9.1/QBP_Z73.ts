/**
 * Builder for QBP^Z73 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] QPD RCP
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { QBP_Z73_STRUCTURE } from "../../structures/v2.9.1/QBP_Z73.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { QPD } from "../../segments/v2.9.1/QPD.ts";
import type { RCP } from "../../segments/v2.9.1/RCP.ts";

/** The optional segments and groups of an QBP^Z73 (HL7 v2.9.1) message. */
export interface QBP_Z73Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 QBP^Z73 (HL7 v2.9.1) messages. */
export class QBP_Z73<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QBP_Z73";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QBP_Z73_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public queryParameters: TQPD,
    public responseControl: TRCP,
    public options: QBP_Z73Options = {},
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

/** Builds an HL7 QBP^Z73 (HL7 v2.9.1) message. */
export function createQBP_Z73<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  queryParameters: TQPD,
  responseControl: TRCP,
  options: QBP_Z73Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QBP_Z73<TMSH, TQPD, TRCP> {
  return new QBP_Z73(header, queryParameters, responseControl, options, encoding);
}
