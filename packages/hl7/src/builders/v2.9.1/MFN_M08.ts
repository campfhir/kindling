/**
 * Builder for MFN^M08 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_TEST_NUMERIC: MFE OM1 [{OMC}] [{PRT}] [OM2] [OM3] [{OM4}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFN_M08_STRUCTURE } from "../../structures/v2.9.1/MFN_M08.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { MFI } from "../../segments/v2.9.1/MFI.ts";
import type { MFE } from "../../segments/v2.9.1/MFE.ts";
import type { OM1 } from "../../segments/v2.9.1/OM1.ts";
import type { OMC } from "../../segments/v2.9.1/OMC.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { OM2 } from "../../segments/v2.9.1/OM2.ts";
import type { OM3 } from "../../segments/v2.9.1/OM3.ts";
import type { OM4 } from "../../segments/v2.9.1/OM4.ts";

/** The MF TEST NUMERIC group of an MFN^M08 (HL7 v2.9.1) message being built. */
export interface MfTestNumericGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The OMC segments. */
  omcList?: OMC[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The OM2 segment. */
  numericObservation?: OM2;
  /** The OM3 segment. */
  categoricalObservation?: OM3;
  /** The OM4 segments. */
  specimenRequirements?: OM4[];
}

/** The optional segments and groups of an MFN^M08 (HL7 v2.9.1) message. */
export interface MFN_M08Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 MFN^M08 (HL7 v2.9.1) messages. */
export class MFN_M08<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M08";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M08_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public mfTestNumerics: MfTestNumericGroup[],
    public options: MFN_M08Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, mfTestNumerics: this.mfTestNumerics };
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

/** Builds an HL7 MFN^M08 (HL7 v2.9.1) message. */
export function createMFN_M08<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  mfTestNumerics: MfTestNumericGroup[],
  options: MFN_M08Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M08<TMSH, TMFI> {
  return new MFN_M08(header, masterFile, mfTestNumerics, options, encoding);
}
