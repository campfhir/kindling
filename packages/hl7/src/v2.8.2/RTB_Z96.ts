/**
 * Builder, parser and structure for RTB^Z96 messages (HL7 v2.8.2).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [ERR] QAK QPD [ ROW_DEFINITION: RDF [{RDT}] ] [DSC]
 * Shares the RTB^K13 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { RTB_K13_Parser, type ParsedRTB_K13, RTB_K13, type RTB_K13Options, type RowDefinitionGroup } from "./RTB_K13.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { MSA } from "./MSA.ts";
import type { QAK } from "./QAK.ts";
import type { QPD } from "./QPD.ts";

export { RTB_K13_STRUCTURE as RTB_Z96_STRUCTURE } from "./RTB_K13.ts";

export type { ParsedRowDefinition } from "./RTB_K13.ts";
/** Structured result of parsing an HL7 RTB^Z96 (HL7 v2.8.2) message. */
export type ParsedRTB_Z96 = ParsedRTB_K13;

/** Parser for HL7 RTB^Z96 (HL7 v2.8.2) messages. */
export class RTB_Z96_Parser extends RTB_K13_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RTB_Z96";
}

/** Parses an HL7 RTB^Z96 (HL7 v2.8.2) message string into a structured result. */
export function parseRTB_Z96(messageString: string): Result<ParsedRTB_Z96> {
  return new RTB_Z96_Parser().parse(messageString);
}

export type { RowDefinitionGroup };
/** The optional segments and groups of an RTB^Z96 (HL7 v2.8.2) message. */
export type RTB_Z96Options = RTB_K13Options;

/** Builder for HL7 RTB^Z96 (HL7 v2.8.2) messages. */
export class RTB_Z96<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD> extends RTB_K13<TMSH, TMSA, TQAK, TQPD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RTB_Z96";
}

/** Builds an HL7 RTB^Z96 (HL7 v2.8.2) message. */
export function createRTB_Z96<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQAK extends QAK = QAK, TQPD extends QPD = QPD>(
  header: TMSH,
  acknowledgment: TMSA,
  queryAcknowledgment: TQAK,
  queryParameters: TQPD,
  options: RTB_Z96Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RTB_Z96<TMSH, TMSA, TQAK, TQPD> {
  return new RTB_Z96(header, acknowledgment, queryAcknowledgment, queryParameters, options, encoding);
}
