/**
 * Builder for PMU^B02 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN STF [{GSP}] [{GSR}] [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}] [{ NEXT_OF_KIN: [{NK1}] [{GSP}] [{GSR}] }] [{PRT}] [{ROL}]
 * Shares the PMU^B01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { EVN } from "../../segments/v2.9.1/EVN.ts";
import type { STF } from "../../segments/v2.9.1/STF.ts";
import { PMU_B01, type PMU_B01Options, type NextOfKinGroup } from "./PMU_B01.ts";

export type { NextOfKinGroup };
/** The optional segments and groups of an PMU^B02 (HL7 v2.9.1) message. */
export type PMU_B02Options = PMU_B01Options;

/** Builder for HL7 PMU^B02 (HL7 v2.9.1) messages. */
export class PMU_B02<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF> extends PMU_B01<TMSH, TEVN, TSTF> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PMU_B02";
}

/** Builds an HL7 PMU^B02 (HL7 v2.9.1) message. */
export function createPMU_B02<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF>(
  header: TMSH,
  event: TEVN,
  staff: TSTF,
  options: PMU_B02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PMU_B02<TMSH, TEVN, TSTF> {
  return new PMU_B02(header, event, staff, options, encoding);
}
