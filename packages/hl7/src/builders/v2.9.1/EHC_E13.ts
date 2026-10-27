/**
 * Builder for EHC^E13 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [{UAC}] MSA [{ERR}] RFI [{CTD}] IVC PSS PSG [PID] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [PSL] { REQUEST: [CTD] OBR [{PRT}] [NTE] { RESPONSE: OBX [{PRT}] [NTE] [TXA] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { EHC_E13_STRUCTURE } from "../../structures/v2.9.1/EHC_E13.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { MSA } from "../../segments/v2.9.1/MSA.ts";
import type { ERR } from "../../segments/v2.9.1/ERR.ts";
import type { RFI } from "../../segments/v2.9.1/RFI.ts";
import type { CTD } from "../../segments/v2.9.1/CTD.ts";
import type { IVC } from "../../segments/v2.9.1/IVC.ts";
import type { PSS } from "../../segments/v2.9.1/PSS.ts";
import type { PSG } from "../../segments/v2.9.1/PSG.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { GSP } from "../../segments/v2.9.1/GSP.ts";
import type { GSR } from "../../segments/v2.9.1/GSR.ts";
import type { GSC } from "../../segments/v2.9.1/GSC.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { PSL } from "../../segments/v2.9.1/PSL.ts";
import type { OBR } from "../../segments/v2.9.1/OBR.ts";
import type { NTE } from "../../segments/v2.9.1/NTE.ts";
import type { OBX } from "../../segments/v2.9.1/OBX.ts";
import type { TXA } from "../../segments/v2.9.1/TXA.ts";

/** The REQUEST group of an EHC^E13 (HL7 v2.9.1) message being built. */
export interface RequestGroup {
  /** The CTD segment. */
  contact?: CTD;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segment. */
  note?: NTE;
  /** The RESPONSE groups. */
  responses: ResponseGroup[];
}

/** The RESPONSE group of an EHC^E13 (HL7 v2.9.1) message being built. */
export interface ResponseGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segment. */
  note?: NTE;
  /** The TXA segment. */
  document?: TXA;
}

/** The optional segments and groups of an EHC^E13 (HL7 v2.9.1) message. */
export interface EHC_E13Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The ERR segments. */
  errors?: ERR[];
  /** The CTD segments. */
  contacts?: CTD[];
  /** The PID segment. */
  patient?: PID;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The PSL segment. */
  psl?: PSL;
}

/** Builder for HL7 EHC^E13 (HL7 v2.9.1) messages. */
export class EHC_E13<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TRFI extends RFI = RFI, TIVC extends IVC = IVC, TPSS extends PSS = PSS, TPSG extends PSG = PSG> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E13";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EHC_E13_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public rfi: TRFI,
    public ivc: TIVC,
    public pss: TPSS,
    public psg: TPSG,
    public requests: RequestGroup[],
    public options: EHC_E13Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, rfi: this.rfi, ivc: this.ivc, pss: this.pss, psg: this.psg, requests: this.requests };
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

/** Builds an HL7 EHC^E13 (HL7 v2.9.1) message. */
export function createEHC_E13<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TRFI extends RFI = RFI, TIVC extends IVC = IVC, TPSS extends PSS = PSS, TPSG extends PSG = PSG>(
  header: TMSH,
  acknowledgment: TMSA,
  rfi: TRFI,
  ivc: TIVC,
  pss: TPSS,
  psg: TPSG,
  requests: RequestGroup[],
  options: EHC_E13Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EHC_E13<TMSH, TMSA, TRFI, TIVC, TPSS, TPSG> {
  return new EHC_E13(header, acknowledgment, rfi, ivc, pss, psg, requests, options, encoding);
}
