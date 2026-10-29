/**
 * Builder for TCR^U11 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EQU { TEST_CONFIGURATION: [SPM] {TCC} } [ROL]
 * Shares the TCU^U10 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { EQU } from "../../segments/v2.7/EQU.ts";
import { TCU_U10, type TCU_U10Options, type TestConfigurationGroup } from "./TCU_U10.ts";

export type { TestConfigurationGroup };
/** The optional segments and groups of an TCR^U11 (HL7 v2.7) message. */
export type TCR_U11Options = TCU_U10Options;

/** Builder for HL7 TCR^U11 (HL7 v2.7) messages. */
export class TCR_U11<TMSH extends MSH = MSH, TEQU extends EQU = EQU> extends TCU_U10<TMSH, TEQU> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "TCR_U11";
}

/** Builds an HL7 TCR^U11 (HL7 v2.7) message. */
export function createTCR_U11<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  testConfigurations: TestConfigurationGroup[],
  options: TCR_U11Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): TCR_U11<TMSH, TEQU> {
  return new TCR_U11(header, equipmentDetail, testConfigurations, options, encoding);
}
