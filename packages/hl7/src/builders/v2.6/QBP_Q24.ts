/**
 * Builder for QBP^Q24 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] QPD RCP [DSC]
 * Shares the QBP^Q21 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { QPD } from "../../segments/v2.6/QPD.ts";
import type { RCP } from "../../segments/v2.6/RCP.ts";
import { QBP_Q21, type QBP_Q21Options } from "./QBP_Q21.ts";

/** The optional segments and groups of an QBP^Q24 (HL7 v2.6) message. */
export type QBP_Q24Options = QBP_Q21Options;

/** Builder for HL7 QBP^Q24 (HL7 v2.6) messages. */
export class QBP_Q24<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP> extends QBP_Q21<TMSH, TQPD, TRCP> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QBP_Q24";
}

/** Builds an HL7 QBP^Q24 (HL7 v2.6) message. */
export function createQBP_Q24<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  queryParameters: TQPD,
  responseControl: TRCP,
  options: QBP_Q24Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QBP_Q24<TMSH, TQPD, TRCP> {
  return new QBP_Q24(header, queryParameters, responseControl, options, encoding);
}
