/**
 * Builder for MFR^M07 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] [QAK] QRD [QRF] MFI { MF_QUERY: MFE CM0 [{CM2}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFR_M07_STRUCTURE } from "../../structures/v2.4/MFR_M07.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { MSA } from "../../segments/v2.4/MSA.ts";
import type { ERR } from "../../segments/v2.4/ERR.ts";
import type { QAK } from "../../segments/v2.4/QAK.ts";
import type { QRD } from "../../segments/v2.4/QRD.ts";
import type { QRF } from "../../segments/v2.4/QRF.ts";
import type { MFI } from "../../segments/v2.4/MFI.ts";
import type { MFE } from "../../segments/v2.4/MFE.ts";
import type { CM0 } from "../../segments/v2.4/CM0.ts";
import type { CM2 } from "../../segments/v2.4/CM2.ts";
import type { DSC } from "../../segments/v2.4/DSC.ts";

/** The MF QUERY group of an MFR^M07 (HL7 v2.4) message being built. */
export interface ClinicalStudyScheduleEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The CM0 segment. */
  clinicalStudy: CM0;
  /** The CM2 segments. */
  studySchedules?: CM2[];
}

/** The optional segments and groups of an MFR^M07 (HL7 v2.4) message. */
export interface MFR_M07Options {
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 MFR^M07 (HL7 v2.4) messages. */
export class MFR_M07<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFR_M07";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFR_M07_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public masterFile: TMFI,
    public entries: ClinicalStudyScheduleEntry[],
    public options: MFR_M07Options = {},
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

/** Builds an HL7 MFR^M07 (HL7 v2.4) message. */
export function createMFR_M07<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  masterFile: TMFI,
  entries: ClinicalStudyScheduleEntry[],
  options: MFR_M07Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFR_M07<TMSH, TMSA, TQRD, TMFI> {
  return new MFR_M07(header, acknowledgment, query, masterFile, entries, options, encoding);
}
