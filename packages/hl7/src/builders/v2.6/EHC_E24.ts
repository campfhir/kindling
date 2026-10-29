/**
 * Builder for EHC^E24 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}] MSA [{ERR}]  AUTHORIZATION_RESPONSE_INFO: IVC { PSL_ITEM_INFO: PSL [AUT] [{ PAYER_ADJUSTMENT: ADJ }] } 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { EHC_E24_STRUCTURE } from "../../structures/v2.6/EHC_E24.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { MSA } from "../../segments/v2.6/MSA.ts";
import type { ERR } from "../../segments/v2.6/ERR.ts";
import type { IVC } from "../../segments/v2.6/IVC.ts";
import type { PSL } from "../../segments/v2.6/PSL.ts";
import type { AUT } from "../../segments/v2.6/AUT.ts";
import type { ADJ } from "../../segments/v2.6/ADJ.ts";

/** The AUTHORIZATION RESPONSE INFO group of an EHC^E24 (HL7 v2.6) message being built. */
export interface AuthorizationResponseInfoGroup {
  /** The IVC segment. */
  ivc: IVC;
  /** The PSL ITEM INFO groups. */
  pslItemInfos: PslItemInfoGroup[];
}

/** The PSL ITEM INFO group of an EHC^E24 (HL7 v2.6) message being built. */
export interface PslItemInfoGroup {
  /** The PSL segment. */
  psl: PSL;
  /** The AUT segment. */
  authorization?: AUT;
  /** The PAYER ADJUSTMENT groups. */
  payerAdjustments?: PayerAdjustmentGroup[];
}

/** The PAYER ADJUSTMENT group of an EHC^E24 (HL7 v2.6) message being built. */
export interface PayerAdjustmentGroup {
  /** The ADJ segment. */
  adj: ADJ;
}

/** The optional segments and groups of an EHC^E24 (HL7 v2.6) message. */
export interface EHC_E24Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The ERR segments. */
  errors?: ERR[];
}

/** Builder for HL7 EHC^E24 (HL7 v2.6) messages. */
export class EHC_E24<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E24";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EHC_E24_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public authorizationResponseInfo: AuthorizationResponseInfoGroup,
    public options: EHC_E24Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, authorizationResponseInfo: this.authorizationResponseInfo };
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

/** Builds an HL7 EHC^E24 (HL7 v2.6) message. */
export function createEHC_E24<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  authorizationResponseInfo: AuthorizationResponseInfoGroup,
  options: EHC_E24Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EHC_E24<TMSH, TMSA> {
  return new EHC_E24(header, acknowledgment, authorizationResponseInfo, options, encoding);
}
