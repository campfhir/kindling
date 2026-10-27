/**
 * Builder for ADT^A13 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{OH1}] [{OH2}] [OH3] [{OH4}] [{ARV}] [{ROL}] [{PRT}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] [{OH2}] [OH3] }] PV1 [PV2] [{ARV}] [{ROL}] [{PRT}] [{DB1}] [{ OBSERVATION: OBX [{PRT}] }] [{AL1}] [{IAM}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] [{PRT}] }] [{ GUARANTOR: GT1 [{GSP}] [{GSR}] }] [{ INSURANCE: IN1 [IN2] [{IN3}] [{GSP}] [{GSR}] [{ROL}] [{PRT}] [{ AUTHORIZATION: AUT [{PRT}] }] [{ REFERRAL: RF1 [{PRT}] }] }] [ACC] [UB1] [UB2] [PDA]
 * Shares the ADT^A01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { EVN } from "../../segments/v2.9.1/EVN.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import { ADT_A01, type ADT_A01Options, type NextOfKinGroup, type ObservationGroup, type ProcedureGroup, type GuarantorGroup, type InsuranceGroup, type AuthorizationGroup, type ReferralGroup } from "./ADT_A01.ts";

export type { NextOfKinGroup, ObservationGroup, ProcedureGroup, GuarantorGroup, InsuranceGroup, AuthorizationGroup, ReferralGroup };
/** The optional segments and groups of an ADT^A13 (HL7 v2.9.1) message. */
export type ADT_A13Options = ADT_A01Options;

/** Builder for HL7 ADT^A13 (HL7 v2.9.1) messages. */
export class ADT_A13<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A01<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A13";
}

/** Builds an HL7 ADT^A13 (HL7 v2.9.1) message. */
export function createADT_A13<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A13Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A13<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A13(header, event, patient, visit, options, encoding);
}
