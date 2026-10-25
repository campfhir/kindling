/**
 * Builder for RQC^I06 messages (HL7 v2.4).
 *
 * Structure: MSH QRD [QRF] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{NTE}]
 * Shares the RQC^I05 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { QRD } from "../../segments/v2.4/QRD.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import { RQC_I05, type RQC_I05Options, type Provider } from "./RQC_I05.ts";

export type { Provider };
/** The optional segments and groups of an RQC^I06 (HL7 v2.4) message. */
export type RQC_I06Options = RQC_I05Options;

/** Builder for HL7 RQC^I06 (HL7 v2.4) messages. */
export class RQC_I06<TMSH extends MSH = MSH, TQRD extends QRD = QRD, TPID extends PID = PID> extends RQC_I05<TMSH, TQRD, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RQC_I06";
}

/** Builds an HL7 RQC^I06 (HL7 v2.4) message. */
export function createRQC_I06<TMSH extends MSH = MSH, TQRD extends QRD = QRD, TPID extends PID = PID>(
  header: TMSH,
  query: TQRD,
  providers: Provider[],
  patient: TPID,
  options: RQC_I06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RQC_I06<TMSH, TQRD, TPID> {
  return new RQC_I06(header, query, providers, patient, options, encoding);
}
