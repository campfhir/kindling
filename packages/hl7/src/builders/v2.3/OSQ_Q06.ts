/**
 * Builder for OSQ^Q06 messages (HL7 v2.3).
 *
 * Structure: MSH QRD [QRF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { OSQ_Q06_STRUCTURE } from "../../structures/v2.3/OSQ_Q06.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { QRD } from "../../segments/v2.3/QRD.ts";
import type { QRF } from "../../segments/v2.3/QRF.ts";
import type { DSC } from "../../segments/v2.3/DSC.ts";

/** The optional segments and groups of an OSQ^Q06 (HL7 v2.3) message. */
export interface OSQ_Q06Options {
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 OSQ^Q06 (HL7 v2.3) messages. */
export class OSQ_Q06<TMSH extends MSH = MSH, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OSQ_Q06";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = OSQ_Q06_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public query: TQRD,
    public options: OSQ_Q06Options = {},
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

/** Builds an HL7 OSQ^Q06 (HL7 v2.3) message. */
export function createOSQ_Q06<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: OSQ_Q06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): OSQ_Q06<TMSH, TQRD> {
  return new OSQ_Q06(header, query, options, encoding);
}
