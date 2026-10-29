/**
 * Builder, parser and structure for ORF^W02 messages (HL7 v2.3).
 *
 * Structure: MSH MSA QRD [QRF] { QUERY_RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: [ORC] OBR [{NTE}] { OBSERVATION: [OBX] [{NTE}] } [{CTI}] } } [DSC]
 * Shares the ORF^R04 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ORF_R04_Parser, type ParsedORF_R04, ORF_R04, type ORF_R04Options, type QueryResponse, type ResponseOrderGroup, type ObservationGroup } from "./ORF_R04.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { MSA } from "../../segments/v2.3/MSA.ts";
import type { QRD } from "../../segments/v2.3/QRD.ts";

export { ORF_R04_STRUCTURE as ORF_W02_STRUCTURE } from "./ORF_R04.ts";

export type { ParsedQueryResponse, ParsedResponseOrder, ParsedObservation } from "./ORF_R04.ts";
/** Structured result of parsing an HL7 ORF^W02 (HL7 v2.3) message. */
export type ParsedORF_W02 = ParsedORF_R04;

/** Parser for HL7 ORF^W02 (HL7 v2.3) messages. */
export class ORF_W02_Parser extends ORF_R04_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ORF_W02";
}

/** Parses an HL7 ORF^W02 (HL7 v2.3) message string into a structured result. */
export function parseORF_W02(messageString: string): Result<ParsedORF_W02> {
  return new ORF_W02_Parser().parse(messageString);
}

export type { QueryResponse, ResponseOrderGroup, ObservationGroup };
/** The optional segments and groups of an ORF^W02 (HL7 v2.3) message. */
export type ORF_W02Options = ORF_R04Options;

/** Builder for HL7 ORF^W02 (HL7 v2.3) messages. */
export class ORF_W02<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD> extends ORF_R04<TMSH, TMSA, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ORF_W02";
}

/** Builds an HL7 ORF^W02 (HL7 v2.3) message. */
export function createORF_W02<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  queryResponses: QueryResponse[],
  options: ORF_W02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORF_W02<TMSH, TMSA, TQRD> {
  return new ORF_W02(header, acknowledgment, query, queryResponses, options, encoding);
}
