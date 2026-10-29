/**
 * Builder for RTB^Z92 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [ERR] QAK QPD [ ROW_DEFINITION: RDF [{RDT}] ] [DSC]
 * Shares the RTB^K13 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { MSA } from "../../segments/v2.6/MSA.ts";
import type { QAK } from "../../segments/v2.6/QAK.ts";
import type { QPD } from "../../segments/v2.6/QPD.ts";
import { RTB_K13, type RTB_K13Options, type RowDefinitionGroup } from "./RTB_K13.ts";

export type { RowDefinitionGroup };
/** The optional segments and groups of an RTB^Z92 (HL7 v2.6) message. */
export type RTB_Z92Options = RTB_K13Options;

/** Builder for HL7 RTB^Z92 (HL7 v2.6) messages. */
export class RTB_Z92<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD> extends RTB_K13<TMSH, TMSA, TQAK, TQPD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RTB_Z92";
}

/** Builds an HL7 RTB^Z92 (HL7 v2.6) message. */
export function createRTB_Z92<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  options: RTB_Z92Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RTB_Z92<TMSH, TMSA, TQAK, TQPD> {
  return new RTB_Z92(header, acknowledgment, queryAcknowledgment, queryParameters, options, encoding);
}
