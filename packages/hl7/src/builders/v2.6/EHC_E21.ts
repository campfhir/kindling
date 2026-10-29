/**
 * Builder for EHC^E21 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}]  AUTHORIZATION_REQUEST: IVC { PSL_ITEM_INFO: PSL [{NTE}] [AUT] } 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { EHC_E21_STRUCTURE } from "../../structures/v2.6/EHC_E21.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { IVC } from "../../segments/v2.6/IVC.ts";
import type { PSL } from "../../segments/v2.6/PSL.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { AUT } from "../../segments/v2.6/AUT.ts";

/** The AUTHORIZATION REQUEST group of an EHC^E21 (HL7 v2.6) message being built. */
export interface AuthorizationRequestGroup {
  /** The IVC segment. */
  ivc: IVC;
  /** The PSL ITEM INFO groups. */
  pslItemInfos: PslItemInfoGroup[];
}

/** The PSL ITEM INFO group of an EHC^E21 (HL7 v2.6) message being built. */
export interface PslItemInfoGroup {
  /** The PSL segment. */
  psl: PSL;
  /** The NTE segments. */
  notes?: NTE[];
  /** The AUT segment. */
  authorization?: AUT;
}

/** The optional segments and groups of an EHC^E21 (HL7 v2.6) message. */
export interface EHC_E21Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
}

/** Builder for HL7 EHC^E21 (HL7 v2.6) messages. */
export class EHC_E21<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E21";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EHC_E21_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public authorizationRequest: AuthorizationRequestGroup,
    public options: EHC_E21Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, authorizationRequest: this.authorizationRequest };
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

/** Builds an HL7 EHC^E21 (HL7 v2.6) message. */
export function createEHC_E21<TMSH extends MSH = MSH>(
  header: TMSH,
  authorizationRequest: AuthorizationRequestGroup,
  options: EHC_E21Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EHC_E21<TMSH> {
  return new EHC_E21(header, authorizationRequest, options, encoding);
}
