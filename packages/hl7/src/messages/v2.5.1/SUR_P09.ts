/**
 * Builder, parser and structure for SUR^P09 messages (HL7 v2.5.1).
 *
 * Structure: MSH { FACILITY: FAC { PRODUCT: PSH PDC } PSH { FACILITY_DETAIL: FAC PDC NTE } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { FAC } from "../../segments/v2.5.1/FAC.ts";
import { PSH } from "../../segments/v2.5.1/PSH.ts";
import { PDC } from "../../segments/v2.5.1/PDC.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of SUR^P09 (HL7 v2.5.1), in order. */
export const SUR_P09_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  {
    name: "FACILITY",
    required: true,
    repeating: true,
    as: "facilities",
    segments: [
      { name: "FAC", required: true, repeating: false },
      {
        name: "PRODUCT",
        required: true,
        repeating: true,
        segments: [
          { name: "PSH", required: true, repeating: false },
          { name: "PDC", required: true, repeating: false },
        ],
      },
      { name: "PSH", required: true, repeating: false },
      {
        name: "FACILITY_DETAIL",
        required: true,
        repeating: true,
        segments: [
          { name: "FAC", required: true, repeating: false },
          { name: "PDC", required: true, repeating: false },
          { name: "NTE", required: true, repeating: false },
        ],
      },
    ],
  },
];

/** The FACILITY group of a parsed SUR^P09 (HL7 v2.5.1) message. */
export interface ParsedFacility {
  /** The FAC segment. */
  facility: FAC;
  /** The PRODUCT groups. */
  products: ParsedProduct[];
  /** The PSH segment. */
  productSummary: PSH;
  /** The FACILITY DETAIL groups. */
  facilityDetails: ParsedFacilityDetail[];
}

/** The PRODUCT group of a parsed SUR^P09 (HL7 v2.5.1) message. */
export interface ParsedProduct {
  /** The PSH segment. */
  productSummary: PSH;
  /** The PDC segment. */
  productDetail: PDC;
}

/** The FACILITY DETAIL group of a parsed SUR^P09 (HL7 v2.5.1) message. */
export interface ParsedFacilityDetail {
  /** The FAC segment. */
  facility: FAC;
  /** The PDC segment. */
  productDetail: PDC;
  /** The NTE segment. */
  note: NTE;
}

/** Structured result of parsing an HL7 SUR^P09 (HL7 v2.5.1) message. */
export interface ParsedSUR_P09 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The FACILITY groups. */
  facilities: ParsedFacility[];
}

/** The segment parsers of SUR^P09 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  FAC: (s, e) => FAC.parse(s, e),
  PSH: (s, e) => PSH.parse(s, e),
  PDC: (s, e) => PDC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
};

/** Parser for HL7 SUR^P09 (HL7 v2.5.1) messages. */
export class SUR_P09_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SUR_P09";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SUR_P09_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSUR_P09> {
    return parseStructure<ParsedSUR_P09>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SUR^P09 (HL7 v2.5.1) message string into a structured result. */
export function parseSUR_P09(messageString: string): Result<ParsedSUR_P09> {
  return new SUR_P09_Parser().parse(messageString);
}

/** The FACILITY group of an SUR^P09 (HL7 v2.5.1) message being built. */
export interface Facility {
  /** The FAC segment. */
  facility: FAC;
  /** The PRODUCT groups. */
  products: Product[];
  /** The PSH segment. */
  productSummary: PSH;
  /** The FACILITY DETAIL groups. */
  facilityDetails: FacilityDetail[];
}

/** The PRODUCT group of an SUR^P09 (HL7 v2.5.1) message being built. */
export interface Product {
  /** The PSH segment. */
  productSummary: PSH;
  /** The PDC segment. */
  productDetail: PDC;
}

/** The FACILITY DETAIL group of an SUR^P09 (HL7 v2.5.1) message being built. */
export interface FacilityDetail {
  /** The FAC segment. */
  facility: FAC;
  /** The PDC segment. */
  productDetail: PDC;
  /** The NTE segment. */
  note: NTE;
}

/** The optional segments and groups of an SUR^P09 (HL7 v2.5.1) message. The message has none. */
export type SUR_P09Options = Record<string, never>;

/** Builder for HL7 SUR^P09 (HL7 v2.5.1) messages. */
export class SUR_P09<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SUR_P09";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SUR_P09_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public facilities: Facility[],
    public options: SUR_P09Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, facilities: this.facilities };
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

/** Builds an HL7 SUR^P09 (HL7 v2.5.1) message. */
export function createSUR_P09<TMSH extends MSH = MSH>(
  header: TMSH,
  facilities: Facility[],
  options: SUR_P09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SUR_P09<TMSH> {
  return new SUR_P09(header, facilities, options, encoding);
}
