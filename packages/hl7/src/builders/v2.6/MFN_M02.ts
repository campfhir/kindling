/**
 * Builder for MFN^M02 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_STAFF: MFE STF [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}] [{NTE}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFN_M02_STRUCTURE } from "../../structures/v2.6/MFN_M02.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { MFI } from "../../segments/v2.6/MFI.ts";
import type { MFE } from "../../segments/v2.6/MFE.ts";
import type { STF } from "../../segments/v2.6/STF.ts";
import type { PRA } from "../../segments/v2.6/PRA.ts";
import type { ORG } from "../../segments/v2.6/ORG.ts";
import type { AFF } from "../../segments/v2.6/AFF.ts";
import type { LAN } from "../../segments/v2.6/LAN.ts";
import type { EDU } from "../../segments/v2.6/EDU.ts";
import type { CER } from "../../segments/v2.6/CER.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";

/** The MF STAFF group of an MFN^M02 (HL7 v2.6) message being built. */
export interface MfStaffGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The STF segment. */
  staff: STF;
  /** The PRA segments. */
  practitioners?: PRA[];
  /** The ORG segments. */
  organizationUnits?: ORG[];
  /** The AFF segments. */
  affiliations?: AFF[];
  /** The LAN segments. */
  languages?: LAN[];
  /** The EDU segments. */
  educations?: EDU[];
  /** The CER segments. */
  certificates?: CER[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The optional segments and groups of an MFN^M02 (HL7 v2.6) message. */
export interface MFN_M02Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 MFN^M02 (HL7 v2.6) messages. */
export class MFN_M02<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public mfStaffs: MfStaffGroup[],
    public options: MFN_M02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, mfStaffs: this.mfStaffs };
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

/** Builds an HL7 MFN^M02 (HL7 v2.6) message. */
export function createMFN_M02<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  mfStaffs: MfStaffGroup[],
  options: MFN_M02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M02<TMSH, TMFI> {
  return new MFN_M02(header, masterFile, mfStaffs, options, encoding);
}
