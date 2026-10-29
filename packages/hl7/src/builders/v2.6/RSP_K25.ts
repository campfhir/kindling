/**
 * Builder for RSP^K25 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] QAK QPD RCP { STAFF: STF [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RSP_K25_STRUCTURE } from "../../structures/v2.6/RSP_K25.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { MSA } from "../../segments/v2.6/MSA.ts";
import type { ERR } from "../../segments/v2.6/ERR.ts";
import type { QAK } from "../../segments/v2.6/QAK.ts";
import type { QPD } from "../../segments/v2.6/QPD.ts";
import type { RCP } from "../../segments/v2.6/RCP.ts";
import type { STF } from "../../segments/v2.6/STF.ts";
import type { PRA } from "../../segments/v2.6/PRA.ts";
import type { ORG } from "../../segments/v2.6/ORG.ts";
import type { AFF } from "../../segments/v2.6/AFF.ts";
import type { LAN } from "../../segments/v2.6/LAN.ts";
import type { EDU } from "../../segments/v2.6/EDU.ts";
import type { CER } from "../../segments/v2.6/CER.ts";
import type { DSC } from "../../segments/v2.6/DSC.ts";

/** The STAFF group of an RSP^K25 (HL7 v2.6) message being built. */
export interface StaffGroup {
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
}

/** The optional segments and groups of an RSP^K25 (HL7 v2.6) message. */
export interface RSP_K25Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ERR segments. */
  errors?: ERR[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RSP^K25 (HL7 v2.6) messages. */
export class RSP_K25<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD, TRCP extends RCP = RCP> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K25";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RSP_K25_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public queryParameters: TQPD,
    public responseControl: TRCP,
    public staffs: StaffGroup[],
    public options: RSP_K25Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAcknowledgment: this.queryAcknowledgment, queryParameters: this.queryParameters, responseControl: this.responseControl, staffs: this.staffs };
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

/** Builds an HL7 RSP^K25 (HL7 v2.6) message. */
export function createRSP_K25<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  responseControl: TRCP,
  staffs: StaffGroup[],
  options: RSP_K25Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RSP_K25<TMSH, TMSA, TQAK, TQPD, TRCP> {
  return new RSP_K25(header, acknowledgment, queryAcknowledgment, queryParameters, responseControl, staffs, options, encoding);
}
