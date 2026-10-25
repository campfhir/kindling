/**
 * Builder for ORF^W02 messages (HL7 v2.3).
 *
 * Structure: MSH MSA QRD [QRF] { QUERY_RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: [ORC] OBR [{NTE}] { OBSERVATION: [OBX] [{NTE}] } [{CTI}] } } [DSC]
 * Shares the ORF^R04 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { MSA } from "../../segments/v2.3/MSA.ts";
import type { QRD } from "../../segments/v2.3/QRD.ts";
import { ORF_R04, type ORF_R04Options, type QueryResponse, type ResponseOrderGroup, type ObservationGroup } from "./ORF_R04.ts";

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
