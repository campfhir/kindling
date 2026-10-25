/**
 * Builder for RSP^K22 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] QAK QPD [{ QUERY_RESPONSE: PID [PD1] [QRI] }] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RSP_K22_STRUCTURE } from "../../structures/v2.4/RSP_K22.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { MSA } from "../../segments/v2.4/MSA.ts";
import type { ERR } from "../../segments/v2.4/ERR.ts";
import type { QAK } from "../../segments/v2.4/QAK.ts";
import type { QPD } from "../../segments/v2.4/QPD.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { PD1 } from "../../segments/v2.4/PD1.ts";
import type { QRI } from "../../segments/v2.4/QRI.ts";
import type { DSC } from "../../segments/v2.4/DSC.ts";

/** The QUERY RESPONSE group of an RSP^K22 (HL7 v2.4) message being built. */
export interface QueryResponseGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The QRI segment. */
  queryResponseInstance?: QRI;
}

/** The optional segments and groups of an RSP^K22 (HL7 v2.4) message. */
export interface RSP_K22Options {
  /** The ERR segment. */
  error?: ERR;
  /** The QUERY RESPONSE groups. */
  queryResponses?: QueryResponseGroup[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 RSP^K22 (HL7 v2.4) messages. */
export class RSP_K22<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K22";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RSP_K22_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public queryAcknowledgment: TQAK,
    public queryParameters: TQPD,
    public options: RSP_K22Options = {},
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

/** Builds an HL7 RSP^K22 (HL7 v2.4) message. */
export function createRSP_K22<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  options: RSP_K22Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RSP_K22<TMSH, TMSA, TQAK, TQPD> {
  return new RSP_K22(header, acknowledgment, queryAcknowledgment, queryParameters, options, encoding);
}
