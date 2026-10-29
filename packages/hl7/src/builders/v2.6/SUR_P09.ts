/**
 * Builder for SUR^P09 messages (HL7 v2.6).
 *
 * Structure: MSH { FACILITY: FAC { PRODUCT: PSH PDC } PSH { FACILITY_DETAIL: FAC PDC NTE } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { SUR_P09_STRUCTURE } from "../../structures/v2.6/SUR_P09.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { FAC } from "../../segments/v2.6/FAC.ts";
import type { PSH } from "../../segments/v2.6/PSH.ts";
import type { PDC } from "../../segments/v2.6/PDC.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";

/** The FACILITY group of an SUR^P09 (HL7 v2.6) message being built. */
export interface FacilityGroup {
  /** The FAC segment. */
  facility: FAC;
  /** The PRODUCT groups. */
  products: ProductGroup[];
  /** The PSH segment. */
  productSummary: PSH;
  /** The FACILITY DETAIL groups. */
  facilityDetails: FacilityDetailGroup[];
}

/** The PRODUCT group of an SUR^P09 (HL7 v2.6) message being built. */
export interface ProductGroup {
  /** The PSH segment. */
  productSummary: PSH;
  /** The PDC segment. */
  productDetail: PDC;
}

/** The FACILITY DETAIL group of an SUR^P09 (HL7 v2.6) message being built. */
export interface FacilityDetailGroup {
  /** The FAC segment. */
  facility: FAC;
  /** The PDC segment. */
  productDetail: PDC;
  /** The NTE segment. */
  note: NTE;
}

/** The optional segments and groups of an SUR^P09 (HL7 v2.6) message. The message has none. */
export type SUR_P09Options = Record<string, never>;

/** Builder for HL7 SUR^P09 (HL7 v2.6) messages. */
export class SUR_P09<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SUR_P09";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SUR_P09_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public facilitys: FacilityGroup[],
    public options: SUR_P09Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, facilitys: this.facilitys };
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

/** Builds an HL7 SUR^P09 (HL7 v2.6) message. */
export function createSUR_P09<TMSH extends MSH = MSH>(
  header: TMSH,
  facilitys: FacilityGroup[],
  options: SUR_P09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SUR_P09<TMSH> {
  return new SUR_P09(header, facilitys, options, encoding);
}
