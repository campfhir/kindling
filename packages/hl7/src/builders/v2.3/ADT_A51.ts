/**
 * Builder for ADT^A51 messages (HL7 v2.3).
 *
 * Structure: MSH EVN PID [PD1] MRG PV1
 * Shares the ADT^A50 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { EVN } from "../../segments/v2.3/EVN.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { MRG } from "../../segments/v2.3/MRG.ts";
import type { PV1 } from "../../segments/v2.3/PV1.ts";
import { ADT_A50, type ADT_A50Options } from "./ADT_A50.ts";

/** The optional segments and groups of an ADT^A51 (HL7 v2.3) message. */
export type ADT_A51Options = ADT_A50Options;

/** Builder for HL7 ADT^A51 (HL7 v2.3) messages. */
export class ADT_A51<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG, TPV1 extends PV1 = PV1> extends ADT_A50<TMSH, TEVN, TPID, TMRG, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A51";
}

/** Builds an HL7 ADT^A51 (HL7 v2.3) message. */
export function createADT_A51<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  merge: TMRG,
  visit: TPV1,
  options: ADT_A51Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A51<TMSH, TEVN, TPID, TMRG, TPV1> {
  return new ADT_A51(header, event, patient, merge, visit, options, encoding);
}
