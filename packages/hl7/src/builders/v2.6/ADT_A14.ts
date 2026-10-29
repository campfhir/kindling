/**
 * Builder for ADT^A14 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{ARV}] [{ROL}] [{NK1}] PV1 [PV2] [{ARV}] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2]
 * Shares the ADT^A05 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { EVN } from "../../segments/v2.6/EVN.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { PV1 } from "../../segments/v2.6/PV1.ts";
import { ADT_A05, type ADT_A05Options, type ProcedureGroup, type InsuranceGroup } from "./ADT_A05.ts";

export type { ProcedureGroup, InsuranceGroup };
/** The optional segments and groups of an ADT^A14 (HL7 v2.6) message. */
export type ADT_A14Options = ADT_A05Options;

/** Builder for HL7 ADT^A14 (HL7 v2.6) messages. */
export class ADT_A14<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A05<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A14";
}

/** Builds an HL7 ADT^A14 (HL7 v2.6) message. */
export function createADT_A14<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A14Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A14<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A14(header, event, patient, visit, options, encoding);
}
