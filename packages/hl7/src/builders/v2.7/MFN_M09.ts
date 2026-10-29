/**
 * Builder for MFN^M09 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_TEST_CATEGORICAL: MFE OM1 [ MF_TEST_CAT_DETAIL: OM3 [{OM4}] ] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFN_M09_STRUCTURE } from "../../structures/v2.7/MFN_M09.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { MFI } from "../../segments/v2.7/MFI.ts";
import type { MFE } from "../../segments/v2.7/MFE.ts";
import type { OM1 } from "../../segments/v2.7/OM1.ts";
import type { OM3 } from "../../segments/v2.7/OM3.ts";
import type { OM4 } from "../../segments/v2.7/OM4.ts";

/** The MF TEST CATEGORICAL group of an MFN^M09 (HL7 v2.7) message being built. */
export interface MfTestCategoricalGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The MF TEST CAT DETAIL group. */
  mfTestCatDetail?: MfTestCatDetailGroup;
}

/** The MF TEST CAT DETAIL group of an MFN^M09 (HL7 v2.7) message being built. */
export interface MfTestCatDetailGroup {
  /** The OM3 segment. */
  categoricalObservation: OM3;
  /** The OM4 segments. */
  specimenRequirements?: OM4[];
}

/** The optional segments and groups of an MFN^M09 (HL7 v2.7) message. */
export interface MFN_M09Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 MFN^M09 (HL7 v2.7) messages. */
export class MFN_M09<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M09";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M09_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public mfTestCategoricals: MfTestCategoricalGroup[],
    public options: MFN_M09Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, mfTestCategoricals: this.mfTestCategoricals };
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

/** Builds an HL7 MFN^M09 (HL7 v2.7) message. */
export function createMFN_M09<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  mfTestCategoricals: MfTestCategoricalGroup[],
  options: MFN_M09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M09<TMSH, TMFI> {
  return new MFN_M09(header, masterFile, mfTestCategoricals, options, encoding);
}
