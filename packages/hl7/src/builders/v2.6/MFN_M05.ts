/**
 * Builder for MFN^M05 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_LOCATION: MFE LOC [{LCH}] [{LRL}] { MF_LOC_DEPT: LDP [{LCH}] [{LCC}] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFN_M05_STRUCTURE } from "../../structures/v2.6/MFN_M05.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { MFI } from "../../segments/v2.6/MFI.ts";
import type { MFE } from "../../segments/v2.6/MFE.ts";
import type { LOC } from "../../segments/v2.6/LOC.ts";
import type { LCH } from "../../segments/v2.6/LCH.ts";
import type { LRL } from "../../segments/v2.6/LRL.ts";
import type { LDP } from "../../segments/v2.6/LDP.ts";
import type { LCC } from "../../segments/v2.6/LCC.ts";

/** The MF LOCATION group of an MFN^M05 (HL7 v2.6) message being built. */
export interface MfLocationGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The LOC segment. */
  patientLocation: LOC;
  /** The LCH segments. */
  locationCharacteristics?: LCH[];
  /** The LRL segments. */
  locationRelationships?: LRL[];
  /** The MF LOC DEPT groups. */
  mfLocDepts: MfLocDeptGroup[];
}

/** The MF LOC DEPT group of an MFN^M05 (HL7 v2.6) message being built. */
export interface MfLocDeptGroup {
  /** The LDP segment. */
  locationDepartment: LDP;
  /** The LCH segments. */
  locationCharacteristics?: LCH[];
  /** The LCC segments. */
  locationChargeCodes?: LCC[];
}

/** The optional segments and groups of an MFN^M05 (HL7 v2.6) message. */
export interface MFN_M05Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 MFN^M05 (HL7 v2.6) messages. */
export class MFN_M05<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M05";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M05_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public mfLocations: MfLocationGroup[],
    public options: MFN_M05Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, mfLocations: this.mfLocations };
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

/** Builds an HL7 MFN^M05 (HL7 v2.6) message. */
export function createMFN_M05<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  mfLocations: MfLocationGroup[],
  options: MFN_M05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M05<TMSH, TMFI> {
  return new MFN_M05(header, masterFile, mfLocations, options, encoding);
}
