/**
 * Builder for RSP^K23 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [ERR] QAK QPD [ QUERY_RESPONSE: PID ] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RSP_K23_STRUCTURE } from "../../structures/v2.6/RSP_K23.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { MSA } from "../../segments/v2.6/MSA.ts";
import type { ERR } from "../../segments/v2.6/ERR.ts";
import type { QAK } from "../../segments/v2.6/QAK.ts";
import type { QPD } from "../../segments/v2.6/QPD.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { DSC } from "../../segments/v2.6/DSC.ts";

/** The QUERY RESPONSE group of an RSP^K23 (HL7 v2.6) message being built. */
export interface QueryResponseGroup {
  /** The PID segment. */
  patient: PID;
}

/** The optional segments and groups of an RSP^K23 (HL7 v2.6) message. */
export interface RSP_K23Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ERR segment. */
  error?: ERR;
  /** The QUERY RESPONSE group. */
  queryResponse?: QueryResponseGroup;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RSP^K23 (HL7 v2.6) messages. */
export class RSP_K23<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K23";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RSP_K23_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public queryParameters: TQPD,
    public options: RSP_K23Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, queryAcknowledgment: this.queryAcknowledgment, queryParameters: this.queryParameters };
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

/** Builds an HL7 RSP^K23 (HL7 v2.6) message. */
export function createRSP_K23<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  options: RSP_K23Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RSP_K23<TMSH, TMSA, TQAK, TQPD> {
  return new RSP_K23(header, acknowledgment, queryAcknowledgment, queryParameters, options, encoding);
}
