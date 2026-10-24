/**
 * Builder for ADT^A12 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] [{ROL}] [{NK1}] PV1 [PV2] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2] [PDA]
 * Shares the ADT^A01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { EVN } from "../../segments/v2.5.1/EVN.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import type { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { ADT_A01, type ADT_A01Options, type ProcedureGroup, type InsuranceGroup } from "./ADT_A01.ts";

export type { ProcedureGroup, InsuranceGroup };
/** The optional segments and groups of an ADT^A12 (HL7 v2.5.1) message. */
export type ADT_A12Options = ADT_A01Options;

/** Builder for HL7 ADT^A12 (HL7 v2.5.1) messages. */
export class ADT_A12<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A01<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A12";
}

/** Builds an HL7 ADT^A12 (HL7 v2.5.1) message. */
export function createADT_A12<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  msh: TMSH,
  evn: TEVN,
  pid: TPID,
  pv1: TPV1,
  options: ADT_A12Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A12<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A12(msh, evn, pid, pv1, options, encoding);
}
