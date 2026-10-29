/**
 * Builder for QBP^Q22 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] QPD RCP [DSC]
 * Shares the QBP^Q21 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { QPD } from "../../segments/v2.7/QPD.ts";
import type { RCP } from "../../segments/v2.7/RCP.ts";
import { QBP_Q21, type QBP_Q21Options } from "./QBP_Q21.ts";

/** The optional segments and groups of an QBP^Q22 (HL7 v2.7) message. */
export type QBP_Q22Options = QBP_Q21Options;

/** Builder for HL7 QBP^Q22 (HL7 v2.7) messages. */
export class QBP_Q22<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP> extends QBP_Q21<TMSH, TQPD, TRCP> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QBP_Q22";
}

/** Builds an HL7 QBP^Q22 (HL7 v2.7) message. */
export function createQBP_Q22<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  queryParameters: TQPD,
  responseControl: TRCP,
  options: QBP_Q22Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QBP_Q22<TMSH, TQPD, TRCP> {
  return new QBP_Q22(header, queryParameters, responseControl, options, encoding);
}
