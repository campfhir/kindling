/**
 * Builder for QSB^Z83 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] QPD RCP [DSC]
 * Shares the QSB^Q16 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { QPD } from "../../segments/v2.9.1/QPD.ts";
import type { RCP } from "../../segments/v2.9.1/RCP.ts";
import { QSB_Q16, type QSB_Q16Options } from "./QSB_Q16.ts";

/** The optional segments and groups of an QSB^Z83 (HL7 v2.9.1) message. */
export type QSB_Z83Options = QSB_Q16Options;

/** Builder for HL7 QSB^Z83 (HL7 v2.9.1) messages. */
export class QSB_Z83<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP> extends QSB_Q16<TMSH, TQPD, TRCP> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QSB_Z83";
}

/** Builds an HL7 QSB^Z83 (HL7 v2.9.1) message. */
export function createQSB_Z83<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  queryParameters: TQPD,
  responseControl: TRCP,
  options: QSB_Z83Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QSB_Z83<TMSH, TQPD, TRCP> {
  return new QSB_Z83(header, queryParameters, responseControl, options, encoding);
}
