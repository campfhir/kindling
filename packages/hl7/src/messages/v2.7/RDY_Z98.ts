/**
 * Builder, parser and structure for RDY^Z98 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [ERR] QAK QPD [{DSP}] [DSC]
 * Shares the RDY^K15 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { RDY_K15_Parser, type ParsedRDY_K15, RDY_K15, type RDY_K15Options } from "./RDY_K15.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { MSA } from "../../segments/v2.7/MSA.ts";
import type { QAK } from "../../segments/v2.7/QAK.ts";
import type { QPD } from "../../segments/v2.7/QPD.ts";

export { RDY_K15_STRUCTURE as RDY_Z98_STRUCTURE } from "./RDY_K15.ts";

/** Structured result of parsing an HL7 RDY^Z98 (HL7 v2.7) message. */
export type ParsedRDY_Z98 = ParsedRDY_K15;

/** Parser for HL7 RDY^Z98 (HL7 v2.7) messages. */
export class RDY_Z98_Parser extends RDY_K15_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RDY_Z98";
}

/** Parses an HL7 RDY^Z98 (HL7 v2.7) message string into a structured result. */
export function parseRDY_Z98(messageString: string): Result<ParsedRDY_Z98> {
  return new RDY_Z98_Parser().parse(messageString);
}

/** The optional segments and groups of an RDY^Z98 (HL7 v2.7) message. */
export type RDY_Z98Options = RDY_K15Options;

/** Builder for HL7 RDY^Z98 (HL7 v2.7) messages. */
export class RDY_Z98<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD> extends RDY_K15<TMSH, TMSA, TQAK, TQPD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RDY_Z98";
}

/** Builds an HL7 RDY^Z98 (HL7 v2.7) message. */
export function createRDY_Z98<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  options: RDY_Z98Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RDY_Z98<TMSH, TMSA, TQAK, TQPD> {
  return new RDY_Z98(header, acknowledgment, queryAcknowledgment, queryParameters, options, encoding);
}
