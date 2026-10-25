/**
 * Builder for MFR^M05 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MSA [{ERR}] [QAK] QRD [QRF] MFI { MF_QUERY: MFE LOC [{LCH}] [{LRL}] {LDP} [{LCH}] [{LCC}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFR_M05_STRUCTURE } from "../../structures/v2.5.1/MFR_M05.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { SFT } from "../../segments/v2.5.1/SFT.ts";
import type { MSA } from "../../segments/v2.5.1/MSA.ts";
import type { ERR } from "../../segments/v2.5.1/ERR.ts";
import type { QAK } from "../../segments/v2.5.1/QAK.ts";
import type { QRD } from "../../segments/v2.5.1/QRD.ts";
import type { QRF } from "../../segments/v2.5.1/QRF.ts";
import type { MFI } from "../../segments/v2.5.1/MFI.ts";
import type { MFE } from "../../segments/v2.5.1/MFE.ts";
import type { LOC } from "../../segments/v2.5.1/LOC.ts";
import type { LCH } from "../../segments/v2.5.1/LCH.ts";
import type { LRL } from "../../segments/v2.5.1/LRL.ts";
import type { LDP } from "../../segments/v2.5.1/LDP.ts";
import type { LCC } from "../../segments/v2.5.1/LCC.ts";
import type { DSC } from "../../segments/v2.5.1/DSC.ts";

/** The MF QUERY group of an MFR^M05 (HL7 v2.5.1) message being built. */
export interface LocationEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The LOC segment. */
  patientLocation: LOC;
  /** The LCH segments. */
  locationCharacteristics?: LCH[];
  /** The LRL segments. */
  locationRelationships?: LRL[];
  /** The LDP segments. */
  locationDepartments: LDP[];
  /** The LCH segments. */
  departmentCharacteristics?: LCH[];
  /** The LCC segments. */
  locationChargeCodes?: LCC[];
}

/** The optional segments and groups of an MFR^M05 (HL7 v2.5.1) message. */
export interface MFR_M05Options {
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

/** Builder for HL7 MFR^M05 (HL7 v2.5.1) messages. */
export class MFR_M05<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFR_M05";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFR_M05_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public masterFile: TMFI,
    public entries: LocationEntry[],
    public options: MFR_M05Options = {},
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

/** Builds an HL7 MFR^M05 (HL7 v2.5.1) message. */
export function createMFR_M05<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  masterFile: TMFI,
  entries: LocationEntry[],
  options: MFR_M05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFR_M05<TMSH, TMSA, TQRD, TMFI> {
  return new MFR_M05(header, acknowledgment, query, masterFile, entries, options, encoding);
}
