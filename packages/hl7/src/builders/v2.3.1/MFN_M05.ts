/**
 * Builder for MFN^M05 messages (HL7 v2.3.1).
 *
 * Structure: MSH MFI { MF_LOCATION: MFE LOC [{LCH}] [{LRL}] { MF_LOC_DEPT: LDP [{LCH}] [{LCC}] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFN_M05_STRUCTURE } from "../../structures/v2.3.1/MFN_M05.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { MFI } from "../../segments/v2.3.1/MFI.ts";
import type { MFE } from "../../segments/v2.3.1/MFE.ts";
import type { LOC } from "../../segments/v2.3.1/LOC.ts";
import type { LCH } from "../../segments/v2.3.1/LCH.ts";
import type { LRL } from "../../segments/v2.3.1/LRL.ts";
import type { LDP } from "../../segments/v2.3.1/LDP.ts";
import type { LCC } from "../../segments/v2.3.1/LCC.ts";

/** The MF LOCATION group of an MFN^M05 (HL7 v2.3.1) message being built. */
export interface LocationEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The LOC segment. */
  patientLocation: LOC;
  /** The LCH segments. */
  locationCharacteristics?: LCH[];
  /** The LRL segments. */
  locationRelationships?: LRL[];
  /** The MF LOC DEPT groups. */
  departments: LocationDepartment[];
}

/** The MF LOC DEPT group of an MFN^M05 (HL7 v2.3.1) message being built. */
export interface LocationDepartment {
  /** The LDP segment. */
  locationDepartment: LDP;
  /** The LCH segments. */
  locationCharacteristics?: LCH[];
  /** The LCC segments. */
  locationChargeCodes?: LCC[];
}

/** The optional segments and groups of an MFN^M05 (HL7 v2.3.1) message. The message has none. */
export type MFN_M05Options = Record<string, never>;

/** Builder for HL7 MFN^M05 (HL7 v2.3.1) messages. */
export class MFN_M05<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M05";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M05_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public entries: LocationEntry[],
    public options: MFN_M05Options = {},
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

/** Builds an HL7 MFN^M05 (HL7 v2.3.1) message. */
export function createMFN_M05<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  entries: LocationEntry[],
  options: MFN_M05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M05<TMSH, TMFI> {
  return new MFN_M05(header, masterFile, entries, options, encoding);
}
