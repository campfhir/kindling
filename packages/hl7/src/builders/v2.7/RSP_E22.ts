/**
 * Builder for RSP^E22 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [{UAC}] MSA [{ERR}]  QUERY_ACK: QAK QPD [ AUTHORIZATION_INFO: IVC PSG { PSL_ITEM_INFO: PSL } ] 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RSP_E22_STRUCTURE } from "../../structures/v2.7/RSP_E22.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { MSA } from "../../segments/v2.7/MSA.ts";
import type { ERR } from "../../segments/v2.7/ERR.ts";
import type { QAK } from "../../segments/v2.7/QAK.ts";
import type { QPD } from "../../segments/v2.7/QPD.ts";
import type { IVC } from "../../segments/v2.7/IVC.ts";
import type { PSG } from "../../segments/v2.7/PSG.ts";
import type { PSL } from "../../segments/v2.7/PSL.ts";

/** The QUERY ACK group of an RSP^E22 (HL7 v2.7) message being built. */
export interface QueryAckGroup {
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The AUTHORIZATION INFO group. */
  authorizationInfo?: AuthorizationInfoGroup;
}

/** The AUTHORIZATION INFO group of an RSP^E22 (HL7 v2.7) message being built. */
export interface AuthorizationInfoGroup {
  /** The IVC segment. */
  ivc: IVC;
  /** The PSG segment. */
  psg: PSG;
  /** The PSL ITEM INFO groups. */
  pslItemInfos: PslItemInfoGroup[];
}

/** The PSL ITEM INFO group of an RSP^E22 (HL7 v2.7) message being built. */
export interface PslItemInfoGroup {
  /** The PSL segment. */
  psl: PSL;
}

/** The optional segments and groups of an RSP^E22 (HL7 v2.7) message. */
export interface RSP_E22Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The ERR segments. */
  errors?: ERR[];
}

/** Builder for HL7 RSP^E22 (HL7 v2.7) messages. */
export class RSP_E22<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_E22";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RSP_E22_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAck: QueryAckGroup,
    public options: RSP_E22Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAck: this.queryAck };
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

/** Builds an HL7 RSP^E22 (HL7 v2.7) message. */
export function createRSP_E22<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAck: QueryAckGroup,
  options: RSP_E22Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RSP_E22<TMSH, TMSA> {
  return new RSP_E22(header, acknowledgment, queryAck, options, encoding);
}
