/**
 * Builder for MFR^M06 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] MSA [{ERR}] [QAK] QRD [QRF] MFI { MF_QUERY: MFE CM0 [{ CM1_GROUP: CM1 [{CM2}] }] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFR_M06_STRUCTURE } from "../../structures/v2.6/MFR_M06.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { MSA } from "../../segments/v2.6/MSA.ts";
import type { ERR } from "../../segments/v2.6/ERR.ts";
import type { QAK } from "../../segments/v2.6/QAK.ts";
import type { QRD } from "../../segments/v2.6/QRD.ts";
import type { QRF } from "../../segments/v2.6/QRF.ts";
import type { MFI } from "../../segments/v2.6/MFI.ts";
import type { MFE } from "../../segments/v2.6/MFE.ts";
import type { CM0 } from "../../segments/v2.6/CM0.ts";
import type { CM1 } from "../../segments/v2.6/CM1.ts";
import type { CM2 } from "../../segments/v2.6/CM2.ts";
import type { DSC } from "../../segments/v2.6/DSC.ts";

/** The MF QUERY group of an MFR^M06 (HL7 v2.6) message being built. */
export interface MfQueryGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The CM0 segment. */
  clinicalStudy: CM0;
  /** The CM1 GROUP groups. */
  cm1Groups?: Cm1Group[];
}

/** The CM1 GROUP group of an MFR^M06 (HL7 v2.6) message being built. */
export interface Cm1Group {
  /** The CM1 segment. */
  studyPhase: CM1;
  /** The CM2 segments. */
  studySchedules?: CM2[];
}

/** The optional segments and groups of an MFR^M06 (HL7 v2.6) message. */
export interface MFR_M06Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The ERR segments. */
  errors?: ERR[];
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 MFR^M06 (HL7 v2.6) messages. */
export class MFR_M06<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFR_M06";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFR_M06_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public masterFile: TMFI,
    public mfQuerys: MfQueryGroup[],
    public options: MFR_M06Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query, masterFile: this.masterFile, mfQuerys: this.mfQuerys };
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

/** Builds an HL7 MFR^M06 (HL7 v2.6) message. */
export function createMFR_M06<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  masterFile: TMFI,
  mfQuerys: MfQueryGroup[],
  options: MFR_M06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFR_M06<TMSH, TMSA, TQRD, TMFI> {
  return new MFR_M06(header, acknowledgment, query, masterFile, mfQuerys, options, encoding);
}
