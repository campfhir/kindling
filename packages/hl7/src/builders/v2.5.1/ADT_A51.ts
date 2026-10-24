/**
 * Builder for ADT^A51 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] MRG [PV1]
 * Shares the ADT^A34 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { EVN } from "../../segments/v2.5.1/EVN.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import type { MRG } from "../../segments/v2.5.1/MRG.ts";
import { ADT_A34, type ADT_A34Options } from "./ADT_A34.ts";

/** The optional segments and groups of an ADT^A51 (HL7 v2.5.1) message. */
export type ADT_A51Options = ADT_A34Options;

/** Builder for HL7 ADT^A51 (HL7 v2.5.1) messages. */
export class ADT_A51<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG> extends ADT_A34<TMSH, TEVN, TPID, TMRG> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A51";
}

/** Builds an HL7 ADT^A51 (HL7 v2.5.1) message. */
export function createADT_A51<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG>(
  msh: TMSH,
  evn: TEVN,
  pid: TPID,
  mrg: TMRG,
  options: ADT_A51Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A51<TMSH, TEVN, TPID, TMRG> {
  return new ADT_A51(msh, evn, pid, mrg, options, encoding);
}
