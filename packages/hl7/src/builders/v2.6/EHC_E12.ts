/**
 * Builder for EHC^E12 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}] RFI [{CTD}] IVC PSS PSG [PID] [{PSL}] { REQUEST: [CTD] OBR [NTE] [{OBX}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { EHC_E12_STRUCTURE } from "../../structures/v2.6/EHC_E12.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { RFI } from "../../segments/v2.6/RFI.ts";
import type { CTD } from "../../segments/v2.6/CTD.ts";
import type { IVC } from "../../segments/v2.6/IVC.ts";
import type { PSS } from "../../segments/v2.6/PSS.ts";
import type { PSG } from "../../segments/v2.6/PSG.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { PSL } from "../../segments/v2.6/PSL.ts";
import type { OBR } from "../../segments/v2.6/OBR.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { OBX } from "../../segments/v2.6/OBX.ts";

/** The REQUEST group of an EHC^E12 (HL7 v2.6) message being built. */
export interface RequestGroup {
  /** The CTD segment. */
  contact?: CTD;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segment. */
  note?: NTE;
  /** The OBX segments. */
  observations?: OBX[];
}

/** The optional segments and groups of an EHC^E12 (HL7 v2.6) message. */
export interface EHC_E12Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The CTD segments. */
  contacts?: CTD[];
  /** The PID segment. */
  patient?: PID;
  /** The PSL segments. */
  pslList?: PSL[];
}

/** Builder for HL7 EHC^E12 (HL7 v2.6) messages. */
export class EHC_E12<TMSH extends MSH = MSH, TRFI extends RFI = RFI, TIVC extends IVC = IVC, TPSS extends PSS = PSS, TPSG extends PSG = PSG> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E12";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EHC_E12_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public rfi: TRFI,
    public ivc: TIVC,
    public pss: TPSS,
    public psg: TPSG,
    public requests: RequestGroup[],
    public options: EHC_E12Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, rfi: this.rfi, ivc: this.ivc, pss: this.pss, psg: this.psg, requests: this.requests };
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

/** Builds an HL7 EHC^E12 (HL7 v2.6) message. */
export function createEHC_E12<TMSH extends MSH = MSH, TRFI extends RFI = RFI, TIVC extends IVC = IVC, TPSS extends PSS = PSS, TPSG extends PSG = PSG>(
  header: TMSH,
  rfi: TRFI,
  ivc: TIVC,
  pss: TPSS,
  psg: TPSG,
  requests: RequestGroup[],
  options: EHC_E12Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EHC_E12<TMSH, TRFI, TIVC, TPSS, TPSG> {
  return new EHC_E12(header, rfi, ivc, pss, psg, requests, options, encoding);
}
