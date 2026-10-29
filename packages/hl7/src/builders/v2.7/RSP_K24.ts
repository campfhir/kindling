/**
 * Builder for RSP^K24 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [ERR] QAK QPD [ QUERY_RESPONSE: PID ] [DSC]
 * Shares the RSP^K23 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { MSA } from "../../segments/v2.7/MSA.ts";
import type { QAK } from "../../segments/v2.7/QAK.ts";
import type { QPD } from "../../segments/v2.7/QPD.ts";
import { RSP_K23, type RSP_K23Options, type QueryResponseGroup } from "./RSP_K23.ts";

export type { QueryResponseGroup };
/** The optional segments and groups of an RSP^K24 (HL7 v2.7) message. */
export type RSP_K24Options = RSP_K23Options;

/** Builder for HL7 RSP^K24 (HL7 v2.7) messages. */
export class RSP_K24<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD> extends RSP_K23<TMSH, TMSA, TQAK, TQPD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RSP_K24";
}

/** Builds an HL7 RSP^K24 (HL7 v2.7) message. */
export function createRSP_K24<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  options: RSP_K24Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RSP_K24<TMSH, TMSA, TQAK, TQPD> {
  return new RSP_K24(header, acknowledgment, queryAcknowledgment, queryParameters, options, encoding);
}
