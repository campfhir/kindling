/**
 * Builder for PMU^B05 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN STF [{PRA}] [{ORG}]
 * Shares the PMU^B04 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { EVN } from "../../segments/v2.6/EVN.ts";
import type { STF } from "../../segments/v2.6/STF.ts";
import { PMU_B04, type PMU_B04Options } from "./PMU_B04.ts";

/** The optional segments and groups of an PMU^B05 (HL7 v2.6) message. */
export type PMU_B05Options = PMU_B04Options;

/** Builder for HL7 PMU^B05 (HL7 v2.6) messages. */
export class PMU_B05<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF> extends PMU_B04<TMSH, TEVN, TSTF> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PMU_B05";
}

/** Builds an HL7 PMU^B05 (HL7 v2.6) message. */
export function createPMU_B05<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF>(
  header: TMSH,
  event: TEVN,
  staff: TSTF,
  options: PMU_B05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PMU_B05<TMSH, TEVN, TSTF> {
  return new PMU_B05(header, event, staff, options, encoding);
}
