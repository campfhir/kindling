/**
 * Builder for QBP^E22 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [{UAC}]  QUERY: QPD RCP 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { QBP_E22_STRUCTURE } from "../../structures/v2.7/QBP_E22.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { QPD } from "../../segments/v2.7/QPD.ts";
import type { RCP } from "../../segments/v2.7/RCP.ts";

/** The QUERY group of an QBP^E22 (HL7 v2.7) message being built. */
export interface QueryGroup {
  /** The QPD segment. */
  queryParameters: QPD;
  /** The RCP segment. */
  responseControl: RCP;
}

/** The optional segments and groups of an QBP^E22 (HL7 v2.7) message. */
export interface QBP_E22Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
}

/** Builder for HL7 QBP^E22 (HL7 v2.7) messages. */
export class QBP_E22<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QBP_E22";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QBP_E22_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public query: QueryGroup,
    public options: QBP_E22Options = {},
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

/** Builds an HL7 QBP^E22 (HL7 v2.7) message. */
export function createQBP_E22<TMSH extends MSH = MSH>(
  header: TMSH,
  query: QueryGroup,
  options: QBP_E22Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QBP_E22<TMSH> {
  return new QBP_E22(header, query, options, encoding);
}
