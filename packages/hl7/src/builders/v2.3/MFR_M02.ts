/**
 * Builder for MFR^M02 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] QRD [QRF] MFI { MF_QUERY: MFE STF [PRA] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFR_M02_STRUCTURE } from "../../structures/v2.3/MFR_M02.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { MSA } from "../../segments/v2.3/MSA.ts";
import type { ERR } from "../../segments/v2.3/ERR.ts";
import type { QRD } from "../../segments/v2.3/QRD.ts";
import type { QRF } from "../../segments/v2.3/QRF.ts";
import type { MFI } from "../../segments/v2.3/MFI.ts";
import type { MFE } from "../../segments/v2.3/MFE.ts";
import type { STF } from "../../segments/v2.3/STF.ts";
import type { PRA } from "../../segments/v2.3/PRA.ts";
import type { DSC } from "../../segments/v2.3/DSC.ts";

/** The MF QUERY group of an MFR^M02 (HL7 v2.3) message being built. */
export interface StaffEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The STF segment. */
  staff: STF;
  /** The PRA segment. */
  practitioner?: PRA;
}

/** The optional segments and groups of an MFR^M02 (HL7 v2.3) message. */
export interface MFR_M02Options {
  /** The ERR segment. */
  error?: ERR;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 MFR^M02 (HL7 v2.3) messages. */
export class MFR_M02<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFR_M02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFR_M02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public masterFile: TMFI,
    public entries: StaffEntry[],
    public options: MFR_M02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query, masterFile: this.masterFile, entries: this.entries };
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

/** Builds an HL7 MFR^M02 (HL7 v2.3) message. */
export function createMFR_M02<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  masterFile: TMFI,
  entries: StaffEntry[],
  options: MFR_M02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFR_M02<TMSH, TMSA, TQRD, TMFI> {
  return new MFR_M02(header, acknowledgment, query, masterFile, entries, options, encoding);
}
