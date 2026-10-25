/**
 * Builder for MFN^M11 messages (HL7 v2.4).
 *
 * Structure: MSH MFI { MF_TEST_CALCULATED: MFE OM1 [ MF_TEST_CALC_DETAIL: OM6 OM2 ] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFN_M11_STRUCTURE } from "../../structures/v2.4/MFN_M11.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { MFI } from "../../segments/v2.4/MFI.ts";
import type { MFE } from "../../segments/v2.4/MFE.ts";
import type { OM1 } from "../../segments/v2.4/OM1.ts";
import type { OM6 } from "../../segments/v2.4/OM6.ts";
import type { OM2 } from "../../segments/v2.4/OM2.ts";

/** The MF TEST CALCULATED group of an MFN^M11 (HL7 v2.4) message being built. */
export interface CalculatedTestEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The OM6 segment. */
  calculatedObservation?: OM6;
  /** The OM2 segment. */
  numericObservation?: OM2;
}

/** The optional segments and groups of an MFN^M11 (HL7 v2.4) message. The message has none. */
export type MFN_M11Options = Record<string, never>;

/** Builder for HL7 MFN^M11 (HL7 v2.4) messages. */
export class MFN_M11<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M11";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M11_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public entries: CalculatedTestEntry[],
    public options: MFN_M11Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, entries: this.entries };
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

/** Builds an HL7 MFN^M11 (HL7 v2.4) message. */
export function createMFN_M11<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  entries: CalculatedTestEntry[],
  options: MFN_M11Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M11<TMSH, TMFI> {
  return new MFN_M11(header, masterFile, entries, options, encoding);
}
