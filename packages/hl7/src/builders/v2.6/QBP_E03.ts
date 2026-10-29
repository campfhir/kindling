/**
 * Builder for QBP^E03 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}]  QUERY_INFORMATION: QPD RCP 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { QBP_E03_STRUCTURE } from "../../structures/v2.6/QBP_E03.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { QPD } from "../../segments/v2.6/QPD.ts";
import type { RCP } from "../../segments/v2.6/RCP.ts";

/** The QUERY INFORMATION group of an QBP^E03 (HL7 v2.6) message being built. */
export interface QueryInformationGroup {
  /** The QPD segment. */
  queryParameters: QPD;
  /** The RCP segment. */
  responseControl: RCP;
}

/** The optional segments and groups of an QBP^E03 (HL7 v2.6) message. */
export interface QBP_E03Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
}

/** Builder for HL7 QBP^E03 (HL7 v2.6) messages. */
export class QBP_E03<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QBP_E03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = QBP_E03_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public queryInformation: QueryInformationGroup,
    public options: QBP_E03Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, queryInformation: this.queryInformation };
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

/** Builds an HL7 QBP^E03 (HL7 v2.6) message. */
export function createQBP_E03<TMSH extends MSH = MSH>(
  header: TMSH,
  queryInformation: QueryInformationGroup,
  options: QBP_E03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QBP_E03<TMSH> {
  return new QBP_E03(header, queryInformation, options, encoding);
}
