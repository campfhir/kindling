/**
 * Builder for ADT^A36 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID [PD1] MRG
 * Shares the ADT^A34 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { EVN } from "../../segments/v2.4/EVN.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { MRG } from "../../segments/v2.4/MRG.ts";
import { ADT_A34, type ADT_A34Options } from "./ADT_A34.ts";

/** The optional segments and groups of an ADT^A36 (HL7 v2.4) message. */
export type ADT_A36Options = ADT_A34Options;

/** Builder for HL7 ADT^A36 (HL7 v2.4) messages. */
export class ADT_A36<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG> extends ADT_A34<TMSH, TEVN, TPID, TMRG> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A36";
}

/** Builds an HL7 ADT^A36 (HL7 v2.4) message. */
export function createADT_A36<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  merge: TMRG,
  options: ADT_A36Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A36<TMSH, TEVN, TPID, TMRG> {
  return new ADT_A36(header, event, patient, merge, options, encoding);
}
